<template>
  <InfoComponent />
</template>

<script>
// @ is an alias to /src
import InfoComponent from "@/components/InfoComponent.vue";
import request from "@/utils/request";

export default {
  name: "Info",
  components: {
    InfoComponent
  },
};
</script>
