const express = require('express');
const mysql = require ('mysql2');
const bodyParser = require('body-parser');
const cors =require('cors')

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());


const db = mysql.createPool({
    host: '189.197.187.187',
    user: 'alumnos',
    password: 'Alumnos1010$',
    database: 'controlescolar',

})

app.get('/' , (req, res)=>{
    res.send("Hola mundo 2");
});
app.get('/profesores' , (req, res)=>{
    const sql = 'SELECT * FROM profesores';
    db.query(sql, (err, result)=>{
        if(!err){
            res.status(200).send(result);
        }else {
            res.status(300).send(err);
        }
    })
});

app.get('/profesor/:id' , (req, res)=>{
    const identificador = req.params.id;
    const sql = 'DELETE * FROM profesores WHERE id = ?';
    db.query(sql,[identificador], (err, result)=>{
        if(!err){
            res.status(200).send(result);
        }else {
            res.status(300).send(err);

        }
    })
});

app.get('/profesor' , (req, res)=>{
    const respuesta = {
        "id": 5,
        "nombre": "dagoberto fiscal",
        "correo": "dago@gmail.com",
        "direccion": "5 de febrero",
        "telefono": "6181233848"
    }
    res.status(200).send(respuesta);
    
});


app.get('/profesor/eliminar/:id' , (req, res)=>{
    const identificador = req.params.id;
    const sql = 'SELECT * FROM profesores WHERE id = ?';
    db.query(sql,[identificador], (err, result)=>{
        if(!err){
            res.status(200).send(result);
        }else {
            res.status(300).send(err);

        }
    })
});


app. post('/profesor/registrar', (req,res)=>{
    res.status(200).send('todo bien');
    console.log(req.body);
    
    // const{id ,nombre,correo ,direccion} = req.body;
    // const sql = 'INSERT INTO profesores VALUES(?,?,?,?)';
    // db.query(sql, [id, nombre, correo, direccion], (err, resultado)=>{
    //     if(!err){
    //         res.status(200).send({
    //             result,
    //             mensaje:'Profesor reggistrado',
    //         })
    //     }else{
    //         res.status(300).send({
    //             err,
    //             mensaje: 'no se registro el profesor',            })
    //     }
    // });
})

app.all('*',(req,res)=>{
    res.send("Esta direccion no existe, contacta a tu administrador o provedor")
});

app.listen(port, ()=>{
    console.log("escuchando en el puerto ${port}");
});

