
<template>
  <div class="device">
  
    <p>{{ device }} </p>
  
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Device",

  data() {
    return {
       errors: [],
    };
  },

    computed: {
         ...mapGetters({
            device : 'device',
        }),
    },

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

