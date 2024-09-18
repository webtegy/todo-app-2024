import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { format } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    maxWidth: width - 30,
  },
  checkboxContainer: {
    marginRight: 10,
    marginTop: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  todoItemText: {
    fontSize: 19,
    fontWeight: "700",
    color: "#333",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  priorityContainer: {
    flexDirection: "column",
    // alignItems: "center",
    marginLeft: -50,
    marginTop: 40,
  },
  priorityText: {
    fontSize: 14,
    color: "#007BFF",
  },
  dueDate: {
    fontSize: 14,
    color: "#007BFF",
    marginTop: 5,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginRight: -4,
  },
  orderButtonsContainer: {
    marginRight: -15,
    flexDirection: "column",
    alignItems: "center",
  },
  orderButton: {
    backgroundColor: "transparent", // No background color
    padding: 8,
    marginBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  orderIcon: {
    color: "#007BFF", // Blue color
    fontSize: 24,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 2,
  },
  editButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    padding: 5,
  },
  priorityButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  priorityButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    padding: 8,
    borderRadius: 7,
    margin: 10,
    width: 70,
    marginLeft: 50,
    backgroundColor: "#007BFF",
    alignItems: "center",
  },
  cancelButton: {
    padding: 8,
    borderRadius: 7,
    margin: 10,
    width: 70,
    marginRight: 50,
    backgroundColor: "#ff362b",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  updateTask,
  moveUp,
  moveDown,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(new Date(task.dueDate));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return format(date, "MMM dd, yyyy");
  };

  const saveEdit = () => {
    updateTask(task.id, editedText, editedPriority, editedDueDate);
    setIsEditing(false);
  };

  const formattedDueDate = format(new Date(task.dueDate), "MMM dd, yyyy");
  const isOverdue = new Date(task.dueDate) < new Date();

  const getPriorityColor = (priority) => {
    if (priority === "High") return "#FF6347"; // Red
    if (priority === "Medium") return "#4CAF50"; // Green
    if (priority === "Low") return "#ADFF2F"; // Yellow
    return "#333";
  };

  return (
    <View style={styles.todoItem}>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={task.completed}
            onValueChange={() => toggleCompleted(task.id)}
            tintColors={{ true: "#4CAF50", false: "#ccc" }}
          />
        </View>
        <Text
          style={[styles.todoItemText, task.completed && styles.completed]}
          numberOfLines={1}
        >
          {task.text}
        </Text>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.priorityContainer}>
          {task.priority && (
            <Text
              style={[
                styles.priorityText,
                { color: getPriorityColor(task.priority) },
              ]}
            >{`Priority: ${task.priority}`}</Text>
          )}
          <Text style={styles.dueDate}>
            {isOverdue
              ? `Overdue: ${formattedDueDate}`
              : `Due: ${formattedDueDate}`}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <MaterialIcons name="edit" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(task.id)}
        >
          <MaterialIcons name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.orderButtonsContainer}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={moveUp}
        >
          <MaterialIcons name="keyboard-arrow-up" style={styles.orderIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={moveDown}
        >
          <MaterialIcons name="keyboard-arrow-down" style={styles.orderIcon} />
        </TouchableOpacity>
      </View>

      <Modal visible={isEditing} transparent={true} animationType="slide">
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={editedText}
              onChangeText={setEditedText}
              placeholder="Edit Task Name"
              autoFocus
            />

            <View style={styles.priorityButtons}>
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  {
                    borderColor: editedPriority === "High" ? "#FF6347" : "#ddd",
                  },
                ]}
                onPress={() => setEditedPriority("High")}
              >
                <Text style={{ color: "#FF6347" }}>High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  {
                    borderColor:
                      editedPriority === "Medium" ? "#4CAF50" : "#ddd",
                  },
                ]}
                onPress={() => setEditedPriority("Medium")}
              >
                <Text style={{ color: "#4CAF50" }}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  {
                    borderColor: editedPriority === "Low" ? "#ADFF2F" : "#ddd",
                  },
                ]}
                onPress={() => setEditedPriority("Low")}
              >
                <Text style={{ color: "#ADFF2F" }}>Low</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>Select Due Date</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={editedDueDate}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) {
                    setEditedDueDate(date);
                  }
                }}
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveEdit}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
