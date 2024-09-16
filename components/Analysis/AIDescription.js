import { View,  StyleSheet , Text, Modal, Pressable , SafeAreaView} from 'react-native';


export default function AIDescriptionCard(){
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Statistics</Text>
           
            <View style={{ display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between' }}>
                <Text style={[styles.description , {marginVertical : 'auto'}]}>✅ Tasks Completed:</Text>
                <Text style={[styles.description , {marginVertical : 'auto'}]}>08</Text>
            </View>

            <View style={{ display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between' }}>
                <Text style={[styles.description , {marginVertical : 'auto'}]}>⏳  Pending Tasks:</Text>
                <Text style={[styles.description , {marginVertical : 'auto'}]}>02</Text>
            </View>

            <View style={{ display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between' }}>
                <Text style={[styles.description , {marginVertical : 'auto'}]}>📅 Overdue Tasks:</Text>
                <Text style={[styles.description , {marginVertical : 'auto'}]}>05</Text>
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    description: {
        fontSize: 16,
        marginBottom: 10
    }
})