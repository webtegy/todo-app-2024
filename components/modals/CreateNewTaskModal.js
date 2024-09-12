import React , {useState} from 'react';
import { View,  StyleSheet , Text, Modal, Pressable , TextInput} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Agenda , Calendar , AgendaList } from 'react-native-calendars';
import CalendarPicker from './CalendarView';

export default function CreateNewTaskModal() {

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };
    
      const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View>
            
            <Pressable style={{ marginVertical : 'auto', marginRight : 10 }} onPress={openModal}>
                <Ionicons name="add-circle" size={28} color="white" />
            </Pressable>

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
                        <Text style={styles.headerText}>Create New Task</Text>
                    </View>

                    <View style={styles.calendarArea}>
                        <CalendarPicker />
                    </View>

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
    }

});