import {React,Component, useEffect,useState} from 'react';
import { View, StyleSheet,Text,Image } from 'react-native';
import { connect } from 'react-redux';
import {loggedinsuccess} from '../actions/ChatWithUserActions'

class IndividualChat extends Component {
    constructor(props) {
       
      super(props);
      this.state=
      {
        //Authorization:"",
        //profile:"",
        username:""
      };
    }
   /*shouldComponentUpdate(nextProps, nextState) {
        // Rendering the component only if passed props value is changed
       
        if(this.props.profile2===undefined)
        return true;
        if(this.props.senduserid!==nextProps.senduserid)
        return true;
     
          return false;
      }*/
    componentDidMount() {
       
     /*   const payload={
            Authorization:this.props.Authorization,
            user_id:this.props.senduserid

        }
        if(this.props.profile2===undefined)
    {    console.log("in profile2..")
          this.props.loggedinsuccess(payload)
    }*/
    /*   if(this.props.profile2!==undefined)
     { const displayname= (this.props.profile2?.profile?.display_name).replace(/[\[\]"]+/g,"");
      console.log("displayname"+displayname);
      this.setState
     ( {
        username:displayname
      })
    }*/
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
          console.log("focus inn")
         
          const payload={
            Authorization:this.props.Authorization,
            user_id:this.props.senduserid

        }
        if(this.props.profile2===undefined)
    {    console.log("in profile2..")
          this.props.loggedinsuccess(payload)
    }
  
         
         
      }
    ) 
    this.willunFocusSubscription = this.props.navigation.addListener(
      'blur',
      () => {
          console.log("blur")
      }
    ) 
      }

     render()
     {
        return(
            
            <View style={styles.container}> 
            <View Style={{flexDirection:'row',flex: 'wrap'}}>
            {(this.props.profile2!==undefined && this.props.profile2.media.length!=0)?
           ( <View style={{flexDirection:'row',width:'50%'}}>
            <Image source={{uri:"https://d138zt7ce8doav.cloudfront.net/".concat(this.props.profile2.media[0]?.uri)} } style={
            styles.Userimg
            }
        ></Image>
          {this.props.profile2!==undefined?
           (
            <Text style={styles.TextSection}> {this.props.profile2.profile.display_name?.replace(/[\[\]"]+/g,"")}
            </Text>
            ):(
            <Text style={styles.TextSection}> Loading
            </Text>
            )
          }
        </View>):(<View style={{flexDirection:'row',width:'50%'}} >
            <Image source={require('../assets/png/blank-profile-picture.png')}  style={
            styles.Userimg
            }
        ></Image>
        {this.props.profile2!==undefined?
           (
            <Text style={styles.TextSection}> {this.props.profile2.profile.display_name?.replace(/[\[\]"]+/g,"")}
            </Text>
            ):(
            <Text style={styles.TextSection}> Loading
            </Text>
            )
          }
            </View>)}
            </View>
            </View>
        )
     }
    
}
function mapStateToProps(state) {
    console.log("profile...",state.send_userid)
    console.log("profile...",state.profile2)
    return {
      
     // Authorization:state.Authorization,
      //Profile:state.profile
      senduserid:state.send_userid,
      profile2:state.profile2,
      Authorization:state.Authorization

    };
  }
  const mapDispatchToProps = {
  loggedinsuccess
  }
  export default connect(mapStateToProps,mapDispatchToProps)(IndividualChat) 
  const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft:100,
    marginBottom: 20,
    width:'100%',
    height:'1%',
    // flex:1
},
Userimg:
{   // flexdirection: 'column',
   
    width: 40,
    height: 40,
    borderRadius:50,
    marginleft:50,
    resizeMode: 'contain',
   paddingright:10
    
    
},
TextSection:{
  
 // display:'flex',
 // width: 80,
 // borderbottomwidth: 1,
 // borderbottomcolor:'black',
 // height:40,
 // flexDirection: 'column',
  marginTop:10,
  marginLeft:15
  
},


  })