import React from 'react';
import { View,  StyleSheet , Text , TouchableOpacity } from 'react-native';
import TaskItem from '../TaskItem';

export default function TodayTask({task}) {
    return (
        <View style={styles.task}>
            <View style={{marginBottom: 10, flexDirection : 'row' , justifyContent: 'space-between' }}>
                <Text style={[styles.taskText , {fontSize: 20 , marginVertical: 'auto'}]}>{task}</Text>
                <TouchableOpacity style={{marginVertical: 'auto'}}>
                    <Text style={[styles.taskComplete , {color : '#BA83DE'}]}>See All</Text>
                </TouchableOpacity>
            </View>

            <TaskItem />
            <TaskItem />
            <TaskItem />

        </View>
    )
}

const styles = StyleSheet.create({
    task: {
        marginVertical: 10,
        borderRadius: 5
    },
    taskText: {
        color: 'white',
        fontSize: 20,
    }
 
})