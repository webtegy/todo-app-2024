import React from 'react';
import { View,  StyleSheet , Text , TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CheckButton(){
    return (
        <TouchableOpacity style={styles.checkButton}>
            <AntDesign name="check" size={16} color="#000" />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    checkButton: {
        backgroundColor: '#BA83DE',
        borderRadius: 30,
        padding: 5,
        borderWidth: 1,
        borderColor: '#BA83DE',
        justifyContent: 'center',
        alignItems: 'center'
    }
})