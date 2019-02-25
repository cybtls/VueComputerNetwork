<template>
  <div id="app" class="wrap-banner">
    <div >
        <logo class="control"></logo>
    </div>
    <vue-particles
      class="sky"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
  </div>
</template>

<script>
import logo from '../components/logo.vue'
export default{
  data(){
    return{
    }
  },
  components:{
    logo
  }
}
</script>
 
<style lang="scss" scoped>
.control{
    position: fixed;
    left: 40%;
    top: 40%;
}
#particles-js{
    background-color: #000000;
}
.sky{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;   //这个z-index 要是不设置 会对登录表单的点击产生干扰，会去抢风头，不好好做一个安静的背景。   
}
.wrap-banner {
    display: flex;
}

</style>
 

