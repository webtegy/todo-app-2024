import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Button, FlatList, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TodoItem from './TodoItem';

export default function TodoList({ isDarkMode, toggleTheme }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Doctor Appointment', description: 'Visit the doctor at 10 AM', date: new Date(), completed: true },
    { id: 2, title: 'Meeting at School', description: 'Meet the teacher at 2 PM', date: new Date(), completed: false },
    { id: 3, title: 'Grocery Shopping', description: 'Buy groceries', date: new Date(new Date().setDate(new Date().getDate() + 1)), completed: false }, // Task for tomorrow
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', date: new Date() });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filter, setFilter] = useState('all');  // Default view shows all tasks
  const [searchQuery, setSearchQuery] = useState('');

  // Add Task Function
  function addTask() {
    const task = { ...newTask, id: Date.now(), completed: false };
    setTasks([...tasks, task]);
    setModalVisible(false);
    setNewTask({ title: '', description: '', date: new Date() });
  }

  // Delete Task Function
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Toggle Task Completion Function
  function toggleCompleted(id) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

  // Filtered Tasks
  const filteredTasks = tasks.filter(task => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for comparison
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);

    const matchesSearchQuery = task.title.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === 'today') {
      return taskDate.getTime() === today.getTime() && matchesSearchQuery;
    } else if (filter === 'completed') {
      return task.completed && matchesSearchQuery;
    } else {
      return matchesSearchQuery; // For 'all' filter
    }
  });

  const containerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const textStyle = isDarkMode ? styles.darkText : styles.lightText;

  // Calculate today and completed task count
  const todayCount = tasks.filter(task => {
    const today = new Date();
    return task.date.toDateString() === today.toDateString();
  }).length;

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.counter} onPress={() => setFilter('today')}>
          <Text style={styles.counterText}>Today</Text>
          <Text style={styles.counterNumber}>{todayCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.counter} onPress={() => setFilter('completed')}>
          <Text style={styles.counterText}>Completed</Text>
          <Text style={styles.counterNumber}>{completedCount}</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.heading, textStyle]}>My TO DOs</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <TouchableOpacity style={styles.showAllButton} onPress={() => setFilter('all')}>
        <Text style={styles.showAllText}>Show All</Text>
      </TouchableOpacity>

      <View style={styles.todoListContainer}>
        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => (
            <TodoItem
              key={item.id}
              task={item}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
              isDarkMode={isDarkMode}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      {/* Add New Task Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add New Task</Text>
      </TouchableOpacity>

      {/* Modal for Adding a New Task */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalHeading}>Add New Task</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Title"
            value={newTask.title}
            onChangeText={text => setNewTask({ ...newTask, title: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Description"
            value={newTask.description}
            onChangeText={text => setNewTask({ ...newTask, description: text })}
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
            <Text style={styles.datePickerText}>Pick Date and Time</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={newTask.date}
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                setNewTask({ ...newTask, date: selectedDate || newTask.date });
              }}
            />
          )}

          <Button title="Add Task" onPress={addTask} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="#FF6347" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    paddingTop: 100,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  counter: {
    flex: 1, 
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginHorizontal: 5, 
  },
  counterText: {
    fontSize: 16,
  },
  counterNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#ddd',
  },
  todoListContainer: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  showAllButton: {
    alignItems: 'center',
    marginVertical: 10,
  },
  showAllText: {
    fontSize: 18,
    color: '#007BFF',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingBottom:30,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  datePickerButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  datePickerText: {
    color: '#333',
  },
});
