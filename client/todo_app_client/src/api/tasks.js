import {HTTP} from './common'

export const Task = {
    list(){
        return HTTP.get('/tasks/').then(response=>{
            return response.data
        })
    }
}