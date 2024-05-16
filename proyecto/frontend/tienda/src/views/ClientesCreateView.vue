<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar cliente</h4>
                <div v-if="mensaje ==1" class="alert alert-success" role="alert">
                    Datos guardados con exito
                </div>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="model.cliente.id">
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="model.cliente.nombre">
                </div>
                <div class="mb-3">
                    Direccion
                    <input type="text" class="form-control" v-model="model.cliente.direccion">
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control" v-model="model.cliente.telefono">
                </div>
                <div class="mb-3">
                    RFC
                    <input type="text" class="form-control" v-model="model.cliente.rfc">
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="guardarCliente()">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "ClientesCreate",
    data(){
        return{
            mensaje: 0,
            model:{
                cliente:{
                    id: '',
                    nombre: '',
                    direccion: '',
                    telefono: '',
                    rfc: ''
                }
            }
        }
        
    },
    methods:{
        guardarCliente(){
            axios.post('http://localhost:3000/api/clientes', this.model.cliente)
            .then(res => {
                if(res.data.affectedRows == 1){ //si insertamos 1 registro 
                    this.model.cliente = { //limpiamos los cuadros de texto
                    id: '',
                    nombre: '',
                    direccion: '',
                    telefono: '',
                    rfc: ''
                }
                //para que salga el mensaje de exito
                this.mensaje = 1;
                }
            })
        }
    }
}
</script>