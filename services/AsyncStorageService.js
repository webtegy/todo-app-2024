import AsyncStorage from '@react-native-async-storage/async-storage';

export default {

    saveNewTask: async function(newTask) {
        const tasks = await this.loadTasks();
        tasks.push(newTask);
        await AsyncStorage.setItem('taskList', JSON.stringify(tasks));
        
    },

    loadTasks: async function () {
        const tasks = await AsyncStorage.getItem('taskList');
        if (tasks) {
            return JSON.parse(tasks);
        }
        return [];
    },

    resetTasks: async function(){
        await AsyncStorage.removeItem('taskList');
    }

}
