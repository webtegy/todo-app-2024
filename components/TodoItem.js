import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';

export default function TodoItem({ task, deleteTask, toggleCompleted, isDarkMode }) {
  return (
    <View style={[styles.todoItem, isDarkMode ? styles.darkTodoItem : styles.lightTodoItem]}>
      <CheckBox
        value={task.completed}
        onValueChange={() => toggleCompleted(task.id)}
        tintColors={{ true: isDarkMode ? '#7CFC00' : '#4CAF50', false: isDarkMode ? '#bbb' : '#ccc' }}
      />
      <View style={styles.taskTextContainer}>
        <Text style={[styles.todoItemText, task.completed && styles.completed, isDarkMode ? styles.darkText : styles.lightText]}>
          {task.title}
        </Text>
        <Text style={[styles.descriptionText, isDarkMode ? styles.darkText : styles.lightText]}>
          {task.description}
        </Text>
        <Text style={[styles.dateText, isDarkMode ? styles.darkText : styles.lightText]}>
          {task.date.toDateString()} {task.date.toLocaleTimeString()}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(task.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  lightTodoItem: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
  },
  darkTodoItem: {
    backgroundColor: '#555',
    borderColor: '#444',
  },
  taskTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  todoItemText: {
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#999',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#ddd',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
