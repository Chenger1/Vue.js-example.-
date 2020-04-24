// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  created(){
      const userString =JSON.parse(localStorage.getItem('user'));
      if (userString){
        this.$store.commit('LOGIN_USER', {
          username: userString.username,
          password: userString.password,
          id: userString.id,
          token: userString.token
        });
      }
  },
  components: { App },
  template: '<App/>'
})
