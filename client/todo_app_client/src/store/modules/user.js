import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const state = {
    user: null,
    token: null,
}
const getters = {
    USER: state=>{
        return state.user;
    },
    IS_AUTH: (state)=>{
        return !!state.user
    },

}

const mutations = {
    LOGIN_USER: (state, payload)=>{
        state.user = {
            username: payload.username,
            password: payload.password,
            id: payload.id
        }
        localStorage.setItem('user', JSON.stringify(payload));
       // localStorage.setItem('user', payload.config.data);
        //localStorage.setItem('token', state.tokens.access);
        state.token = 'Bearer ' + payload.token;
    },
    LOGOUT: (state, payload)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        location.reload()
    }
}

const actions = {
    GET_USER: async(context, payload)=>{
        console.log('get')
    },
    SAVE_USER: async(context, payload)=>{
        await axios.post('http://localhost:8000/users/register/', payload)
        .then((response)=>{
            if(response.status == 201){
                console.log(response)
                let userData = JSON.parse(response.config.data)
                let payloadData = {
                    username: userData.username,
                    password: userData.password,
                    id: response.data.id,
                    token: response.data.access
                };
                context.commit('LOGIN_USER', payloadData);
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    },
    LOGIN: async(context, payload)=>{
        await axios.post('http://localhost:8000/api/token/', payload)
        .then((response)=>{
            if(response.status==200){
                console.log(response)
                let userData = JSON.parse(response.config.data)
                let payloadData = {
                    username: userData.username,
                    password: userData.password,
                    id: response.data.id,
                    token: response.data.access
                };
                context.commit('LOGIN_USER', payloadData);
            }
        })
    },
    LOGOUT_USER: ({commit})=>{
        commit('LOGOUT');
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}