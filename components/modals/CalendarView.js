import React , {useState} from 'react';
import { View,  StyleSheet , Text, Modal, Pressable , TextInput} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from '@ui-kitten/components';

function DateItem({selected}){
    return (
        <Pressable style={[styles.dateItem , {borderWidth : selected ? 2 : 0}]}>
            <Text style={{color : '#6C757D', fontSize : 16 , marginVertical : 'auto'}}>Mon</Text>
            <Text style={{color : '#6C757D', fontSize : 16 , marginVertical : 'auto'}}>20</Text>
        </Pressable>
    )
}


export default function CalendarPicker(){
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="chevron-back-outline" size={30} color="#BA83DE" />
                <Text style={{color : '#BA83DE' , fontSize : 18 , marginVertical : 'auto'}}>04 Mar - 11 Mar</Text>
                <Ionicons name="chevron-forward-outline" size={30} color="#BA83DE" />
            </View>

            <ScrollView style={{ marginTop: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                <DateItem />
                <DateItem />
                <DateItem selected={true} />
                <DateItem />
                <DateItem selected={false} />
                <DateItem />
                <DateItem />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        
    },
    header : {
        display : 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateItem: {
        width : 50,
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal : 10,
        marginVertical : 10,
        borderRadius : 5,
        paddingVertical : 12,
        borderColor : '#BA83DE'
    },
    headerText: {
        color: 'white',
        fontSize: 20,
    },
    priority: {
        display : 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingTop : 15,
    }
})