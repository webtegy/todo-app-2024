import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  inputContainer: {
    marginVertical: 10,
  },
  textInput: {
    fontSize: 16,
    padding: 10,
    color: '#333',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Doctor Appointment', completed: false },
    { id: 2, text: 'Meeting at School', completed: false },
    { id: 3, text: 'Buy Groceries', completed: true },
    { id: 4, text: 'Gym Workout', completed: false },
    { id: 5, text: 'Complete React Native Assignment', completed: false },
    { id: 6, text: 'Read New Book Chapter', completed: false },
    { id: 7, text: 'Clean the House', completed: false },
    { id: 8, text: 'Reply to Emails', completed: true },
  ]);
  
  const [text, setText] = useState('');

  // Function to Add Task
  function addTask() {
    if (!text.trim()) return; // Prevent empty task from being added
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText('');
  }

  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

  return (
    <ScrollView style={styles.container}>
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}

      {/* Input Section for New Task */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
