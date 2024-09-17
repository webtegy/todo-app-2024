import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoItemText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
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

export default function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  editingTaskId,
  setEditingTaskId,
  updateTask,
}) {
  const [newText, setNewText] = useState(task.text); // Hold edited text

  return (
    <View style={styles.todoItem}>
      {editingTaskId === task.id ? (
        // Show TextInput if editing
        <TextInput
          style={styles.input}
          value={newText}
          onChangeText={setNewText}
          onSubmitEditing={() => updateTask(task.id, newText)}
        />
      ) : (
        <Text style={[styles.todoItemText, task.completed && styles.completed]}>
          {task.text}
        </Text>
      )}

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
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
