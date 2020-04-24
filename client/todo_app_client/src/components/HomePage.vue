<template>
    <div>
        <my-header></my-header>
        <h1>Welcome to this App. Django + Vue.js</h1>
        <div v-if="!IS_AUTH">
            To use this app you will need to
            <router-link to="/userRegistrationForm">
                Register
            </router-link>
            or
            <router-link to='/loginUser'>
                Login
            </router-link> 
        </div>
    </div>
</template>
<script>
import myHeader from './Header'
import {authComputed} from '../store/helper'
export default {
    name: 'homePage',
    data(){
        return{
            data:null
        }
    },
    components: {myHeader},
    computed:{
      ...authComputed
    }
}
</script>