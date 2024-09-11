import { View , StyleSheet , Text , TextInput} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressTracker from '../../components/dashboard/ProgressComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DashboardScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>You have got 5 tasks</Text>
                <Text style={styles.headerText}>today to complete 🖍️</Text>
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

            <View style={{ flexDirection : 'row' , justifyContent: 'space-between' }}>
                <Text style={styles.headerText}>Progress</Text>
                <TouchableOpacity>
                    <Text style={[styles.taskComplete , {color : '#BA83DE'}]}>See All</Text>
                </TouchableOpacity>
            </View>

            <ProgressTracker />

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
        display : 'flex',
        paddingVertical : 10,
    },

    headerText : {
        fontSize : 30,
        fontWeight : 'bold',
        color : 'white'
    },

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