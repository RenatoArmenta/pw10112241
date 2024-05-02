let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

//Conexion a MySQL
let conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'pwdata',
    port: '3306'
});
//Nos conectmos a MySQL
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conectado a la base de datos')
    }
});

//Rutas de acceso
app.get("/", function(req,res){
    res.send("Ruta de inicio");
})
//Seleccionar a todos los clientes
app.get('/api/clientes',(req,res)=>{
    conexion.query('SELECT * FROM clientes',(error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
})
//seleccionamos un cliente
app.get('/api/clientes/:id',(req,res)=>{
    conexion.query('SELECT * FROM clientes WHERE id=?',[req.params.id],(error,fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
});
//borrar un cliente
app.delete('/api/clientes/:id',(req,res) =>{
    let id = req.params.id;
    conexion.query('DELETE FROM clientes WHERE id=?',[id],(error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
});
//Insertar un nuevo cliente
app.post('/api/clientes/:id',(req,res) =>{
    let data = {
        id:req.body.id,
        nombre:req.body.nombre,
        direccion:req.body.direccion,
        telefono:req.body.telefono,
        rfc:req.body.rfc
    }
    let sql = "INSERT INTO clientes SET ?";
    conexion.query(sql,data,(error,resultado)=>{
        if(error){
            throw error;
        }else{
            res.send(resultado);
        }
    })
});
app.put('/api/clientes/:id',(req,res) => {
    let id = req.params.id;
    let nombre=req.body.nombre;
    let direccion=req.body.direccion;
    let telefono=req.body.telefono;
    let rfc=req.body.rfc;
    let sql="UPDATE clientes SET nombre=?, direccion=?, telefono=?, rfc=? WHERE id=?";
    conexion.query(sql,[nombre,direccion,telefono,rfc,id],(error,results)=> {
        if(error){
            throw error;
        }else{
            res.send()
        }
    })
});
//Encender el servidor
let puerto = 3000;
app.listen(puerto,function(){
    console.log("Servidor escuchando puerto "+puerto);
})