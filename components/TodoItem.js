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

export default function TodoItem({ task, deleteTask, toggleCompleted, textColor }) {
  return (
    <View style={[styles.todoItem, { backgroundColor: textColor === '#FFFFFF' ? '#333' : '#f9f9f9' }]}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          accessibilityLabel={`Toggle ${task.completed ? 'unchecked' : 'checked'} for ${task.text}`}
          value={task.completed}
          onValueChange={() => toggleCompleted(task.id)}
          tintColors={{ true: '#4CAF50', false: '#ccc' }} // Green when checked
        />
      </View>
      <Text
        style={[styles.todoItemText, { color: textColor }, task.completed && styles.completed]}
        accessibilityLabel={task.text}
        accessibilityRole="text"
      >
        {task.text}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(task.id)}
        accessibilityLabel={`Delete ${task.text}`}
        accessibilityHint="Remove the task from the list"
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
