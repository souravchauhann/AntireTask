import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, Platform } from 'react-native';
import { FONTS } from '../../utlis';

const About = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated
                barStyle="light-content" 
                backgroundColor="black" 
                translucent 
            />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>About Us</Text>
                <Text style={styles.text}>
                    Welcome to Mobulus 
                </Text>
                <Text style={styles.text}>
                    At Mobulus, we believe in harnessing the power of technology to enhance your daily life. Our app is designed to provide you with a seamless and intuitive experience, whether you're looking to [insert primary function of the app, e.g., connect with friends, manage your tasks, track your fitness, etc.].
                </Text>
                <Text style={styles.title}>Our Mission</Text>
                <Text style={styles.text}>
                    Our mission is to [insert mission statement, e.g., "simplify the way you manage your daily activities" or "help you stay connected with your loved ones"]. We strive to create a platform that is not only user-friendly but also packed with features that cater to your needs.
                </Text>
                <Text style={styles.title}>Key Features</Text>
                <Text style={styles.text}>
                    • User-Friendly Interface: Navigate effortlessly through our app with a clean and intuitive design.
                </Text>
                <Text style={styles.text}>
                    • Personalized Experience: Customize your settings and preferences to make the app truly yours.
                </Text>
                <Text style={styles.text}>
                    • Real-Time Updates: Stay informed with instant notifications and updates tailored to your interests.
                </Text>
                <Text style={styles.text}>
                    • Secure and Private: Your privacy is our priority. We use advanced security measures to protect your data.
                </Text>
                <Text style={styles.title}>Join Our Community</Text>
                <Text style={styles.text}>
                    We are more than just an app; we are a community. Join thousands of users who are already enjoying the benefits of [App Name]. Share your feedback, suggestions, and experiences with us to help us improve and grow.
                </Text>
                <Text style={styles.title}>Get in Touch</Text>
                <Text style={styles.text}>
                    Have questions or need assistance? Our dedicated support team is here to help! Reach out to us at [support email] or visit our website at [website URL].
                </Text>
                <Text style={styles.text}>
                    Thank you for choosing [App Name]. We are excited to be a part of your journey!
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    scrollContainer: {
        padding: 20,
        paddingTop:Platform.OS == "android"? 40:0
    },
    title: {
        color: 'white',
        fontSize: 24,
        // fontWeight: 'bold',
        marginVertical: 10,
        fontFamily:FONTS.BalooThambiSemiBold
    },
    text: {
        color: 'white',
        fontSize: 16,
        marginVertical: 5,
        fontFamily:FONTS.BalooThambiRegular
    },
});

// Make this component available to the app
export default About;