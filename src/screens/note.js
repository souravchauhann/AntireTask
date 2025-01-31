import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { FONTS } from '../../utlis';

const Note = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>
                Hello Sir/Madam, 
                {'\n\n'}
                We are using some dummy data for various screens to save time. Please ignore these placeholders. 
                Currently, we do not have a design, which is why we have created this rough layout. 
                If you have any Figma designs, please provide , and I will create a design similar to the Figma specifications.
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 20, 
    },
    text: {
        color: 'white',
        fontSize: 19,
        textAlign: 'center', 
        fontFamily:FONTS.BalooThambiRegular
    },
});

export default Note;