import AsyncStorage from '@react-native-async-storage/async-storage';

export default {

    testAsyncStorage: async () => {
        AsyncStorage.setItem('testKey', 'testValue');
        return await AsyncStorage.getItem('testKey ');
    },

}
