const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

let fleet = [
  { name: 'Аврора', state: 1 },
  { name: 'Варяг', state: 2 },
  { name: 'Паллада', state: 3 },
  { name: 'Марат', state: 1 },
  { name: 'Полтава', state: 2 },
  { name: 'Гангут', state: 3 },
  { name: 'Севастополь', state: 1 },
  { name: 'Киров', state: 2 },
  { name: 'Адмирал Нахимов', state: 3 },
  { name: 'Адмирал Кузнецов', state: 1 },
  { name: 'Москва', state: 2 },
  { name: 'Петр Великий', state: 3 },
  { name: 'Ушаков', state: 1 },
  { name: 'Королев', state: 2 },
  { name: 'Дмитрий Донской', state: 3 },
  { name: 'Грозный', state: 1 },
  { name: 'Красный Октябрь', state: 2 },
  { name: 'Сталинград', state: 3 },
  { name: 'Ленинград', state: 1 },
  { name: 'Мурманск', state: 2 },
];

const C1 = 1000000;
const C2 = 5000000;
const C3 = 15000000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { fleet });
});

app.post('/change-state', (req, res) => {
  const { shipIndex, newState } = req.body;
  fleet[shipIndex].state = parseInt(newState);
  res.redirect('/');
});

app.post('/update', (req, res) => {
  const { budget } = req.body;
  let availableBudget = parseInt(budget);
  let remainingBudget = availableBudget;
  let workDescription = '';
  
  fleet.forEach(ship => {
    if (ship.state === 2 && remainingBudget >= C2) {
      ship.state = 1;
      remainingBudget -= C2;
      workDescription += `${ship.name}: Капремонт выполнен на сумму 5000000 рублей\n`;
    } else if (ship.state === 3 && remainingBudget >= C3) {
      ship.state = 1;
      remainingBudget -= C3;
      workDescription += `${ship.name}: Замена судна выполнена на сумму 15000000 рублей\n`;
    }
  });

  res.render('index', { fleet, budget: availableBudget, remainingBudget, workDescription });
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  // Здесь можно добавить логику регистрации
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


