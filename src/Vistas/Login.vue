<template>
  <div>
    <Heade />

    <div id="login">
      <div id="login2">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="Email aqui.."
              v-model="email"
              v-cloak
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Contraseña</label>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="Contraseña aqui.."
              v-model="password"
            />
          </div>
        </div>
        <div id="botones">
          <button @click="login">Login</button>
          <button @click="logingoogle">
            <i class="fa fa-google" aria-hidden="true"></i>
          </button>
          <button @click="loginfacebook">
            <i class="fa fa-facebook-official" aria-hidden="true"></i>
          </button>
          <button @click="logingithub">
            <i class="fa fa-github" aria-hidden="true"></i>
          </button>
        </div>

        <router-link to="/registrar"><a>Registrate aquí</a></router-link>
      </div>
    </div>
    <Foote />
  </div>
</template>

<script>
import firebase from "firebase";
import Heade from "../components/Header";
import Foote from "../components/Footer";

export default {
  name: "Login",
  components: {
    Heade,
    Foote
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  firestore: {},
  methods: {
    login: function () {
      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$notify({
              title: "Inicio de Sesión",
              text: "Se ha iniciado sesión con email. ",
              type: "success",
            });
            this.$router.push({ name: "home" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Todos los campos son requeridos");
      }
    },
    logingoogle: function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$notify({
            title: "Inicio de Sesión",
            text: "Se ha iniciado sesión con google. ",
            type: "success",
          });
          this.$router.push({ name: "home" });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loginfacebook: function () {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$notify({
            title: "Inicio de Sesión",
            text: "Se ha iniciado sesión con Facebook. ",
            type: "success",
          });
          this.$router.push({ name: "home" });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    logingithub: function () {
      const provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$notify({
            title: "Inicio de Sesión",
            text: "Se ha iniciado sesión con Github. ",
            type: "success",
          });
          this.$router.push({ name: "home" });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scope >
@import "../scss/components/_login.scss";
</style>