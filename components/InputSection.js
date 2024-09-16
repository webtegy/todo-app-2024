import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons"; // Import icon library

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: 380,
  },
  textInput: {
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default function InputSection({
  text,
  setText,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  addTask,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showInputSection, setShowInputSection] = useState(true); // State for toggling visibility

  const handleAddTask = () => {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      alert("Invalid date format. Please use the date picker.");
      return;
    }
    addTask();
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      setDueDate(currentDate);
    }
  };

  return (
    <View>
      {/* Toggle Button */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowInputSection(!showInputSection)}
      >
        <MaterialIcons
          name={showInputSection ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="black"
        />
        <Text>{showInputSection ? "" : ""}</Text>
      </TouchableOpacity>

      {/* Input Section */}
      {showInputSection && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="New Task"
            placeholderTextColor="#999"
            autoCorrect={false}
            clearButtonMode="while-editing"
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.textInput}>{dueDate || "Select Due Date"}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
            />
          )}

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={priority}
              onValueChange={(itemValue) => setPriority(itemValue)}
            >
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="High" value="High" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
