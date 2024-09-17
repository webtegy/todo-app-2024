import React, { useState } from 'react';
import { View, Text, CheckBox, TouchableOpacity, StyleSheet, TextInput, Modal, DatePickerAndroid } from 'react-native';

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
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
  editButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  priorityButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  priorityButtonText: {
    color: '#fff',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  moreButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  datePickerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  datePickerButtonText: {
    color: '#fff',
  },
});

export default function TodoItem({ task, deleteTask, toggleCompleted, textColor, editTask }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [moreModalVisible, setMoreModalVisible] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newPriority, setNewPriority] = useState(task.priority);
  const [endDate, setEndDate] = useState(task.endDate || '');

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

  const handleSaveEdit = () => {
    editTask(task.id, newText, newPriority, endDate);
    setModalVisible(false);
  };

  const handleSaveEndDate = (date) => {
    setEndDate(date);
    setMoreModalVisible(false);
  };

  const showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day);
        handleSaveEndDate(selectedDate.toISOString().split('T')[0]);
      }
    } catch (error) {
      console.warn('Cannot open date picker', error);
    }
  };

  return (
    <View style={[styles.todoItem, { backgroundColor: textColor === '#FFFFFF' ? '#333' : '#f9f9f9' }]}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={task.completed}
          onValueChange={() => toggleCompleted(task.id)}
          tintColors={{ true: '#4CAF50', false: '#ccc' }}
        />
      </View>
      <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
      <Text
        style={[styles.todoItemText, { color: textColor }, task.completed && styles.completed]}
      >
        {task.text}
      </Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => setMoreModalVisible(true)}
      >
        <Text style={styles.moreButtonText}>More</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(task.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>

      {/* Modal for editing task */}
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
            <TextInput
              style={[styles.textInput, { color: textColor }]}
              value={newPriority}
              onChangeText={setNewPriority}
              placeholder="Priority (High/Medium/Low)"
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveEdit}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for more info */}
      <Modal
        visible={moreModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMoreModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.text, { color: textColor }]}>Created: {task.creationDate}</Text>
            <Text style={[styles.text, { color: textColor }]}>End Date: {task.endDate || 'N/A'}</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={showDatePicker}
            >
              <Text style={styles.dateButtonText}>Set End Date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMoreModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}