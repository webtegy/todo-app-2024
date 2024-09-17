import React, { useState, useCallback } from 'react';
import { View, Text, Switch, TouchableOpacity, TextInput, StyleSheet, Modal, Button } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    checkboxContainer: {
        marginRight: 10,
    },
    todoItemText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        margin: 3,
        minWidth: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButton: {
        backgroundColor: '#FF6347',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    pinButton: {
        backgroundColor: '#87CEEB',
    },
    pinButtonText: {
        fontSize: 14,
        color: '#fff',
    },
    itemNumber: {
        fontSize: 14,
        color: '#333',
        marginRight: 10,
    },
    editInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    dateText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10,
        width: 200,
        textAlign: 'center',
    },
});

function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
}

export default function TodoItem({ itemNumber, task, deleteTask, toggleCompleted, renameTask, togglePin }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [newText, setNewText] = useState(task.text);
    const [finishDate, setFinishDate] = useState(task.finishDate || '');
    const [finishTime, setFinishTime] = useState(task.finishTime || '');

    const handleRename = useCallback(() => {
        if (newText.trim()) {
            renameTask(task.id, newText.trim(), finishDate, finishTime);
        }
        setIsEditing(false);
    }, [newText, finishDate, finishTime, renameTask, task.id]);

    return (
        <View style={styles.todoItem}>
            <Text style={styles.itemNumber}>{itemNumber}.</Text>
            <View style={styles.checkboxContainer}>
                <Switch
                    value={task.completed}
                    onValueChange={() => toggleCompleted(task.id)}
                    trackColor={{ true: '#4CAF50', false: '#ccc' }}
                    thumbColor={task.completed ? '#fff' : '#888'}
                    accessibilityLabel={`Mark as ${task.completed ? 'incomplete' : 'complete'}`}
                />
            </View>
            {isEditing ? (
                <View style={{ flex: 1 }}>
                    <TextInput
                        style={styles.editInput}
                        value={newText}
                        onChangeText={setNewText}
                        onSubmitEditing={handleRename}
                        onBlur={handleRename}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Finish Date (YYYY-MM-DD)"
                        value={finishDate}
                        onChangeText={setFinishDate}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Finish Time (HH:MM)"
                        value={finishTime}
                        onChangeText={setFinishTime}
                    />
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <Text style={[styles.todoItemText, task.completed && styles.completed]}>
                        {task.text}
                    </Text>
                    <Text style={styles.dateText}>Created: {formatDate(task.createdAt)}</Text>
                    {task.finishDate && (
                        <Text style={styles.dateText}>Finish: {formatDate(`${task.finishDate}T${task.finishTime}`)}</Text>
                    )}
                </View>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={[styles.button, styles.pinButton]}
                    onPress={() => togglePin(task.id)}
                    accessibilityLabel={task.pinned ? 'Unpin task' : 'Pin task'}
                >
                    <Text style={styles.pinButtonText}>{task.pinned ? 'Unpin' : 'Pin'}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={[styles.button, styles.pinButton]}
                    onPress={() => setIsDetailsVisible(true)}
                    accessibilityLabel="More"
                >
                    <Text style={styles.pinButtonText}>More</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => deleteTask(task.id)}
                    accessibilityLabel="Delete task"
                >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => setIsEditing(!isEditing)}
                    accessibilityLabel={isEditing ? 'Save changes' : 'Edit task'}
                >
                    <Text style={styles.deleteButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDetailsVisible}
                onRequestClose={() => {
                    setIsDetailsVisible(!isDetailsVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Finish Date and Time</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Finish Date (YYYY-MM-DD)"
                        value={finishDate}
                        onChangeText={setFinishDate}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Finish Time (HH:MM)"
                        value={finishTime}
                        onChangeText={setFinishTime}
                    />
                    <Button
                        title="Save"
                        onPress={() => {
                            renameTask(task.id, task.text, finishDate, finishTime);
                            setIsDetailsVisible(!isDetailsVisible);
                        }}
                    />
                    <Button
                        title="Cancel"
                        color="red"
                        onPress={() => setIsDetailsVisible(!isDetailsVisible)}
                    />
                </View>
            </Modal>
        </View>
    );
}

TodoItem.propTypes = {
    itemNumber: PropTypes.number.isRequired,
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        pinned: PropTypes.bool.isRequired,
        createdAt: PropTypes.instanceOf(Date).isRequired,
        finishDate: PropTypes.string,
        finishTime: PropTypes.string,
    }).isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
    renameTask: PropTypes.func.isRequired,
    togglePin: PropTypes.func.isRequired,
};

 
