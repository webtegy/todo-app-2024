import React, { useState } from "react";
import CheckBox from 'react-native-check-box';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  View,
  Text,
 Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  DatePickerIOS,
  DatePickerAndroid,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
  // New styles for checked checkbox
  
  todoItem: {
    flexDirection: "row",
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "#f9f9f9",
  },
  mainContent: {
    flex: 1,
    flexDirection: "column",
  },
  subtaskButton: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "#b9b6ba",
  },
  checkboxContainer: {
    marginRight: 0,
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 12,
  },
  todoItemText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "#b9b6ba",
  },
  moreButton: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    height: 30,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "#b9b6ba",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#d1d1d1",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor:'black'
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  priorityButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  priorityButtonText: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  mbuttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 150
    ,
  },
  modalButton: {
    backgroundColor: "#5A0079",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5, // Adjust spacing between buttons
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#5A0079",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5, // Adjust spacing between buttons
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  subtaskContainer: {
    marginLeft: 20,
    flexDirection: "column",
  },
  subtaskText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  endDateText: {
    fontSize: 10,
    marginBottom: 0,
    marginTop: 5,
    color: "#919294",
    textAlign: "left",
  },
  actionButton: {
  padding: 10,
  borderRadius: 5,
  alignItems:"center",
  marginBottom: 5,
  backgroundColor: "#b9b6ba",
},
actionButtonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},
});

export default function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  textColor,
  editTask,
  addSubtask,
  toggleSubtaskCompleted,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [subtaskText, setSubtaskText] = useState("");
  const [newText, setNewText] = useState(task.text);
  const [newPriority, setNewPriority] = useState(task.priority);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [endDate, setEndDate] = useState(task.endDate || ""); // End date 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#FF6347"; // Red
      case "Medium":
        return "#FFA500"; // Orange
      case "Low":
        return "#4CAF50"; // Green
      default:
        return "#ccc"; // Default grey
    }
  };

  const handleAddSubtask = () => {
    if (subtaskText.trim()) {
      addSubtask(task.id, { text: subtaskText, completed: false });
      setSubtaskText("");
      setShowSubtaskInput(false);
    }
  };

  const handleSaveEdit = () => {
    editTask(task.id, newText, newPriority, endDate);
    setModalVisible(false);
    //setShowMoreOptions(false);
    alert("Saved changes");
  };

  const handleDateChange = (date) => {
    setEndDate(date);
    editTask(task.id, task.text, task.priority, date);
    setDatePickerVisibility(false);  // Hide date picker after setting the date
  };
   const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <View
      style={[
        styles.todoItem,
        { backgroundColor: textColor === "#FFFFFF" ? "#333" : "#f9f9f9" },
      ]}
      accessible={true} // Enable accessibility for the container
      accessibilityLabel={`Task item. ${task.text}. Priority ${task.priority}.`}
      accessibilityHint="Double tap to view more options"
    >
      <View style={styles.mainContent}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.checkboxContainer}>
          
            <CheckBox
              //type="checkbox"
              isChecked={task.completed}
             onClick={() => toggleCompleted(task.id)}
            
      checkedCheckBoxColor='#5A0079'  // Color when checked
      uncheckedCheckBoxColor='#ccc'  
           
            
              
              style={{ marginRight: 10, size:5, }}
              accessibilityLabel={`Mark task ${task.text} as ${task.completed ? 'incomplete' : 'completed'}`}
              accessibilityRole="checkbox"
            />
          
          </View>
          <Text
            style={[
              styles.todoItemText,
              { color: textColor },
              task.completed && styles.completed,
            ]}
          >
            {task.text}
          </Text>
        </View>

        // Subtasks section 
        <View style={styles.subtaskContainer}>
          {task.subtasks &&
            task.subtasks.map((subtask, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <CheckBox
                  type="checkbox"
                  isChecked={subtask.completed}
                  onClick={() => toggleSubtaskCompleted(task.id, index)}
                   checkedCheckBoxColor='#5A0079'  // Color when checked
      uncheckedCheckBoxColor='#ccc' 
                  style={{ marginRight: 10 }}
                  accessibilityLabel={`Mark subtask ${subtask.text} as ${subtask.completed ? 'incomplete' : 'completed'}`}
                  accessibilityRole="checkbox"
                />
                
                <Text
                  style={[
                    styles.subtaskText,
                    subtask.completed && styles.completed,
                  ]}
                >
                  {subtask.text}
                </Text>
              </View>
            ))}
        </View>
        <Text style={styles.endDateText}>
          End Date:{" "}
          {endDate ? new Date(endDate).toLocaleDateString() : "Not Set"}
        </Text>
      </View>

      // Buttons for Subtasks, Edit, Delete, and More 
      <View
        style={[
          styles.priorityDot,
          { backgroundColor: getPriorityColor(task.priority) },
        ]}
      />
      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => setShowMoreOptions(true)}
        accessibilityLabel="More options for task"
        accessibilityRole="button"
      >
        <Icon name="ellipsis-vertical" size={20} color="#000" />
      </TouchableOpacity>

      // Modal for adding subtask 
      {showSubtaskInput && (
        <Modal
          visible={showSubtaskInput}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowSubtaskInput(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={[styles.textInput, { color: textColor }]}
                value={subtaskText}
                onChangeText={setSubtaskText}
                placeholder="Enter subtask"
                placeholderTextColor="#999"
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleAddSubtask}
                >
                  <Text style={styles.modalButtonText}>Add Subtask</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowSubtaskInput(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      // Modal for more options 
      {showMoreOptions && (
        <Modal
          visible={showMoreOptions}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowMoreOptions(false)}
        >
          <View style={styles.mbuttonContainer}>
            <View style={styles.modalContent}>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setShowSubtaskInput(true)}
                accessibilityLabel="Add subtask"
                accessibilityRole="button"
              >
                <Icon name="add" size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setModalVisible(true)}
                accessibilityLabel="Edit task"
                accessibilityRole="button"
              >
                <Icon name="create-outline" size={20} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => deleteTask(task.id)}
                accessibilityLabel="Delete task"
                accessibilityRole="button"
              >
                <Icon name="trash" size={20} color="#000" />
              </TouchableOpacity>

              <Text style={{ fontSize: 10, marginBottom: 10 }}>
                Created Date and Time:{" "}
                {new Date(task.createdDate).toLocaleString()}
              </Text>

              <Text style={{ fontSize: 10, marginBottom: 10 }}>
                 Task End Date:{" "}
                {endDate ? new Date(endDate).toLocaleDateString() : "Not Set"}
              </Text>
              <Button title="Show Date Picker" onPress={showDatePicker} />
             <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={hideDatePicker}
      />
              <TextInput
                type="datetime-local"
                value={endDate}
                onChange={handleDateChange}
                style={{ marginBottom: 10 }}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleSaveEdit}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowMoreOptions(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      // Modal for editing task 
      {modalVisible && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={[styles.textInput, { color: textColor }]}
                value={newText}
                onChangeText={setNewText}
                placeholder="Edit task"
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: getPriorityColor(newPriority) },
                ]}
                onPress={() => {
                  // Cycle through priorities: High -> Medium -> Low -> High
                  if (newPriority === "High") {
                    setNewPriority("Medium");
                  } else if (newPriority === "Medium") {
                    setNewPriority("Low");
                  } else {
                    setNewPriority("High");
                  }
                }}
              >
                <Text style={styles.modalButtonText}>
                  Priority: {newPriority}
                </Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleSaveEdit}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
