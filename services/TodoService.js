import Task from '../models/Todo'
import AyncStorageService from './AyncStorageService'

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
    }

}