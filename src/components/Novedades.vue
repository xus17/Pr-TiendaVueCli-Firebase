<template>
  <div id="principal" v-cloak>
    <h2>Novedades</h2>
    <div id="bloque">
      <div
        id="articulos"
        v-for="articulo in articulos"
        v-bind:key="articulo.id"
      >

        <p id="precio"><strong>Precio:</strong> {{ articulo.Precio }} €</p>

        <div>
          <p>
            <strong>{{ articulo.Nombre }}</strong>
          </p>
          <img :src="articulo.Imagen" alt="" />
        </div>

        <p><strong>Descripcion:</strong> {{ articulo.Descripcion }}</p>
        <p><strong>Stock:</strong> {{ articulo.Stock }}</p>

        <button
          v-if="user && articulo.Stock > 0"
          @click="
            addcarrito(
              articulo.id,
              articulo.Stock,
              articulo.Nombre,
              articulo.Precio,
              articulo.Imagen
            )
          "
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
import { db } from "../db";

export default {
  name: "Novedades",
  data() {
    return {
      user: null,
      admin: null,
      carrito : []
    };
  },
  props: {
    articulos: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  firestore:{
   carrito : db.collection("Carrito")
  },

  methods: {
  /*Función que añade un producto al carrito, o en su caso si ya existe un producto con el mismo user incrementa tanto su precioTotal como su stock */
  addcarrito: function (id, stock, nombre, precio, imagen) {
      if (stock > 0) {
        this.$notify({
          title: "Añadido",
          text: "Se ha añadido correctamente",
          type: "warn",
        });
        
        var add= true;
        for(var i=0;i<this.carrito.length;i++){
          if(this.carrito[i].Idproducto==id){
            if(this.carrito[i].User==this.user.email){
            db.collection("Carrito").doc(this.carrito[i].id).update({
            Stock: this.carrito[i].Stock+1,
            PrecioTotal: this.carrito[i].Precio * (this.carrito[i].Stock+1)
        });
            add=false;
            }
          }
        }
        if(add){
        db.collection("Carrito").add({
          User: this.user.email,
          Idproducto: id,
          Stock: 1,
          Precio: precio,
          Nombre: nombre,
          Imagen: imagen,
          StockTotal:stock,
                    PrecioTotal : precio

        });
      }}
    },
  },
  /*Función en el cuál se comprueba si hay un usuario logeado y si existe se comprueba si es el admin o no.*/ 
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        if (user.email == "administrador@admin.com") {
          this.admin = user;
          this.user = null;
        }
      } else {
        this.user = null;
      }
    });
  },
};
</script>
<style scoped lang="scss">
@import "../scss/components/_novedades.scss";

</style>