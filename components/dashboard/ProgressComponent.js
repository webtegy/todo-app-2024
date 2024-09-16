import React, { useEffect , useState } from 'react';
import { View,  StyleSheet , Text } from 'react-native';
import { ProgressBar } from '@ui-kitten/components';

export default function ProgressTracker({taskList}){

    const [completed , setCompleted] = useState(0);
    const [progressMessage, setProgressMessage] = useState('');


    useEffect(() => {
        let counter = 0
        for(let i = 0; i < taskList.length; i++){
            if(taskList.completed){
                counter++;
            }
        }
        setCompleted(counter)
    } , [taskList])

    useEffect(() => {
        const progress = (completed / (taskList.length > 0 ? taskList.length : 1)) * 100;
        if (progress === 100) {
            setProgressMessage("Congratulations! You've completed all tasks! 🎉");
        } else if (progress >= 75) {
            setProgressMessage("You're almost there! Just a few more tasks!");
        } else if (progress >= 50) {
            setProgressMessage("You're halfway through! Keep going!");
        } else if (progress >= 25) {
            setProgressMessage("Good start! Keep pushing forward.");
        } else {
            setProgressMessage("Start completing tasks to see your progress.");
        }
    }, [completed, taskList]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Daily Task</Text>
            <Text style={styles.taskComplete}>{completed}/{taskList.length} Task Completed</Text>
            
            <View style={{ flexDirection : 'row' , justifyContent: 'space-between' }}>
                <Text style={styles.smallText}>{progressMessage}</Text>
                <Text style={styles.taskComplete}>{ taskList.length > 0 ? (completed / taskList.length) * 100 : 0 }%</Text>
            </View>
            <ProgressBar
                progress={(completed / (taskList.length > 0 ? taskList.length : 1))}
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