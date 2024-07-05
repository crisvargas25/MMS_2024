const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
    host: '189.197.187.187',
    user: 'alumnos',
    password: 'Alumnos1010$',
    database: 'controlescolar',
});

app.get('/', (req, res) => {
    res.send("Hola mundo 2");
});

app.get('/main', (req, res) => {
    res.send("Hola, esta es la pagina principal del servicio");
});

app.get('/profesores', (req, res) => {
    const sql = 'SELECT * FROM profesores';
    db.query(sql, (err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send(err);
        }
    });
});

app.get('/profesor/nombre/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const sql = 'SELECT * FROM profesores WHERE nombre = ?';
    db.query(sql, [nombre], (err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.error("Error al buscar profesor por nombre:", err);
            res.status(500).send(err);
        }
    });
});


app.get('/profesor/:id', (req, res) => {
    const identificador = req.params.id;
    const sql = 'SELECT * FROM profesores WHERE id = ?';
    db.query(sql, [identificador], (err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send(err);
        }
    });
});

app.post('/profesor/registrar', (req, res) => {
    const { id, nombre, correo, direccion } = req.body;
    const sql = 'INSERT INTO profesores (id, nombre, correo, direccion) VALUES (?, ?, ?, ?)';
    db.query(sql, [id, nombre, correo, direccion], (err, result) => {
        if (!err) {
            res.status(200).send({
                result,
                mensaje: 'Profesor registrado',
            });
        } else {
            res.status(500).send({
                err,
                mensaje: 'No se registró el profesor',
            });
        }
    });
});

app.delete('/profesor/eliminar/:id', (req, res) => {
    const identificador = req.params.id;
    const sql = 'DELETE FROM profesores WHERE id = ?';
    db.query(sql, [identificador], (err, result) => {
        if (!err) {
            if (result.affectedRows > 0) {
                res.status(200).send({
                    result,
                    mensaje: 'Profesor eliminado',
                });
            } else {
                res.status(404).send({
                    mensaje: 'Profesor no encontrado',
                });
            }
        } else {
            console.error("Error deleting profesor:", err);
            res.status(500).send(err);
        }
    });
}); 

app.put('/profesor/modificar', (req, res) => {
    const { id, nombre, correo, direccion } = req.body; // Corregir el nombre de la propiedad
    const sql = 'UPDATE profesores SET nombre = ?, correo = ?, direccion = ? WHERE id = ?'; // Eliminar la coma extra
    db.query(sql, [nombre, correo, direccion, id], (err, result) => {
        if (!err) {
            res.status(200).send({
                result,
                mensaje: 'Profesor modificado',
            });
        } else {
            res.status(500).send({
                err,
                mensaje: 'No se modificó el profesor',
            });
        }
    });
});

app.all('*', (req, res) => {
    res.send("Esta dirección no existe, contacta a tu administrador o proveedor");
});

app.listen(port, () => {
    console.log(`Estamos escuchando en el puerto ${port}`);
});