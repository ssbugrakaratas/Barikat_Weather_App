<template>
  <div id="app">
    <div class="row">
      <Navbar></Navbar>
    </div>
    <div id="content_body" class="container"><router-view /></div>
    <div class="row">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Login from './views/Login.vue';
import Navbar from './components/Layout/Navbar.vue';
import Footer from './components/Layout/Footer.vue';

export default {
  name: 'App',
  components: {
    Login,
    Navbar,
    Footer,
  },
};
</script>

<style scoped>
#content_body {
  min-height: 82vh;
}
</style>
