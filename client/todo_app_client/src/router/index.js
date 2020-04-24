import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import TasksList from '@/components/taskComponents/TasksList'
import taskCreateForm from '@/components/taskComponents/taskCreateForm'
import EditTaskForm from '@/components/taskComponents/EditTaskForm'
import UserRegisterForm from '@/components/user/UserRegisterForm'
import LoginUser from '@/components/user/LoginUser'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/tasksList',
      name: 'TasksList',
      component: TasksList,
      meta: {requiresAuth: true}
    },
    {
      path: '/createTask',
      name: 'taskCreateForm',
      component: taskCreateForm
    },
    {
      path: '/editTask/:id',
      name: 'editTaskForm',
      component: EditTaskForm,
      props: true
    },
    {
      path: '/userRegistrationForm',
      name: 'userRegisterForm',
      component: UserRegisterForm
    },
    {
      path:'/loginUser',
      name:'LoginUser',
      component: LoginUser
    },
  ]
})
//NavigationGuard
router.beforeEach((to, from, next)=>{
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth)){
    if(!loggedIn){
      next('/')
    }else {
      next()
    }
  } else{
    next()
  }
})

export default router