import axios from 'axios';
const state = {
        tasks: null,
    }
const getters = {
        TASKS: state=>{
            return state.tasks;
        },
        GET_TASK_DATA: (state)=>(id)=>{
            let task_index = state.tasks.findIndex(task=>task.id==id);
            return state.tasks[task_index];
        },
    }
const mutations=  {
        SET_TASK: (state, payload)=>{
            state.tasks = payload;
        },
        ADD_TASK: (state, payload)=>{
            state.tasks.push(payload);
        },
        EDIT_TASK: (state, payload)=>{
            let task_index = state.tasks.findIndex(task=>task.id==payload.id);
            state.tasks[task_index] = payload;
        }
    }
const actions = {
        GET_TASKS: async(context, payload)=>{
            let {data} = await axios.get('http://localhost:8000/tasks/tasks_view/', {headers:{'Authorization':context.rootState.user.token}})
            context.commit('SET_TASK', data)
        },
        SAVE_TASK: async (context, payload)=>{
            payload['user'] = context.rootState.user.user.id
            await axios.post('http://localhost:8000/tasks/tasks_view/', payload, {headers:{'Authorization':context.rootState.user.token}})
                .then((response)=>{
                    if (response.status == 201){
                        context.commit('ADD_TASK', response.data);
                        
                    }
                })            
                .catch((error)=>{
                    throw error.response.data;
                });

        },
        EDIT_TASK: async (context, payload)=>{
            await axios.patch('http://localhost:8000/tasks/tasks_view/'+payload.id+'/', payload, {headers:{'Authorization':context.rootState.user.token}})
            .then((response)=>{
                if (response.status == 200){
                    context.commit('EDIT_TASK', payload);
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        },
        DELETE_TASK: async(context, payload)=>{
            console.log(payload)
            await axios.delete("http://localhost:8000/tasks/tasks_view/" + payload+"/",  {headers:{'Authorization':context.rootState.user.token}})
            .catch((error)=>{
                console.log(error);
            })
        }
    }


export default{
    state,
    getters,
    mutations,
    actions,
}