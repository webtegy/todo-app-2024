import { View , StyleSheet , Text , TouchableOpacity} from 'react-native';


export default function CommonButton({pressEvent}) {
    return (
        <TouchableOpacity onPress={pressEvent} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button : {
        backgroundColor: '#8875FF',
        padding: 15,
        borderRadius : 5,
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation : 5
    },
    buttonText : {
        color : '#fff',
        fontSize : 18
    }
});
  