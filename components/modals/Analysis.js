import { View,  StyleSheet , Text, Modal, Pressable , SafeAreaView} from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import React , {useState} from 'react';
import AIDescriptionCard from '../Analysis/AIDescription';
import { ScrollView } from 'react-native-gesture-handler';
import AiTaskItem from '../Analysis/AiTaskItem';
import AsyncStorageService from '../../services/AsyncStorageService';


export default function AnalysisModal(){

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
                <SimpleLineIcons name="energy" size={28} color="white" />
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

                        <Text onPress={() => AsyncStorageService.resetTasks()} style={styles.headerText}>Detailed Analysis</Text>
                    </View>

                    <ScrollView style={styles.body}>
                    
                        <AIDescriptionCard />
                        
                        <Text style={[styles.titleText , { marginTop : 30}]}>Detailed Analysis</Text>
                        
                        <View style={{ backgroundColor : '#181818' ,  marginTop : 20 , padding : 15 , borderRadius : 8}}>
                            <Text style={{fontSize : 16 , color : 'white'}}>✨ Sit ut minim do quis dolor nostrud culpa proident. Excepteur qui id sint do incididunt dolor ipsum velit culpa eu deserunt tempor. Nostrud nisi sit ullamco duis qui tempor veniam magna eu amet mollit cillum. Ea fugiat incididunt ad nulla. Voluptate ut pariatur veniam adipisicing magna consectetur. Dolor est non laborum minim laborum irure sunt et sit nisi officia irure. Ea Lorem et nulla consectetur fugiat nulla enim.</Text>
                        </View>

                        <Text style={[styles.titleText , { marginTop : 30}]}>Time Analysis</Text>

                        <View style={{ marginVertical : 20 }}>
                            <AiTaskItem />
                            <AiTaskItem />
                            <AiTaskItem />
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
    },

    header: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal : 15
    },

    headerText: {
        justifyContent: 'center',
        color: 'white',
        fontSize: 20,
        marginVertical: 'auto',
        marginLeft: 50,
    },

    titleText: {
        color: 'white',
        fontSize: 20,
    },

    body: {
        paddingHorizontal : 15,
        marginVertical: 30,
    }

})