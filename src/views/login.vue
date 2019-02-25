<template>
  <div id="app" class="wrap-banner">
    <div >
        <!-- <logo class="control"></logo> -->
        <loginform class="control"></loginform>
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
import loginform from '../components/loginform.vue'
export default{
  data(){
    return{
    }
  },
  components:{
    logo,loginform
  }
}
</script>
 
<style lang="scss" scoped>
.control{
    height: 320px;
    position: absolute;
    left: 60%;
    top: 30%;
    border-radius: 2em;
}
#particles-js{
    // background-color: #000000;
    background-image: url('../assets/bk5.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
}
.sky{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;   //这个z-index 要是不设置 会对登录表单的点击产生干扰
}
.wrap-banner {
    display: flex;
}

</style>
 

