import React from 'react';
import { View, Text, CheckBox, TouchableOpacity, StyleSheet, Animated } from 'react-native';

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
<<<<<<< HEAD
=======
  
 // Style for the priority dot
>>>>>>> 31e522a250c365e6249d9e5d39ddecb994931c80
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  subtask: {
    fontSize: 12,
    color: '#666',
  },
  dueDate: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  }
});

<<<<<<< HEAD
export default function TodoItem({ task, deleteTask, toggleCompleted }) {
  const [fadeAnim] = React.useState(new Animated.Value(0)); // Initial opacity 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Animate to opacity 1
      duration: 500, // Duration 500ms
      useNativeDriver: true,
    }).start();
  }, []);

=======
export default function TodoItem({ task, deleteTask, toggleCompleted, textColor }) {
  // Function to determine dot color based on priority
>>>>>>> 31e522a250c365e6249d9e5d39ddecb994931c80
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#FF6347';
      case 'Medium': return '#FFA500';
      case 'Low': return '#4CAF50';
      default: return '#ccc';
    }
  };
  return (
<<<<<<< HEAD
    <Animated.View style={[styles.todoItem, { opacity: fadeAnim }]}>
=======
    <View style={[styles.todoItem, { backgroundColor: textColor === '#FFFFFF' ? '#333' : '#f9f9f9' }]}>
>>>>>>> 31e522a250c365e6249d9e5d39ddecb994931c80
      <View style={styles.checkboxContainer}>
        <CheckBox
          accessibilityLabel={`Toggle ${task.completed ? 'unchecked' : 'checked'} for ${task.text}`}
          value={task.completed}
          onValueChange={() => toggleCompleted(task.id)}
          tintColors={{ true: '#4CAF50', false: '#ccc' }}
        />
      </View>
<<<<<<< HEAD
      <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.todoItemText, task.completed && styles.completed]}>{task.text}</Text>
        {task.dueDate && <Text style={styles.dueDate}>Due: {task.dueDate}</Text>}
        {task.subtasks && task.subtasks.map((subtask, index) => (
          <Text key={index} style={styles.subtask}>- {subtask}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(task.id)}>
=======

      {/* Add the priority dot here */}
      <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
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
>>>>>>> 31e522a250c365e6249d9e5d39ddecb994931c80
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
