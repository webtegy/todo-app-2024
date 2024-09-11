import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet, Platform } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TodoItem from './TodoItem';

export default function TodoList() {
  // State Hook for inputWidth
  const [inputWidth, setInputWidth] = useState(0);
  const [searchWidth, setSearchWidth] = useState(0);

  // useEffect to handle Platform checks and side-effects
  useEffect(() => {
    if (Platform.OS === 'web') {
      setInputWidth(750);
      setSearchWidth(570);
    } else {
      setInputWidth('100%'); // or any default value
      setSearchWidth();
    }
  }, []);
  // State Hooks
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Doctor Appointment', completed: true },
    { id: 2, text: 'Meeting at School', completed: false },
  ]);
  const [text, setText] = useState('');

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

  // Render TodoList Component
  return (
    <View style={styles.container}>
      <Text style={styles.head}>ToDoList</Text>
      <View style={styles.searchBar}>
        <TextInput placeholder="Search" style={[styles.search,{minWidth:searchWidth}]} />
        <View style={styles.icon}>
          <FontAwesome name={"search"} size={24} color="#a2a2a2" />
        </View>
      </View>
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
      <View style={[styles.inputContainer, { minWidth:inputWidth }]}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor="#999"
        />
        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 4,
    elevation: 2,
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
  head: {
    fontSize: 45,
    marginTop: 35,
    marginBottom: 35,
  },
  searchBar: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#e1e1e1',
    borderRadius: 35,
    height: 45,
    padding: 5,
    marginBottom: 30,
  },
  search: {
    flex: 1,
    height: 35,
    borderRadius: 35,
    paddingLeft: 15,
    outlineStyle: 'none',
  },
  icon: {
    height: 35,
    alignContent: 'center',
    transform: [{ translateY: 4 }],
    paddingRight: 10,
  }
});
