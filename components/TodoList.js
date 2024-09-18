import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import TodoItem from "./TodoItem";
import InputSection from "./InputSection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    margin: 0,
    backgroundColor: "#f0f4f8",
  },
  topic: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
    color: "#333",
  },
  filterContainer: {
    height: 50,
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  filterItem: {
    backgroundColor: "#89CFF0",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 100,
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
  },
  filterText: {
    color: "#fff",
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    width: "100%",
  },
});

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) saveTasks(tasks);
  }, [tasks]);

  async function saveTasks(tasksToSave) {
    try {
      const jsonValue = JSON.stringify(tasksToSave);
      await AsyncStorage.setItem("@tasks", jsonValue);
    } catch (e) {
      console.error("Error saving tasks", e);
    }
  }

  async function loadTasks() {
    try {
      const jsonValue = await AsyncStorage.getItem("@tasks");
      if (jsonValue != null) {
        const loadedTasks = JSON.parse(jsonValue);
        setTasks(Array.isArray(loadedTasks) ? loadedTasks : []);
      } else {
        setTasks([]);
      }
    } catch (e) {
      console.error("Error loading tasks", e);
      setTasks([]);
    }
  }

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

  function updateTask(id, newText, newPriority, newDueDate) {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, text: newText, priority: newPriority, dueDate: newDueDate }
        : task
    );
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function toggleCompleted(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  const filteredTasks = (Array.isArray(tasks) ? tasks : []).filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // 'all'
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <View style={styles.container}>
      <Text style={styles.topic}>What To Do?</Text>
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

      <ScrollView style={{ width: "100%" }}>
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task, index) => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
              updateTask={updateTask}
              moveUp={() => {
                if (index > 0) {
                  const newTasks = [...tasks];
                  [newTasks[index - 1], newTasks[index]] = [
                    newTasks[index],
                    newTasks[index - 1],
                  ];
                  setTasks(newTasks);
                }
              }}
              moveDown={() => {
                if (index < tasks.length - 1) {
                  const newTasks = [...tasks];
                  [newTasks[index + 1], newTasks[index]] = [
                    newTasks[index],
                    newTasks[index + 1],
                  ];
                  setTasks(newTasks);
                }
              }}
            />
          ))
        ) : (
          <Text style={{ textAlign: "center" }}>No tasks available</Text>
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
    </View>
  );
}
