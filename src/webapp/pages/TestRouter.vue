<template>
  <div>{{ serverData }}------{{serverData2}}</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  asyncData: ({ store }) => {
    return [store.dispatch("getServerData"), store.dispatch("getServerData2")];
  },
  computed: {
    ...mapState(["serverData", "serverData2"])
  },
  mounted() {}
};
</script>

<style></style>
