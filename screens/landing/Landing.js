import React from 'react';
import { View,  StyleSheet , Image } from 'react-native';
import CommonButton from '../../components/CommonButton';


export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
        <Image
            source={require('../../assets/landing/logo.png')}
            style={styles.logo}
            resizeMode="contain"
        />
        <View style={styles.buttonContainer}>
            <CommonButton pressEvent={() => navigation.replace('LandingManageTaskPage') } />
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
        width: 200,
        height: 200,
    },
        buttonContainer: {
        position: 'absolute',
        bottom: 50,
        width: '90%',
    },
})