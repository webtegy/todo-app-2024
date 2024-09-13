import { View,  StyleSheet , Text , TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


function Chip({text}){
    return (
        <View>
            <TouchableOpacity style={styles.chip}>
                <Text style={styles.chipText}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}


export default function FilterList(){
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Chip text={'Priority'} />
            <Chip text={'Status'} />
            <Chip text={'Category'} />
            <Chip />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    chip: {
        margin: 10,
        padding: 10,
        paddingHorizontal : 25,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        borderColor: '#cccccc',
        borderWidth: 1
    },
    chipText: {
        fontSize: 16,
        fontWeight: '500'
    }
 
})