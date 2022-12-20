import { useEffect, useState,useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { DO_UN_FRIEND, GET_FRIENDS_LIST, GET_FRIEND_PROFILE, CHAT_WITH_USER, SEND_USER, CLEAR_PROFILE_MODAL, CONFIRM_LIST, GET_ROOMMATE_PROFILE } from "../actions/actionTypes";
import { senduser } from "../actions/ChatWithUserActions"
import Color from '../contants/Colors';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileViewModal from "./ProfileViewModal";
import { confirm_roommate, Load_LISTING } from '../actions/Confirmroommate'
import Tooltip from 'react-native-walkthrough-tooltip';

import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather';

function removeSpecialCharacters(str) {
    if (str) {
        return str.replace(/[^a-zA-Z0-9 ]/g, "");
    }
    return str;
}
const Friends = (props) => {
    const dispatch = useDispatch();
    const authorization = useSelector(state => state.Authorization);
    const friendsList = useSelector(state => state.friendsList);
    const friendsProfileList = useSelector(state => state.friendsProfileList);
    const listing = useSelector(state => state.confirmlistings)
    const isFocused = useIsFocused();
    const goal = useSelector(state => state.home_goal)
    const list = useSelector(state => state.load_listing)
    const api = useSelector(state => state.confirm_api)
    const roommatelist = useSelector(state => state.RoommateList)
    const roommateprofile = useSelector(state => state.RoommateListprofile)
    const beds = useSelector(state => state.noofbedrooms)
    const is_available = useSelector(state => state.isavailable)
    const Ref=useRef();
    const { navigation } = props;

    const [modalVisibility, setModalVisibility] = useState(false);
    const [userId, setUserId] = useState(null);
    const [tooltip, setTooltip] = useState(false);
    const [room_tooltip, setRoomTooltip] = useState(false);

    useEffect(() => {
        console.log('[Friends]isFocused', isFocused);
        if (isFocused === true) {
            // dispatch({type: CLEAR_PROFILE_MODAL});
            console.log('[Friends]GET_FRIENDS_LIST action dispacthed');
            dispatch({ type: GET_FRIENDS_LIST, payload: { authorization: authorization } });
            dispatch({ type: CONFIRM_LIST, payload: { Authorization: authorization } })
            const pay2 = { Authorization: authorization }
            dispatch(Load_LISTING(pay2))
            // 
            //
            // dispatch()

        }
    }, [isFocused]);

    useEffect(() => {
        if (friendsList && friendsList.length > 0 &&(Ref.current===undefined||Ref.current!==friendsList.length)) {
            console.log("[Friends](useEffect)[friendsList] ", friendsList);
            console.log("[Friends](useEffect)GET_FRIEND_PROFILE dispatched");
            Ref.current=friendsList.length;
            dispatch({ type: GET_FRIEND_PROFILE, payload: { userIds: friendsList, authorization: authorization } });
        }



    }, [friendsList]);
    useEffect(() => {
        if (roommatelist && roommatelist.length > 0 &&(Ref.cur===undefined||Ref.cur!==roommatelist.length)) {
            console.log("[Friends](useEffect)[friendsList] ", friendsList);
            console.log("[Friends](useEffect)GET_FRIEND_PROFILE dispatched");
            Ref.cur=roommatelist.length;
            dispatch({ type: GET_ROOMMATE_PROFILE, payload: { userIds: roommatelist, Authorization: authorization } });
        }



    }, [roommatelist]);


    const onClickConfirm = (userId) => {
        const pay = { Authorization: authorization, user_id: userId, type: 'Add' }
        dispatch(confirm_roommate(pay))

    }
    const onclickunconfirm = (userId) => {
        const pay = { Authorization: authorization, user_id: userId, type: 'Remove' }
        dispatch(confirm_roommate(pay))

    }


    const onClickChatIcon = (userId) => {
        console.log('Chat Icon Cliked for the user with userId: ', userId);
        // dispatch({type: SEND_USER, payload: {user_id: userId, Authorization: authorization}});
        // dispatch({type: CHAT_WITH_USER, payload: {user_id: userId, Authorization: authorization}});
        // navigation.navigate('ChatWithUserScreen');
        //  navigation.navigate('Chat', { screen: 'ChatWithUserScreen' });
        dispatch(senduser(userId));
        navigation.navigate('Chat', { screen: 'ChatWithUserScreen', initial: false });

    }

    const onClickImageHandler = (userId) => {
        console.log('[FRIENDS][onClickImageHandler] image clicked');
        setUserId(userId);
        setModalVisibility(true);
    }

    const onCloseModal = () => {
        console.log('[FRIENDS][closeModal] clicked');
        setModalVisibility(false);
        setUserId(null);
    };

    const onUnFriend = (userId) => {
        console.log('[Friends]onUnFriend DO_UN_FRIEND action triggered with user_id: ', userId);
        dispatch({ type: DO_UN_FRIEND, payload: { user_id: userId, authorization: authorization } })
    }

    const containerStyle = () => {
        if (modalVisibility) {
            return styles.modalBackDrop;
        }
        return styles.container;
    }
    return (


        <View style={{ flex: 1, flexDirection: 'column', display: 'flex', backgroundColor: 'white' }}>
                <View style={{ flex: 6 }}>
                <View style={{ margin: 5, padding: 5, borderRadius: 10, backgroundColor: 'white', borderColor: 'black', borderWidth: 1, display: "flex",flexDirection: "row" }}>
                <Text style={{ fontSize: 15, flex: 6, fontWeight: 'bold' }}>Friends List </Text>
                <View>
                <Tooltip
                      isVisible={tooltip}
                      content={<Text>Add roommate icon is visible only for eligible users who are not accepted as rooommates by other users.</Text>}
                      placement="bottom"
                      childContentSpacing={0}
                      onClose={() => setTooltip(false)}
                    //   style={{alignSelf: 'flex-end'}}
                    //   topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight:0}
                    >
                      <TouchableOpacity onPress={() => setTooltip(true)}>
                      <Feather name='info' color={"#7E43EE"} size={20} ></Feather>
                      </TouchableOpacity>
                    </Tooltip>
                    </View>
            </View>

                    <View style={{ margin: 5, padding: 5, backgroundColor: 'white', display: "flex", flexDirection: "row" }}>
                        <ScrollView>
                            {friendsList && friendsList.length > 0 && friendsProfileList && friendsProfileList.length > 0 && <View style={containerStyle()}>

                                {friendsProfileList.map(eachProfile => <View style={styles.friendList} key={eachProfile.user_id}>
                                    {eachProfile.image_url && <TouchableOpacity onPress={() => onClickImageHandler(eachProfile.user_id)}><Image style={styles.image} source={{ uri: "https://d138zt7ce8doav.cloudfront.net/".concat(eachProfile.image_url) }}></Image></TouchableOpacity>}
                                    {!eachProfile.image_url && <TouchableOpacity onPress={() => onClickImageHandler(eachProfile.user_id)}><Image style={styles.image} source={require('../assets/png/blank-profile-picture.png')}></Image></TouchableOpacity>}
                                    <Text style={styles.name}>
                                        {removeSpecialCharacters(eachProfile.display_name)}
                                    </Text>
                                    {goal === 1 && Number(beds) > 0 && eachProfile?.isavailable === false && is_available === 1 && <MaterialCommunityIcons name="home-plus" size={30} style={styles.startChatButton} onPress={() => onClickConfirm(eachProfile.user_id)}></MaterialCommunityIcons>}
                                    <FontAwesome5 name="user-minus" size={22} style={styles.unFriendIcon} onPress={() => onUnFriend(eachProfile.user_id)}></FontAwesome5>
                                    <Ionicons name="chatbox-ellipses-outline" size={26} style={styles.chatBoxIcon} onPress={() => onClickChatIcon(eachProfile.user_id)}></Ionicons>
                                    <View style={{ flexDirection: 'row', marginTop: 30, right: 80 }} >
                                    </View>

                                </View>)}

                            </View>}
                            {friendsList && friendsList.length == 0 &&
                                <View style={{
                                    justifyContent: 'center',
                                    textAlign: 'center', alignContent: 'center', alignItems: 'center', overflow: 'hidden',
                                    backgroundColor: "#B5BFE3", height: '80%', borderRadius: 10, margin: 20
                                }}>

                                    <Feather name='info' color={"#7E43EE"} size={30} >Info</Feather>
                                    <Text style={{ margin: 20, fontSize: 18, color: "#7E43EE" }}> No Friends, make new friends by sending request!</Text>
                                </View>
                            }
                        </ScrollView>
                    </View>
                </View>
                <ProfileViewModal modalVisisbility={modalVisibility} user_id={userId} closeModal={onCloseModal}></ProfileViewModal>

                {goal === 1 && <View style={{ flex: 6 }}>
                    <View style={{ margin: 5, padding: 5, borderRadius: 10, backgroundColor: 'white', borderColor: 'black', borderWidth: 1, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, flex: 6,fontWeight: 'bold' }}>Roommate List </Text>
                        <View>
                         <Tooltip
                            isVisible={room_tooltip}
                            content={<Text>Click on remove roommates icon if you want to change your roommates.</Text>}
                            placement="bottom"
                            childContentSpacing={0}
                            onClose={() => setRoomTooltip(false)}
                            //   style={{alignSelf: 'flex-end'}}
                            // topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight:0}
                            >
                            <TouchableOpacity onPress={() => setRoomTooltip(true)}>
                            <Feather name='info' color={"#7E43EE"} size={20} ></Feather>
                            </TouchableOpacity>
                            </Tooltip>
                            </View>
                    </View>
                    <View style={{ margin: 5, padding: 5, backgroundColor: 'white', display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <ScrollView>
                            {roommatelist && roommatelist.length > 0 && roommateprofile && roommateprofile.length > 0 && <View style={containerStyle()}>

                                {roommateprofile.map(eachProfile => <View style={styles.friendList} key={eachProfile.user_id}>
                                    {eachProfile.image_url && <TouchableOpacity onPress={() => onClickImageHandler(eachProfile.user_id)}><Image style={styles.image} source={{ uri: "https://d138zt7ce8doav.cloudfront.net/".concat(eachProfile.image_url) }}></Image></TouchableOpacity>}
                                    {!eachProfile.image_url && <TouchableOpacity onPress={() => onClickImageHandler(eachProfile.user_id)}><Image style={styles.image} source={require('../assets/png/blank-profile-picture.png')}></Image></TouchableOpacity>}
                                    <Text style={styles.name}>{removeSpecialCharacters(eachProfile.display_name)}

                                    </Text>

                                    {goal === 1 && is_available === 1 && <MaterialCommunityIcons name="home-minus" size={30} style={styles.startChatButton} onPress={() => onclickunconfirm(eachProfile.user_id)}></MaterialCommunityIcons>}
                                    <FontAwesome5 name="user-minus" size={22} style={styles.unFriendIcon} onPress={() => onUnFriend(eachProfile.user_id)}></FontAwesome5>
                                    <Ionicons name="chatbox-ellipses-outline" size={26} style={styles.chatBoxIcon} onPress={() => onClickChatIcon(eachProfile.user_id)}></Ionicons>
                                    <View style={{ flexDirection: 'row', marginTop: 30, right: 80 }} >



                                    </View>

                                </View>

                                )}


                            </View>}
                            {roommatelist && roommatelist.length == 0 && goal === 1 &&
                                <View style={{
                                    justifyContent: 'center',
                                    textAlign: 'center', alignContent: 'center', alignItems: 'center', overflow: 'hidden',
                                    backgroundColor: "#B5BFE3", height: '80%', borderRadius: 10, margin: 20
                                }}>

                                    <Feather name='info' color={"#7E43EE"} size={30} >Info</Feather>
                                    <Text style={{ margin: 20, fontSize: 18, color: "#7E43EE" }}>There are no roommates.Please add roommates by clicking on Add roommates if you have friends!</Text>

                                </View>
                            }
                        </ScrollView>
                    </View>
                </View>
                }


            </View>
            )

}
            const styles = StyleSheet.create({
                container: {
                display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

    },
            modalBackDrop: {
                opacity: 0
    },
            buttonContainer: {
                display: 'flex',
            justifyContent: 'flex-end'
    },
            name: {
                position: 'relative',
            paddingLeft: 10,
            fontSize: 16,
            width: 140
    },
            friendList: {
                display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'stretch',
            marginBottom: 10,
            // borderBottomColor: 'black',
            // borderBottomWidth: 1,
            paddingBottom: 10,
            // backgroundColor: 'grey',
            // elevation: 18,
            elevation: 12,
    },
            image: {
                width: 62,
            height: 62,
            borderRadius: 41,
            marginLeft: 15
    },
            unFriendIcon: {
                position: 'absolute',
            right: 10,
        // marginBottom: 45
    },
            chatBoxIcon: {
                position: 'absolute',
            right: 60
    },
            startChatButton: {
                position: "absolute",
            right: 110
        //left: 200,
        // color: Color.white,
        // backgroundColor: Color.black,
        // borderColor: '#000000',
        // borderWidth: 3,
        // fontSize: 15,
        // textAlign: 'center',
        // left:0,
        // padding: 5,
        // margin: 10,
        // marginTop:30,
        // borderRadius: 10,
        // fontWeight: 'bold',
        // flexDirection:'column'

    },
            unFriendButton: {
                position: "absolute",
            right: 0,
            color: Color.white,
            backgroundColor: Color.black,
            borderColor: '#000000',
            borderWidth: 3,
            fontSize: 15,
            textAlign: 'center',
            padding: 5,
            margin: 10,
            borderRadius: 10,
            fontWeight: 'bold'
    }
});

            export default Friends;
