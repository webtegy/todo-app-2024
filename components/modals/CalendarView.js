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
        <ScrollView style={styles.container}>
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

            <View style={{ marginTop : 20 }}>
                <Text style={styles.headerText}>Schedule</Text>
            </View>

            <View style={{ marginTop : 20 }}>

                <TextInput
                    style={{backgroundColor: '#181818' , padding : 10 , color: 'white' , borderRadius : 5 , height : 40}}
                    size='large'
                    placeholder='Name'
                />

                <View style={{ marginTop:20}}>
                    <TextInput
                        style={{color: 'white' , backgroundColor: '#181818', minHeight: 120, paddingHorizontal : 10 , padding: 15 , borderRadius : 5}}
                        size='large'
                        placeholder='Description'
                        multiline={true}
                        numberOfLines={10}
                        
                    />
                </View>
            </View>

            <View style={{ marginTop : 20 }}>
                <Text style={styles.headerText}>Priority</Text>
            </View>

            <View style={styles.priority}>

                <Pressable style={{ borderRadius : 5 , paddingHorizontal : 35 , paddingVertical : 5 , borderWidth : 1 , borderColor : '#FACBBA' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                    <Text style={{ fontSize : 18 , color : 'white' }}>High</Text>
                </Pressable>

                <Pressable style={{ borderRadius : 5 , paddingHorizontal : 35 , paddingVertical : 5 , borderWidth : 1 , borderColor : '#D7F0FF' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                    <Text style={{ fontSize : 18 , color : 'white' }}>Medium</Text>
                </Pressable>

                <Pressable style={{ borderRadius : 5 , paddingHorizontal : 35 , paddingVertical : 5 , borderWidth : 1 , borderColor : '#FAD9FF' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                    <Text style={{ fontSize : 18 , color : 'white' }}>Low</Text>
                </Pressable>
            </View>

            <View style={{ marginTop : 40 }}>
                <Text style={styles.headerText}>Category</Text>
            </View>

            <View style={styles.priority}>

                <Pressable style={{ borderRadius : 5 , paddingHorizontal : 20 , paddingVertical : 5 , borderWidth : 1 , borderColor : '#FACBBA' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                    <Text style={{ fontSize : 18 , color : 'white' }}>Personal</Text>
                </Pressable>

                <Pressable style={{ borderRadius : 5 , paddingHorizontal : 35 , paddingVertical : 5 , borderWidth : 1 , borderColor : '#FACBBA' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                    <Text style={{ fontSize : 18 , color : 'white' }}>Work</Text>
                </Pressable>

                <Pressable style={{ borderRadius : 5 , paddingHorizontal : 35 , paddingVertical : 5 , borderWidth : 1 , borderColor : '#FACBBA' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                    <Text style={{ fontSize : 18 , color : 'white' }}>Stduy</Text>
                </Pressable>
            </View>

            <Pressable style={{ backgroundColor : '#D682B9' , padding : 15 , marginTop : 35 , borderRadius : 5 , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                <Text style={{ fontSize : 18 , color : 'white' }}>Create Task</Text>
            </Pressable>

        </ScrollView>
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