import React , {useState , useContext} from 'react';
import { View,  StyleSheet , Text, Modal, Pressable , TouchableOpacity , TextInput} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarPicker from './CalendarView';
import { ScrollView } from 'react-native-gesture-handler';
import TodoService from '../../services/TodoService';
import { TodoContext } from '../../store/store';


export default function EditTaskModal({item , modalVisible , closeModal}) {

    const {state, dispatch} = useContext(TodoContext);
    const [formData , setFormData] = useState(item)

    if(!item) {
        return
    }

    return (
        <View>
            
            {/* <Pressable style={{ marginVertical : 'auto', marginRight : 10 }} onPress={openModal}>
                <Ionicons name="add-circle" size={28} color="white" />
            </Pressable> */}

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <SafeAreaView style={styles.container}>

                    <View style={styles.header}>
                        <Pressable style={{ display : 'flex' , justifyContent: 'flex-start' }} onPress={closeModal}>
                            <Ionicons name="close-circle" size={28} color="white" />
                        </Pressable>
                        <Text style={styles.headerText}>{item.title}</Text>
                    </View>

                    <ScrollView style={{ paddingBottom : 20 }}>
                        <View style={styles.calendarArea}>
                            <CalendarPicker />
                        </View>

                        <View style={{ marginTop : 20 }}>
                            <Text style={styles.titleText}>Schedule</Text>
                        </View>

                        <View style={{ marginTop : 20 }}>

                            <TextInput
                                style={{backgroundColor: '#181818' , padding : 10 , color: 'white' , borderRadius : 5 , height : 40}}
                                size='large'
                                placeholder='Name'
                                value={formData && formData.title}
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
                            <Text style={styles.titleText}>Priority</Text>
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
                            <Text style={styles.titleText}>Category</Text>
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

                        <View style={{ display : 'flex' , justifyContent : 'space-between',  flexDirection : 'row'}}>
                            
                            <TouchableOpacity style={{ width : '48%' , backgroundColor : '#D682B9' , padding : 15 , marginTop : 35 , borderRadius : 5 , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                                <Text style={{ fontSize : 18 , color : 'white' }}>Edit Task</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width : '48%' , backgroundColor : '#3F3F40' , padding : 15 , marginTop : 35 , borderRadius : 5 , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                                <Text style={{ fontSize : 18 , color : 'white' }}>Delete Task</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>


                </SafeAreaView>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal : 15,
    },

    header: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 50,
        // padding : 10,

    },

    headerText: {
        justifyContent: 'center',
        color: 'white',
        fontSize: 20,
        marginVertical: 'auto',
        marginLeft: 50,
    },

    calendarArea: {
        marginVertical: 30,
    },

    titleText: {
        color: 'white',
        fontSize: 20,
    },
    priority: {
        display : 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingTop : 15,
    }

});