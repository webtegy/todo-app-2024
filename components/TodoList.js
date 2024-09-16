import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import TodoItem from "./TodoItem";
import InputSection from "./InputSection";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    display: "flex",
    flex: 1,
    alignItems: "center",
    marginTop: 0,
    paddingTop: 20,
    backgroundColor: "#cdfbff",
  },
  filterContainer: {
    height: 40,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-around",
  },
  filterItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  filterText: {
    color: "white",
    fontSize: 16,
  },
  topic: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 40,
    backgroundColor: "#cdfbff",
  },
});

export default function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'incomplete'
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) saveTasks(tasks);
  }, [tasks]);

  // Function to save tasks to AsyncStorage
  async function saveTasks(tasksToSave) {
    try {
      const jsonValue = JSON.stringify(tasksToSave);
      await AsyncStorage.setItem("@tasks", jsonValue);
    } catch (e) {
      console.error("Error saving tasks", e);
    }
  }

  // Function to load tasks from AsyncStorage
  async function loadTasks() {
    try {
      const jsonValue = await AsyncStorage.getItem("@tasks");
      if (jsonValue != null) {
        const loadedTasks = JSON.parse(jsonValue);
        setTasks(Array.isArray(loadedTasks) ? loadedTasks : []); // Ensure tasks is always an array
      } else {
        setTasks([]); // If no tasks found, initialize an empty array
      }
    } catch (e) {
      console.error("Error loading tasks", e);
      setTasks([]); // If no tasks found, initialize an empty array
    }
  }

  // Function to Add Task
  function addTask() {
    if (text.trim()) {
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
        priority,
        dueDate,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setText("");
      setPriority("Low");
      setDueDate("");
    }
  }

  // Function to Update an existing Task
  function updateTask(id, newText) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  }

  // Function to Delete Task
  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  // Filter tasks based on completion status
  const filteredTasks = (Array.isArray(tasks) ? tasks : []).filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // 'all'
  });

  //Sorting function by priority
  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <>
      <View>
        <Text style={styles.topic}>WHAT TO DO ?</Text>
      </View>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => setFilter("all")}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => setFilter("completed")}
          >
            <Text style={styles.filterText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => setFilter("incomplete")}
          >
            <Text style={styles.filterText}>Incomplete</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
                updateTask={updateTask}
              />
            ))
          ) : (
            <Text>No tasks available</Text>
          )}
        </ScrollView>

        <InputSection
          text={text}
          setText={setText}
          priority={priority}
          setPriority={setPriority}
          dueDate={dueDate}
          setDueDate={setDueDate}
          addTask={addTask}
        />
      </KeyboardAvoidingView>
    </>
  );
}
