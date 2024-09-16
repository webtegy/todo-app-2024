import React, { useState } from "react";
import {
  Animated,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import { format } from "date-fns";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    maxWidth: width - 30,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  todoItemText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    overflow: "hidden",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteButton: {
    backgroundColor: "#FF3B30", // Bright red for delete
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  dueDate: {
    fontSize: 14,
    color: "#FF6347", // Priority in red
    marginTop: 5,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
  },
  priorityText: {
    fontSize: 14,
    color: "#FF6347", // Priority in red
  },
  editButton: {
    backgroundColor: "#000000", // Black color for edit button
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
  },
});

export default function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  updateTask,
}) {
  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return format(date, "MMM dd, yyyy");
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const saveEdit = () => {
    updateTask(task.id, editedText);
    setIsEditing(false);
  };

  const formattedDueDate = format(new Date(task.dueDate), "MMM dd, yyyy");
  const isOverdue = new Date(task.dueDate) < new Date();

  return (
    <View style={styles.todoItem}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={task.completed}
            onValueChange={() => toggleCompleted(task.id)}
            tintColors={{ true: "#4CAF50", false: "#ccc" }}
          />
        </View>
        {isEditing ? (
          <TextInput
            style={styles.todoItemText}
            value={editedText}
            onChangeText={setEditedText}
            onSubmitEditing={saveEdit}
          />
        ) : (
          <Text
            style={[styles.todoItemText, task.completed && styles.completed]}
            numberOfLines={1} // Ensure text stays on one line
          >
            {task.text}
          </Text>
        )}
      </View>
      <View style={styles.priorityContainer}>
        {task.priority && (
          <Text
            style={styles.priorityText}
          >{`Priority: ${task.priority}`}</Text>
        )}
      </View>

      <Text style={styles.dueDate}>
        {isOverdue
          ? `Overdue: ${formattedDueDate}`
          : `Due: ${formattedDueDate}`}
      </Text>

      <View style={styles.actionButtonsContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={saveEdit}>
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
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
