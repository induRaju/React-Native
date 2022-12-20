import React, { Component } from 'react';
import {View, StyleSheet, TextInput, FlatList,TouchableOpacity, Text, TouchableWithoutFeedback,ScrollView,Dimensions,SafeAreaView,StatusBar} from 'react-native';
import Title from '../components/Title';
import Color from '../contants/Colors'
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getStarted} from '../actions/getStartedAction'
// import * as appActions from '../actions';


class GetStarted1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      Dob : '',
      Gender:'',
      checkValidFirstName: '',
      checkValidLastName: '',
      date: new Date(),
      showDatePicker: false,
      showDrop: false,
      hasDate:false,
      Genderval:'',

      items : [{label:"M",
        value: 'MALE',
      }, {
        label:"F",
        value: 'FEMALE',
      }]
  };
  }

  onClickNext = (props) => {
    const payload={
      name: `${this.state.FirstName} ${this.state.LastName}`,
      dob: this.state.Dob,
      gender: this.state.Gender
    }
    this.props.getStarted(payload);
    props.navigation.navigate('GetStarted2');
  }
  onChangeFirstName = (val) => {
    this.setState({
        FirstName: val
    });
  }
  onChangeLastName = (val) => {
    this.setState({
        LastName: val
    });
  }
  genderUpdate = (item) =>{
    this.setState({
      Gender:item.label,
      Genderval: item.value,
      showDrop:false,
    })
  }
  onChangeDate = (event) => {
    const currentDate = new Date(event?.nativeEvent?.timestamp);
    console.log(currentDate);
    // console.log('currentDate>>', new Date(event?.nativeEvent?.timestamp));
    if(currentDate !== null && currentDate != undefined) {
      console.log(currentDate);
      this.setState({
        date: currentDate,
        hasDate:true,
        Dob: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`,
        showDatePicker: false,
      })
    }
  }


  render() {
    // const { state, actions } = this.props;
    return (
      <View style={styles.container}>
      <View style={{top: '1%'}}>
            <Title textMsg={'Get Started!'}/>
            <Text style={styles.smallText1}>Step 1</Text>
            <Text style={styles.smallText2}>Your Bio</Text> 
      </View>     
        <View style={styles.inputView}>
          {(this.state.FirstName!='')? (<Text style={styles.toptext}>FirstName*</Text>):(<View style={{margin:10}}></View>)}
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => this.onChangeFirstName(val)}
                    value={this.state.FirstName}
                    placeholder="FirstName*"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            {this.state.checkValidFirstName && 
                <Text style={styles.errorMsg}>please enter valid first name</Text>
            }
            
            
            {(this.state.LastName!='')?(<Text style={styles.toptext}>LastName*</Text>):(<View style={{margin:10}}></View>)}
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => this.onChangeLastName(val)}
                    value={this.state.LastName}
                    placeholder="LastName*"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {this.state.checkValidLastName && 
                    <Text style={styles.errorMsg}>please enter valid Last name</Text>
                }
            

            
            {(this.state.Dob!='')?(<Text style={styles.toptext}>Date of Birth*</Text>):(<View style={{margin:10}}></View>)}
            <View style={{borderWidth: 2, borderColor: Color.black, height: 40}}>
                    <TouchableOpacity 
                    activeOpacity={0}
                    onPress={()=>{
                      this.setState({
                      showDatePicker: true
                    })}}
                    style={{}}>
                      
                      {this.state.hasDate ?(
                        <Text style={{padding:10}}>{this.state.Dob}</Text>
                        ):(
                        <Text style={{padding:10}}>Date of Birth *</Text>
                        )
                      }
                      {this.state.showDatePicker && 
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={this.state.date}
                          mode={'date'}
                          maximumDate={new Date()}
                          is24Hour={true}
                          onChange={(event)=>this.onChangeDate(event)}
                          style={{width: 320, height: 40, position: 'absolute', right: 15}}
                        />
                      }
                    </TouchableOpacity>
            </View>
            
            {(this.state.Genderval!='') ? (<Text style={styles.toptext}>Gender*</Text>):(<View style={{margin:10}}></View>)}
            <View style={{borderWidth: 2, borderColor: Color.black}}>
                <TouchableOpacity
                  onPress={()=>{
                    this.setState({
                      showDrop:true
                    })
                  }}>
                  {this.state.Gender!=='' ?(
                        <Text style={{padding:10}}>{this.state.Genderval}</Text>
                        ):(
                        <Text style={{padding:10}}>Gender *</Text>
                        )
                  }
                </TouchableOpacity>
              </View>
              {this.state.showDrop && 
                <FlatList
                  data={this.state.items}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        style={styles.input}
                        onPress={() => this.genderUpdate(item)}>
                        <Text>{item.value}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item,index) => index}
              />
              }
            

            


            <View style={styles.buttonView}>
            {this.state.FirstName === '' || this.state.LastName === '' || this.state.Gender==='' || this.state.hasDate==false ? (
                <TouchableWithoutFeedback
                    onPress={()=>this.onClickNext(this.props)} 
                    disabled
                >
                    <Text style={[styles.nextbutton, {backgroundColor: Color.grey}]}>NEXT</Text>
                </TouchableWithoutFeedback>
            ) : (
                <TouchableWithoutFeedback
                    onPress={()=>this.onClickNext(this.props)} 
            >
                <Text style={[styles.nextbutton, {backgroundColor: Color.black}]}>NEXT</Text>
            </TouchableWithoutFeedback>
            )
            }
        </View>
      </View>
    </View>
       
      
   )
    
  }
}

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    marginTop: 40,
    left: '12.62%',
}
,
toptext:{
  fontSize:12,
  marginTop:5
},
inputView: {
  
  marginTop: 50,
  width: '80%'
},
input: {
  height: 40,
  borderWidth: 2,
  padding: 10,
},
errorMsg: {
color: '#FF0000',
fontSize: 12,
},
iconStyle: {
position:'absolute',
top: '50%',left: '90%'
},
buttonView:{
  height: 40,
  marginTop: 60,
  width: '100%',
  borderRadius: 5,

},
nextbutton: {
  color: Color.white,
  fontSize: 15,
  textAlign: 'center',
  padding: 10
}
});

const mapDispatchToProps={
  getStarted 
}

export default connect(null, mapDispatchToProps)(GetStarted1);