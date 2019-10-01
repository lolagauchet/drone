<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Device />
  </div>
</template>
<script>
import Device from "@/components/Device.vue";

export default {
  name: "login",
  components: {
    Device
  }
};
</script>