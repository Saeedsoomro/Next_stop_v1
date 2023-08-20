import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import { Colors } from '../constants';
import Navbar from '../components/Navbar';


export default function Tracking({navigation}) {



    return (

        <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor='#fffefe' />

            <View style={{ flexDirection: 'row' }}>

                {/* back button */}

                <TouchableOpacity activeOpacity={0.5}
                    style={{
                        width: 45,
                        height: 45,
                        position: 'absolute',
                        left: 10,
                        top: 10,
                        borderWidth: 1,
                        borderRadius: 30,
                        borderColor: "black",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onPress={() => navigation.navigate("OrderHistory")}
                >

                    <Image style={{ width: 35, height: 25, }} source={require('../assets/images/icons/back-arrow2.png')}></Image>


                </TouchableOpacity>

                <Text style={{ position: 'absolute', left: 120, top: 15, color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 26 }}>Tracking</Text>

            </View>

            <View style={{ position: 'absolute', top: 80, width: '90%', height: 400, marginLeft: 18, alignItems: 'center' }}>

                <View style={{
                    width: 190,
                    height: 190,
                    borderWidth: 1,
                    borderColor: "#797979",
                    borderRadius: 150,
                    shadowColor: 'rgba(0, 0, 0, 0.8)',
                    backgroundColor: '#fff',
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 5,
                    justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto'
                }}>

                    <Image style={{ width: 230, height: 240, alignSelf: 'center', marginBottom: 15 }}
                        resizeMode="contain"
                        source={require('../assets/images/icons/tracking.png')} />

                </View>


                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'black', marginTop: 10, }}>30 - 40 min</Text>

                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 21, color: 'black', marginTop: 20, }}>Location of venue</Text>

               
                
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 15, color: 'black', marginTop: 10, }}>15 - 20 min drive</Text>



                <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate("Homepage")}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Go Back to Home</Text>
                </TouchableOpacity>

            </View>


            {/*  Bottom navigation bar */}

            <View style={{ width: "100%", height: 70, position: 'absolute', top: 666, }}>
                <Navbar navigation={navigation}></Navbar>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        width: 180,
        height: 40,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#797979',
        alignSelf: 'center',
        marginTop: 30

    },
    navbar: {
        position: 'relative',
        borderTopWidth: 2.5,
        width: "20%",
        height: 45,
        alignItems: 'center'

    },

    navbarImage: {
        width: 50,
        height: 60,
        position: 'absolute',
        top: -9
    }

});
