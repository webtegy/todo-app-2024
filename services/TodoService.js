import Task from '../models/Todo'

export default {

    createNewTask : (title, description, priority , category) => {
        if(title == '' || description == '' || priority == '' || category == ''){
            return 'All fields are required';
        }
        const newTask = new Task(title, description, priority, category)
        // save it to  the async storage
        return newTask
    }


}