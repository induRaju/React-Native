import { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const LikedPersons = (props) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imagePositioning}>
                    <Image style={styles.image} source={require('../assets/png/w2.jpg')}></Image>
                </View>
                <View style={styles.tiles}>
                    <View style={styles.tilePadding}>
                        <View style={styles.tile}>
                            <Ionicons name="man" size={12}></Ionicons><Text style={{ fontSize: 16, marginLeft: -1 }}>Male</Text>
                        </View>
                    </View>
                    <View style={styles.tilePadding}>
                        <View style={styles.tile}>
                            <Ionicons name="earth-outline" size={12}></Ionicons><Text style={{ fontSize: 16, marginLeft: -1 }}>East Asian, Indian, Marathi</Text>
                        </View>
                    </View>
                    <View style={styles.tilePadding}>
                        <View style={styles.tile}>
                            {/* <View style={styles.media_item}> */}
                            <MaterialCommunityIcons
                                name="home-heart"
                                size={20}
                                color="black"
                            /><Text style={{ fontSize: 16, marginLeft: -1 }}>Liberal</Text>
                        </View>
                    </View>
                    <View style={styles.tilePadding}>
                        <View style={styles.tile}>
                            <Ionicons name="home-outline" size={12}></Ionicons><Text style={{ fontSize: 16, marginLeft: -1 }}>Brooklyn, New York</Text>
                        </View>
                    </View>

                    <View style={styles.tilePadding}>
                        <View style={styles.tile}>
                            {/* <View style={styles.media_item}> */}
                            <Entypo
                                name="suitcase"
                                size={20}
                                color="black"
                            /><Text style={{ fontSize: 16, marginLeft: -1 }}>Software Developer, Google</Text>
                        </View>
                    </View>

                    <View style={styles.tilePadding}>
                        <View style={styles.tile}>
                            <Ionicons name="man" size={12}></Ionicons><Text style={{ fontSize: 16, marginLeft: -1 }}>Christian</Text>
                        </View>
                    </View>
                    <View style={styles.tilePadding}>
                        <View style={styles.tile}>
                            <Ionicons name="man" size={12}></Ionicons><Text style={{ fontSize: 16, marginLeft: -1 }}>Vegan</Text>
                        </View>
                    </View>
                    {/* <View style={styles.tilePadding}>
                        <View style={styles.tile}>
                            <Ionicons name="man" size={12}></Ionicons><Text style={{ fontSize: 16, marginLeft: -1 }}>Male</Text>
                        </View>
                    </View> */}
                    <View style={styles.tilePadding}>
                        <View style={styles.tile}>
                            {/* <MaterialIcons name='keyboard-arrow-right' color={Color.black} size={24} /> */}
                            <MaterialIcons name="smoke-free" size={12} /><Text style={{ fontSize: 16, marginLeft: -1 }}>NonSmoker</Text>
                        </View>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 50,
        justifyContent: 'center'
    },
    imagePositioning: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 286,
        height: 286,
        marginBottom: 10
    },
    tiles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginLeft: 30,
        marginRight: 30
    },
    tile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        color: '#000000',
        padding: 3,
        paddingRight: 5,
        marginTop: 15
    },
    tilePadding: {
        paddingRight: 15
    }
});

export default LikedPersons;
