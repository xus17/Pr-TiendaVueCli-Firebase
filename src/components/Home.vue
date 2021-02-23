<template>
  <div id="home">
    <div v-if="productos">
      <Heade />
      <Landing />
      <Novedades :articulos="articulos" v-if="!Inicio" />
      <Productos :productos="productos" v-if="!Inicio" />
      <Foote v-if="!Inicio" />
    </div>
  </div>
</template>


<script>
import Heade from "./Header";
import Landing from "./Landing";
import Novedades from "./Novedades";
import Productos from "./Productos";
import Foote from "./Footer";
import { db } from "../db";

export default {
  name: "Home",

  components: {
    Heade,
    Novedades,
    Productos,
    Foote,
    Landing
  },

  data() {
    return {
      productos: [],
      articulos: [],
      Inicio: false,
      user: null,
    };
  },

  firestore: {
    productos: db.collection("Productos"),
    articulos: db.collection("Productos").where("Novedad", "==", true),
  },
  computed: {},
  methods: {
  },
};
</script>

<style scoped lang="scss">
</style>