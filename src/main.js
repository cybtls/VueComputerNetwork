// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import VueParticles from 'vue-particles'

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'videojs-flash'

Vue.use(VueVideoPlayer)

Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.config.productionTip = false



// 实现sessionStorage的监听
Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'user') {
      var newStorageEvent = document.createEvent('StorageEvent');
      const storage = {
          setItem: function (k, val) {
              sessionStorage.setItem(k, val);
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
              window.dispatchEvent(newStorageEvent)
          }
      }
      return storage.setItem(key, newVal);
  }
}


// router.beforeEach((to, from, next) => {
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');
//   }
//   //获取当前用户身份
//   let role = sessionStorage.getItem('role')
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   //所包括的子路由
//   const tourist = ['login','home','register']
//   const student = ['login','stuhome','stuinfo','stuscore','study','problem','sturesources'];
//   const teacher = ['login','teacherhome','teacherinfo','myclass','answer','recordscore','teacherresources','teachervideo'];
//   const admin = ['login','adminhome','admininfo','allstuinfo','allteacher','classinfo','adminresources','adminvideo'];

//   if (!user && tourist.indexOf(to.name) < 0 ) {
//     //未登录状态
//     alert("请先登录")
//     next({ path: '/login' })
//   } else {
//     //判断身份
//     if(role == 'stu' && student.indexOf(to.name) < 0){
//       alert("访问不合法");
//       // next({ path: '/login' });
//       router.go(-1);
//     }else{
//       if(role == 'teacher' && teacher.indexOf(to.name) < 0){
//         alert("访问不合法");
//         // next({ path: '/login' });
//         router.go(-1);
//       }else{
//         if(role == 'admin' && admin.indexOf(to.name) < 0){
//           alert("访问不合法");
//           // next({ path: '/login' });
//           router.go(-1);
//         }else{
//           next();
//         }
//       }
//     }
//   }
// })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
