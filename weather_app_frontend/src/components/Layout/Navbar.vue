<template>
  <nav
    class="navbar navbar-expand-md navbar-fixed-top navbar-dark main-nav"
    style="background-color: #2596be"
  >
    <div class="container">
      <div class="navbar-collapse nav-content">
        <span><i class="bi bi-person"></i> {{ username }}</span>
      </div>
      <ul class="nav navbar-nav text-nowrap flex-row mx-md-auto">
        <a class="navbar-brand m-0" @click="home" style="cursor: pointer">
          <img
            src="/favicon.ico"
            style="height: 50px; width: 50px"
            class="navbar-brand-img"
          />
          <span class="fw-bolder" style="color: black">
            {{ ' ' + title + ' ' }}
          </span>
          <img
            src="/django.ico"
            style="height: 50px; width: 50px"
            class="navbar-brand-img"
          />
        </a>
      </ul>
      <div class="ml-auto navbar-collapse justify-content-end">
        <ul class="ml-auto nav navbar-nav">
          <li class="nav-item">
            <a class="btn btn-danger" @click="logout">Çıkış Yap</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Navbar',

  data() {
    return {
      username: '',
      title: 'Barikat Weather App',
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['clear_user']),
    home() {
      this.$router.push({ name: 'home' });
    },
    logout() {
      this.clear_user({});
      this.$router.push({ name: 'login' });
    },
  },
  mounted() {
    this.username = this.user.username;
  },
};
</script>
