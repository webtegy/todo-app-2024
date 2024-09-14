import { View,  StyleSheet , Text , TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


function Chip({emoji , text , active}){
    return (
        <View>
            <TouchableOpacity style={[styles.chip , {backgroundColor: active ? '#f0f0f0' : 'black'}]}>
                <Text style={[styles.chipText,  {color : active ? 'black' : 'white'}]}>{emoji + "  " + text}</Text>
            </TouchableOpacity>
        </View>
    )
}


export default function FilterList(){
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Chip active={true} emoji={'⚠️'} text={'Priority'} />
            <Chip active={false} emoji={'⚡'} text={'Status'} />
            <Chip active={false} emoji={'📁'} text={'Category'} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    chip: {
        margin: 10,
        padding: 10,
        paddingHorizontal : 25,
        borderRadius: 20,
        borderColor: '#cccccc',
        borderWidth: 1
    },
    chipText: {
        fontSize: 16,
        fontWeight: '500'
    }
 
})