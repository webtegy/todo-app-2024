import { View , StyleSheet , Text, SafeAreaView , TextInput} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CalendarPicker from '../../components/modals/CalendarView';
import ProgressTracker from '../../components/dashboard/ProgressComponent';
import TodayTask from '../../components/dashboard/TodayTask';
import { ScrollView } from 'react-native-gesture-handler';
import FilterList from '../../components/FilterListComponent';

export default function TodoScreen(){
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal : 15 }}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerText}>Task List</Text>
                        <Text style={styles.headerText}>Explore your task 🌍</Text>
                    </View>
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

                <ScrollView style={{ marginBottom : 130 }}>
                    <View style={styles.calendarArea}>
                        <CalendarPicker />
                    </View>

                    <FilterList />

                    <View>
                        <ProgressTracker />
                    </View>

                    <TodayTask task={"Today's Task"} />
                    <TodayTask task={"Today's Task"} />
                    <TodayTask task={"Today's Task"} />
                    <TodayTask task={"Today's Task"} />
                </ScrollView>


            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : 'black',
    } ,

    header : {
        width : '100%',
        display : 'flex',
        flexDirection: 'row',
        paddingVertical : 10,
        justifyContent : 'space-between',
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
    },
    calendarArea: {
        marginVertical: 30,
    },

})