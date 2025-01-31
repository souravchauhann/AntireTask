import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Surface } from 'react-native-paper';
import { FONTS } from '../../utlis';

const AppHeader = ({ style }) => {
    return (
        <Surface style={[styles.header, style]}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: "https://miro.medium.com/v2/resize:fit:1400/0*0fClPmIScV5pTLoE.jpg" }}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Mobulus Technology</Text>
                    <Text style={styles.subtitleText}>Mobulous Technologies is a top-notch mobile application development company</Text>
                </View>
                <View style={styles.notificationContainer}>
                    <View style={styles.notificationIconContainer}>
                        <Image
                            style={styles.notificationIcon}
                            source={require("../assets/images/notification.png")}
                        />
                    </View>
                </View>
            </View>
        </Surface>
    );
}

export default AppHeader;

const styles = StyleSheet.create({
    header: {
        height: 65,
        elevation: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "black",
        alignSelf: "center",
        width: "100%",
        paddingBottom: 5
    },
    container: {
        borderWidth: 0,
        width: "100%",
        height: "100%",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        flexDirection: "row"
    },
    logoContainer: {
        width: '15%',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    titleContainer: {
        width: '70%',
        borderWidth: 0,
        justifyContent: "center"
    },
    titleText: {
        fontSize: 15,
        fontFamily: FONTS.BalooThambi2Bold,
        marginTop: 4,
        color: "white"
    },
    subtitleText: {
        fontSize: 13,
        fontFamily: FONTS.BalooThambiMedium,
        lineHeight: 16,
        color: 'white'
    },
    notificationContainer: {
        width: '15%',
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notificationIconContainer: {
        backgroundColor: 'white',
        height: 28,
        width: 28,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: 'center'
    },
    notificationIcon: {
        height: 23,
        width: 23
    }
});