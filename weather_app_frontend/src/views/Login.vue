<template>
  <div>
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <div class="fadeIn first mt-2">
          <img src="/weather.ico" id="icon" alt="UserIcon" />
          <h3>Giriş Yap</h3>
        </div>

        <form @submit.prevent="login">
          <input
            v-model="user_data.username"
            type="text"
            class="fadeIn second"
            placeholder="Kullanıcı Adı"
            required
          />
          <input
            v-model="user_data.password"
            type="text"
            class="fadeIn third"
            placeholder="Şifre"
            required
          />
          <input type="submit" class="fadeIn fourth" value="Giriş Yap" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../service/Api';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      user_data: {
        username: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['set_user']),
    login() {
      console.log('store_user', this.user);
      Api.post('login', this.user_data)
        .then(response => {
          console.log(response);
          if (response.status && response.token) {
            this.set_user(response).then(() => {
              setTimeout(() => {
                this.$router.push({ name: 'home' });
              }, 500);
            });
          } else {
            alert('kullanıcı bilgileri hatalı');
          }
        })
        .catch(err => {
          alert(err);
        });
    },
  },
};
</script>

<style scoped src="../assets/login.css"></style>
