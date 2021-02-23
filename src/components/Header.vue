<template>
  <header>
    <ul>
      <li>
        <router-link to="/"><a><img src="../Img/logo.png" alt="" width="50px" height="50px" /></a></router-link>
        
      </li>
      <li>
        <router-link v-if="!user" to="/login"
          ><a><i class="fa fa-user-circle"></i></a>
        </router-link>
        <div v-if="user">
          <router-link to="/admin" v-if="admin"
            ><a><i class="fa fa-user-secret" aria-hidden="true"></i></a
          >
          </router-link>
            <a v-if="!admin"><a id="cesta"><p>{{ totalProd }}/{{ totalPrecios }}€</p>
              <router-link to="/carrito" v-if="!admin"><i class="fa fa-shopping-basket"></i></router-link>
            </a></a>
          
          <router-link to="/"
            ><i @click="logout" class="fa fa-sign-out"></i
          ></router-link>
        </div>
      </li>
    </ul>
  </header>
</template>


<script>
import firebase from "firebase";
import { db } from "../db";

export default {
  name: "Heade",
  data() {
    return {
      user: null,
      admin: null,
      productos: [],
      carrito: [],
    };
  },
  props: {
    Inicio: {
      type: Boolean,
      default: false,
    },
  },
  /*Se cogen los valores desde la colecion del carrito y los productos. */
  firestore: {
    carrito: db.collection("Carrito"),
    productos: db.collection("Productos"),
  },
  computed: {
    /*Función que devuelve el total de los productos que hay dentro del carrito con el usuario asociado. */
    totalProd: function () {
    var total = 0;
      for(var i=0;i<this.carrito.length;i++){
        if(this.carrito[i].User==this.user.email){
          total+= this.carrito[i].Stock;
        }
      }
    return total;
    },
    /*Función que devuelve el total del precio de los productos que hay dentro del carrito con el usuario asociado. */
    totalPrecios: function () {
      var preciototal =0;
        for(var j=0;j<this.carrito.length;j++){
          if(this.carrito[j].User==this.user.email){  
            preciototal+= this.carrito[j].PrecioTotal;          
        }
      }
      return preciototal;
    }
  },
  methods: {
    cambiar: function () {
      this.Inicio = true;
    },
    /* Función para cerrar sesión del usuario. */
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$notify({
            title: "Cerrado de Sesión",
            text: "Has cerrado sesión. ",
            type: "error",
          });
        });
    },
  },
  /*Función en el cuál se comprueba si hay un usuario logeado y si existe se comprueba si es el admin o no.*/ 
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        if (user.email == "administrador@admin.com") {
          this.admin = user;
        }
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style scoped lang="scss"> 

@import "../scss/components/_header.scss";
</style>