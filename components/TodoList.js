import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Remove AsyncStorage here
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
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
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    color: '#333',
  },
  priorityButton: {
    marginLeft: 10,
    backgroundColor: '#ff9800',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  priorityButtonText: {
    color: '#fff',
    fontSize: 16,
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
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    async function loadTasks() {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks', error);
      }
    }
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever tasks state changes
  useEffect(() => {
    async function saveTasks() {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks', error);
      }
    }
    if (tasks.length > 0) {
      saveTasks();
    }
  }, [tasks]);

  // Function to add task
  function addTask() {
    if (!text.trim()) return;
    const newTask = { id: Date.now(), text, completed: false, priority };
    setTasks([...tasks, newTask]);
    setText('');
    setPriority('Medium');
  }

  // Function to delete task
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Function to toggle task completion
  function toggleCompleted(id) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

  // Function to cycle through priorities
  function cyclePriority() {
    const nextPriority = priority === 'High' ? 'Medium' : priority === 'Medium' ? 'Low' : 'High';
    setPriority(nextPriority);
  }

  // Sort tasks by priority ("High" > "Medium" > "Low")
  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <View style={styles.container}>
      {sortedTasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.priorityButton} onPress={cyclePriority}>
          <Text style={styles.priorityButtonText}>{priority}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
