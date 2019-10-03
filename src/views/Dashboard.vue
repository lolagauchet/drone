<template>
  <div class="dashboard">
    <h1 class="is-size-4">Votre dashboard</h1>
    <Drone />
  </div>
</template>
<script>
import Drone from "@/components/Drone.vue";

export default {
  name: "login",
  components: {
    Drone
  }
};
</script>