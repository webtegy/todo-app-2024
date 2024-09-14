import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
       marginBottom:40,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        padding: 10,
        color: '#333',
    },
    addButton: {
        marginLeft: 10,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,

    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,

    },
    filterButton: {
        margin: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        minWidth: 120,
        marginTop:40,
    },
    filterButtonText: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    emptyMessage: {
        textAlign: 'center',
        marginVertical: 20,
        color: '#666',
    },
});

export default function TodoList() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Doctor Appointment', completed: true, pinned: false, createdAt: new Date(), finishDate: '', finishTime: '' },
        { id: 2, text: 'Meeting at School', completed: false, pinned: false, createdAt: new Date(), finishDate: '', finishTime: '' },
    ]);
    const [text, setText] = useState('');
    const [filter, setFilter] = useState('all');

    function addTask() {
        if (text.trim() === '') {
            Alert.alert('Invalid Task', 'Task text cannot be empty.');
            return;
        }
        if (tasks.some(task => task.text.toLowerCase() === text.trim().toLowerCase())) {
            Alert.alert('Duplicate Task', 'This task already exists.');
            return;
        }
        const now = new Date();
        const newTask = { id: Date.now(), text: text.trim(), completed: false, pinned: false, createdAt: now, finishDate: '', finishTime: '' };
        setTasks([...tasks, newTask]);
        setText('');
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function toggleCompleted(id) {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date() } : task)));
    }

    function renameTask(id, newText, finishDate, finishTime) {
        if (newText.trim() === '') {
            Alert.alert('Invalid Task', 'Task text cannot be empty.');
            return;
        }
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, text: newText.trim(), finishDate, finishTime, updatedAt: new Date() } : task
        ));
    }

    function togglePin(id) {
        setTasks(tasks.map(task => (task.id === id ? { ...task, pinned: !task.pinned, updatedAt: new Date() } : task)));
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'notCompleted') return !task.completed;
        return true; // 'all' filter
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => b.pinned - a.pinned);

    const renderItem = ({ item, index }) => (
        <TodoItem
            itemNumber={index + 1}
            task={item}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            renameTask={renameTask}
            togglePin={togglePin}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, { backgroundColor: filter === 'all' ? '#4CAF50' : '#ccc' }]}
                    onPress={() => setFilter('all')}
                >
                    <Text style={styles.filterButtonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, { backgroundColor: filter === 'completed' ? '#4CAF50' : '#ccc' }]}
                    onPress={() => setFilter('completed')}
                >
                    <Text style={styles.filterButtonText}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, { backgroundColor: filter === 'notCompleted' ? '#4CAF50' : '#ccc' }]}
                    onPress={() => setFilter('notCompleted')}
                >
                    <Text style={styles.filterButtonText}>Not Completed</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={sortedTasks}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyMessage}>No tasks available</Text>}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    value={text}
                    onChangeText={setText}
                    placeholder="New Task"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity
                    style={[styles.addButton, { opacity: text.trim() === '' ? 0.5 : 1 }]}
                    onPress={addTask}
                    disabled={text.trim() === ''}
                >
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
