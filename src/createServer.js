'use strict';

const { createUsersService } = require('./services/users.service.js');
const { createExpensesService } = require('./services/expenses.service.js');
const express = require('express');
const cors = require('cors');
// const { v4: uuidv4 } = require('uuid');

function createServer() {
  const app = express();

  const usersService = createUsersService();
  const expensesService = createExpensesService();

  app.use(cors());
  app.use(express.json());

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    const result = expensesService.getAll({
      userId,
      from,
      to,
      categories,
    });

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!usersService.getAll().find((user) => user.id === userId)) {
      res.sendStatus(400);

      return;
    }

    if (
      typeof title !== 'string' ||
      title.trim() === '' ||
      typeof amount !== 'number'
    ) {
      res.sendStatus(400);

      return;
    }

    const expense = expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const exexpense = expensesService.getById({ id });

    if (!exexpense) {
      res.sendStatus(404);

      return;
    }

    res.send(exexpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    const expense = expensesService.update({
      id: +id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    if (!expense) {
      return res.sendStatus(404);
    }

    return res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);

      return;
    }

    if (!expensesService.getById({ id })) {
      res.sendStatus(404);

      return;
    }

    expensesService.remove({ id });
    res.sendStatus(204);
  });

  /// ///////////////////////////  /////////////////////////////

  app.get('/users', (req, res) => {
    res.send(usersService.getAll());
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = usersService.create(name);

    res.statusCode = 201;

    res.send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const us = usersService.getById(id);

    if (!us) {
      res.sendStatus(404);

      return;
    }

    res.send(us);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = usersService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string' || name.trim() === '') {
      return res.sendStatus(400);
    }

    const updatedUser = usersService.update({ id, name });

    res.send(updatedUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);

      return;
    }

    if (!usersService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    usersService.remove(id);

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
