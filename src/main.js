// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import VueParticles from 'vue-particles'



Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.config.productionTip = false




// router.beforeEach((to, from, next) => {
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');
//   }
//   //获取当前用户身份
//   let role = sessionStorage.getItem('role')
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   //所包括的子路由
//   const student = ['login','stuhome','stuinfo','stuscore','study','problem','sturesources'];
//   const teacher = ['login','teacherhome','teacherinfo','myclass','answer','recordscore','teacherresources'];
//   const admin = ['login','adminhome','admininfo','allstuinfo','allteacher','classinfo','adminresources'];

//   if (!user && to.path != '/login' ) {
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


// if(role != 'teacher' && teacher.indexOf(to.name) >= 0){
//   // next();
//   alert("访问不合法")
//   // next({ path: '/login' })
//   router.go(-1);
// }else{
//   next()
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
