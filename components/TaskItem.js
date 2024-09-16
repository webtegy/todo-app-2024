import React from 'react';
import {  View,  StyleSheet , Text, TouchableWithoutFeedback  } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import CheckButton from './CheckButton';
import { format } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function TaskItem({item , pressEvent}) {

    return (
        <TouchableOpacity onPress={pressEvent} style={styles.container}>
            
            <View style={{ flexDirection : 'row' , justifyContent: 'space-between' , flex : 1 }}>
                
                <View style={{ display : 'flex' , flex: 1 }} >
                    <Text style={[styles.taskText , {color:'white' , fontSize: 17 , marginVertical: 'auto'}]}>{item.title}</Text>
                    <View style={{ display : 'flex', marginTop : 5, flexDirection : 'row'}}>
                        <AntDesign name="calendar" size={18} color="gray" style={{ marginVertical: 'auto', marginRight : 5 }} />
                        <Text style={[styles.taskText , { fontWeight: 'bold',  color:'gray' , fontSize: 14 , marginVertical: 'auto'}]}>{format(new Date(item.date), 'd MMM')}</Text>
                    </View>
                </View >

                <TouchableOpacity onPress={() => console.log('hello world')} style={{ marginVertical: 'auto' }}>
                    <CheckButton />
                </TouchableOpacity>

            </View>
        
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex : 1,
        padding: 15,
        paddingVertical: 20,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: '#1F1F1F',
        borderLeftWidth: 15,
        borderLeftColor: '#8875FF',
        elevation: 2
    },

})