import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, FlatList, Modal, SafeAreaView, ScrollView, Switch, Image, ActivityIndicator } from 'react-native';
import Checkbox from 'expo-checkbox';
import Color from '../contants/Colors';
import Prompts_constants from '../contants/Prompts_constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system';

// import moment from 'react-moment';

//connect with state
import { connect } from 'react-redux';
import { ProfileEditUpdateJSON, ProfileListUpdate, profileViewRequest, ProfilePromptUpdate, ProfileMediaUpdate, ProfileMediaDelete, ProfilePromptDelete } from '../actions/ProfileEditActions';

import Entypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import profileJSON from '../stores/getProfile.json';
// import { color } from 'react-native-elements/dist/helpers';
global.prompt = [{
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
}]
global.profile = [{
  "about": {
    "label": "About Me",
    "elements": {
      "ethnicity": {
        "label": "Ethnicity",
        "type": "radio",
        "options": {
          "A": "American Indian",
          "B": "Black/African Descent",
          "C": "East Asian",
          "D": "Hispanic/Latino",
          "E": "Middle Eastern",
          "F": "Pacific Islander",
          "G": "South Asian",
          "H": "Southeast Asian",
          "I": "White/Caucasian",
          "J": "Other"
        }
      },
      "hometown": {
        "label": "Hometown",
        "type": "text",
        "placeholder": "Chicago, IL or Mumbai, India"
      },
      "relationship_status": {
        "label": "Relationship Status",
        "type": "radio",
        "options": {
          "A": "Single",
          "B": "In a Relationship",
          "C": "Engaged",
          "D": "Married",
          "E": "In a civil partnership",
          "F": "In a domestic partnership",
          "G": "In an open relationship",
          "I": "It's Complicated",
          "H": "Separated",
          "J": "Divorced",
          "K": "Widowed"
        }
      },
      "dietary_preference": {
        "label": "Dietary Preference",
        "type": "radio",
        "options": {
          "A": "No Restrictions",
          "B": "Vegetarian",
          "C": "Vegan",
          "D": "Ketogenic",
          "E": "Halal",
          "F": "Paleo",
          "G": "Dairy free and lactose free",
          "H": "Gluten free and coeliac",
          "I": "Tree nut and peanut allergies",
          "J": "Fish and shellfish allergies",
          "K": "Other"
        }
      },
      "work": {
        "label": "Work",
        "type": "text",
        "placeholder": "Product Manager at Google"
      },
      "education_level": {
        "label": "Education Level",
        "type": "radio",
        "options": {
          "HS": "High School",
          "UG": "Undergrad",
          "PG": "Postgrad"
        }
      },
      "political_views": {
        "label": "Political Views",
        "type": "radio",
        "options": {
          "A": "Liberal",
          "B": "Moderate",
          "C": "Conservative",
          "D": "Not Political",
          "E": "Other"
        }
      },
      "religion": {
        "label": "Religious Beliefs",
        "type": "radio",
        "options": {
          "A": "Agnostic",
          "B": "Atheist",
          "C": "Buddhist",
          "D": "Catholic",
          "E": "Christian",
          "F": "Hindu",
          "G": "Jewish",
          "H": "Muslim",
          "I": "Sikh",
          "J": "Spiritual",
          "K": "Other"
        }
      },
      "pets": {
        "label": "Pets",
        "type": "checkbox",
        "options": {
          "dog": "Dog",
          "cat": "Cat",
          "monkey": "Monkey",
          "bird": "Bird",
          "rabbit": "Rabbit",
          "pig": "Pig",
          "fish": "Fish",
          "snake": "Snake",
          "mouse-field": "Mouse",
          "turtle": "Turtle",
          "spider": "Spider",
          "paw": "Other"
        }
      }
    }
  },
  "vices": {
    "label": "Vices",
    "elements": {
      "smoking": {
        "label": "Smoking",
        "type": "radio",
        "options": {
          "Y": "Yes",
          "N": "No",
          "S": "Socially"
        }
      },
      "drinking": {
        "label": "Drinking",
        "type": "radio",
        "options": {
          "Y": "Yes",
          "N": "No",
          "S": "Socially"
        }
      },
      "marijuana": {
        "label": "Marijuana",
        "type": "radio",
        "options": {
          "Y": "Yes",
          "N": "No",
          "S": "Socially"
        }
      },
      "drugs": {
        "label": "Drugs",
        "type": "radio",
        "options": {
          "Y": "Yes",
          "N": "No",
          "S": "Socially"
        }
      }
    }
  },
  "personal_information": {
    "label": "Personal Information",
    "elements": {
      "display_name": {
        "label": "Full Name",
        "type": "text",
        "placeholder": "Full Name",
        "info": "Hide your name to show your initials to unmatched profiles."
      },
      "dob": {
        "label": "Date of Birth",
        "type": "date",
        "placeholder": "Date of Birth",
        "info": "Only your age is visible on your profile."
      },
      "gender": {
        "label": "Gender",
        "type": "radio",
        "options": {
          "F": "Female",
          "M": "Male",
          "N": "Non-Binary"
        }
      },
      "pronouns": {
        "label": "Pronouns",
        "type": "checkbox",
        "options": {
          "A": "she/her",
          "B": "he/him",
          "C": "they/them",
          "D": "ze/zir",
          "E": "xe/xim",
          "F": "ey/em",
          "G": "ve/ver"
        }
      }
    }
  }
}];

let profileVicesList = [
  { label: "Smoking", id: "1" },
  { label: "Drinking", id: "2" },
  { label: "Marijuana", id: "3" },
  { label: "Drugs", id: "4" }
];

let profilePersonalList = [
  { label: "Full Name", id: "1" },
  { label: "Date of Birth", id: "2" },
  { label: "Gender", id: "3" },
  { label: "Pronouns", id: "4" }
];

let aboutList = []
global.profileList = [];
global.switch_enable = false
const completeResponse = [];
let onlyOnce = true;
class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    //console.log('props value>>>', profileJSON.profile);

    this.state = {
      profileInfo: {
        profileJSON: profileJSON.profile
      },
      modalVisible: false,
      promtModalVisible: false,
      headingText: '',
      profileList: [],
      ethnicity: null,
      hometown: null,
      relationship_status: null,
      dietary_preference: null,
      work: null,
      education_level: null,
      political_views: null,
      religion: null,
      pets: null,
      smoking: null,
      drinking: null,
      marijuana: null,
      drugs: null,
      display_name: null,
      dob: new Date(),
      gender: null,
      pronouns: null,
      date: null,
      currentItem: [],
      prompt_clicked: true,
      currentResponseTitle: '',
      current_prompt_index: 0,
      responseTextBox: '',
      showDeleteButton: false,
      prompt_item: [
        {
          heading: 'Add a prompt',
          answer: '---',
          index: 1,
          key: null
        },
        {
          heading: 'Add a prompt',
          answer: '---',
          index: 2,
          key: null
        },
        {
          heading: 'Add a prompt',
          answer: '---',
          index: 3,
          key: null
        }
      ],
      current_switch: false,
      media_item: [
        {
          index: 1,
          uri: null,
          id: null,
          location: null,
          uimage: "",
          img_0: null
        },
        {
          index: 2,
          uri: null,
          id: null,
          location: null,
          uimage: "",
          img_1: null
        },
        {
          index: 3,
          uri: null,
          id: null,
          location: null,
          uimage: "",
          img_2: null
        }
      ],
      showDatePicker: false,
      currentCheckBoxSelected: [],
      selected_radioButton: null,
      updatedList: false,
      selected_textValue: null,
      selected_date: null
    };
  }

  componentDidMount() {
    // console.log('Authorization>>>>', this.props.Authorization);
    // this.createLocalRequestData(profileJSON);
    const { profileInfo } = this.state;
    //console.log('componentDidMount', this.props.current_goal)
     if (this.props.current_goal === '3' && profileInfo && profileInfo?.profileJSON) {
      const asArray = Object.entries(profileInfo?.profileJSON);
      const filtered = asArray.filter(([key, value]) => key === 'personal_information');
      const just_string = Object.fromEntries(filtered);
      // separateProfile = just_string['personal_information']
      this.setState({
        profileInfo: {
          profileJSON: just_string
        }
      })
      //console.log('index>>>>', just_string);


    } 
    //console.log('completeResponse>>>>>>', completeResponse)
    const payload = {
      Authorization: this.props.Authorization
    }
    this.props.profileViewRequest(payload)
  }

  // image render functions
  renderImagerender = () => {
    const { profileEditInfo } = this.props;
    let profile_media;
    if (profileEditInfo !== null && profileEditInfo?.media !== null && profileEditInfo?.media?.length > 0) {
      profile_media = profileEditInfo?.media;
      profile_media?.map((image, i) => {
        //console.log('profile_media>>', profile_media[i])
        profile_media[i] = {
          ...image,
          index: i + 1
        }
      })
    }
    // console.log('profile_media>>>111', profile_media, this.state.media_item);
     let media_copy = [...this.state.media_item]
     media_copy.map((item, i) => {
      return profile_media?.map((image) => {
        // console.log('media_item>>>111', image?.index, item?.index);
        if(image?.index === item?.index) {
          media_copy[i] = {
            ...item,
            uri: image?.uri,
            id: image?.id,
            location: 'API'
          }
        }
      })
    })
    // this.setState({
    //   media_item: currentTab_copy
    // })
    //console.log('media_item>>>', media_copy)
    return (
      <View>
        <Text style={{ fontSize: 17, marginTop: 30, marginLeft: 20, marginBottom: 10 }}>Upload Images</Text>
        <View style={[styles.lineStyle, { marginHorizontal: 20, borderColor: Color.grey }]} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {media_copy !== null && media_copy !== '' && media_copy?.length > 1 && media_copy.map((item, index) => {
            {/* console.log('promt item>>>', item); */ }
            return (
              <View style={{ flex: 4 }} key={index}>
                {/* {this.renderImage(item, profile_media)} */}
                {item?.uri === null?
                    <TouchableOpacity
                      style={styles.media_view}
                      onPress={() => this.onClickMedia(item?.index, media_copy)}
                    >
                      <View style={styles.media_item}>
                        <Feather name='plus' color={Color.black} size={24} />
                      </View>
                    </TouchableOpacity>
                    :
                      <TouchableOpacity
                      style={styles.media_view}
                      onPress={() => this.onClickMedia(item?.index, media_copy)}
                    >
                      <View style={styles.media_item_image}>
                        <Image source={{ uri: item?.location === null ? item?.uri : "https://d138zt7ce8doav.cloudfront.net/".concat(item.uri) }} style={{ width: 105, height: 110 }} />
                      </View>
                    </TouchableOpacity>
                  }
                {item?.uri !== null &&
                  <TouchableOpacity style={{ paddingLeft: 50 }} onPress={() => this.onDeleteMedia(item?.index, media_copy)}>
                    <MaterialIcons name='delete' color={Color.red} size={24} />
                  </TouchableOpacity>
                }

              </View>
            )
          })}
        </View>
      </View>
    )
  }

  onClickMedia = async (index, media_copy) => {
    //console.log('media clicked>>', index)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    const uimage = `data:image/jpg;base64,${result.base64}`;
    //console.log('result>>>', result);
    // if(option === 'save') {
    // let updateMedia = {
    //   img_0: '',
    //   img_1: '',
    //   img_2: ''
    // };
    let currentMedia_copy = [...media_copy]

    currentMedia_copy.map((item, i) => {
      if (item?.index === index) {
        currentMedia_copy[i] = {
          ...item,
          uri: result?.uri,
          uimage: uimage
        }
      } 
    })
    //console.log('currentMedia_copy>>', currentMedia_copy)
    currentMedia_copy.map((item, i) => {
    // const base64 = FileSystem.readAsStringAsync(item?.uri, { encoding: 'base64' });
    // console.log('base64>>>', base64);

      // if(item?.index === 1) {
      //   updateMedia = {
      //     ...updateMedia,
      //     img_0: item?.uimage || item?.uri
      //   }
      // }
      // if(item?.index === 2) {
      //   updateMedia = {
      //     ...updateMedia,
      //     img_1: item?.uimage || item?.uri
      //   }
      // }
      // if(item?.index === 3) {
      //   updateMedia = {
      //     ...updateMedia,
      //     img_2: item?.uimage || item?.uri
      //   }
      // }
    })
    //console.log('updateMedia>>', updateMedia);
    let updateMedia ={
      img: uimage,
      Authorization: this.props.Authorization
    }
    this.props.ProfileMediaUpdate(updateMedia)

    this.setState({
      media_item: currentMedia_copy
    })
    // }

  }

  onDeleteMedia = (index, media_copy) => {
    let currentMedia_copy = [...media_copy]
    let delete_media;
    currentMedia_copy.map((item, i) => {
      // console.log('current>.....', currentPrompt_copy[i], item)
      currentMedia_copy[i] = {
        ...item,
        uri: null,
        uimage: ""
      }
      if (item?.index === index) {
        // currentMedia_copy[i] = {
        //   ...item,
        //   uri: null,
        //   uimage: ""
        // }
        delete_media = {
          media_id: item?.id,
          Authorization: this.props.Authorization
        }
      }
    })
    this.props.ProfileMediaDelete(delete_media)
    this.setState({
      media_item: currentMedia_copy
    })
  }

  //prompt section functions
  renderPromptList = () => {
    const { profileEditInfo, current_goal } = this.props;
    console.log('this.state.prompt_item>>', this.state.prompt_item);
    return (
      <View>
        {current_goal !== '3' && this.state.prompt_item !== null && this.state.prompt_item.length > 1 && this.state.prompt_item.map((item, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                style={styles.prompt_View}
                onPress={() => this.onClickPromt(item?.index)}
              >
                <View style={styles.prompt_item}>
                  <View style={{ width: '100%' }}>
                    {profileEditInfo !== null && profileEditInfo?.prompts !== null && (Array.isArray(profileEditInfo?.prompts === true)) && profileEditInfo?.prompts.length > 0 && profileEditInfo?.prompts?.some((ele) => ele.index === item.index) ?
                      <Text>{this.renderPromptTile(item)}</Text>
                      :
                      <View>
                        <Text>{item?.heading}</Text>
                        <Text>{item?.answer}</Text>
                      </View>
                    }
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }
  renderPromptTile = (item) => {
    const { profileEditInfo } = this.props;
    // console.log('promt item>>>', this.props.profileEditInfo?.prompts);
    return (
      <View>
        {profileEditInfo !== null && profileEditInfo?.prompts !== null && (Array.isArray(profileEditInfo?.prompts === true)) && profileEditInfo?.prompts.length > 0 && profileEditInfo?.prompts.map((element, index) => {
          {/* console.log('Prompts_constants>>>', item, element) */ }
          if (item?.index === element?.index) {
            return (
              <View key={index}>
                <Text>{Prompts_constants[element?.key]}</Text>
                <Text>{element?.value}</Text>
              </View>
            )
          }
        })}
      </View>
    )

  }
  onClickPromt = (index) => {
    this.setState({
      current_prompt_index: index
    })
    this.setPromptModalVisible(true, 'open', index);
  }
  setPromptModalVisible = (visible, option = null, prompt_index) => {
    const { currentResponseTitle, responseTextBox, current_prompt_index, current_prompt_key } = this.state;
    const { profileEditInfo } = this.props;
    // console.log('current_response index fi', prompt_index)
    // console.log('current_response', profileEditInfo?.prompts?.some((ele) => ele.index === prompt_index))
    if (profileEditInfo !== null && profileEditInfo?.prompts !== null && (Array.isArray(profileEditInfo?.prompts === true)) && profileEditInfo?.prompts?.length > 0 && profileEditInfo?.prompts?.some((ele) => ele.index === prompt_index)) {
      // console.log('current_response', profileEditInfo?.prompts?.filter((ele) => ele.index === current_prompt_index+1)?.[0])
      const responseTextBox = profileEditInfo?.prompts?.filter((ele) => ele.index === prompt_index)?.[0]
      this.setState({
        promtModalVisible: visible,
        response_clicked: true,
        prompt_clicked: false,
        responseTextBox: responseTextBox?.value,
        currentResponseTitle: Prompts_constants[responseTextBox?.key],
        current_prompt_key: responseTextBox?.key,
        showDeleteButton: true
      });
    } else {
      // console.log('current_response not filled');

      this.setState({
        promtModalVisible: visible,
        response_clicked: false,
        prompt_clicked: true,
        responseTextBox: '',
        showDeleteButton: false
      });
    }
    if (option === 'save') {
      let currentPrompt_copy = [...this.state.prompt_item]
      let updatePrompt;
      currentPrompt_copy.map((item, i) => {
        //console.log('current>.....', currentPrompt_copy[i], responseTextBox)
        if (item?.index === current_prompt_index) {
          currentPrompt_copy[i] = {
            ...item,
            heading: currentResponseTitle,
            answer: responseTextBox
          }
          updatePrompt = {
            answer: responseTextBox,
            index: item?.index,
            key: current_prompt_key,
            value: responseTextBox,
            Authorization: this.props.Authorization,
            element: 'prompts'
          }
        }
      })
      this.props.ProfilePromptUpdate(updatePrompt)
      this.setState({
        prompt_item: currentPrompt_copy
      })
    } else if (option === 'delete') {
      const deletePrompt = {
        index: prompt_index,
        Authorization: this.props.Authorization,
        element: 'prompts'
      }
      //console.log('current>.....delete', prompt_index )
      this.props.ProfilePromptDelete(deletePrompt)
    } else if (option === 'cancel') {
      //console.log('current>.....cancel')
    }
  }
  PromtListModal = () => {
    const promptObject = prompt[0];
    let promtList = []
    Object.keys(promptObject).forEach((key) => {
      // console.log('radio>>>', key, promptObject[key])
      const individualPrompt = {
        key: key,
        value: promptObject[key]
      }
      promtList.push(individualPrompt)

    })
    return (
      <View>
        {promtList.map((item, index) => {
          return (
            <View style={{ flex: 1 }} key={index}>
              <TouchableOpacity
                style={styles.promtStyle}
                onPress={() => this.onClickPromptItem(item?.key, item?.value)}
              >
                <View>
                  <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 15 }}>{item?.value}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }
  ResponseListModal = () => {
    const { promtModalVisible, current_prompt_index, showDeleteButton } = this.state;
    return (
      <View>
        <Text style={{ fontSize: 18, marginBottom: 20, marginTop: 40 }}>{this.state.currentResponseTitle}</Text>
        <TextInput
          style={styles.response_input}
          onChangeText={(val) => this.onChangeResponseItem(val)}
          value={this.state.responseTextBox}
          placeholder={'Your response here...'}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={400}
          multiline={true}
          numberOfLines={5}
        />
        <View style={{ flexDirection: 'row', width: '50%', height: 30, marginTop: 20 }}>
          <TouchableOpacity style={styles.save_button} onPress={() => this.setPromptModalVisible(!promtModalVisible, 'save', current_prompt_index)}>
            <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
              <Text style={styles.saveButton_text}>SAVE</Text>
            </View>
          </TouchableOpacity>
          {showDeleteButton &&
          <TouchableOpacity style={styles.delete_button} onPress={() => this.setPromptModalVisible(!promtModalVisible, 'delete', current_prompt_index)}>
            <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
              <Text style={styles.deleteButton_text}>DELETE</Text>
            </View>
          </TouchableOpacity>
          }
          <TouchableOpacity style={styles.cancel_button} onPress={() => this.setPromptModalVisible(!promtModalVisible, 'cancel', current_prompt_index)}>
            <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
              <Text style={styles.cancelButton_text}>CANCEL</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  topNavigation = () => {
    const { prompt_clicked, response_clicked } = this.state;
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity
          style={[styles.modal_prompt_View, { borderBottomColor: prompt_clicked === true ? Color.black : '#D3D3D3' }]}
          onPress={() => this.onClickPromt_modal()}
        >
          <View style={styles.top_navigation_item}>
            <View>
              <Text style={{ color: prompt_clicked === true ? Color.black : '#D3D3D3' }}>PROMPT</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modal_response_View, { borderBottomColor: response_clicked === true ? Color.black : '#D3D3D3' }]}
          onPress={() => this.onClickResponse_modal()}
        >
          <View style={styles.top_navigation_item}>
            <View>
              <Text style={{ color: response_clicked === true ? Color.black : '#D3D3D3' }}>RESPONSE</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  onClickPromptItem = (current_prompt_key, chosen_heading) => {
    console.log('item>>>prompttttt', current_prompt_key);
    this.setState({
      prompt_clicked: false,
      response_clicked: true,
      currentResponseTitle: chosen_heading,
      current_prompt_key: current_prompt_key
    })
    let currentPrompt_copy = [...this.state.prompt_item]

    currentPrompt_copy.map((item, i) => {
      // console.log('current>.....', this.state.current_prompt_index, item)

      if (item?.index === this.state.current_prompt_index) {
        currentPrompt_copy[i] = {
          ...item,
          key: current_prompt_key,
          heading: chosen_heading
        }
      }
    })
    // console.log('currentPrompt_copy>.....', currentPrompt_copy)

    this.setState({
      prompt_item: currentPrompt_copy
    })
  }

  onChangeResponseItem = (value) => {
    // console.log('response value>>>', value);
    this.setState({
      responseTextBox: value
    });
  }
  onClickPromt_modal = () => {
    this.setState({
      prompt_clicked: true,
      response_clicked: false
    });
  }
  onClickResponse_modal = () => {
    this.setState({
      response_clicked: true,
      prompt_clicked: false,
    })
  }

  // profile list section
  renderProfileList = (key, index) => {
    const { profileInfo } = this.state;
    const { profileEditInfo, current_goal } = this.props;
    // console.log('profileEditnApiMsg>>', this.props.profileEditInfo?.profile);

    // const separateProfile = profileEditInfo[key];
    let separateProfile;
    separateProfile = profileInfo && profileInfo?.profileJSON[key]
    console.log('separateProfile>>', separateProfile)
    return (
      <View key={index} style={{ marginTop: 10 }}>
        {Object.keys(separateProfile).map((key, index) => {
          const separateTab = separateProfile[key];
          {/* console.log('separateProfile>>>>>>', key, separateTab); */ }

          return (
            <View key={index}>
              {key === 'label' &&
                <View style={{ marginHorizontal: 20 }}>
                  <Text style={styles.subHeadings}>{separateProfile[key]}</Text>
                  <View style={[styles.lineStyle, { marginVertical: 10 }]} />
                </View>
              }
              {key === 'elements' &&
                <View>
                  {Object.keys(separateTab).map((element, index) => {
                    const switch_name = element+'_hidden'
                    {/* console.log('aboutList>>>>',element, this.props.state[element]); */ }
                    {/* console.log('element>>>', element, separateTab[element]) */ }
                    return (
                      <View key={index}>
                        <TouchableOpacity
                          // style={{backgroundColor: Color.grey}}
                          onPress={() => this.onClickItem(separateTab[element], element)}
                        >
                          <View style={styles.item}>
                            <View style={{ width: '50%' }}>
                              <View style={{flexDirection: 'row'}}>
                              <Text style={styles.text}>{separateTab[element].label}</Text>
                              {/* {profileEditInfo && profileEditInfo?.profile && profileEditInfo?.profile?.[switch_name] === 1 &&
                                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                                  <Ionicons name='eye-off-sharp' color={'blue'} size={20}/>
                                  <Text style={{color: 'blue'}}>Hidden</Text>
                                </View>
                              } */}
                              </View>
                              {this.props.state && this.props.state[element] ?
                                <Text numberOfLines={1}>{this.props.state[element]}</Text>
                                :
                                profileEditInfo && profileEditInfo?.profile && profileEditInfo?.profile?.[element] &&
                                <Text numberOfLines={1}>{this.renderDisplayValue(profileEditInfo?.profile?.[element], separateTab[element], element)}</Text>
                              }
                              {/* <Text style={styles.text}>{this.renderDisplayText(this.state[element], element, separateTab[element])}</Text> */}
                            </View>
                            <View style={{ width: '50%', alignItems: 'flex-end' }}>
                              <MaterialIcons name='keyboard-arrow-right' color={Color.black} size={24} />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )

                  })
                  }
                </View>
              }
            </View>
          )
        })}
      </View>
    )
  }
  renderDisplayValue = (res_value, current_value, element) => {

    if (element === 'dob') {
      return res_value && res_value.replace(/[^ -.,a-zA-Z0-9]/g, "");
    } else if (current_value?.type === 'text') {
      return res_value && res_value.replace(/[^ .,a-zA-Z0-9]/g, "");
    } else if (current_value?.type === 'radio') {
      let replaced_value = res_value && res_value.replace(/[^ .,a-zA-Z0-9]/g, "");
      let options = current_value?.options
      return options[replaced_value]
      // console.log('options>>>', options[replaced_value], replaced_value)
    } else if (current_value?.type === 'checkbox') {
      let replaced_value = res_value && res_value.replace(/[^ .,a-zA-Z0-9]/g, "");
      let options = current_value?.options
      let newval = replaced_value.split(',')
      let nnewval=newval.map((step)=>options[step.replace(" ","")])
      let newresult="";
      for(let i=0; i<nnewval.length; i++){
        if (i!=nnewval.length-1){
          newresult+=nnewval[i]+' , ';
        }
        else{
          newresult+=nnewval[i]
        }
      }
      // console.log('res_value>>', options[replaced_value],replaced_value,options,newval,nnewval,newresult);
      return (newresult === 'undefined' ? "": newresult);
      //   console.log('res_value>>', options[replaced_value],replaced_value,options);
      // return options[replaced_value];
      // return res_value && res_value.replace(/[^ .,a-zA-Z0-9]/g, "");
    }
  }
  renderReplaceValue = (res_value, element) => {
    const { currentType } = this.state;
    if (element === 'dob') {
      let date_value = res_value && res_value.replace(/[^ -.,a-zA-Z0-9]/g, "");
      let month = date_value.slice(5, 7) - 1;
      // console.log('month>>>>', month, date_value.slice(0,4), date_value.slice(8,10))
      let date = new Date(date_value.slice(0, 4), month, date_value.slice(8, 10))
      // console.log('month>>>>', date)
      return date;
    } else if (currentType === 'text') {
      return res_value && res_value.replace(/[^ .,a-zA-Z0-9]/g, "");
    } else if (currentType === 'radio') {
      console.log('res_value', res_value.replace(/[^ .,a-zA-Z0-9]/g, ""))

      return res_value && res_value.replace(/[^ .,a-zA-Z0-9]/g, "");
    } else if (currentType === 'checkbox') {
      return res_value && res_value.replace(/[^ .,a-zA-Z0-9]/g, "");
    }
  }
  setModalVisible = (visible, mode = 'open') => {
    console.log('currentItem>>', this.state.currentTab_temp);
    const { currentType, currentItem } = this.state;
    const title = currentItem;
    const { profileEditInfo } = this.props;
    let appendedTextValue = '';
    let appended_check_key = '';
    let updatedData;
    let replacedValue = '';

    if (mode === 'save') {
      // console.log('title>>>222', mode, title, this.state[title], this.state.selected_textValue);

      if (currentType === 'radio') {
        replacedValue += '[' + '"' + this.state.selected_radioButton?.[0] + '"' + ']';
        replacedValue=this.state.selected_radioButton?.[0]?replacedValue:profileEditInfo.profile[title]

        console.log('item>>>>radio', replacedValue);

        updatedData = {
          name: title,
          [title]: replacedValue,
          element: 'profile',
          hidden: false,
          value: replacedValue,
          type: currentType,
          Authorization: this.props.Authorization
        }
      } else if (currentType === 'checkbox') {
        let currentTab_copy = [...this.state[title]]
        currentTab_copy.map((item, i) => {
          console.log('item>>>>checkbox', item);
          if (item.isSelected === true) {
            appendedTextValue += appendedTextValue === '' ? item?.label : ' ' + ',' + ' ' + item?.label
            appended_check_key += appended_check_key === ''? '"' + item.value + '"': ',' + '"' + item?.value + '"';
          }
        })
        updatedData = {
          name: title,
          [title]: appendedTextValue,
          element: 'profile',
          hidden: false,
          value: '[' + appended_check_key?.replace("/", "") + ']',
          type: currentType,
          Authorization: this.props.Authorization
        }
        console.log("updatedData>>>", updatedData);

      } else if (currentType === 'text') {
        replacedValue += '[' + '"' + this.state.selected_textValue + '"' + ']';
        replacedValue=this.state.selected_textValue?.[0]?replacedValue:profileEditInfo.profile[title]
        // console.log('item>>>>text', replacedValue);

        updatedData = {
          name: title,
          [title]: replacedValue,
          element: 'profile',
          hidden: false,
          value: replacedValue,
          type: currentType,
          Authorization: this.props.Authorization
        }
      } else if (currentType === 'date') {
        const date = `${this.state.dob.getFullYear()}-${this.state.dob.getMonth() + 1}-${this.state.dob.getDate()}`
        // console.log('date>>', date);
        updatedData = {
          name: 'dob',
          dob: date,
          element: 'profile',
          hidden: false,
          value: date,
          type: currentType,
          Authorization: this.props.Authorization
        }
      }
      this.props.ProfileListUpdate(updatedData);
      this.setState({
        modalVisible: visible,
        selected_radioButton: null,
        selected_textValue: null,
        // updatedList: true
      });
    } else if (mode === 'cancel') {
      if (currentType === 'radio') {
        let currentTab_copy = currentItem && this.state[title] && [...this.state[title]]
        // console.log('currentTab_copy', currentItem, this.state[title])
        currentTab_copy && currentTab_copy.map((item, i) => {
          // console.log('currentTab_copy>>>', item)
          // if (currentTab_copy[i]?.label === value?.label) {
          currentTab_copy[i] = {
            ...item,
            isSelected: false
          }
          // }
        })
        this.setState({
          modalVisible: visible,
          selected_radioButton: null,
          [title]: currentTab_copy,
        });
      } else if (currentType === 'text') {
        if (profileEditInfo?.profile && profileEditInfo?.profile?.[title]) {
          replacedValue = this.renderReplaceValue(profileEditInfo?.profile?.[title])
        }
        let currentTab_copy = currentItem && this.state[title]
        currentTab_copy = {
          ...currentTab_copy,
          value: replacedValue
        }
        this.setState({
          modalVisible: visible,
          selected_textValue: null
        });
      } else if (currentType === 'date') {
        if (profileEditInfo?.profile && profileEditInfo?.profile?.[title]) {
          replacedValue = this.renderReplaceValue(profileEditInfo?.profile?.[title], 'dob')
        }
        this.setState({
          modalVisible: visible,
          selected_date: null
        });
      } else if (currentType === 'checkbox') {
        let currentTab_copy = [...this.state.selected_checkbox]

        this.setState({
          modalVisible: visible,
          [title]: currentTab_copy,
        });
      }
    } else {
      this.setState({
        modalVisible: visible,
      });
    }

  }

  onClickItem = (item, title) => {
    let Options = item?.options;
    let listOfRadio = []
    const { profileEditInfo } = this.props;
    let replacedValue = '';
    // console.log('item>>>>>>>>>', title);
    this.setModalVisible(true);
    this.setState({
      headingText: item?.label,
      currentType: item?.type,
      currentItem: title,
      // selected_textValue: null
    })

    if (item.type === 'radio') {
      if (this.state[title] === null) {
        Object.keys(Options).forEach((key) => {
          // console.log('radio>>>', this.state[title])
          const individualObject = {
            name: title,
            value: [key],
            label: Options[key],
            hidden: false,
            type: item?.type,
            isSelected: false,
          }
          listOfRadio.push(individualObject)

        });
        if (listOfRadio.length === Object.keys(Options).length) {
          this.setState({
            [title]: listOfRadio,
            // currentItem: [title],
            // currentType: item?.type,

          })
        }
      }
    } else if (item.type === 'text') {
      if (this.state[title] === null) {
        const text_value = {
          placeholder: item?.placeholder,
          value: '',
          isSwitchEnable: false,
          type: item?.type,
        }
        this.setState({
          [title]: text_value,
          // currentItem: [title],
          // currentType: item?.type
        })
      }
    } else if (item.type === 'checkbox') {
      if (profileEditInfo?.profile && profileEditInfo?.profile?.[title]) {
        // console.log('first if');
        replacedValue = profileEditInfo?.profile?.[title].replace(/[^ .,a-zA-Z0-9]/g, "");
        // console.log('replacedValue>>>', replacedValue)
        let newval=replacedValue.split(',').map((step)=>Options[step.replace(" ","")])
        Object.keys(Options).forEach((key) => {
          // console.log('replacedValue>>> options>>>', Options[key])
          // console.log('replacedValue>>> check',Options[key], Options[key], newval?.includes(Options[key]))
          const individualObject = {
            name: title,
            value: key,
            label: Options[key],
            hidden: false,
            type: item?.type,
            isSelected: newval?.includes(Options[key]) === true ? true : false,
            isSwitchEnable: false
          }
          listOfRadio.push(individualObject)
          // console.log('radio>>>', listOfRadio)
        });
        // console.log('listOfRadio', listOfRadio);
        if (listOfRadio.length === Object.keys(Options).length) {
          this.setState({
            [title]: listOfRadio,
            selected_checkbox: listOfRadio
            // currentItem: [title],
            // currentType: item?.type
          })
        }
      } else if (this.state[title] === null) {
        Object.keys(Options).forEach((key) => {
          const individualObject = {
            name: title,
            value: key,
            label: Options[key],
            hidden: false,
            type: item?.type,
            isSelected: false,
            isSwitchEnable: false
          }
          listOfRadio.push(individualObject)
          // console.log('radio>>>', listOfRadio)
        });
        // console.log('listOfRadio', listOfRadio.length, Object.keys(Options).length);
        if (listOfRadio.length === Object.keys(Options).length) {
          this.setState({
            [title]: listOfRadio,
            selected_checkbox: listOfRadio
            // currentItem: [title],
            // currentType: item?.type
          })
        }
      }

    } else if (item.type === 'date') {
      if (this.state[title] === null) {
        const text_value = {
          placeholder: item?.placeholder,
          info: item?.info,
          value: '',
          isSwitchEnable: false,
          type: item?.type
        }
        this.setState({
          dob: text_value,
          // currentItem: [title],
          // currentType: item?.type
        })
      }
    }
  }

  updatRadioButton = (value, currentTab, index) => {

    let currentTab_copy = [...this.state[currentTab]]
    // let currentTab_temp = [...this.state[currentTab]]
    currentTab_copy.map((item, i) => {
      // console.log('current>.....', currentTab_copy[i]?.label, value)
      if (currentTab_copy[i]?.label === value?.label) {
        currentTab_copy[i] = {
          ...value,
          isSelected: true
        }
      } else {
        currentTab_copy[i] = {
          ...currentTab_copy[i],
          isSelected: false
        }
      }
    })
    this.setState({
      [currentTab]: currentTab_copy,
      selected_radioButton: value?.value,
      // updatedList: false
      // currentTab_temp: currentTab_temp
    })

  }

  updatCheckbox = (value, currentTab, index) => {

    let currentTab_copy = [...this.state[currentTab]]
    currentTab_copy.map((item, i) => {
      if (currentTab_copy[i]?.label === value?.label) {
        currentTab_copy[i] = {
          ...value,
          isSelected: !currentTab_copy[i]?.isSelected
        }
      }
    })
    // console.log('.............................................',)
    // console.log('current>.....', currentTab_copy)


    this.setState({
      [currentTab]: currentTab_copy
    })

  }

  onChangeText = (value, currentTab, placeholder) => {
    // console.log('selected_textValue value>>>', value);
    let currentTab_copy = this.state[currentTab]
    currentTab_copy = {
      ...currentTab_copy,
      value: value
    }
    // console.log('currentTab_copy>>>text', currentTab_copy);

    this.setState({
      [currentTab]: currentTab_copy,
      selected_textValue: value
    })
  }

  renderDisplayText = (item, element, completeTab) => {
    const title = this.state.currentItem;

    // console.log('item>>>>>>', item)
    const { date, modalVisible } = this.state;
    const { state } = this.props
    // state.inclu
    if (element === title && (Array.isArray(this.props?.state?.[title]) === true) && this.props?.state?.[title][0]?.type === 'radio' && this.props?.state?.[title] !== null && modalVisible === false) {
      // console.log('type is radio');
      // console.log('each element>>>', element, completeTab);
      const textItem = this.props?.state?.[title]?.map((ele, index) => {
        // console.log('ele>>>>', ele, element);
        if (ele?.isSelected === true) {
          return (
            <View key={index}>
              <Text>{ele?.label}</Text>
            </View>
          )
        }
      });
      return textItem;
    } else if (element === title && (Array.isArray(this.props?.state?.[title]) === true) && this.props?.state?.[title][0]?.type === 'checkbox' && this.props?.state?.[title] !== null && modalVisible === false) {
      let appendedTextValue = '';
      // console.log('type is checkbox', item)
      this.props?.state?.[title]?.map((ele, index) => {
        // console.log('ele>>>>', ele, element);
        if (ele?.isSelected === true) {
          appendedTextValue += appendedTextValue === '' ? ele?.label : ' ' + ',' + ' ' + ele?.label
        }
        return appendedTextValue;
      });
      return (
        <View>
          <Text>{appendedTextValue}</Text>
        </View>
      )
      // return textItem;
    } else if (element === title && (Array.isArray(this.props?.state?.[title]) === false) && this.props?.state?.[title]?.type === 'text' && this.props?.state?.[title] !== null && modalVisible === false) {
      // console.log('type is object');
      // console.log('each element>>>',item, element, completeTab);
      return (
        <View>
          <Text>{this.props?.state?.[title].value}</Text>
        </View>
      )

    } else if (element === title && (Array.isArray(this.props?.state?.[title]) === false) && this.props?.state?.[title]?.type === 'date' && this.props?.state?.[title] !== null && modalVisible === false) {
      // console.log('type is dob');
      // console.log('each element>>>',item, element, completeTab);
      return (
        <View>
          <Text>{`${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`}</Text>
        </View>
      )

    } else {
      return (
        <View>
          <Text>{'-'}</Text>
        </View>
      )
    }
  }
  toggleSwitch = (event) => {
    console.log('event>>', event);
    // this.setState({
    //   current_switch: !this.state.current_switch
    // })
    switch_enable = event
  }
  radioComponent = () => {
    const { currentItem, selected_radioButton } = this.state;
    const { state, profileEditInfo } = this.props;
    const currentTab = currentItem
    const switch_name = currentTab+'_hidden'
    let replacedValue;
    console.log('this.state[currentTab]>>', currentTab, switch_name, profileEditInfo?.profile?.[switch_name]);
    // switch_enable = profileEditInfo?.profile?.[switch_name] === 1 ? true : false
    // switch_enable = this.state[currentTab]?.some((item) => {
    //   return (item?.isSwitchEnabled === true)
    // })
    // console.log('switch_enable>>>', switch_enable);
    // this.setState({
    //   current_switch: switch_enable
    // })
    if (profileEditInfo?.profile && profileEditInfo?.profile?.[currentTab]) {
      replacedValue = this.renderReplaceValue(profileEditInfo?.profile?.[currentTab])
    }

    return (
      <View>
        <RadioForm
          formHorizontal={false}
          animation={true}
        >
          {
            this.state[currentTab]?.map((obj, i) => {
              {/* console.log('obj>>>', obj, this.props.state[currentTab]) */ }
              {/* console.log('replaceValue>>', replacedValue, obj.value[0]) */ }

              return (
                <RadioButton
                  labelHorizontal={true} key={i}
                  // onPress={() => this.updatRadioButton(obj, currentTab, i)}
                >
                  {(selected_radioButton === null) ?
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={(replacedValue === obj.value[0]) ? true : obj.isSelected}
                      // isSelected={(state[currentTab] !== null && state[currentTab] === obj.label) || (replacedValue === obj.value[0]) ? true : obj.isSelected}
                      onPress={() => this.updatRadioButton(obj, currentTab, i)}
                      borderWidth={1}
                      buttonColor={'#000000'}
                      selectedButtonColor={'black'}
                      buttonSize={6}
                      buttonOuterSize={12}
                      buttonStyle={{}}
                    /> :
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={selected_radioButton === obj.value}
                      onPress={() => this.updatRadioButton(obj, currentTab, i)}
                      borderWidth={1}
                      buttonColor={'#000000'}
                      selectedButtonColor={'black'}
                      buttonSize={6}
                      buttonOuterSize={12}
                      buttonStyle={{}}
                    />
                  }
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => this.updatRadioButton(obj, currentTab, i)}
                    labelStyle={{ fontSize: 20, color: 'black', marginBottom: 10 }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              )
            })
          }
        </RadioForm>
        {/* <View style={{alignItems: 'flex-start'}}>
          <Switch 
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={switch_enable ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={(ele)=>this.toggleSwitch(ele)}
            value={switch_enable}
          />
        </View> */}
      </View>
    )
  }

  checkbox_component = () => {
    const { currentItem } = this.state;
    const currentTab = currentItem

    // console.log('replacedValue>>111', this.state[currentTab]);

    const checkbox_field = this.state[currentTab]?.map((obj, i) => {
      // const replacedValue_split = replacedValue?.split(',')
      return (
        <TouchableOpacity key={i} onPress={() => this.updatCheckbox(obj, currentTab, i)}>
          <View style={styles.Checkbox_section} key={i}>
            <Checkbox
              // value = {replacedValue_split.some((item) => item === obj?.label.toLowerCase())}
              value={this.state[currentTab][i].isSelected}
              onValueChange={() => this.updatCheckbox(obj, currentTab, i)}
              color={this.state[currentTab][i].isSelected ? '#1c64f2' : undefined}
            />
            <Text style={{ fontSize: 17, marginLeft: 10 }}>{obj?.label}</Text>
          </View>
        </TouchableOpacity>
      )
    });
    return checkbox_field;
  }
  text_component = () => {
    const { currentItem, selected_textValue } = this.state;
    // console.log('selected_textValue>>', selected_textValue);
    const { profileEditInfo } = this.props;
    const currentTab = currentItem
    let replacedValue = '';
    if (profileEditInfo?.profile && profileEditInfo?.profile?.[currentTab]) {
      replacedValue = this.renderReplaceValue(profileEditInfo?.profile?.[currentTab])
    }
    // console.log('selected_textValue>>', selected_textValue, replacedValue, profileEditInfo?.profile?.[currentTab]);

    return (
      <TextInput
        style={styles.input}
        onChangeText={(val) => this.onChangeText(val, currentTab, this.state[currentTab]?.placeholder)}
        // value={this.state[currentTab]?.value}
        value={(selected_textValue === null && replacedValue !== null && replacedValue !== '') ? replacedValue : selected_textValue}
        placeholder={this.state[currentTab]?.placeholder}
        placeholderTextColor='#D3D3D3'
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={35}
      />
    )
  }
  date_component = () => {
    const { currentItem, dob, selected_date } = this.state;
    const { profileEditInfo } = this.props;
    const currentTab = currentItem
    let replacedValue = '';
    if (profileEditInfo?.profile && profileEditInfo?.profile?.[currentTab]) {
      replacedValue = this.renderReplaceValue(profileEditInfo?.profile?.[currentTab], 'dob')
    }
    console.log('dob>>>', dob, replacedValue)
    return (
      <View style={{ borderWidth: 2, borderColor: Color.black, marginHorizontal: 10, height: 40 }}>
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => {
            this.setState({
              showDatePicker: true
            })
          }}
          style={{}}>
          {selected_date === null && replacedValue !== null && replacedValue !== ''?
            <Text style={{ padding: 5 }}>{`${replacedValue.getFullYear()}-${replacedValue.getMonth() + 1}-${replacedValue.getDate()}`}</Text>
            :
            <Text style={{ padding: 5 }}>{`${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`}</Text>
          }
          {this.state.showDatePicker &&
            <DateTimePicker
              testID="dateTimePicker"
              // value={dob}
              value={(selected_date === null && replacedValue !== null && replacedValue !== '') ? replacedValue : dob}
              // maximumDate={new Date(2013, 0, 1)}
              maximumDate={new Date()}
              mode={'date'}
              is24Hour={true}
              onChange={(event) => this.onChangeDate(event, currentTab, this.state[currentTab])}
              style={{width: 320, height: 40, position: 'absolute', right: 15}}
            />
          }
        </TouchableOpacity>
      </View>
    )
  }
  onChangeDate = (event, currentTab, placeholder) => {
    const currentDate = new Date(event?.nativeEvent?.timestamp);
    // console.log('currentDate>>', new Date(event?.nativeEvent?.timestamp));
    if (currentDate !== null && currentDate != undefined) {
      this.setState({
        dob: currentDate,
        selected_date: currentDate,
        showDatePicker: false,
      })
    }

  };

  render() {
    const { modalVisible, headingText, currentItem, currentType, promtModalVisible, prompt_clicked, response_clicked, profileInfo, current_prompt_index } = this.state;
    // console.log('currentCheckBoxSelected>>', this.state.currentCheckBoxSelected)
    const currentTab = currentItem && currentItem
    const { profileEditInfo, profileViewApiMsg, current_goal } = this.props;
    console.log('current_goal', current_goal)
   

    return (
      <SafeAreaView style={styles.container}>
        {(profileEditInfo === null && profileViewApiMsg === null) || (profileEditInfo === null && profileViewApiMsg === 'request') ?
          <View style={{justifyContent:'center', flex:1}}>
            {<ActivityIndicator color={"black"} />}
          </View>
          :
          <ScrollView>
            <View>
              {this.renderImagerender()}
              {this.renderPromptList()}
              
              
              {profileInfo && profileInfo?.profileJSON && profileInfo?.profileJSON !== null && Object.keys(profileInfo?.profileJSON).map((key, index) => this.renderProfileList(key, index))}
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                this.setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalTitle}>{headingText}</Text>
                    <TouchableOpacity style={styles.closeIcon} onPress={() => this.setModalVisible(!modalVisible)}>
                      <Entypo name='cross' color={Color.black} size={24} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.lineStyle} />
                  {(currentType === 'radio' && this.state[currentTab]?.length !== 0) &&
                    this.radioComponent()
                  }
                  {(currentType === 'checkbox' && this.state[currentTab]?.length !== 0) &&
                    <View>
                      {this.checkbox_component()}
                    </View>
                  }
                  {(currentType === 'text' && this.state[currentTab] !== null) &&
                    <View>
                      {this.text_component()}
                    </View>
                  }
                  {(currentType === 'date' && this.state[currentTab] !== null) &&
                    <View>
                      {this.date_component()}
                    </View>
                  }

                  <View style={{ flexDirection: 'row', width: '50%', height: 30, marginTop: 20 }}>
                    <TouchableOpacity style={styles.save_button} onPress={() => this.setModalVisible(!modalVisible, 'save')}>
                      <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                        <Text style={styles.saveButton_text}>SAVE</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancel_button} onPress={() => this.setModalVisible(!modalVisible, 'cancel')}>
                      <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                        <Text style={styles.cancelButton_text}>CANCEL</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="fade"
              transparent={true}
              visible={promtModalVisible}
              onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                this.setPromptModalVisible(!promtModalVisible);
              }}
            >
              <ScrollView contentContainerStyle={styles.centeredPromptView}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: 'row' }}>
                    {/* <Text style={styles.modalTitle}>{'headingText'}</Text> */}
                    {this.topNavigation()}
                    <TouchableOpacity style={styles.promptcloseIcon} onPress={() => this.setPromptModalVisible(!promtModalVisible, 'cancel', current_prompt_index)}>
                      <Entypo name='cross' color={Color.black} size={24} />
                    </TouchableOpacity>
                  </View>
                  {/* <View style={styles.lineStyle} /> */}
                  {prompt_clicked === true &&
                    this.PromtListModal()
                  }
                  {response_clicked === true &&
                    this.ResponseListModal()
                  }
                </View>
              </ScrollView>
            </Modal>
          </ScrollView>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    flex: 1
  },
  lineStyle: {
    borderBottomColor: '#e5e7eb',
    borderWidth: 1,
    marginBottom: 20
  },
  //media item styling
  media_view: {
    borderColor: '#D3D3D3',
    backgroundColor: '#D3D3D3',
    borderWidth: 1,
    height: 110,
    marginTop: 10,
    marginHorizontal: 10,
    width: 105
  },
  media_item: {
    flexDirection: 'row',
    padding: 40,
  },
  media_item_image: {
    flexDirection: 'row',
  },
  //styles of prompt view
  prompt_View: {
    borderColor: Color.grey,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    borderStyle: 'dashed'
  },
  prompt_item: {
    flexDirection: 'row',
    padding: 20,
    marginHorizontal: 5,
  },
  //profile list styles
  item: {
    flexDirection: 'row',
    padding: 20,
    marginHorizontal: 5,
  },
  text: {
    // marginVertical: 5
  },
  subHeadings: {
    fontSize: 18,
    marginHorizontal: 15
  },

  // modal view style common
  modalView: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    elevation: 5
  },
  save_button: {
    borderRadius: 5,
    marginRight: 15,
    elevation: 2,
    backgroundColor: Color.black,
    width: '50%'
  },
  cancel_button: {
    borderRadius: 5,
    elevation: 2,
    backgroundColor: Color.white,
    width: '50%',
    borderColor: Color.black,
    borderWidth: 1
  },
  delete_button: {
    borderRadius: 5,
    elevation: 2,
    backgroundColor: Color.white,
    width: '50%',
    borderColor: Color.red,
    borderWidth: 1,
    marginRight: 10
  },
  saveButton_text: {
    color: Color.white,
    fontSize: 10,
    textAlign: 'center',
  },
  cancelButton_text: {
    color: Color.black,
    fontSize: 10,
    textAlign: 'center',
  },
  deleteButton_text: {
    color: Color.red,
    fontSize: 10,
    textAlign: 'center',
  },
  // prompt modal
  centeredPromptView: {
    justifyContent: "center",
    marginTop: 22
  },
  promptcloseIcon: {
    width: '10%',
    marginTop: 20,
    alignItems: 'flex-end'
  },
  modal_prompt_View: {
    borderColor: '#fff',
    borderBottomColor: '#e5e7eb',
    borderWidth: 1,
    marginVertical: 10,
    width: '50%',
  },
  top_navigation_item: {
    flexDirection: 'row',
    padding: 20,
    marginHorizontal: 5,
  },
  promtStyle: {
    backgroundColor: '#D3D3D3',
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 8,
    marginHorizontal: 10,
    borderColor: '#D3D3D3',
    padding: 15,
    flexDirection: 'row'
  },
  modal_response_View: {
    borderColor: '#fff',
    borderBottomColor: '#e5e7eb',
    borderWidth: 1,
    marginVertical: 10,
    width: '50%',
  },
  response_input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    padding: 10,
    width: '100%',
    textAlignVertical: 'top'
  },


  //profile list model
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22
  },
  modalTitle: {
    width: '50%',
    marginBottom: 15,
    textAlign: "left"
  },
  closeIcon: {
    width: '50%',
    marginBottom: 15,
    alignItems: 'flex-end'
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  Checkbox_section: {
    flexDirection: 'row',
    color: 'black',
    marginBottom: 10
  },


  // unused styles
  // buttonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  // buttonClose: {
  //   backgroundColor: Color.black,
  // },
  // textStyle: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center"
  // },



});

const mapStateToProps = (state) => {
  return {
    Authorization: state.Authorization,
    profileEditInfo: state?.profileEditInfo,
    profileViewApiMsg: state?.profileViewApiMsg,
    current_goal: state?.current_goal,
    state: state
  }
}

const mapDispatchToProps = {
  ProfileEditUpdateJSON,
  ProfileListUpdate,
  profileViewRequest,
  ProfilePromptUpdate,
  ProfileMediaUpdate,
  ProfileMediaDelete,
  ProfilePromptDelete
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);

// export default ProfileEdit;