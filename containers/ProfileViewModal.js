import React, { Fragment } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import { CLEAR_PROFILE_MODAL } from "../actions/actionTypes";
import ProfileView from "./ProfileView";

const ProfileViewModal = (props) => {
    const dispatch = useDispatch();
    const hideListing = true;
    const modalView = true;

    const user_id = props.user_id;

    const closeModal = () => {
        props.closeModal();
        dispatch({type: CLEAR_PROFILE_MODAL});
        
    }
    return (
        <Fragment>
            {console.log(['PROFILE VIEW MODAL'], props.user_id)}
            {console.log(['PROFILE VIEW MODAL'], user_id)}
            {props.modalVisisbility && <View style={styles.containerView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.modalVisisbility}
                >
                    {user_id && <View style={styles.containerView}>
                        <View style={styles.modalView}>
                            <ProfileView hideListing={hideListing} user_id={user_id} modalView={modalView}></ProfileView>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => closeModal()}
                            >
                                <Text style={styles.textStyle}>Hide Profile</Text>
                            </Pressable>
                        </View>
                    </View>}
                </Modal>
            </View>}
        </Fragment>
    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        height: 600,
        margin: 20,
        minWidth: 300,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default ProfileViewModal;