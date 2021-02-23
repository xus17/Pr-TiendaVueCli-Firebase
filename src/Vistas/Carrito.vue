<template>
    <div id="carro" v-if="user">
      <Heade />
      <div id="carroI">

        <h2 >Carrito de {{user.email}}</h2>
        <div v-for="carro in carrito" v-bind:key="carro.id">
                <div v-if="carro.User==user.email" class="carro">
                  
                  <div class="carrod1">
                    <img :src="carro.Imagen" alt="">
                    <p><strong>{{carro.Nombre}}</strong></p>
                    
                    
                    <p><strong>Cantidad:</strong> 
                       <input type="number"  min="1" :max="carro.StockTotal" v-bind:key="carro.id" :value="carro.Stock"  @click="cambiarestado(carro.id,$event.target.value)">/{{carro.StockTotal}}
                    <p><strong>Precio:</strong>{{carro.PrecioTotal}}</p>
                  </div>
                  <div class="car1">
                    <a @click="borrarArti(carro.id)"><i class="fa fa-trash" aria-hidden="true"></i></a>
                  </div>
                </div>
        </div>
        <h2>Total productos {{totalProd}}  que hacen un total de : {{productoss}} € </h2>
        <button @click="comprarProd()">Comprar</button>
      </div>
      <Foote />
    </div>
</template>

<script>
import firebase from 'firebase';
import {db} from "../db";
import Heade from '../components/Header';
import Foote from '../components/Footer';

export default {
  name: 'Carrito',
  components : {
    Heade,
    Foote
  },
  data (){
    return  {
      user : null,
      carrito : [],
      productos : []
    };
  },
  props: {
  },
  methods :{
    /*Función que actualiza del estado del carrito el stock y el precio total.*/
    cambiarestado : function(id,target){
      for(var i=0;i<this.carrito.length;i++){
        if(this.carrito[i].id==id){
          var numInput = parseInt(target);
          var precioTotal = this.carrito[i].Precio * numInput;
          db.collection("Carrito").doc(id).update({
            Stock : numInput,
            PrecioTotal : precioTotal
          });
        }
      }
    },
    /*Función que borra el articulo del carrito.*/ 
    borrarArti : function(id){
      db.collection("Carrito").doc(id).delete();
      this.$notify({title: 'Borrado',text: 'Has borrado el artículo correctamente ',type:'success'});
    },
    /*Función para comprar los artículos asociados al usuario, que se comprueba si no hay stock si existen los productos, y si lo hacen
    los elimina, y actualiza el stock de la lista de productos.*/ 
    comprarProd: function(){
      for(var i=0;i<this.carrito.length;i++){
        for(var j=0;j<this.productos.length;j++){
          if(this.productos[j].id==this.carrito[i].Idproducto){
            if(this.user.email==this.carrito[i].User){
              if(this.productos[j].Stock>0){            
                var stock = this.productos[j].Stock -this.carrito[i].Stock;
                this.productos[j].Stock=this.productos[j].Stock -stock;
                db.collection("Carrito").doc(this.carrito[i].id).delete(); 
                db.collection("Productos").doc(this.productos[j].id).update({Stock : stock});
                this.$notify({title: 'Comprado',text: 'Se ha comprado: '+this.productos[j].Nombre});
              }else{
                this.$notify({title: 'Error',text: 'No se ha podido comprar porque no hay stock suficiente. '});
              }

            }
          }
        }
      }
    }
  },
  computed:{
    /*Función que devuelve el total de los productos que hay dentro del carrito con el usuario asociado. */
    totalProd: function(){
      var total = 0;
      for(var i=0;i<this.carrito.length;i++){
        if(this.carrito[i].User==this.user.email){
          total+= this.carrito[i].Stock;
        }
      }
    return total;
    },
    /*Función que devuelve el total del precio de los productos que hay dentro del carrito con el usuario asociado. */
    productoss : function(){
      var preciototal =0;
        for(var j=0;j<this.carrito.length;j++){
          if(this.carrito[j].User==this.user.email){  
            preciototal+= this.carrito[j].PrecioTotal;          
        }
      }
      return preciototal;
    }
  },
  /*Función en el cuál se comprueba si hay un usuario logeado y si existe se comprueba si es el admin o no.*/ 
  created (){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
       this.user = user;
       if(user.email=="administrador@admin.com"){
         this.admin = user;
       }
      }else{
       this.user = null;
      }
    })
  },
  /*Se cogen los valores desde la colecion del carrito y los productos. */
  firestore: {
    carrito : db.collection("Carrito"),
    productos :db.collection("Productos")
  }
}

</script>

<style scoped lang="scss">
@import "../scss/components/_carrito.scss";
</style>