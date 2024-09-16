import React, { useState, useMemo } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
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

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Doctor Appointment', completed: true },
    { id: 2, text: 'Meeting at School', completed: false },
  ]);
  const [text, setText] = useState('');
  const [highContrast, setHighContrast] = useState(false);

  // Get time-based background color
  const backgroundColor = useMemo(() => getTimeBasedBackgroundColor(highContrast), [highContrast]);

  // Function to Add Task
  function addTask() {
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
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
          textColor={textColor} // Pass the text color to the TodoItem component
        />
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
    </View>
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
