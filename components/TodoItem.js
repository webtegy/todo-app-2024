import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { format } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
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
  },
   textContainer: {
    flexDirection: "column",
    width: 245,
  },
  todoItemText: {
    flex: 1,
    fontSize: 19,
    fontWeight: "700",
    color: "#333",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 0,
  },
  dueDate: {
    fontSize: 14,
    color: "#007BFF",
    marginTop: 5,
    marginBottom: 5,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  priorityText: {
    fontSize: 14,
    color: "#007BFF",
  },
  editButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight:18,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "Right",
    justifyContent: "space-between",
   // width: 100,
    marginTop: 5,
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
    margin:60,
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
  saveButton : {
    padding: 8,
    borderRadius: 7,
    margin: 10,
    width : 70,
    marginLeft:50,
    backgroundColor:"#007BFF",
    alignItems: "center",
  },
  cancleButton : {
    padding: 8,
    borderRadius: 7,
    margin: 10,
    width : 70,
    marginRight:50,
    backgroundColor:"#ff362b",
    alignItems: "center",
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
});

export default function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  updateTask,
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
    updateTask(task.id, editedText);
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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

      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          </View>

          <Text style={styles.dueDate}>
            {isOverdue
              ? `Overdue: ${formattedDueDate}`
              : `Due: ${formattedDueDate}`}
          </Text>
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
                disabled={true} 
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
                disabled={true} 
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
                disabled={true} 
              >
                <Text style={{ color: "#ADFF2F" }}>Low</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dueDate}>
                {`Due Date: ${format(editedDueDate, "MMM dd, yyyy")}`}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={editedDueDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setEditedDueDate(selectedDate);
                  }
                }}
                disabled={true} 
              />
            )}
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancleButton} onPress={() => setIsEditing(false)}>
              <Text style={styles.buttonText}>Cancle</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
