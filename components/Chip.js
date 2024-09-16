import { View,  StyleSheet , Text , TouchableOpacity } from 'react-native';


export default function Chip({emoji , text , active , clickEventFunc}){
    return (
        <View>
            <TouchableOpacity onPress={() => {clickEventFunc(text) }} style={[styles.chip , {backgroundColor: active ? '#f0f0f0' : 'black'}]}>
                <Text style={[styles.chipText,  {color : active ? 'black' : 'white'}]}>{emoji + "  " + text}</Text>
            </TouchableOpacity>
        </View>
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