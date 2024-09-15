import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

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
    editButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginLeft: 10,
    },
    editButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingVertical: 5,
      flex: 1,
      marginRight: 10,
    },
    priority: {
      marginRight: 10,
      fontSize: 14,
      color: '#FF6347',
    },
    dueDate: {
      fontSize: 12,
      color: '#888',
    },
  });
  

export default function TodoItem({ task, deleteTask, toggleCompleted,editTask}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newPriority, setNewPriority] = useState(task.priority || 'Medium');
  const [newDueDate, setNewDueDate] = useState(task.dueDate || '');

  const handleSave = () => {
    editTask(task.id, newText, newPriority, newDueDate);
    setIsEditing(false);
  };
    return ( 
        <View style={styles.todoItem}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={task.completed}
            onValueChange={() => toggleCompleted(task.id)}
            tintColors={{ true: '#4CAF50', false: '#ccc' }} // Green when checked
          />
        </View>
        {isEditing ? (
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            value={newText}
            onChangeText={setNewText}
            placeholder="Task description"
          />
          <TextInput
            style={styles.input}
            value={newPriority}
            onChangeText={setNewPriority}
            placeholder="Priority (e.g., High, Medium, Low)"
          />
          <TextInput
            style={styles.input}
            value={newDueDate}
            onChangeText={setNewDueDate}
            placeholder="Due Date (e.g., 2024-09-30)"
          />
          <TouchableOpacity style={styles.editButton} onPress={handleSave}>
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
        <Text style={[styles.todoItemText, task.completed && styles.completed]}>
          {task.text}
        </Text>
        <Text style={styles.priority}>Priority: {task.priority || 'Medium'}</Text>
          {task.dueDate ? <Text style={styles.dueDate}>Due: {task.dueDate}</Text> : null}
        </View>
      )}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(task.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }