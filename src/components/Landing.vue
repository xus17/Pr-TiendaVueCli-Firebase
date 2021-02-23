<template>
     <div class="jumbotron jumbotron-fluid" style="background-repeat:no-repeat">

        <img src="../Img/logo.png" width="250px" height="250px" alt="">
     </div>
 
</template>

<script>
export default {
    name: 'Landing',
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/abstract/_mixins.scss";
    .jumbotron{
    background-image:  url("https://fedoraproject.org/w/uploads/b/bd/Cactus_2560x1440_96dpi.jpg");
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    height: 99vh;
    margin: 0;
    border-radius: 0;
    @include flex-center();
    align-items: center;
  }
</style>