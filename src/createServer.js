'use strict';

const express = require('express');
const cors = require('cors');
// const { v4: uuidv4 } = require('uuid');


let userNuberId = 0;
let expenseNuberId = 0;

function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  let users = [];
  let expenses = [];

  app.get('/expenses', (req, res) => {
    res.send(expenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!users.find((u) => u.id === userId)) {
      res.sendStatus(400);

      return [];
    }

    if (
      typeof title !== 'string' ||
      title.trim() === '' ||
      typeof amount !== 'number'
    ) {
      res.sendStatus(400);

      return [];
    }

    const expense = {
      id: expenseNuberId,
      // ///////////////////////////id: 0,
      userId,
      // spentAt: new Date().toISOString(),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    expenseNuberId += 1;

    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((expense) => expense.id === +id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    const expense = expenses.find((expense) => expense.id === +id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (
      typeof userId !== 'number'
      // typeof title !== 'string' ||
      // title.trim() === '' ||
      // typeof amount !== 'number' ||
      // typeof category !== 'string'
    ) {
      res.sendStatus(400);

      return;
    }

    Object.assign(expense, {
      userId,
      spentAt,

      title,
      amount,
      // spentAt: new Date().toISOString(),
      category,
      note,
    });
    res.sendStatus(200);
    res.sendHeader('OK');

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);
      return;
    }

    const newExpenses = expenses.filter((expense) => expense.id !== +id);

    if (expenses.length === newExpenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;

    res.sendStatus(204);
    res.send(expenses);

    // if ()
  });

  /// ////////////////////////////////////////////////////////

  app.get('/users', (req, res) => {
    // if (users.length === 0) {
    //   return [];
    // }

    res.send(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      id: userNuberId,
      name,
    };

    userNuberId += 1;

    users.push(user);

    res.statusCode = 201;

    res.send(user);

    return user;
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((user) => user.id === +id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find((user) => user.id === +id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(user, { name });

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);

      return;
    }

    const newUsers = users.filter((user) => user.id !== +id);

    if (users.length === newUsers.length) {
      res.sendStatus(404);

      return;
    }

    users = newUsers;

    res.sendStatus(204);
    // res.send(users);
  });

  return app;
}

// app.listen(3005, () => {});

module.exports = {
  createServer,
};















// 'use strict';
// const express = require('express');
// const cors = require('cors');
// // const { v4: uuidv4 } = require('uuid');

// let userNuberId = 0;

// function createServer() {
//   const app = express();
//   app.use(cors());
//   app.use(express.json());

//   let users = [];
//   let expenses = [];

//   app.get('/expenses', (req, res) => {
//     res.send(expenses);
//   });

//   app.post('/expenses', (req, res) => {
//     const { userId, title, amount, category, note, spentAt } = req.body;

//     if (!users.find((u) => u.id === userId)) {
//       res.sendStatus(400);

//       return;
//     }

//     if (
//       typeof title !== 'string' ||
//       title.trim() === '' ||
//       typeof amount !== 'number'
//     ) {
//       res.sendStatus(400);
//       return;
//     }
//     const expense = {
//       id: Date.now(),
//       // id: 0,
//       userId,
//       spentAt,
//       title,
//       amount,
//       category,
//       note,
//     };
//     expenses.push(expense);
//     res.statusCode = 201;
//     res.send(expense);
//     // if (expenses.length === 0) {
//     //   return [];
//     // }
//     // return expense || [];
//   });
//   app.get('/expenses/:id', (req, res) => {
//     const { id } = req.params;

//     const expense = expenses.find((exp) => exp.id === +id);

//     if (!expense) {
//       res.sendStatus(404);

//       return;
//     }

//     res.send(expense);
//   });

//   app.patch('/expenses/:id', (req, res) => {
//     const { id } = req.params;
//     const { userId, title, amount, category, note } = req.body;

//     const expense = expenses.find((exp) => exp.id === +id);

//     if (!expense) {
//       return res.sendStatus(404);
//     }

//     if (
//       typeof userId !== 'number' ||
//       typeof title !== 'string' ||
//       title.trim() === '' ||
//       typeof amount !== 'number' ||
//       typeof category !== 'string'
//     ) {
//       return res.sendStatus(400);
//     }
//     Object.assign(expense, {
//       userId,
//       title,
//       amount,
//       category,
//       note,
//     });
//     res.send(expense);
//   });
//   app.delete('/expenses/:id', (req, res) => {
//     const { id } = req.params;
//     // if (!id) {
//     //   res.sendStatus(404);
//     //   return;
//     // }
//     const newExpenses = expenses.filter((expense) => expense.id !== +id);
//     if (expenses.length === newExpenses.length) {
//       res.sendStatus(404);
//       return;
//     }
//     expenses = newExpenses;
//     res.sendStatus(204);
//     // res.send(users);
//   });
//   app.get('/users', (req, res) => {
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
//     const user = users.find((u) => u.id === +id);
//     if (!user) {
//       res.sendStatus(404);
//       return;
//     }
//     res.send(user);
//   });
//   app.patch('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//     const user = users.find((u) => u.id === +id);
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
// // app.listen(3005, () => {});ц
// module.exports = {
//   createServer,
// };
