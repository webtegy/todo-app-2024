import { View , StyleSheet} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TodoList from '../../components/TodoList';



export default function TodoListScreen() {
    return (
        <View style={styles.container}>
            <TodoList />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
    },
  });
  