import React from 'react';
import { View, Text, CheckBox, Button, TouchableOpacity } from 'react-native';


export default function TodoItem({ task, deleteTask, toggleCompleted }) {
    return (
      <View >
        <CheckBox
          value={task.completed}
          onValueChange={() => toggleCompleted(task.id)}
        />
        <Text >
          {task.text}
        </Text>
        <TouchableOpacity
         
          onPress={() => deleteTask(task.id)}
        >
          <Text style={{ color: '#fff' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }