import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: 350,
    alignSelf: "center",
  },
  textInput: {
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#ff362b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: "#007BFF",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
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
  const [showInputSection, setShowInputSection] = useState(false);

  const handleAddTask = () => {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      alert("Invalid date format. Please use the date picker.");
      return;
    }
    addTask();
    setShowInputSection(false);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate.toISOString().split("T")[0];
      setDueDate(currentDate);
    }
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Pressable
        style={styles.toggleButton}
        onPress={() => setShowInputSection(!showInputSection)}
      >
        <MaterialIcons
          name={showInputSection ? "" : "add-circle"}
          size={65}
          color="#f1be00"
        />
      </Pressable>

      {showInputSection && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="New Task"
            placeholderTextColor="#999"
            value={text}
            onChangeText={(text) => setText(text)}
            autoCorrect={false}
            clearButtonMode="while-editing"
          />

          <Pressable onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerText}>
              {dueDate || "Select Due Date"}
            </Text>
          </Pressable>

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

          <Pressable style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </Pressable>

          <Pressable style={styles.cancelButton} onPress={() => setShowInputSection(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
