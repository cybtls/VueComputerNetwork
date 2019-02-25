import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/Home.vue'
import login from '../views/login.vue'
import error from '../views/404.vue'
import stuhome from '../views/student/stuhome.vue'
import adminhome from '../views/admin/adminhome.vue'
import teacherhome from '../views/teacher/teacherhome.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component:home,
    },
    {
      path:'/login',
      name:'login',
      component:login,
    },
    {
      path:'/stuhome',
      name:'stuhome',
      component:stuhome,
      children:[
        { path:'stuinfo', name:'学生个人信息', component:()=> import('../views/student/stuinfo.vue') },
        { path:'stuscore', name:'学生成绩', component:()=>import('../views/student/stuscore.vue') }
      ]
    },
    {
      path:'/adminhome',
      name:'adminhome',
      component:adminhome,
      children:[
        { path:'admininfo', component:()=> import('../views/admin/admininfo.vue') },
      ]
    },
    {
      path:'/teacherhome',
      name:'teacherhome',
      component:teacherhome,
      children:[
        { path:'teacherinfo', name:'管理员个人信息', component:()=> import('../views/teacher/teacherinfo.vue') },
      ]
    },
    {
      path:'*',
      name:'404',
      component:error
    }

  ]
})
