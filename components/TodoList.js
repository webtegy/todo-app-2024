import React, { useState } from 'react';
import { View, TextInput,Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#f2f2f2',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      marginBottom:30
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      padding: 10,
      color: '#333',
    },
    addButton: {
      marginLeft: 10,
      backgroundColor: '#4CAF50',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  

export default function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const[editedTask, setEditedTask] = useState(null);

  // Function to Add Task
  const addTask =()=> {
    setTasks([...tasks, { id: Date.now().toString(), text:text, completed: false }]);
    setText('');
  }
  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Funtion to edit task
  const editTask = (item)=>{
    setEditedTask(item);
    setText(item.text);
  }

  // Funtion to save task after edit
  const saveTask = ()=>{
    const updatedTasks = tasks.map((item)=>{
      if(item.id === editedTask.id){
        return {...item,text:text};
      }
      return item;
    });
    setEditedTask(null);
    setText("");
    setTasks(updatedTasks);
  }

  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

  
  // Render TodoList Component
  return (
    <View style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="New Task"
        placeholderTextColor="#999"
      />

      {
        editedTask?
        ( <TouchableOpacity style={styles.addButton} onPress={()=>saveTask()}>
          <Text style={styles.addButtonText}>Save</Text>
          </TouchableOpacity>
        ):
        (
          <TouchableOpacity style={styles.addButton} onPress={()=>addTask()}>
          <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        )
      }
    </View>

    {tasks.map(task => (
      <TodoItem
        key={task.id}
        task={task}
        deleteTask={deleteTask}
        editTask = {editTask}
      />
      ))}
      
  </View>
  
  );
}