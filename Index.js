
// API REST simples usando Node.js + Express
// Para rodar:
// 1. npm init -y
// 2. npm install express
// 3. node index.js

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Banco de dados fake (em memória)
let users = [
  { id: 1, name: 'Pietro' },
  { id: 2, name: 'Maria' }
];

// Rota inicial
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// GET - listar usuários
app.get('/users', (req, res) => {
  res.json(users);
});

// GET - usuário por ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
});

// POST - criar usuário
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - atualizar usuário
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  user.name = req.body.name;
  res.json(user);
});

// DELETE - remover usuário
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Usuário não encontrado' });

  users.splice(index, 1);
  res.json({ message: 'Usuário removido' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
