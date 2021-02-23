<!--En este template hemos creado un footer en el que se engloba un div con los tres enlaces a las páginas alternativas, y el copyright de la página -->
<template>
  <footer>
    <div>
        <a href="https://www.youtube.com/watch?v=JFeC3n88d4g&ab_channel=TvAgro" target="_blank"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
        <a href="https://github.com/xus17" target="_blank"><i class="fa fa-github-square" aria-hidden="true"></i></a>
        <a href="https://verdecora.es/" target="_blank"><i class="fa fa-google" aria-hidden="true"></i></a>
    </div>
    <p>© 2021 Jesús Manuel González Santiago</p>
  </footer>
</template>


<script>

export default {
  name: 'Foote'
}
</script>

<style scoped lang="scss">
  @import "../scss/components/_footer.scss";
</style>