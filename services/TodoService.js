import Task from '../models/Todo'
import AyncStorageService from './AsyncStorageService'
import { isSameDay } from 'date-fns';

export default {

    createNewTask : async (title, description, priority , category , date) => {
        
        if(title == '' || description == '' || priority == '' || category == '' || date == null){
            return {
                success: false,
                message: 'All fields are required'
            }
        }
        
        const newTask = new Task(title, description, priority, category , date)
        
        await AyncStorageService.saveNewTask(newTask)
        
        return {
            success: true,
            message: newTask
        }
    },

    getTodosByDate : (date , tasks) => {
        const filteredTodos = tasks.filter(task => 
            isSameDay(new Date(task.date), date)
        );

        return filteredTodos

    }

}