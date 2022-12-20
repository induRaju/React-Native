import { Component } from "react";
import { ScrollView } from "react-native";
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Apartments = (props) => {
    const {navigation} = props;
    // console.log("welcomeprops",navigation);
    const startChatHandler = () => {
        // console.log(props.navigation);
        // console.log("prop_navigations",props);
        navigation.navigate('Chat');
    }
    const viewProfileHandler = (event) => {
        navigation.navigate('Home');
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.likedApartments}>
                    <Image style={styles.image} source={require('../assets/png/houseimage.jpeg')}></Image>
                    <Ionicons name="chatbox-ellipses-outline" size={36} style={styles.chatBoxIcon}></Ionicons>
                    <Text style={styles.chatTile} onPress={startChatHandler}>Start Chat</Text>
                    <View style={styles.metaData}>
                        <View style={styles.tile}><Ionicons name="home-outline" size={20}></Ionicons><Text style={{paddingLeft: 6}}>3 Bhk</Text></View>
                        <View style={styles.viewProfileTile}><Text onPress={viewProfileHandler}>View Profile</Text></View>
                    </View>
                </View>
                <View style={styles.likedApartments}>
                    <Image style={styles.image} source={require('../assets/png/houseimage.jpeg')}></Image>
                    <Ionicons name="chatbox-ellipses-outline" size={36} style={styles.chatBoxIcon}></Ionicons>
                    <Text style={styles.chatTile} onPress={startChatHandler}>Start Chat</Text>
                    <View style={styles.metaData}>
                        <View style={styles.tile}><Ionicons name="home-outline" size={20}></Ionicons><Text style={{paddingLeft: 6}}>3 Bhk</Text></View>
                        <View style={styles.viewProfileTile}><Text onPress={viewProfileHandler}>View Profile</Text></View>
                    </View>
                </View>
                <View style={styles.likedApartments}>
                    <Image style={styles.image} source={require('../assets/png/houseimage.jpeg')}></Image>
                    <Ionicons name="chatbox-ellipses-outline" size={36} style={styles.chatBoxIcon}></Ionicons>
                    <Text style={styles.chatTile} onPress={startChatHandler}>Start Chat</Text>
                    <View style={styles.metaData}>
                        <View style={styles.tile}><Ionicons name="home-outline" size={20}></Ionicons><Text style={{paddingLeft: 6}}>3 Bhk</Text></View>
                        <View style={styles.viewProfileTile}><Text onPress={viewProfileHandler}>View Profile</Text></View>
                    </View>
                </View>

                <View style={{marginBottom: 15}}></View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    likedApartments: {
        marginTop: 21
    },
    image: {
        width: 286,
        height: 198
    },
    tiles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: 286
    },
    tile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        color: '#000000',
        width: 100,
        height: 27,
        marginTop: 25
    },
    chatTile: {
        borderColor: '#FCFCD9',
        borderWidth: 1,
        borderRadius: 6,
        color: '#000000',
        position: 'absolute',
        bottom: 45,
        right: 10,
        backgroundColor: '#FEFDC7',
        zIndex: 100,
        padding: 4.5,
        elevation: 18,
        shadowColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: {width: -2, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        fontSize: 12
    },
    viewProfileTile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000000',
        color: '#000000',
        width: 100,
        height: 27,
        marginTop: 25
    },
    metaData: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chatBoxIcon: {
        position: 'absolute',
        bottom: 36,
        right: 75,
        zIndex: 100,
    }
});

export default Apartments;