const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ruta para guardar preguntas
app.post('/api/preguntas', (req, res) => {
  const nuevaPregunta = req.body;

  const archivoPreguntas = path.join(__dirname, 'data', 'preguntas.json');

  fs.readFile(archivoPreguntas, 'utf8', (err, data) => {
    let preguntas = [];

    if (!err && data) {
      try {
        preguntas = JSON.parse(data);
      } catch (e) {
        console.error("Error al parsear JSON existente:", e);
      }
    }

    preguntas.push(nuevaPregunta);

    fs.writeFile(archivoPreguntas, JSON.stringify(preguntas, null, 2), err => {
      if (err) {
        console.error("Error al escribir el archivo:", err);
        return res.status(500).json({ mensaje: 'Error al guardar la pregunta' });
      }

      res.status(201).json({ mensaje: 'Pregunta guardada con éxito' });
    });
  });
});

app.get('/api/preguntas', (req, res) => {
  const archivoPreguntas = path.join(__dirname, 'data', 'preguntas.json');

  fs.readFile(archivoPreguntas, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de preguntas:', err);
      return res.status(500).json({ mensaje: 'Error al obtener las preguntas' });
    }

    try {
      const preguntas = JSON.parse(data);
      res.status(200).json(preguntas);
    } catch (error) {
      console.error('Error al parsear el archivo JSON:', error);
      res.status(500).json({ mensaje: 'Error al procesar las preguntas' });
    }
  });
});

app.put('/api/preguntas/:index', (req, res) => {
  const archivoPreguntas = path.join(__dirname, 'data', 'preguntas.json');
  const index = parseInt(req.params.index);
  const nuevaData = req.body;

  fs.readFile(archivoPreguntas, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ mensaje: 'Error al leer el archivo' });

    let preguntas = JSON.parse(data);
    if (index < 0 || index >= preguntas.length) {
      return res.status(404).json({ mensaje: 'Pregunta no encontrada' });
    }

    preguntas[index] = { ...preguntas[index], ...nuevaData };

    fs.writeFile(archivoPreguntas, JSON.stringify(preguntas, null, 2), err => {
      if (err) return res.status(500).json({ mensaje: 'Error al guardar cambios' });
      res.status(200).json({ mensaje: 'Pregunta actualizada correctamente' });
    });
  });
});

app.delete('/api/preguntas/:index', (req, res) => {
  const archivoPreguntas = path.join(__dirname, 'data', 'preguntas.json');
  const index = parseInt(req.params.index);

  fs.readFile(archivoPreguntas, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ mensaje: 'Error al leer el archivo' });

    let preguntas = [];
    try {
      preguntas = JSON.parse(data);
    } catch (e) {
      return res.status(500).json({ mensaje: 'Error al parsear JSON' });
    }

    if (index < 0 || index >= preguntas.length) {
      return res.status(404).json({ mensaje: 'Pregunta no encontrada' });
    }

    preguntas.splice(index, 1); // Elimina la pregunta

    fs.writeFile(archivoPreguntas, JSON.stringify(preguntas, null, 2), err => {
      if (err) return res.status(500).json({ mensaje: 'Error al guardar cambios' });
      res.status(200).json({ mensaje: 'Pregunta eliminada correctamente' });
    });
  });
});

app.post('/api/usuarios', (req, res) => {
  const USERS_FILE = path.join(__dirname, 'data', 'usuarios.json');
  const { name, email, dni, username, password } = req.body;

  if (!name || !email || !dni || !username || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  // Leer usuarios existentes
  let usuarios = [];
  try {
    usuarios = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  } catch (error) {
    console.error("Error leyendo usuarios.json:", error);
  }

  // Verificar si el username ya existe
  const yaExisteUser = usuarios.find(u => u.username === username);
  if (yaExisteUser) {
    return res.status(400).json({ error: "El nombre de usuario ya está registrado." });
  }
  // Verificar si el dni ya existe
  const yaExisteDni = usuarios.find(u => u.dni === dni);
  if (yaExisteDni) {
    return res.status(400).json({ error: "El dni ya está registrado." });
  }
  // Verificar si el email ya existe
  const yaExisteEmail = usuarios.find(u => u.email === email);
  if (yaExisteEmail) {
    return res.status(400).json({ error: "El Correo electronico ya está registrado." });
  }

  const nuevoUsuario = {
    name,
    email,
    dni,
    username,
    password,
    rol: "usuario"
  };

  usuarios.push(nuevoUsuario);
  fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));

  res.json({ mensaje: "Usuario registrado correctamente." });
});

app.post('/api/login', (req, res) => {
  const USERS_FILE = path.join(__dirname, 'data', 'usuarios.json');
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Faltan credenciales." });
  }

  // Caso especial: admin hardcodeado
  if (username === 'admin' && password === 'admin') {
    return res.json({ mensaje: "Login admin exitoso", rol: "admin", username: "admin" });
  }

  let usuarios = [];
  try {
    usuarios = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  } catch (error) {
    console.error("Error leyendo usuarios.json:", error);
  }

  const usuario = usuarios.find(u => u.username === username && u.password === password);

  if (!usuario) {
    return res.status(401).json({ error: "Usuario o contraseña incorrectos." });
  }

  res.json({ mensaje: "Login exitoso", rol: usuario.rol, username: usuario.username });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${3000}`);
});
