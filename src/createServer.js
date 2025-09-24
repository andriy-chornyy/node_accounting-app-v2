// 'use strict';

// const express = require('express');
// const cors = require('cors');
// // const { v4: uuidv4 } = require('uuid');

// let userNuberId = 0;
// let expenseNuberId = 0;

// function createServer() {
//   const app = express();

//   app.use(cors());
//   app.use(express.json());

//   let users = [];
//   let expenses = [];

//   // app.get('/expenses', (req, res) => {
//   //   res.send(expenses);

//   // });

//   app.get('/expenses', (req, res) => {
//     let result = expenses;

//     const { userId, from, to, categories } = req.query;

//     if (userId !== undefined) {
//       result = result.filter((e) => e.userId === +userId);
//     }

//     if (from !== undefined) {
//       result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
//     }

//     if (to !== undefined) {
//       result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
//     }

//     if (categories !== undefined) {
//       // query может быть строкой или массивом
//       const cats = Array.isArray(categories) ? categories : [categories];

//       result = result.filter((e) => cats.includes(e.category));
//     }

//     res.json(result);
//   });

//   app.post('/expenses', (req, res) => {
//     const { userId, spentAt, title, amount, category, note } = req.body;

//     if (!users.find((u) => u.id === userId)) {
//       res.sendStatus(400);

//       return [];
//     }

//     if (
//       typeof title !== 'string' ||
//       title.trim() === '' ||
//       typeof amount !== 'number'
//     ) {
//       res.sendStatus(400);

//       return [];
//     }

//     const expense = {
//       id: expenseNuberId,
//       // ///////////////////////////id: 0,
//       userId,
//       // spentAt: new Date().toISOString(),
//       spentAt,
//       title,
//       amount,
//       category,
//       note,
//     };

//     expenses.push(expense);

//     expenseNuberId += 1;

//     res.statusCode = 201;
//     res.send(expense);
//   });

//   app.get('/expenses/:id', (req, res) => {
//     const { id } = req.params;

//     const expense = expenses.find((expense) => expense.id === +id);

//     if (!expense) {
//       res.sendStatus(404);

//       return;
//     }

//     res.send(expense);
//     // return expenses;
//   });

//   // app.patch('/expenses/:id', (req, res) => {
//   //   const { id } = req.params;
//   //   const { userId, spentAt, title, amount, category, note } = req.body;

//   //   const expense = expenses.find((expense) => expense.id === +id);

//   //   if (!expense) {
//   //     res.sendStatus(404);

//   //     return;
//   //   }

//   //   if (
//   //     typeof +userId !== 'number'
//   //     // typeof title !== 'string' ||
//   //     // title.trim() === '' ||
//   //     // typeof amount !== 'number' ||
//   //     // typeof category !== 'string'
//   //   ) {
//   //     res.sendStatus(400);

//   //     return;
//   //   }

//   //   Object.assign(expense, {
//   //     userId,
//   //     spentAt,

//   //     title,
//   //     amount,
//   //     // spentAt: new Date().toISOString(),
//   //     category,
//   //     note,
//   //   });
//   //   res.sendStatus(200);
//   //   res.sendHeader('OK');

//   //   res.send(expense);
//   // });
//   app.patch('/expenses/:id', (req, res) => {
//     const { id } = req.params;
//     const { userId, spentAt, title, amount, category, note } = req.body;

//     const expense = expenses.find((expense) => expense.id === +id);

//     if (!expense) {
//       res.sendStatus(404);

//       return;
//     }

//     // Обновляем только те поля, что реально передали
//     if (userId !== undefined) {
//       expense.userId = userId;
//     }

//     if (spentAt !== undefined) {
//       expense.spentAt = spentAt;
//     }

//     if (title !== undefined) {
//       expense.title = title;
//     }

//     if (amount !== undefined) {
//       expense.amount = amount;
//     }

//     if (category !== undefined) {
//       expense.category = category;
//     }

//     if (note !== undefined) {
//       expense.note = note;
//     }

//     res.status(200).json(expense);
//   });

//   app.delete('/expenses/:id', (req, res) => {
//     const { id } = req.params;

//     if (!id) {
//       res.sendStatus(404);

//       return;
//     }

//     const newExpenses = expenses.filter((expense) => expense.id !== +id);

//     if (expenses.length === newExpenses.length) {
//       res.sendStatus(404);

//       return;
//     }

//     expenses = newExpenses;

//     res.sendStatus(204);
//     res.send(expenses);

//     // if ()
//   });

//   /// ////////////////////////////////////////////////////////

//   app.get('/users', (req, res) => {
//     // if (users.length === 0) {
//     //   return [];
//     // }

//     res.send(users);
//   });

//   app.post('/users', (req, res) => {
//     const { name } = req.body;

//     if (!name) {
//       res.sendStatus(400);

//       return;
//     }

//     const user = {
//       id: userNuberId,
//       name,
//     };

//     userNuberId += 1;

//     users.push(user);

//     res.statusCode = 201;

//     res.send(user);

//     return user;
//   });

//   app.get('/users/:id', (req, res) => {
//     const { id } = req.params;

//     const user = users.find((user) => user.id === +id);

//     if (!user) {
//       res.sendStatus(404);

//       return;
//     }

//     res.send(user);
//   });

//   app.patch('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;

//     const user = users.find((user) => user.id === +id);

//     if (!user) {
//       res.sendStatus(404);

//       return;
//     }

//     if (typeof name !== 'string') {
//       res.sendStatus(422);

//       return;
//     }

//     Object.assign(user, { name });

//     res.send(user);
//   });

//   app.delete('/users/:id', (req, res) => {
//     const { id } = req.params;

//     if (!id) {
//       res.sendStatus(404);

//       return;
//     }

//     const newUsers = users.filter((user) => user.id !== +id);

//     if (users.length === newUsers.length) {
//       res.sendStatus(404);

//       return;
//     }

//     users = newUsers;

//     res.sendStatus(204);
//     // res.send(users);
//   });

//   return app;
// }

// // app.listen(3005, () => {});

// module.exports = {
//   createServer,
// };

'use strict';

const express = require('express');
const cors = require('cors');

let userNuberId = 0;
let expenseNuberId = 0;

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  let users = [];
  let expenses = [];

  // ===== Expenses =====
  app.get('/expenses', (req, res) => {
    let result = expenses;
    const { userId, from, to, categories } = req.query;

    if (userId !== undefined) {
      result = result.filter((e) => e.userId === +userId);
    }

    if (from !== undefined) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to !== undefined) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    if (categories !== undefined) {
      const cats = Array.isArray(categories) ? categories : [categories];

      result = result.filter((e) => cats.includes(e.category));
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!users.find((u) => u.id === userId)) {
      return res.sendStatus(400);
    }

    if (
      typeof title !== 'string' ||
      title.trim() === '' ||
      typeof amount !== 'number'
    ) {
      return res.sendStatus(400);
    }

    const expense = {
      id: expenseNuberId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);
    expenseNuberId += 1;

    res.status(201).send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      return res.sendStatus(404);
    }

    if (userId !== undefined) {
      expense.userId = userId;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const newExpenses = expenses.filter((e) => e.id !== +id);

    if (expenses.length === newExpenses.length) {
      return res.sendStatus(404);
    }

    expenses = newExpenses;
    res.sendStatus(204);
  });

  // ===== Users =====
  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = { id: userNuberId, name };

    userNuberId += 1;
    users.push(user);

    res.status(201).send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === +id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find((u) => u.id === +id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (typeof name !== 'string') {
      return res.sendStatus(422);
    }

    user.name = name;
    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const newUsers = users.filter((u) => u.id !== +id);

    if (users.length === newUsers.length) {
      return res.sendStatus(404);
    }

    users = newUsers;
    res.sendStatus(204);
  });

  return app;
}

module.exports = { createServer };
