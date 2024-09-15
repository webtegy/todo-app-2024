import React , {useState , useEffect , useContext} from 'react'
import { View , StyleSheet , Text, SafeAreaView , TextInput} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CalendarPicker from '../../components/modals/CalendarView';
import ProgressTracker from '../../components/dashboard/ProgressComponent';
import { ScrollView } from 'react-native-gesture-handler';
import FilterList from '../../components/FilterListComponent';
import AnalysisModal from '../../components/modals/Analysis';
import TodoFilterList from '../../components/TodoScreen/TodoFilterList';
import { TodoContext } from '../../store/store'

export default function TodoScreen(){
    const [filterType , setFilterType] = useState('Priority')
    const {state, dispatch} = useContext(TodoContext);
    const [filterArray , setFilterArray] = useState([]);

    useEffect(() => {
        console.log('selected filter : ' , state.tasks)
        switch (filterType) {

            case 'Priority':
                filterByPriority()
                break;
            case 'Category':
                filterByCategory()
                break;
            case 'Status':
                filterByStatus()
                break;
            default:
                filterByPriority()
                break;
        }

    } , [filterType])

    const filterByPriority = () => {
        const l1 = state.tasks.filter(task => task.priority === 'High')
        const l2 = state.tasks.filter(task => task.priority === 'Medium')
        const l3 = state.tasks.filter(task => task.priority === 'Low')

        setFilterArray([
            {
                type: 'High',
                list: l1
            },
            {
                type: 'Medium',
                list: l2
            },
            {
                type: 'Low',
                list: l3
            }
        ])

    }

    const filterByCategory = () => {
        const l1 = state.tasks.filter(task => task.category === 'Work')
        const l2 = state.tasks.filter(task => task.category === 'Study')
        const l3 = state.tasks.filter(task => task.category === 'Personal')
        
        setFilterArray([
            {
                type: 'Work',
                list: l1
            },
            {
                type: 'Study',
                list: l2
            },
            {
                type: 'Personal',
                list: l3
            }
        ])
    
    }

    const filterByStatus= () => {
        const l1 = state.tasks.filter(task => task.completed === true)
        const l2 = state.tasks.filter(task => task.completed === false)
        setFilterArray([
            {
                type: 'Completed',
                list: l1
            },
            {
                type: 'Incompleted',
                list: l2
            }
        ])
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal : 15 }}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerText}>Task List</Text>
                        <Text style={styles.headerText}>Explore your tasks 🌍</Text>
                    </View>
                    <AnalysisModal />
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

                    <FilterList selectedChip={filterType} clickEvent={setFilterType} />

                    <View>
                        <ProgressTracker />
                    </View>

                    {filterArray.map((item , index) => (<TodoFilterList key={index} list={item.list} task={item.type} />) )}

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