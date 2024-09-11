import React from 'react';
import { View,  StyleSheet , Text } from 'react-native';
import { ProgressBar } from '@ui-kitten/components';



export default function ProgressTracker(){
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Daily Task</Text>
            <Text style={styles.taskComplete}>2/3 Task Completed</Text>
            
            <View style={{ flexDirection : 'row' , justifyContent: 'space-between' }}>
                <Text style={styles.smallText}>You are almost done go ahead</Text>
                <Text style={styles.taskComplete}>66%</Text>
            </View>
            <ProgressBar
                progress={0.4}
                size='giant'
                trackColor='#BA83DE'
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        borderRadius: 8,
        backgroundColor: '#181818',
        padding: 20,
        color: 'white'
    },

    headerText: {
        fontSize: 18,
        color: 'white'
    },

    taskComplete: {
        marginVertical: 10,
        fontSize: 15,
        color: 'white'
    },

    smallText: {
        marginVertical: 'auto',
        fontSize: 13,
        color: 'gray'
    }

});