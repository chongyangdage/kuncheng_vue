<template>
  <div>
    <div class="buttonToHomeWrap">
      <a href="javascript:void(0)" @click="toHome()" id="buttonToHome"
        >进入系统</a
      >
    </div>
    <iframe
      id="iframeId"
      allow="fullscreen"
      style="width: 100%; height: 100vh"
      :src="url"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "http://localhost:8081/indexTj.html",
      fullscreen: false,
    };
  },
  created() {
    this.dianji();
  },
  methods: {
    toHome() {
      this.$router.push("/home");
    },
    dianji() {},
  },
};
</script>

<style>
.buttonToHomeWrap {
  position: absolute;
  right: 10px;
  top: 40px;
  line-height: 50px;
}
a {
  text-decoration: none;

  transform: translate(-50%, -50%);
  font-size: 15px;
  line-height: 50px;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f3);
  background-size: 400%;
  width: 100px;
  height: 50px;
  color: #ffffff;
  display: block;
  text-align: center;
  border-radius: 10px;
  z-index: 1;
  font-weight: bold;
}
a::before {
  content: "";
  position: absolute;
  left: -5px;
  right: -5px;
  top: -5px;
  bottom: -5px;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f3);
  background-size: 400%;
  border-radius: 50px;
  filter: blur(20px);
  z-index: -1;
}
a:hover::before {
  animation: sun 8s infinite;
}

a:hover {
  animation: sun 8s infinite;
}
@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}
</style>