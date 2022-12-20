import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, FlatList, Modal, SafeAreaView, ScrollView, Switch, Platform, StatusBar,Alert} from 'react-native';
import Checkbox from 'expo-checkbox';
import Color from '../contants/Colors';
import Prompts_constants from '../contants/Prompts_constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Toast from 'react-native-simple-toast';
import Tooltip from 'react-native-walkthrough-tooltip';
// import moment from 'react-moment';

//connect with state
import { connect } from 'react-redux';
import { preferenceViewRequest, PreferenceListUpdate } from '../actions/PreferencesEditActions';
import Entypo from 'react-native-vector-icons/Entypo';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import profileJSON from '../stores/getProfile.json';
//import { StatusBar } from 'expo-status-bar';
// import { color } from 'react-native-elements/dist/helpers';


let aboutList = []
let switch_enable = false
const completeResponse = [];
let onlyOnce = true;
class Preferences extends Component {
  constructor(props) {
    super(props);
    console.log('props value>>>', profileJSON.preferences);
    this.state = {
      preferenceInfo: {
        profileJSON: profileJSON.preferences
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
      gender: null,
      smoking: null,
      drinking: null,
      marijuana: null,
      drugs: null,
      display_name: null,
      currentItem: [],
      prompt_clicked: true,
      currentResponseTitle: '',
      current_prompt_index: 0,
      responseTextBox: '',
      showDeleteButton: false,
      current_switch: null,
      currentCheckBoxSelected: [],
      selected_radioButton: null,
      updatedList: false,
      toolTipVisible: false,
      selected_textValue: null,
    };
  }

  componentDidMount() {
    // console.log('Authorization>>>>', this.props.Authorization);
    // this.createLocalRequestData(profileJSON);
    const { preferenceInfo } = this.state;
    console.log('componentDidMount', this.props.current_goal)
     if (this.props.current_goal === '3' && preferenceInfo && preferenceInfo?.profileJSON) {
      const asArray = Object.entries(preferenceInfo?.profileJSON);
      const filtered = asArray.filter(([key, value]) => key === 'personal_information');
      const just_string = Object.fromEntries(filtered);
      // separateProfile = just_string['personal_information']
      this.setState({
        preferenceInfo: {
          profileJSON: just_string
        }
      })
      console.log('index>>>>', just_string);
    } 
    console.log('completeResponse>>>>>>', completeResponse)
    const payload = {
      Authorization: this.props.Authorization
    }
    this.props.preferenceViewRequest(payload)
  }


  //prompt section functions
  
  
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
    const { preferenceInfo } = this.state;
    const { preferenceEditInfo, current_goal } = this.props;
    //console.log('profileEditnApiMsg>>', this.props.profileEditInfo?.profile);

    // const separateProfile = profileEditInfo[key];
    let separateProfile;
    separateProfile = preferenceInfo && preferenceInfo?.profileJSON[key]
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
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.subHeadings}>{separateProfile[key]}</Text>
                    <Tooltip
                      isVisible={this.state.toolTipVisible}
                      content={<Text>Based on your updated refreences below, your matches will be updated in the home screen!</Text>}
                      placement="bottom"
                      childContentSpacing={0}
                      onClose={() => this.setState({ toolTipVisible: false })}
                      style={{width:'10%'}}
                      topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight:0}
                    >
                    {console.log(StatusBar.currentHeight,Platform.OS==='android')}
                      <TouchableOpacity onPress={() => this.setState({ toolTipVisible:true})}>
                      <Feather name='info' color={"#7E43EE"} size={30} ></Feather>
                      </TouchableOpacity>
                    </Tooltip>
                  </View>
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
                              
                              </View>
                              {this.props.state && this.props.state[element] ?
                                <Text>{this.props.state[element]}</Text>
                                :
                                preferenceEditInfo && preferenceEditInfo?.preferences && preferenceEditInfo?.preferences?.[element] &&
                                <Text numberOfLines={1}>{this.renderDisplayValue(preferenceEditInfo?.preferences?.[element], separateTab[element], element)}</Text>
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
    //console.log("==========================================",res_value,current_value,element);
    if (current_value?.type === 'text') {
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
      //console.log('res_value>>', options[replaced_value],replaced_value,options,newval,nnewval,newresult);
      return (newresult === 'undefined' ? "": newresult);
      // return res_value && res_value.replace(/[^ .,a-zA-Z0-9]/g, "");
    }
  }
  renderReplaceValue = (res_value, element) => {
    const { currentType } = this.state;
    if (currentType === 'text') {
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
    const { preferenceEditInfo } = this.props;
    let appendedTextValue = '';
    let appended_check_key = '';
    let updatedData;
    let replacedValue = '';

    
    //let olddata = preferenceEditInfo.preferences[title].replace("/","");

    if (mode === 'save') {
      // console.log('title>>>222', mode, title, this.state[title], this.state.selected_textValue);

      if (currentType === 'radio') {
        replacedValue += '[' + '"' + this.state.selected_radioButton?.[0] + '"' + ']';
        console.log('item>>>>radio', replacedValue);
        console.log("kjhi ",preferenceEditInfo.preferences[title])
        replacedValue=this.state.selected_radioButton?.[0]?replacedValue:preferenceEditInfo.preferences[title]
        updatedData = {
          name: title,
          [title]: replacedValue,
          element: 'preference',
          value: replacedValue,
          dealbreaker: this.state.current_switch,
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
          element: 'preference',
          value: '[' + appended_check_key?.replace("/", "") + ']',
          dealbreaker: this.state.current_switch,
          Authorization: this.props.Authorization
        }
        console.log("updatedData>>>", updatedData);

      } else if (currentType === 'text') {
        replacedValue += '[' + '"' + this.state.selected_textValue + '"' + ']';
        replacedValue=this.state.selected_textValue?.[0]?replacedValue:preferenceEditInfo.preferences[title]
        updatedData = {
          name: title,
          [title]: replacedValue,
          element: 'preference',
          value: replacedValue,
          dealbreaker: this.state.current_switch,
          Authorization: this.props.Authorization
        }
      }
      // {Platform.OS === 'android'?Toast.show(`${title} is updated now.`):Alert.alert(`${title} is updated now.`)}
      //;
      
      
      console.log("kjhi-------------------------------- ",updatedData);
      this.props.PreferenceListUpdate(updatedData);
      this.setState({
        current_switch: null,
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
          current_switch: null,
          [title]: currentTab_copy,
        });
      } else if (currentType === 'text') {
        if (preferenceEditInfo?.preferences && preferenceEditInfo?.preferences?.[title]) {
          replacedValue = this.renderReplaceValue(preferenceEditInfo?.preferences?.[title])
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
      } else if (currentType === 'checkbox') {
        let currentTab_copy = [...this.state.selected_checkbox]

        this.setState({
          modalVisible: visible,
          [title]: currentTab_copy,
        });
      }
    } else {
      this.setState({
        current_switch: null,
        modalVisible: visible,
      });
    }

  }

  onClickItem = (item, title) => {
    let Options = item?.options;
    let listOfRadio = []
    const { preferenceEditInfo } = this.props;
    let replacedValue = '';
    // console.log('item>>>>>>>>>', title);
    this.setModalVisible(true);
    this.setState({
      headingText: item?.label,
      currentType: item?.type,
      currentItem: title,
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
      if (preferenceEditInfo?.preferences && preferenceEditInfo?.preferences?.[title]) {
        // console.log('first if');
        replacedValue = preferenceEditInfo?.preferences?.[title].replace(/[^ .,a-zA-Z0-9]/g, "");
        console.log('replacedValue>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', replacedValue)
        let newval=replacedValue.split(',').map((step)=>Options[step.replace(" ","")])
        console.log(newval);
        Object.keys(Options).forEach((key) => {
          console.log('replacedValue>>> options>>>', Options[key])
          console.log('replacedValue>>> check',Options[key], Options[key], newval?.includes(Options[key]))
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
          console.log('radio>>>', listOfRadio)
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
    // console.log('value>>>', value, this.state[currentTab]);
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
    const {modalVisible } = this.state;
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

    }  else {
      return (
        <View>
          <Text>{'-'}</Text>
        </View>
      )
    }
  }
  toggleSwitch = (event) => {
    this.setState({
      current_switch: event
    })
    switch_enable= event;
  }
  radioComponent = () => {
    const { currentItem, selected_radioButton } = this.state;
    const { state, preferenceEditInfo } = this.props;
    const currentTab = currentItem
    const switch_name = currentTab+'_dealbreaker'
    let replacedValue;
    console.log('this.state[currentTab]>>', currentTab, switch_name, preferenceEditInfo?.preferences?.[switch_name],this.state.current_switch);

    if(this.state.current_switch===null){
      switch_enable = preferenceEditInfo?.preferences?.[switch_name] === 1 ? true : false
      this.setState({
        current_switch:switch_enable
      })
    }
    else{
      switch_enable = this.state.current_switch;
    }

    if (preferenceEditInfo?.preferences && preferenceEditInfo?.preferences?.[currentTab]) {
      replacedValue = this.renderReplaceValue(preferenceEditInfo?.preferences?.[currentTab])
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
        <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
          <Text style={{ fontSize: 20, color: 'black', marginTop: 5}}> Deal Breaker </Text>
          <Switch 
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={switch_enable ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={(ele)=>this.toggleSwitch(ele)}
            value={switch_enable}
          />
        </View>
      </View>
    )
  }

  checkbox_component = () => {
    const { currentItem } = this.state;
    const currentTab = currentItem
    const switch_name = currentTab+'_dealbreaker'
    const{preferenceEditInfo}=this.props;
    console.log('this.state[currentTab]>>', currentTab, switch_name, preferenceEditInfo?.preferences?.[switch_name],this.state.current_switch);
    // console.log('replacedValue>>111', this.state[currentTab]);
    if(this.state.current_switch===null){
      switch_enable = preferenceEditInfo?.preferences?.[switch_name] === 1 ? true : false
      this.setState({
        current_switch:switch_enable
      })
    }
    else{
      switch_enable = this.state.current_switch;
    }
    // const checkbox_field = this.state[currentTab]?.map((obj, i) => {
    //   // const replacedValue_split = replacedValue?.split(',')
    //   return (
       
    //     <TouchableOpacity key={i} onPress={() => this.updatCheckbox(obj, currentTab, i)}>
    //       <View style={styles.Checkbox_section} key={i}>
    //         <Checkbox
    //           // value = {replacedValue_split.some((item) => item === obj?.label.toLowerCase())}
    //           value={this.state[currentTab][i].isSelected}
    //           onValueChange={() => this.updatCheckbox(obj, currentTab, i)}
    //           color={this.state[currentTab][i].isSelected ? '#1c64f2' : undefined}
    //         />
    //         <Text style={{ fontSize: 17, marginLeft: 10 }}>{obj?.label}</Text>
    //       </View>
          
    //     </TouchableOpacity>
    //   )
    // });
    return (
      <View>
        {this.state[currentTab]?.map((obj, i) => {
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
    })}
        <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
          <Text style={{ fontSize: 20, color: 'black', marginTop: 5}}> Deal Breaker </Text>
          <Switch 
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={switch_enable ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={(ele)=>this.toggleSwitch(ele)}
            value={switch_enable}
          />
        </View>
      </View>
    );
  }
  text_component = () => {
    const { currentItem, selected_textValue } = this.state;
    const { preferenceEditInfo } = this.props;
    const currentTab = currentItem
    let replacedValue = '';
    const switch_name = currentTab+'_dealbreaker'
    console.log('this.state[currentTab]>>', currentTab, switch_name, preferenceEditInfo?.preferences?.[switch_name],this.state.current_switch);
    if (preferenceEditInfo?.preferences && preferenceEditInfo?.preferences?.[currentTab]) {
      replacedValue = this.renderReplaceValue(preferenceEditInfo?.preferences?.[currentTab])
    }
    if(this.state.current_switch===null){
      switch_enable = preferenceEditInfo?.preferences?.[switch_name] === 1 ? true : false
      this.setState({
        current_switch:switch_enable
      })
    }
    else{
      switch_enable = this.state.current_switch;
    }
    return (
      <View>
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
      <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
          <Text style={{ fontSize: 20, color: 'black', marginTop: 5}}> Deal Breaker </Text>
          <Switch 
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={switch_enable ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={(ele)=>this.toggleSwitch(ele)}
            value={switch_enable}
          />
        </View>
      </View>
    )
  }
  onClickGoal = (props) => {
    console.log("kjclicked");
    if(this.props.current_goal!=3){
      this.props.navigation.navigate('goalselect',{name:"changeGoal",goal:this.props.current_goal});
    }
  }
 
  render() {
    const { modalVisible, headingText, currentItem, currentType, promtModalVisible, prompt_clicked, response_clicked, preferenceInfo, current_prompt_index } = this.state;
    console.log('currentCheckBoxSelected>>', this.props.preferenceEditInfo);
    const currentTab = currentItem && currentItem
    const { preferenceEditInfo, preferenceViewApiMsg, current_goal } = this.props;
    console.log('current_goal in settings ', this.props.current_goal)
   

    return (
      <SafeAreaView style={styles.container}>
        {(preferenceInfo === null && preferenceViewApiMsg === null) || (preferenceInfo === null && preferenceViewApiMsg === 'request') ?
          <View>
            <Text>Page is loading...</Text>
          </View>
          :
          <ScrollView>
            <View>
              
            <View style={{ marginHorizontal: 20, marginTop: 20}}>
              <Text style={styles.subHeadings}>My Goal</Text>
              <View style={[styles.lineStyle, { marginVertical: 10 }]} />
            </View>

            <TouchableOpacity
              onPress={this.onClickGoal} style={{marginBottom:30,marginHorizontal: 20}}>
              <View style={{flexDirection:'row'}}>
              <View style={{ width: '90%'}}>
                <Text style={{ marginTop: 5, fontSize:16, width: '100%'}}> {profileJSON.goal_options[this.props?.current_goal]} </Text>
              </View>
              
              <View style={{ width: '10%', alignItems: 'flex-end' , marginTop: 5}}>
                <MaterialIcons name='keyboard-arrow-right' color={Color.black} size={24} />
              </View>
              </View>
            </TouchableOpacity>
            
            

              {this.props?.current_goal && this.props?.current_goal!==3 && preferenceInfo && preferenceInfo?.profileJSON && preferenceInfo?.profileJSON !== null && Object.keys(preferenceInfo?.profileJSON).map((key, index) => this.renderProfileList(key, index))}
              
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
  //styles of prompt view
  prompt_View: {
    borderColor: Color.grey,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    borderStyle: 'dashed'
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
    width:'80%',
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
});

const mapStateToProps = (state) => {
  return {
    Authorization: state.Authorization,
    preferenceEditInfo: state?.preferenceEditInfo,
    preferenceViewApiMsg: state?.preferenceViewApiMsg,
    current_goal: state?.current_goal,
    state: state
  }
}

const mapDispatchToProps = {
  PreferenceListUpdate,
  preferenceViewRequest,
}


export default connect(mapStateToProps, mapDispatchToProps)(Preferences);

// export default ProfileEdit;