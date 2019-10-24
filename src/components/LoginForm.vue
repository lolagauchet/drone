<template>
  <div class="loginform">
    <form
      id="login_form"
      method="post"
      @submit.prevent="login"
      action="/home"
    >

  <p>
  <p>
    <label for="deviceId">deviceId</label>
    <input
     v-model="deviceId"  
      id="deviceId"
      type="text" 
      class="input is-info" 
    >
  </p>
  
  <p>
    <label for="apiKey">apiKey </label>
    <input
     v-model="apiKey"  
      id="apiKey"
      type="text"
      class="input is-info" 
    >
  </p>

  <p>
    <input
      type="submit"
      value="Se connecter"
      class="button is-primary"
    >
  </p>

</form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "LoginForm",

  data() {
    return {
       errors: [],
    };
  },

  computed: {
    deviceId: {
      get() {
        return this.$store.state.loginForm.deviceId;
      },
      set(value) {
        this.$store.commit('setValue', {
          key: 'deviceId',
          value,
        });
      },
    },
    apiKey: {
      get() {
        return this.$store.state.loginForm.apiKey;
      },
      set(value) {
        this.$store.commit('setValue', {
          key: 'apiKey',
          value,
        });
      },
    },
  },

  methods: {
    ...mapActions({
      checkForm : 'checkForm',
    }),

    login(){
      this.$store.dispatch('checkForm').then(
        response => {
          this.$router.push("dashboard");
          this.$store.dispatch('mqqtSocket');
        }
      )
    }
  }

};
</script>

<style lang="scss"> 
  #login_form {
  max-width: 30%;
  margin: auto;
  }
  input{
    margin-bottom: 20px;
  }
</style>

