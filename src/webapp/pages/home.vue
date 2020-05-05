<template>
  <div>
    <div class="example">{{ msg }}</div>
    <HelloWorld msg="这是传递的msg" />
    <div>
      <router-link to="/router1">router1</router-link>
      <router-link to="/router2">router2</router-link>
      <router-view></router-view>
    </div>

    <h1>Vuex state: {{ count }}</h1>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>
<script>
import HelloWorld from "@component/Helloworld.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: "Hello world!"
    };
  },
  computed: {
    ...mapState(["count"])
  },
  methods: {
    ...mapActions(["increment", "decrement"])
  }
};
</script>

<style lang="less" scoped>
@green: #5fbc0e;
.example {
  color: @green;
}
.border-radius (@radius) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}
.test {
  width: 100px;
  height: 100px;
  background: @green;
  .border-radius(50px);
}
</style>
