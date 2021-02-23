<template>
  <div>
    <Heade />

    <div id="registrar">
      <div id="registrar2">
        <div class="field">
          <label class="label">Nombre</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Nombre aqui..."
              v-model="name"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="Email aqui.."
              v-model="email"
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
          <div class="field">
            <label class="label">Repita la Contraseña</label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="Contraseña aqui.."
                v-model="password2"
              />
            </div>
            <button @click="register">Resgistrar</button>
          </div>
        </div>
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
  name: "Registrar",
  components: {
    Heade,
    Foote,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
    };
  },
  firestore: {},
  methods: {
    //Función que registra un usuario, y comprueba si las contraseñas y los campos están correctamente definidos, sino saltará una notificación.
    register: function () {
      if (this.password == this.password2) {
        if (this.name && this.email && this.password) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(() => {
              this.name = "";
              this.email = "";
              this.password = "";
              this.$router.push({ name: "home" });
              this.$notify({
                title: "Registro",
                text: "Te has registrado correctamente ",
                type: "success",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$notify({
            title: "Error",
            text: "Todos los campos son requeridos ",
            type: "error",
          });
        }
      } else {
        this.$notify({
          title: "Error",
          text: "La contraseña debe ser la misma en los dos campos ",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scope>
@import "../scss/components/_registrar.scss";

</style>