<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
import React, { useState, useMemo, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
>>>>>>> 31e522a250c365e6249d9e5d39ddecb994931c80
import TodoItem from './TodoItem';

const getTimeBasedBackgroundColor = (highContrast) => {
  if (highContrast) {
    return '#191919'; // High contrast background color (black)
  }

  const hour = new Date().getHours();

  if (hour >= 5 && hour < 8) {
    return '#FFF4E0'; // Soft sunrise color
  } else if (hour >= 8 && hour < 11) {
    return '#E6F3FF'; // Soft blue morning sky
  } else if (hour >= 11 && hour < 15) {
    return '#E8F5E9'; // Light refreshing green
  } else if (hour >= 15 && hour < 18) {
    return '#FFF3E0'; // Warm afternoon glow
  } else if (hour >= 18 && hour < 21) {
    return '#E8EAF6'; // Calming twilight blue
  } else {
    return '#ECEFF1'; // Cool, restful night tones
  }
};



  // Function to Add Task
export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
    const [highContrast, setHighContrast] = useState(false);
  // Get time-based background color
  const backgroundColor = useMemo(() => getTimeBasedBackgroundColor(highContrast), [highContrast]);
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Failed to load tasks', error);
      }
    }
    loadTasks();
  }, []);

  useEffect(() => {
    async function saveTasks() {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks', error);
      }
    }
    if (tasks.length > 0) saveTasks();
  }, [tasks]);

  function addTask() {
    if (!text.trim()) return;
    const newTask = { id: Date.now(), text, completed: false, priority, dueDate, subtasks };
    setTasks([...tasks, newTask]);
    setText('');
    setPriority('Medium');
    setDueDate('');
    setSubtasks([]);
  }

<<<<<<< HEAD
=======

  // Function to delete task
>>>>>>> 31e522a250c365e6249d9e5d39ddecb994931c80
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

<<<<<<< HEAD
=======

  // Function to toggle task completion
>>>>>>> 31e522a250c365e6249d9e5d39ddecb994931c80
  function toggleCompleted(id) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

<<<<<<< HEAD
=======

   // Function to cycle through priorities
>>>>>>> 31e522a250c365e6249d9e5d39ddecb994931c80
  function cyclePriority() {
    const nextPriority = priority === 'High' ? 'Medium' : priority === 'Medium' ? 'Low' : 'High';
    setPriority(nextPriority);
  }
<<<<<<< HEAD

  return (
    <ScrollView style={styles.container}>
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} deleteTask={deleteTask} toggleCompleted={toggleCompleted} />
=======
  
  
  // Sort tasks by priority ("High" > "Medium" > "Low")
  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  
  // Set text color based on high contrast mode
  const textColor = highContrast ? '#FFFFFF' : '#333333'; // White for dark theme, dark gray for light theme

  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header Row with Title and Toggle */}
      <View style={styles.headerContainer}>
        <Text
          style={[styles.accessibilityLabel, { color: textColor }]}
          accessibilityRole="header"
          accessibilityLabel="To-Do List App"
        >
          To-Do List App
        </Text>
        <View style={styles.switchContainer}>
          <Text
            style={[styles.darkThemeLabel, { color: textColor }]}
            accessibilityLabel="Dark theme toggle"
          >
            Dark theme
          </Text>
          <Switch
            accessibilityLabel="Toggle high contrast mode"
            accessibilityHint="Switch between dark and light theme"
            value={highContrast}
            onValueChange={setHighContrast}
          />
        </View>
      </View>

      {/* Task List */}
     {sortedTasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}

          textColor={textColor} // Pass the text color to the TodoItem component
        />
>>>>>>> 31e522a250c365e6249d9e5d39ddecb994931c80
      ))}

      {/* Input Field for New Task */}
      <View style={styles.inputContainer}>
        <TextInput
          accessibilityLabel="Task input field"
          accessibilityHint="Enter a new task here"
          style={[styles.textInput, { color: textColor }]} // Text color for input field
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor={highContrast ? '#AAAAAA' : '#999'} // Adjust placeholder color for dark theme
        />
         <TouchableOpacity style={styles.priorityButton} onPress={cyclePriority}>
          <Text style={styles.priorityButtonText}>{priority}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Add task"
          accessibilityHint="Add the new task to the list"
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Aligns title and toggle on the same line
    marginBottom: 20,
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
  },
  priorityButton: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  priorityButtonText: {
    color: '#fff',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  darkThemeLabel: {
    marginRight: 10, // Adds space between the label and the switch
  },
  accessibilityLabel: {
    fontSize: 20,
  },
});

