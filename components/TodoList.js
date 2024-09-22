import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Switch,
  Alert,
} from "react-native";
import CheckBox from 'react-native-check-box';

import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoItem from "./TodoItem";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const getTimeBasedBackgroundColor = (highContrast) => {
  if (highContrast) {
    return "#191919"; // High contrast background color (black)
  }

  const hour = new Date().getHours();

  if (hour >= 5 && hour < 8) {
    return "#FFF4E0"; // Soft sunrise color #FFF4E0
  } else if (hour >= 8 && hour < 11) {
    return "#8badcc"; // Soft blue morning sky
  } else if (hour >= 11 && hour < 15) {
    return "#9dbf9f"; // Light refreshing green
  } else if (hour >= 15 && hour < 18) {
    return "#e3cdaa"; // Warm afternoon glow ffe5b5
  } else if (hour >= 18 && hour < 21) {
    return "#8891db"; // Calming twilight blue
  } else {
    return "#9e7dc9"; // Cool, restful night tones ECEFF1 '#302045'
  }
};
const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "#d71d0f"; // Red for high priority
    case "Medium":
      return "#ff9800"; // Orange for medium priority
    case "Low":
      return "#4caf50"; // Green for low priority
    default:
      return "#ff9800"; // Default to medium priority color
  }
};
export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [highContrast, setHighContrast] = useState(false);
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const backgroundColor = useMemo(
    () => getTimeBasedBackgroundColor(highContrast),
    [highContrast]
  );
  const textColor = highContrast ? "#FFFFFF" : "#333333";

  useEffect(() => {
    async function loadTasks() {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Failed to load tasks", error);
      }
    }
    loadTasks();
  }, []);

  useEffect(() => {
    async function saveTasks() {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks", error);
      }
    }
    if (tasks.length > 0) {
      saveTasks();
    }
  }, [tasks]);

  useEffect(() => {
    const checkPendingTasks = () => {
      const now = new Date();
      const halfDay = new Date(now.setHours(12, 0, 0)); // 12:00 PM

      if (now >= halfDay) {
        const pendingTasks = tasks.filter(task => !task.completed);
        const highPriorityCount = pendingTasks.filter(task => task.priority === "High").length;
        const mediumPriorityCount = pendingTasks.filter(task => task.priority === "Medium").length;
        const lowPriorityCount = pendingTasks.filter(task => task.priority === "Low").length;

        if (pendingTasks.length > 0) {
          Alert.alert(
            "Reminder",
            `Half of the day is over! You have ${pendingTasks.length} pending tasks. 
            High: ${highPriorityCount}, Medium: ${mediumPriorityCount}, Low: ${lowPriorityCount}.`,
            [{ text: "OK" }],
            { cancelable: true }
          );
        }
      }
    };

    const interval = setInterval(checkPendingTasks, 60000); // Check every minute for recording purpose. Value should be changed to 360000, so that it checks every hour and notifies.
    return () => clearInterval(interval);
  }, [tasks]);

  function addTask() {
    if (!text.trim()) return;
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      createdDate: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setText("");
    setPriority("Medium");
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  

  const toggleSubtaskCompleted = (taskId, subtaskIndex) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map((subtask, index) => {
          if (index === subtaskIndex) {
            return { ...subtask, completed: !subtask.completed };
          }
          return subtask;
        });
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  function cyclePriority() {
    const nextPriority =
      priority === "High" ? "Medium" : priority === "Medium" ? "Low" : "High";
      
    setPriority(nextPriority);
  }

  function editTask(id, newText, newPriority, endDate) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: newText, priority: newPriority, endDate }
          : task
      )
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Uncompleted") return !task.completed;
    return true;
  });

  const addSubtask = (taskId, subtask) => {
    console.log("Before update:", tasks);
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: [...(task.subtasks || []), subtask] }
          : task
      );
      console.log("After update:", updatedTasks);
      return updatedTasks;
    });
  };

  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.accessibilityLabel, { color: textColor }]}
        accessibilityLabel="Greeting message"
        >
          Hello
          <Icon name="hand-right" size={20} color="yellow" />
        </Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.darkThemeLabel, { color: textColor }]}
          accessibilityLabel="Dark theme toggle"
          >
            Dark theme
          </Text>
          <Switch value={highContrast} onValueChange={setHighContrast} 
          accessibilityLabel="Switch between light and dark themes"
          accessibilityRole="switch"
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "All" && styles.selectedFilter,
          ]}
          onPress={() => setFilter("All")}
          accessibilityLabel="Show all tasks"
          accessibilityRole="button"
          accessible={true}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "Completed" && styles.selectedFilter,
          ]}
          onPress={() => setFilter("Completed")}
          accessibilityLabel="Show completed tasks"
          accessibilityRole="button"
          accessible={true}
        >
          <Text style={styles.filterButtonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "Uncompleted" && styles.selectedFilter,
          ]}
          onPress={() => setFilter("Uncompleted")}
          accessibilityLabel="Show uncompleted tasks"
          accessibilityRole="button"
          accessible={true}
        >
          <Text style={styles.filterButtonText}>Pending</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            task={item}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            editTask={editTask}
            textColor={textColor}
            addSubtask={addSubtask} // Pass addSubtask function to TodoItem
            toggleSubtaskCompleted={toggleSubtaskCompleted} // Pass toggleSubtaskCompleted function
            accessible={true}
            accessibilityLabel={`Task ${item.text}, priority ${item.priority}, ${item.completed ? "completed" : "not completed"}`}
      accessibilityRole="button"
          />
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, { color: textColor }]}
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor={highContrast ? "#AAAAAA" : "#999"}
          accessibilityLabel="Input field to add a new task"
          accessible={true}
        />
        <TouchableOpacity
          style={[styles.priorityButton, { backgroundColor: getPriorityColor(priority) }]}
          onPress={cyclePriority}
          accessibilityLabel={`Set task priority, current priority is ${priority}`}
          accessibilityRole="button"
          accessible={true}
        >
          <Text style={styles.priorityButtonText}>{priority}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={addTask}
          accessibilityLabel="Add new task"
          accessibilityRole="button"
          accessible={true}
          >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  priorityButton: {
    //backgroundColor: "#ff9800",
    //backgroundColor: getPriorityColor(),
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  priorityButtonText: {
    color: "#fff",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#5A0079",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  darkThemeLabel: {
    marginRight: 10,
  },
  accessibilityLabel: {
    fontSize: 20,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#7c6982",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  selectedFilter: {
    backgroundColor: "#5A0079",
  },
  filterButtonText: {
    color: "#fff",
  },
});
