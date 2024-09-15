import React from 'react';
import { View, Text, CheckBox, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton} from 'react-native-paper';

const styles = StyleSheet.create({});
  

export default function TodoItem({ task, deleteTask,editTask }) {
    return (
        <View style={{
          backgroundColor:"#1e90ff",
          borderRadius:6,
          paddingHorizontal:6,
          paddingVertical:12,
          marginBottom:12,
          flexDirection:"row",
          alignItems:"center",
          shadowColor:"#000",
          shadowOffset:{width: 0, height:2},
          shadowOpacity:0.8,
          shadowRadius:3,
        }}>
        <Text style={{
          color:"#fff",
          fontSize:20,
          fontWeight:"800",
          paddingLeft:5,
          flex:1
        }}>
          {task.text}
        </Text>
        <IconButton icon="pencil" iconColor='#fff' onPress = {()=>editTask(task)}></IconButton>
        <IconButton icon="trash-can" iconColor='#fff' onPress = {()=>deleteTask(task.id)}></IconButton>

      </View>
    );
  }