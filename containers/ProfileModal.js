import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, SafeAreaView, Image, StatusBar, Dimensions } from 'react-native';
import Color from '../contants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import moment from 'react-moment';

//connect with state
import { connect } from 'react-redux';
import { getModalUserProfile, getModalListProfile } from '../actions/ProfileModalActions';

import Entypo from 'react-native-vector-icons/Entypo';

import profileJSON from '../stores/getProfile.json';
import { ScrollView } from 'react-native';

const globalPrompt = {
    "A": "In the living room I prefer to ...",
    "B": "I’m particular about ...",
    "C": "Together we could ...",
    "D": "On weekends ...",
    "E": "I like the thermostat at ...",
    "F": "Be prepared to put up with ...",
    "G": "I can cook ...",
    "H": "My pet ...",
    "I": "We'll get along if ...",
    "J": "Lights out at ...",
    "K": "I like being alone when ...",
    "L": "I'm the best to live with because ...",
    "M": "Custom Message - No Prompt"
  };

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    console.log('props value>>>', profileJSON.profile);

    this.state = {
        modalVisible: true
    }
  }

  componentDidMount() {
    const { user_id, listing_id } = this.props;
    console.log('propss>>>> component', user_id, listing_id);
    if(user_id !== null) {
        const payload = {
            Authorization: this.props.Authorization,
            user_id: user_id
          }
        this.props.getModalUserProfile(payload)
    } else if(listing_id !== null) {
        const payload = {
            Authorization: this.props.Authorization,
            listing_id: listing_id
          }
        this.props.getModalListProfile(payload)
    }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Rendering the component only if passed props value is changed
        console.log('propss>>>> component profile', nextProps.profileInfoApiMsg, this.props.profileInfoApiMsg, nextProps.user_id, this.props.user_id,nextProps.listing_id,this.props.listing_id);
        // console.log('nextState', nextState.emailText, this.state.emailText);
        if ((nextProps.profileInfoApiMsg !== this.props.profileInfoApiMsg) || nextProps.profileInfoListApiMsg !== this.props.profileInfoListApiMsg) {
            if(nextProps.profileInfoApiMsg === 'success' || nextProps.profileInfoListApiMsg === 'success') {
                return true
            } else if(nextProps.profileInfoApiMsg === 'error' || nextProps.profileInfoListApiMsg === 'error'){
                return true
                }
          return true;
        }
        
        if(nextProps.profileInfoApiMsg === 'success' && this.props.profileInfoApiMsg === 'success' && (nextProps.user_id !== this.props.user_id || nextProps.listing_id !== this.props.listing_id)) {
            console.log('nextprops>>>> success scenario', nextProps.profileInfoApiMsg, this.props.profileInfoApiMsg)
            const { user_id, listing_id } = this.props;
            if(nextProps.user_id !== null) {
                const payload = {
                    Authorization: this.props.Authorization,
                    user_id: nextProps.user_id
                  }
                this.props.getModalUserProfile(payload)
            } else if(nextProps.listing_id !== null) {
                const payload = {
                    Authorization: this.props.Authorization,
                    listing_id: nextProps.listing_id
                  }
                this.props.getModalListProfile(payload)
            }
            return true;
        }
        if(nextProps.profileInfoListApiMsg === 'success' && this.props.profileInfoListApiMsg === 'success' && (nextProps.user_id !== this.props.user_id || nextProps.listing_id !== this.props.listing_id)) {
            console.log('nextprops>>>> listing success scenario', nextProps.profileInfoListApiMsg, this.props.profileInfoListApiMsg)
            const { user_id, listing_id } = this.props;
            if(nextProps.user_id !== null) {
                const payload = {
                    Authorization: this.props.Authorization,
                    user_id: nextProps.user_id
                  }
                this.props.getModalUserProfile(payload)
            } else if(nextProps.listing_id !== null) {
                const payload = {
                    Authorization: this.props.Authorization,
                    listing_id: nextProps.listing_id
                  }
                this.props.getModalListProfile(payload)
            }
            return true;
        }
        if(nextProps.modalVisible !== this.props.modalVisible) {
            return true
        }
        if(nextState !== this.state) {
            return true;
        }
          return false;
      }
  setModalVisible = (visible, mode = 'open') => {
      this.setState({
        modalVisible: visible,
      });
  }
  removeSpecialCharacters = (str, element = null) => {
    if (str && element === 'dob') {
        return str.replace(/[^ -.,a-zA-Z0-9]/g, "");
    }
    if (str) {
      return str.replace(/[^a-zA-Z ]/g, "");
    }
    return str;
  }
  constructProfile = (modalProfile) => {
    const constructed_profile = {
        gender: {
            value: modalProfile?.profile?.gender !== null ? profileJSON.profile.personal_information.elements.gender.options[this.removeSpecialCharacters(modalProfile?.profile?.gender)] : null,
            icon: 'male',
            female_icon: 'female',
            type: 'Fontawesome'
        },
        dob: {
            value: modalProfile?.profile?.dob !== null ? this.removeSpecialCharacters(modalProfile?.profile?.dob, 'dob') : null,
            icon: 'calendar',
            type: 'Fontawesome'
        },
        ethnicity: {
            value: modalProfile?.profile?.ethnicity !== null ? profileJSON.profile.about.elements.ethnicity.options[this.removeSpecialCharacters(modalProfile?.profile?.ethnicity)] : null,
            icon: 'globe',
            type: 'Fontawesome'
        },
        hometown: {
            value: modalProfile?.profile?.hometown !== null ? this.removeSpecialCharacters(modalProfile?.profile?.hometown) : null,
            icon: 'home',
            type: 'Fontawesome'
        },
        relationship_status: {
            value: modalProfile?.profile?.relationship_status !== null ? profileJSON.profile.about.elements.relationship_status.options[this.removeSpecialCharacters(modalProfile?.profile?.relationship_status)] : null,
            icon: 'heart',
            type: 'Fontawesome'
        },
        dietary_preference: {
            value: modalProfile?.profile?.dietary_preference !== null ? profileJSON.profile.about.elements.dietary_preference.options[this.removeSpecialCharacters(modalProfile?.profile?.dietary_preference)] : null,
            icon: 'cutlery',
            type: 'Fontawesome'
        },
        work: {
            value: modalProfile?.profile?.work !== null ? this.removeSpecialCharacters(modalProfile?.profile?.work) : null,
            icon: 'briefcase',
            type: 'Fontawesome'
        },
        education_level: {
            value: modalProfile?.profile?.education_level !== null ? profileJSON.profile.about.elements.education_level.options[this.removeSpecialCharacters(modalProfile?.profile?.education_level)] : null,
            icon: 'graduation-cap',
            type: 'Fontawesome'
        },
        political_views: {
            value: modalProfile?.profile?.political_views !== null ? profileJSON.profile.about.elements.political_views.options[this.removeSpecialCharacters(modalProfile?.profile?.political_views)] : null,
            icon: 'university',
            type: 'Fontawesome'
        },
        religion: {
            value: modalProfile?.profile?.religion !== null ? profileJSON.profile.about.elements.religion.options[this.removeSpecialCharacters(modalProfile?.profile?.religion)] : null,
            icon: 'praying-hands',
            type: 'Fontawesome5'
        },
        pets: {
            value: modalProfile?.profile?.pets !== null ? this.removeSpecialCharacters(modalProfile?.profile?.pets) : null,
            icon: 'paw',
            type: 'Fontawesome'
        },
        smoking: {
            value: modalProfile?.profile?.smoking !== null ? profileJSON.profile.vices.elements.smoking.options[this.removeSpecialCharacters(modalProfile?.profile?.smoking)] : null,
            icon: 'smoking',
            type: 'Fontawesome5'
        },
        drinking: {
            value: modalProfile?.profile?.drinking !== null ? profileJSON.profile.vices.elements.drinking.options[this.removeSpecialCharacters(modalProfile?.profile?.drinking)] : null,
            icon: 'cocktail',
            type: 'Fontawesome5'
        },
        marijuana: {
            value: modalProfile?.profile?.marijuana !== null ? profileJSON.profile.vices.elements.marijuana.options[this.removeSpecialCharacters(modalProfile?.profile?.marijuana)] : null,
            icon: 'cannabis',
            type: 'Fontawesome5'
        },
        drugs: {
            value: modalProfile?.profile?.drugs !== null ? profileJSON.profile.vices.elements.drugs.options[this.removeSpecialCharacters(modalProfile?.profile?.drugs)] : null,
            icon: 'capsules',
            type: 'Fontawesome5'
        },
        pronouns: {
            value: modalProfile?.profile?.pronouns !== null ? profileJSON.profile.personal_information.elements.pronouns.options[this.removeSpecialCharacters(modalProfile?.profile?.pronouns)] : null,
            icon: 'user',
            type: 'Fontawesome'
        }
      }
      return constructed_profile;
  }

  renderProfile = (Profile) => {
    return (
        <View style={styles.tiles}>
            {Profile && Object.keys(Profile)?.map((item, i) => {
            console.log('item>>',item, Profile[item]?.icon, Profile[item]?.value)
            if(Profile[item]?.value !== null && item !== 'dob') {
                return (
                    <View key={i} style={styles.tilePadding}>
                        <View style={styles.tile}>
                            {Profile[item]?.type === 'Fontawesome' ?
                            <FontAwesome name={Profile[item]?.value === 'Female' ? Profile[item]?.female_icon : Profile[item]?.icon} size={20}></FontAwesome>
                            :
                            <FontAwesome5 name={Profile[item]?.icon} size={20}></FontAwesome5>
                            }
                            <Text style={{paddingLeft: 5}}>{Profile[item]?.value}</Text>
                        </View>
                    </View>
                );
            }
            })}
        </View>
    )
  }

  renderPrompt = (prompt) => {
    // console.log('prompt>>', prompt);
    return (
        <View style={styles.prompts}>
        {prompt && prompt.map((item, i) => {
            console.log('prompt item>>', item, prompt[i])
            return (
                <View key={i} style={styles.prompt}>
                    <Text>{globalPrompt[prompt[i]?.key]}</Text>
                    <Text>{prompt[i]?.value}</Text>
                </View>
            )
        })}
        </View>
    )
  }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  renderMedia = (modalProfile) => {
    // console.log('media>>>>>>>>>>>>>>>>', modalProfile);
    const display_name = modalProfile?.profile?.display_name !== null ? this.removeSpecialCharacters(modalProfile?.profile?.display_name) : null;
    const display_age = modalProfile?.profile?.dob !== null ? this.getAge(modalProfile?.profile?.dob) : null;
    console.log('display_age>>', display_age);
    return (
        <View style={{alignItems: 'center'}}>
        {modalProfile && modalProfile?.media && modalProfile?.media?.length > 0 && modalProfile?.media.map((item, i) => {
            console.log('media item>>', item, modalProfile?.media?.[0])
            return (
                <View key={i}>
                <Image style={styles.image} source={{ uri: "https://d138zt7ce8doav.cloudfront.net/".concat(item?.uri) }}></Image>
                {i === 0 &&
                    <View style={{ alignSelf: 'flex-start' }}>
                        <Text style={styles.personalData}>{`${display_name}, ${display_age}`}</Text>
                    </View>
                }
                </View>
            )
        })}
        {modalProfile && modalProfile?.media && modalProfile?.media?.length === 0 &&
            <View>
            <Image style={styles.image} source={require('../assets/png/blank-profile-picture.png')}></Image>
                <View style={{ alignSelf: 'flex-start' }}>
                <Text style={styles.personalData}>{`${display_name}, ${display_age}`}</Text>
                </View>
            </View>
        }
        </View>
    )
  }
  renderListMedia = (listProfile) => {
    // console.log('media>>', listProfile);
    const title = listProfile?.listing?.title !== null ? listProfile?.listing?.title : null;
    // const address = listProfile?.listing?.address_for_listing !== null ? listProfile?.listing?.address_for_listing : null;
    // const about_listing = listProfile?.listing?.about_listing !== null ? this.removeSpecialCharacters(listProfile?.listing?.about_listing) : null;

    return (
        <View style={{alignItems: 'center'}}>
        {listProfile && listProfile?.media && listProfile?.media?.length > 0 && listProfile?.media.map((item, i) => {
            console.log('media list item>>', item)
            return (
                <View key={i}>
                {i === 0 && title && 
                    <View style={{ alignSelf: 'flex-start', borderWidth: 1, borderRadius: 5, borderColor: '#E5E4E2', backgroundColor: '#E5E4E2',}}>
                        <Text style={[styles.listData_title, {width: 280}]}>{title}</Text>
                    </View>
                }
                <Image style={styles.listImage} source={{ uri: "https://d138zt7ce8doav.cloudfront.net/".concat(item?.uri) }}></Image>
                </View>
            )
        })}
        {listProfile && listProfile?.media && listProfile?.media?.length === 0 &&
                <View>
                {title && 
                    <View style={{ alignSelf: 'flex-start', borderWidth: 1, borderRadius: 5, borderColor: '#E5E4E2'}}>
                        <Text style={[styles.listData, {width: 280}]}>{title}</Text>
                    </View>
                }
                <Image style={styles.listImage} source={require('../assets/png/empty_image.jpg')}></Image>
                </View>
          }
        </View>
    )
  }

  renderListProfile = (listProfile) => {
    // console.log('listing>>', listProfile);
    const address = listProfile?.listing?.address_for_listing !== null ? listProfile?.listing?.address_for_listing : null;
    const about_listing = listProfile?.listing?.about_listing !== null ? this.removeSpecialCharacters(listProfile?.listing?.about_listing) : null;
    const lease = listProfile?.listing?.lease_duration !== null ? listProfile?.listing?.lease_duration : null;
    const rent = listProfile?.listing?.monthly_rent !== null ? listProfile?.listing?.monthly_rent?.toString() : null;
    const bedrooms = listProfile?.listing?.number_of_bedrooms !== null ? listProfile?.listing?.number_of_bedrooms : null;
    return (
        <View style={{ alignItems: 'center'}}>
        {/* {listProfile && listProfile?.media && listProfile?.media?.length > 0 && listProfile?.media.map((item, i) => { */}
            <View>
                {address &&
                    <View style={{ flexDirection: 'row',alignSelf: 'flex-start', borderWidth: 1, borderRadius: 7, borderColor: '#E5E4E2', backgroundColor: '#E5E4E2', marginTop: 20}}>
                        <Text style={styles.listData}>{address}</Text>
                    </View>
                }
                {about_listing &&
                    <View style={{ flexDirection: 'row',alignSelf: 'flex-start', borderWidth: 1, borderRadius: 7, borderColor: '#E5E4E2', backgroundColor: '#E5E4E2', marginTop: 20}}>
                        <Text style={styles.listData}>{about_listing}</Text>
                    </View>
                }
                <View style={styles.list_tiles}>
                <View style={styles.list_tilePadding}>
                    {lease &&
                        <View style={styles.list_tile}>
                        <Text>{`Lease Period: ${lease}`}</Text>
                        </View>
                    }
                </View>
                <View style={styles.list_tilePadding}>
                    {rent &&
                        <View style={styles.list_tile}>
                        <Text>{`Rent: $${rent}`}</Text>
                        </View>
                    }
                </View>
                <View style={styles.list_tilePadding}>
                    {bedrooms &&
                        <View style={styles.list_tile}>
                        <Text>{`No of bedrooms: ${bedrooms}`}</Text>
                        </View>
                    }
                </View>
                </View>
            </View>
        {/* })} */}
        </View>
    )
  }
  // onClickChat = () => {
  //   alert('chat is clicked');
  // }
  render() {
    // const { modalVisible } = this.state;
    // console.log('currentCheckBoxSelected>>', this.state.currentCheckBoxSelected)
    // console.log('profileEditInfo>>>', this.props.state.ethnicity);
    const { profileInfoApiMsg, profileInfoListApiMsg, modalProfile, listProfile, user_id, listing_id, modalVisible, setModalVisible } = this.props;
   console.log('propss>>>> listProfile', modalProfile);
   let Profile;
   if (modalProfile && modalProfile?.profile) {
    Profile = this.constructProfile(modalProfile);
    }
    console.log('propss>>>> profile', Dimensions.get('window').height);

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            // backgroundColor: 'rgba(52, 52, 52, 0.2)',
            height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
          }}>
          <StatusBar
            translucent
            // backgroundColor="#00BCD4"
            barStyle= {Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          />
        </View>
        {(profileInfoApiMsg === null) || (profileInfoApiMsg === 'request') || (profileInfoListApiMsg === 'request') ?
          <View>
            <Text>Page is loading...</Text>
          </View>
          :
          <View style={{backgroundColor: 'red'}}>
           
            <Modal
              animationType="fade"
              transparent={true}

              // hasBackdrop={true}
              // backdropOpacity={10}
              // backdropColor={"rgba(255, 0, 0, 0.8)"}
              visible={modalVisible}
              onRequestClose={()=>setModalVisible()}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalTitle}>{listing_id !== null ? 'List Details' : 'User Profile'}</Text>
                    <TouchableOpacity style={styles.closeIcon} onPress={()=>setModalVisible()}>
                      <Entypo name='cross' color={Color.black} size={24} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.lineStyle} />
                    {user_id !== null &&
                        <ScrollView>
                    {modalProfile && modalProfile?.media &&
                        <View>
                            {this.renderMedia(modalProfile)}
                        </View>
                    }
                    {this.renderProfile(Profile)}
                    {modalProfile && modalProfile?.prompts && modalProfile?.prompts?.length > 0 &&
                        <View>
                        {this.renderPrompt(modalProfile?.prompts)}
                        </View>
                    }
                    </ScrollView>
                    }
                    {listing_id !== null &&
                        <ScrollView>
                    {listProfile && listProfile?.media &&
                        <View>
                            {this.renderListMedia(listProfile)}
                        </View>
                    }
                    {listProfile && listProfile?.listing &&
                      <View>
                        {this.renderListProfile(listProfile)}
                      </View>
                      }
                    {/* {listProfile && listProfile?.user && listProfile?.user.goal_id === 3 &&
                        <TouchableOpacity
                            style={{flexDirection: 'row', marginTop: 30, alignSelf: 'flex-end'}}
                            onPress={() => this.onClickChat()}
                        >
                            <View style={{flexDirection: 'row', padding: 10, borderColor: '#000', borderWidth: 1, borderRadius: 10}}>
                                <FontAwesome name='comments-o' size={20}></FontAwesome>
                                <Text style={{marginLeft: 10}}>Chat</Text>
                            </View>
                        </TouchableOpacity>
                    } */}
                    </ScrollView>
                    }
                    {listing_id === null && user_id === null &&
                        <View style={{borderColor: '#ff0000',borderWidth: 1, borderRadius: 5, elevation: 2, backgroundColor: '#ff9999', height: 200}}>
                            <Text style={{color: 'black', textAlign: 'center', fontSize: 22, paddingTop: 70}}>Sorry, Something went wrong!!!</Text>
                        </View>
                    }
                </View>
              </View>
            </Modal>
          </View>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    image: {
        marginTop: 10,
        width: 280,
        height: 200,
      },
    listImage: {
        marginBottom: 10,
        width: 280,
        height: 200,
      },
      personalData: {
        // width: 280,
        // borderColor: '#E5E4E2',
        // borderWidth: 1,
        // borderRadius: 5,
        // elevation: 2,
        // backgroundColor: '#E5E4E2',
        // // left: '11%',
        // alignSelf: 'flex-start',
        // color: '#000',
        // fontSize: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        position: 'absolute',
        bottom: 20,
        left: 10,
        color: '#ffffff',
        fontSize: 20,
        zIndex: 100
      },
      listData_title: {
        backgroundColor: '#E5E4E2',
        alignSelf: 'flex-start',
        color: '#000',
        fontSize: 17,
        flexWrap: 'wrap',
        padding: 10,
      },
      listData: {
        // width: 260,
        // height: 90,
        // borderColor: '#E5E4E2',
        // borderWidth: 7,
        // borderRadius: 10,
        // elevation: 3,
        // backgroundColor: '#E5E4E2',
        // left: '11%',
        alignSelf: 'flex-start',
        color: '#000',
        fontSize: 17,
        flexWrap: 'wrap',
        padding: 10,
        
      },
      tiles: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginLeft: '5%',
        // marginRight: 50
      },
      tile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E4E2',
        borderColor: '#E5E4E2',
        borderWidth: 1,
        borderRadius: 5,
        elevation: 3,
        color: '#000000',
        padding: 3,
        paddingRight: 5,
        marginTop: 15
      },
      tilePadding: {
        paddingRight: 10
      },
      prompt: {
        display: 'flex',
        flexDirection: 'column',
        borderColor: '#E5E4E2',
        borderWidth: 1,
        borderRadius: 5,
        elevation: 2,
        width: 280,
        backgroundColor: '#E5E4E2',
        left: '5%',
        marginTop: 20,
        padding: 10
      },
      prompts: {
        marginTop: 20
      },
      list_tiles: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        flexWrap: 'wrap',
        // marginLeft: '5%',
        // marginRight: 50
      },
      list_tile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E4E2',
        borderColor: '#E5E4E2',
        borderWidth: 1,
        borderRadius: 5,
        elevation: 3,
        color: '#000000',
        padding: 3,
        paddingRight: 5,
        marginTop: 15
      },
      list_tilePadding: {
        paddingRight: 10

      },
  container: {
    padding: 2,
    flex: 1
  },
  lineStyle: {
    borderBottomColor: '#e5e7eb',
    borderWidth: 1,
    marginBottom: 20
  },


  // modal view style common
  modalView: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    elevation: 5,
    height: '95%'
  },


  //profile list model
  centeredView: {
    // flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // opacity: 0.1,
    justifyContent: "center",
    alignItems: 'center',
    // marginTop: 22
  },
  modalTitle: {
    width: '50%',
    // marginBottom: 0,
    fontSize: 15,
    textAlign: "left",
    fontWeight: 'bold',
  },
  closeIcon: {
    width: '50%',
    marginBottom: 5,
    alignItems: 'flex-end'
  },
});

const mapStateToProps = (state) => {
  return {
    Authorization: state.Authorization,
    profileInfoApiMsg: state?.profileInfoApiMsg,
    profileInfoListApiMsg: state?.profileInfoListApiMsg,
    current_goal: state?.current_goal,
    modalProfile: state?.modalProfile,
    listProfile: state?.listProfile
  }
}

const mapDispatchToProps = {
    getModalUserProfile,
    getModalListProfile,
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);

// export default ProfileEdit;