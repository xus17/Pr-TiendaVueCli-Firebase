<template>
  <div id="carroAdmin" v-if="user">
    <Heade />
    <div id="carroA">
      <div>
        <h1>Añadir Productos</h1>
        <div class="add">
          <form  id="formularioAdmin">
            <label >Nombre: <input v-model="Nombre" /></label>
            <label 
              >Precio: <input v-model="Precio" type="number"
            /></label>
            <label 
              >Cantidad: <input v-model="Cantidad" type="number"
            /></label>
            <label >Descripción: <input v-model="Descripcion" /></label>
            <label >Url Imagen: <input v-model="Url" /></label>
            <button @click="addProducto">Añadir</button>
          </form>
        </div>
        <h1 id="editar">Editar Productos</h1>
        <div class="edit">
          <form id="formularioedit">
            <label >Id Producto: <input v-model="IdEdit" /></label>
            <label >Nombre: <input v-model="NombreEdit" /></label>
            <label 
              >Precio: <input v-model="PrecioEdit" type="number"
            /></label>
            <label 
              >Cantidad: <input v-model="CantidadEdit" type="number"
            /></label>
            <label 
              >Descripción: <input v-model="DescripcionEdit"
            /></label>
            <label >Url Imagen: <input v-model="UrlEdit" /></label>
            <button @click="editarProducto">Editar</button>
          </form>
        </div>
        <h1>Borrar Productos</h1>
        <div v-for="producto in productos" v-bind:key="producto.id">
          <div class="carroAdmin">
            <div class="carroa1">
              <img :src="producto.Imagen" alt="" />
              <p>
                <strong>{{ producto.Nombre }}</strong>
              </p>
              <p><strong>Cantidad: </strong>{{ producto.Stock }}</p>
              <p><strong>Precio: </strong>{{ producto.Precio }}</p>
            </div>
            <div class="cara1">
              <p><strong>Id: </strong>{{ producto.id }}</p>
              <div id="edits">
                <a @click="borrarProducto(producto.id)" 
                  ><i class="fa fa-trash" aria-hidden="true"></i
                ></a>
                <a @click="Edit(producto)" 
                  ><i class="fa fa-pencil" aria-hidden="true"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Foote />
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../db";
import Heade from "../components/Header";
import Foote from "../components/Footer";

export default {
  name: "Carrito",
  components: {
    Heade,
    Foote
  },
  data() {
    return {
      user: null,
      productos: [],
      Nombre: "",
      Precio: 0,
      Cantidad: 0,
      Descripcion: "",
      Url: "",
      NombreEdit: "",
      PrecioEdit: 0,
      CantidadEdit: 0,
      DescripcionEdit: "",
      UrlEdit: "",
      IdEdit: "",
    };
  },
  props: {},
  methods: {
    /*Función que al pulsarla rellenara el formulario con los datos del producto asociado, y enviara una notificación que lo dirá. */
    Edit: function (producto) {
      this.$notify({
              title: "Editar",
              text: "Se han copiado los campos en el formulario de editar. ",type:'warn'
            });
      this.IdEdit = producto.id;
      this.NombreEdit = producto.Nombre;
      this.UrlEdit = producto.Imagen;
      this.PrecioEdit = producto.Precio;
      this.CantidadEdit = producto.Stock;
      this.DescripcionEdit = producto.Descripcion;
    },
    /*Función que edita un producto, comprobando que existe en la colección de productos, comprobando si los campos estan
    bien introducidos, y en su caso de no enviará una notificación de error.*/

    editarProducto: function () {
      var existe = false;
      for (var i = 0; i < this.productos.length; i++) {
        if (this.productos[i].id == this.IdEdit) {
          existe = true;
        }
      }
      if (existe) {
        if (
          this.NombreEdit &&
          this.DescripcionEdit &&
          this.UrlEdit &&
          this.PrecioEdit &&
          this.CantidadEdit
        ) {
          if (this.CantidadEdit > 0 && this.PrecioEdit > 0) {
            db.collection("Productos").doc(this.IdEdit).update({
              Nombre: this.NombreEdit,
              Imagen: this.UrlEdit,
              Descripcion: this.DescripcionEdit,
              Precio: this.PrecioEdit,
              Novedad: false,
              Stock: this.CantidadEdit,
            });
            this.$notify({
              title: "Editado",
              text: "Se ha editado correctamente. ",type:'success'
            });
            this.NombreEdit = "";
            this.UrlEdit = "";
            this.DescripcionEdit = "";
            this.PrecioEdit = 0;
            this.CantidadEdit = 0;
            this.IdEdit = "";
          } else {
            this.$notify({
              title: "Error",
              text: "Se deben introducir correctamente los campos numéricos. ",type:'error'
            });
          }
        } else {
          this.$notify({
            title: "Error",
            text: "Se deben introducir todos los valores correctamente. ",type:'error'
          });
        }
      } else {
        this.$notify({ title: "Error", text: "No se ha encontrado el Id. " ,type:'error'});
      }
    },
    /*Función que borra un producto, y envía una notificación de success.*/
    borrarProducto: function (id) {
      this.$notify({
              title: "Borrar",
              text: "Se ha borrado correctamente. ",type:'success'
            });
      db.collection("Productos").doc(id).delete();
    },
    /*Función en la que se añade un nuevo producto que se añadiría a la coleccion de productos, comprobando si los campos estan
    bien introducidos, y en su caso de no enviará una notificación de error.*/
    addProducto: function () {
      if (
        this.Nombre &&
        this.Descripcion &&
        this.Url &&
        this.Precio &&
        this.Cantidad
      ) {
        if (this.Cantidad > 0 && this.Precio > 0) {
          db.collection("Productos").add({
            Nombre: this.Nombre,
            Imagen: this.Url,
            Descripcion: this.Descripcion,
            Precio: this.Precio,
            Novedad: true,
            Stock: this.Cantidad,
          });
          this.$notify({
            title: "Añadido",
            text: "Se ha añadido correctamente. ",type:'success'
          });
          this.Nombre = "";
          this.Url = "";
          this.Descripcion = "";
          this.Precio = 0;
          this.Cantidad = 0;
        } else {
          this.$notify({
            title: "Error",
            text: "Se deben introducir correctamente los campos numéricos. ", type:'error'
          });
        }
      } else {
        this.$notify({
          title: "Error",
          text: "Se deben introducir todos los valores correctamente. ",type:'error'
        });
      }
    },
  },
  /*Función en el cuál se comprueba si hay un usuario logeado */ 
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.$router.push({ name: "home" });
        this.user = null;
      }
    });
  },
  firestore: {
    productos: db.collection("Productos"),
  },
};
</script>

<style scoped lang="scss">
@import "../scss/components/_admin.scss";
</style>