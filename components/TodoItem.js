import React from 'react';
import { View, Text, CheckBox, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  todoItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
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
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  dueDateText: {
    fontSize: 12,
    color: '#666',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
});

export default function TodoItem({ task, deleteTask, toggleCompleted }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#FF6347'; // Red
      case 'Medium':
        return '#FFA500'; // Orange
      case 'Low':
        return '#4CAF50'; // Green
      default:
        return '#ccc'; // Default grey
    }
  };

  return (
    <View style={styles.todoItem}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={task.completed}
          onValueChange={() => toggleCompleted(task.id)}
          tintColors={{ true: '#4CAF50', false: '#ccc' }} // Green when checked
        />
      </View>
      <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
      <Text style={[styles.todoItemText, task.completed && styles.completed]}>
        {task.text}
      </Text>
      {task.dueDate && <Text style={styles.dueDateText}>{task.dueDate}</Text>}
      {task.category && <Text style={styles.categoryText}>{task.category}</Text>}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(task.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
