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
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                <div class="mb-3">
                    Id
                    <Field name="id" id="id" type="number" class="form-control" v-model="model.cliente.id" />
                    <ErrorMessage name="id" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    Nombre
                    <Field name="nombre" id="nombre" type="text" class="form-control" v-model="model.cliente.nombre" />
                    <ErrorMessage name="nombre" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    Direccion
                    <Field name="direccion" id="direccion" type="text" class="form-control" v-model="model.cliente.direccion" />
                    <ErrorMessage name="direccion" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    Telefono
                    <Field name="telefono" id="telefono" type="text" class="form-control" v-model="model.cliente.telefono" />
                    <ErrorMessage name="telefono" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    RFC
                    <Field name="rfc" id="rfc" type="text" class="form-control" v-model="model.cliente.rfc" />
                    <ErrorMessage name="rfc" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { Field,Form,ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
export default {
    name: "ClientesCreate",
    components: { Field,Form,ErrorMessage },
    data(){
        const phoneRegex = new RegExp(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
        );
        const rfcRegex = new RegExp(
            /^([a-z]{3,4})(\d{2})(\d{2})(\d{2})([0-9a-z]{3})$/i
        );
        const validationSchema = toTypedSchema(
            zod.object({
                id: zod.number({message: 'Solo numeros'}).int(),
                nombre: zod.string().min(1,{message: 'Requerido'}),
                direccion: zod.string().min(1,{message: 'Requerido'}),
                telefono: zod.string().regex(phoneRegex, 'Numero no valido').min(10,{message: 'Minimo 10'}),
                rfc: zod.string().regex(rfcRegex, 'RFC no valido'),

            })
        )
        return{
            validationSchema,
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
        onTodoBien(){
            //alert('Todo valido')
            this.guardarCliente();
        },
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
<style scoped>
    .errorValidacion{
        color: red;
        font-weight: bold;
    }
</style>