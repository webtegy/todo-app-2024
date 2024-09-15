import { View , StyleSheet , Text , TextInput} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressTracker from '../../components/dashboard/ProgressComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TodayTask from '../../components/dashboard/TodayTask';
import CreateNewTaskModal from '../../components/modals/CreateNewTaskModal';
import EditTaskModal from '../../components/modals/EditTaskModal';

export default function DashboardScreen() {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>You have got 5 tasks</Text>
                    <Text style={styles.headerText}>today to complete 🖍️</Text>
                </View>
                <CreateNewTaskModal />
                {/* <EditTaskModal /> */}
            </View>

            <View style={styles.search}>
                
                <View>
                    <FontAwesome name={"search"} size={24} color="#a2a2a2" />
                </View>

                <TextInput
                    style={{color: 'white', marginLeft: 10}}
                    placeholder="Search Task Here"
                    placeholderTextColor={'white'}
                />

            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                
                <View style={{ flexDirection : 'row' , justifyContent: 'space-between' }}>
                    <Text style={[styles.headerText , {fontSize: 20}]}>Progress</Text>
                    <TouchableOpacity>
                        <Text style={[styles.taskComplete , {color : '#BA83DE'}]}>See All</Text>
                    </TouchableOpacity>
                </View>

                <ProgressTracker />

                {/* <TodayTask task={"Today's Task"} />

                <TodayTask task={"Tommorrow Task"} /> */}

            </ScrollView>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : 'black',
        paddingHorizontal : 15,
    } ,

    header : {
        width : '100%',
        display : 'flex',
        flexDirection: 'row',
        paddingVertical : 10,
        justifyContent : 'space-between',
    },

    // headerText : {
    //     fontSize : 30,
    //     fontWeight : 'bold',
    //     color : 'white'
    // },

    search: {
        display : 'flex',
        flexDirection : 'row',
        borderColor : '#ccc',
        paddingHorizontal : 10,
        paddingVertical : 13,
        borderRadius : 5,
        marginVertical : 10,
        backgroundColor : '#1E1E1E'
    },

    headerText: {
        marginVertical: 'auto',
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

})