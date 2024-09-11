import React from 'react';
import { View,  StyleSheet , Image, Alert , Text } from 'react-native';
import CommonButton from '../../components/CommonButton';


export default function LandingOrganize({ navigation }) {
  return (
    <View style={styles.container}>
        <Image
            source={require('../../assets/landing/organize.png')}
            style={styles.logo}
            resizeMode="contain"
        />

        <Text style={styles.mainText}>Organize  your tasks</Text>
        <Text style={styles.smallText}>You can organize your daily tasks by adding your tasks into separate categories</Text>

        <View style={styles.buttonContainer}>
            <CommonButton text={'Get Started'} pressEvent={() => navigation.replace('LandingDaily')} />
        </View>
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor : '#121212'
    },
    logo: {
        width: 250,
        height: 250,
    },
        buttonContainer: {
        position: 'absolute',
        bottom: 50,
        width: '90%',
    },
    mainText : {
        fontSize: 35,
        color : '#ffffff',
        marginVertical : 30,
        fontWeight : 'bold'
    },
    smallText : {
        fontSize: 15,
        color : '#ffffff',
        marginVertical : 10,
        fontWeight : '400',
        textAlign : 'center',
        marginHorizontal : 20,
    }
})