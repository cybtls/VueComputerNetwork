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
      //首页
      path: '/',
      name: 'home',
      component:home,
    },
    {
      //登录
      path:'/login',
      name:'login',
      component:login,
    },
    {
      //学生首页
      path:'/stuhome',
      name:'stuhome',
      component:stuhome,
      children:[
        { path:'stuinfo', name:'stuinfo', component:()=> import('../views/student/stuinfo.vue') },
        { path:'stuscore', name:'stuscore', component:()=>import('../views/student/stuscore.vue') },
        { path:'study', name:'study', component:()=>import('../views/student/study.vue') },
        { path:'sturesources', name:'sturesources', component:()=>import('../views/student/sturesources.vue') },
        { path:'problem', name:'problem', component:()=>import('../views/student/problem.vue') }
      ]
    },
    {
      //管理员首页
      path:'/adminhome',
      name:'adminhome',
      component:adminhome,
      children:[
        { path:'admininfo', name:'admininfo', component:()=> import('../views/admin/admininfo.vue') },
        { path:'adminresources', name:'adminresources', component:()=> import('../views/admin/adminresources.vue') },
        { path:'allstuinfo', name:'allstuinfo', component:()=> import('../views/admin/allstuinfo.vue') },
        { path:'allteacherinfo', name:'allteacherinfo', component:()=> import('../views/admin/allteacherinfo.vue') },
        { path:'classinfo', name:'classinfo', component:()=> import('../views/admin/classinfo.vue') },
      ]
    },
    {
      //教师首页
      path:'/teacherhome',
      name:'teacherhome',
      component:teacherhome,
      children:[
        { path:'teacherinfo', name:'teacherinfo', component:()=> import('../views/teacher/teacherinfo.vue') },
        { path:'recordscore', name:'recordscore', component:()=> import('../views/teacher/recordscore.vue') },
        { path:'answer', name:'answer', component:()=> import('../views/teacher/answer.vue') },
        { path:'myclass', name:'myclass', component:()=> import('../views/teacher/myclass.vue') },
        { path:'teacherresources', name:'teacherresources', component:()=> import('../views/teacher/teacherresources.vue') },
      ]
    },
    {
      path:'*',
      name:'404',
      component:error
    }
  ]
})
