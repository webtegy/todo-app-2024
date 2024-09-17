import React, { useState } from "react";
import { View, Text,  TextInput, CheckBox, TouchableOpacity, StyleSheet } from 'react-native';

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
    marginLeft: 10, //Mano
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  
 // Style for the priority dot
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
   
   editButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
    
  input: {
    flex: 1,
    padding: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default function TodoItem({ task, deleteTask, toggleCompleted, editingTaskId, setEditingTaskId, updateTask, textColor }) {
  // Function to determine dot color based on priority
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
  const [newText, setNewText] = useState(task.text); // Hold edited text
  
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

      {/* Add the priority dot here */}
      <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
       {editingTaskId === task.id ? (
        // Show TextInput if editing
        <TextInput
          style={styles.input}
          value={newText}
          onChangeText={setNewText}
          onSubmitEditing={() => updateTask(task.id, newText)}
        />
      ) : (
      <Text
        style={[styles.todoItemText, { color: textColor }, task.completed && styles.completed]}
        accessibilityLabel={task.text}
        accessibilityRole="text"
      >

        {task.text}
      </Text>
      
      
      <TouchableOpacity
        style={styles.editButton}
        onPress={
          () =>
            editingTaskId === task.id
              ? updateTask(task.id, newText) // Save edited text
              : setEditingTaskId(task.id) // Enable edit mode
        }
      >
      <Text style={styles.deleteButtonText}>
          {editingTaskId === task.id ? "Save" : "Edit"}
        </Text>
      </TouchableOpacity>
      
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
