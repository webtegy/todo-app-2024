import React from 'react';
import { View,  StyleSheet , Text , TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


function CheckButton(){
    return (
        <TouchableOpacity style={styles.checkButton}>
            <AntDesign name="check" size={16} color="black" />
        </TouchableOpacity>
    )
}


export default function TaskItem() {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection : 'row' , justifyContent: 'space-between' }}>
                <View>
                    <Text style={[styles.taskText , {color:'white' , fontSize: 17 , marginVertical: 'auto'}]}>Mobile App Research</Text>
                    <View style={{ display : 'flex', marginTop : 5, flexDirection : 'row'}}>
                        <AntDesign name="calendar" size={18} color="gray" style={{ marginVertical: 'auto', marginRight : 5 }} />
                        <Text style={[styles.taskText , { fontWeight: 'bold',  color:'gray' , fontSize: 14 , marginVertical: 'auto'}]}>4 Oct</Text>
                    </View>
                </View>

                <View style={{ marginVertical: 'auto' }}>
                    <CheckButton />
                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingVertical: 20,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: '#1F1F1F',
        borderLeftWidth: 15,
        borderLeftColor: '#8875FF',
        elevation: 2
    },
    checkButton: {
        // backgroundColor: '#1F1F1F',
        backgroundColor: '#BA83DE',
        borderRadius: 30,
        padding: 5,
        borderWidth: 1,
        borderColor: '#BA83DE',
        justifyContent: 'center',
        alignItems: 'center'
    }
})