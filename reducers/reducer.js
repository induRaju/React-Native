// Login reducer

import { EntypoLifebuoy } from 'react-entypo-icons';
import { Actions } from 'react-native-gifted-chat';
import * as types from '../actions/actionTypes';

const initialState = {
  
  username: '',
  name: '',
  password: '',
  password_confirmation: '',
  email: '',
  dob: null,
  gender: null,
  isavailable:'',
  roommatelistapimsg:'',
  roomateprofileapi:'',
//   current_goal: '3',
  current_goal: '',
  title: '',
  prospect_us: [],
  prospect_li: [],
  current_index: 0,
  current_listing_index: 0,
  confirmlistings:null,
  address_for_listing: '',
  address_place_id: '',
  monthly_rent: '',
  address_lat: '',
  address_lng: '',
  number_of_bedrooms: '',
  lease_duration: '',
  landmark_for_search: '',
  listing_liked_users:[],
  monthly_budget: '',
  search_lat: '',
  search_lng: '',
  search_radius: '',
  user_total_data: [],
  user_total_deleted_data: [],
  loginInfo: null,
  loginapiMsg: null,
  forgetapiMsg: null,
  access_token: null,
  isLogin: null,
  Authorization: null,
  home_data_length:0,
  home_listing_data_length:0,
  registrationapiMsg: null,
  isRegistered: null,
  registrationInfo: null,
  homeapimsg:null,
  chatlistapimsg:null,
  homelistingapimsg:null,
  user_ids: null,
  fin_list: [],
  chat_list: [],
  softdelete:[],
  confirm_user_details:[],
  listing_list: [],
  listing_id: null,
  home_goal: null,
  dislikeuserapiMsg: null,
  likeuserapiMsg: null,
  profile:null,
  send_userid:'',
  profile2:null,
  messages:null,
  messagestatus:null,
  preferenceViewApiMsg: null,
  profileViewApiMsg: null,
  profileEditnApiMsg: null,
  profileEditInfo: null,
  preferenceEditInfo: null,
  profilePromptDeleteApiMsg: null,
  ethnicity: null,
  hometown: null,
  relationship_status: null,
  dietary_preference: null,
    work: null,
    education_level: null,
    political_views: null,
    registrationerror: null,
    religion: null,
    pets: null,
    smoking: null,
    drinking: null,
    marijuana: null,
    drugs: null,
    display_name: null,
    dob: null,
    gender: null,
    pronouns: null,
    profilePromptApiMsg: null,
    profileMediaApiMsg: null,
    profileMediaDeleteApiMsg: null,
    listingsMediaApiMsg: null,
    listingsMediaDeleteApiMsg: null,
    ListingLikeapiMsg: null,
  likelistingapiMsg: null,
  dislikelistingapiMsg: null,
  logoutApiMsg: null,
  AddListingapiMsg: null,
  isAddedListing: null,
  ListingapiMsg: null,
  isListed: null,
  UpdateListingapiMsg: null,
  Listing_total_data: null,
  ViewListingapiMsg: null,
  DeleteListingapiMsg: null,
  current_edit_listing_id:null,
  current_listing_data: null,
  userProfile: null,
  pending_request_id:null,
  req_user_details:null,
  sent_request_id:null,
  sent_user_details:null,
  sent_listing_id:null,
  sent_list_details:null,
  Req_status:null,
  load_listing:null,
  profileInfoApiMsg: null,
  modalProfile: null,
  profileInfoListApiMsg: null,
  listProfile: null,
  preferenceUpdateApiMsg: null,
  preferenceUpdateMsg: null,
  goalChangeApiMsg: null,
  friendsList: [],
  RoommateList:[],
  RoommateListprofile:[],
  friendsListApiMsg: '',
  friendsProfileList: [],
  friendsProfileListApiMsg: '',
  doUnFriendApiMsg: '',
  PendingRequestfailure:null,
  FoundRoommatesapiMsg:'',
  deactivateApiMsg: null,
  requestsentfailure:null,
  isHomeScreenLoading: false,
  userProfileModalApiMsg: '',
  confirmlisting:null,
  noofbedrooms:null,
  confirmroomateApi:'',
  confirm_api:'',
  relistapiMsg: null,
};

const reducer = (state= initialState, action) => {
    // console.log('actions-reducer>>', action);
    switch(action.type){
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loginapiMsg: 'request',
            }
        case types.LOGIN_SUCCESS:
            // console.log("this is login log: ",action.response);
            return {
                loginInfo: action.response,
                access_token: action.response.access_token,
                loginapiMsg: 'success',
                isLogin: true,
                Authorization: action?.response?.token_type.concat(' ', action?.response?.access_token),
                isHomeScreenLoading: true,
                logoutApiMsg: ''
               
            };

            case types.LOGIN_USER:
                return{
                   ...state
                }
           case types.FROM_USER_ID:
            console.log("loginuser",action.response);
            return{
            ...state,
          //  profile:action.response.profile,
              profile:action.response.response.profile,

           
            
           }
           case types.PENDING_REQUEST_ID:
            console.log("pending request id")
            return {
               ...state,
            }
        
           case types.PENDING_REQUEST_ID_SUCCESS:
           console.log("pendingreq"+action.responsepayload.res);
           return{
              ...state,
              pending_request_id:action.responsepayload.res,
              PendingRequestfailure:'success'

           }

           case types.PENDING_REQUEST_ID_FAILURE:
           console.log("pendingrequestidfailure")
           return{
            ...state,
            PendingRequestfailure:'error'
           }
           case types.REQUEST_USER_DETAILS_SUCCESS:
            console.log("Requserdetails"+action.userdetails);
            return{
               ...state,
              req_user_details:action.userdetails,
              PendingRequestfailure:'success'
            }
            case types.REQUEST_USER_DETAILS_FAILURE:
                console.log("req_user_details_failure")
            return{
                ...state,
                PendingRequestfailure:'error'

            }
            case types.REQUEST_SENT_ID:
            console.log("pending request id")
            return {
               ...state,
            }

           case types.REQUEST_SENT_ID_SUCCESS:
            console.log("Reqsentid",action.responsepayload.res)
            return{
                ...state,
                sent_request_id:action.responsepayload.res,
                requestsentfailure:'success'

               
            }
            case types.REQUEST_SENT_ID_FAILURE:
            console.log("Reqsentid",action.responsepayload.res)
            return{
                ...state,
                requestsentfailure:'error'
            
               
            }


            case types.REQ_USER_DETAILS_SUCCESS:
            console.log("Reqsentid",action.userdetails)
            return{
                ...state,
                sent_user_details:action.userdetails,
                requestsentfailure:'success'

               
            }

            case types.REQ_USER_DETAILS_FAILURE:
                console.log("Reqsentid",action.userdetails)
                return{
                    ...state,
                    requestsentfailure:'error'
    
                   
                
                }
           case types.REQUEST_LISTING_ID:
             console.log("Reqsentid",action.userdetails)
                    return{
                        ...state,
                        
                       
                    
                    }
            case types.REQUEST_LIST_ID_SUCCESS:
            console.log("Reqlistid",action.responsepayload.res)
            return{
                ...state,
                sent_listing_id:action.responsepayload.res,
                requestsentfailure:'success'

               
            }

            case types.REQUEST_LIST_ID_FAILURE:
                console.log("Reqlistid",action.responsepayload.res)
                return{
                    ...state,
                    requestsentfailure:'error'
    
                   
                }
            case types.CLEAR_STATE:
                console.log("clearstate")
                return{
                    sent_listing_id:null,
                    sent_request_id:null

                }
            case types.REQ_LIST_DETAILS_SUCCESS:
            console.log("Reqlistdetails",action.listingdetails)
            return{
                ...state,
                sent_list_details:action.listingdetails,
                requestsentfailure:'success'

               

            }
            case types.REQ_LIST_DETAILS_FAILURE:
            console.log("Reqlistdetails",action.listingdetails)
            return{
                ...state,
                
                requestsentfailure:'error'
               
            }

            case types.LOAD_LISTING_SUCCESS:
                return{
                    ...state,
                    noofbedrooms:action.responsepayload.response.number_of_bedrooms,
                    isavailable:action.responsepayload.response.is_available

                }
           case types.CONFIRM_ROOMMATE_LOAD_SUCCESS:
           console.log("confirmroommate",action.responsepayload.response)
           console.log("noofbed",state.noofbedrooms)
        //    if(state.noofbedrooms ===null ||state.noofbedrooms ===undefined)
        //    {
            if(action.responsepayload.type=="Add"&& state.home_goal===1 )
          {
            return{
            ...state,
            confirmlisting:action.responsepayload.response,
            noofbedrooms:Number(action.responsepayload.response.number_of_bedrooms)-Number(1)
           // noofbedrooms:0
           }
        
          
        }
        if(action.responsepayload.type=="Remove" && state.home_goal==1)
        {  console.log("removeroomate")
            return{
            ...state,
            confirmlisting:action.responsepayload.response,
           noofbedrooms:Number(action.responsepayload.response.number_of_bedrooms) +Number(1)
           //noofbedrooms:0
          

           }

        }
        else if(state.home_goal===2)
        {
           
           
            return{
                ...state,
             
               
        }
    }

    
      
      //  }
        //    else
        //   { console.log("nofbedrooms",state.noofbedrooms)
        //   console.log("friendslist",state.friendsList.length)
        //   var array = [...state.friendsList]; // make a separate copy of the array
        //  var index = array.indexOf(94)
        //  console.log("array",array.length)
        //   if (index !== -1) {
        //   array.splice(index, 1);
        //   }
        //   console.log("array",array.length)
        //   console.log("friendslist1",state.friendsList.length)
        //   console.log("noofbed",state.noofbedrooms)
        //    return {
        //     ...state,
        //     confirmlisting:action.responsepayload.response,
        //     noofbedrooms:state.noofbedrooms-1,
        //     friendsList:array
          
            
        //    }
        //}
        //  case types.LISTINGSS_SUCCESS:
        //     return{
        //         ...state,
        //        confirm_api:'success',
        //        friendsList:[],

        //     }
           case types.CHAT_HISTORY_SUCCESS:
            console.log("chathistory",action.response)
            return{
                ...state,
                messages:action.response
            }
           case types.SENT_USER_SUCCESS:
            console.log("sentusersuccess",action.response);
            return{
            ...state,
          //  profile:action.response.profile,
             profile2:action.response 
            
           };
           
           case types.SEND_MESSAGE_SUCCESS:
            console.log("sentmessagesuccess",action.response);
            return{
            ...state,
            chatlistapimsg:'erro',
          //  profile:action.response.profile,
            messagestatus:action.response,
            
            
           };

           case types.SEND_USER:
            console.log("SEND_USER",action.payload.user_id)
           return {
                  ...state,
                  send_userid:action.payload.user_id,
                  messages:undefined,
                  profile2:undefined

            }
        
         
        case types.LOGIN_FAILURE:
            return {
                loginapiMsg: 'error',
                error: action.error,
                isLogin: false
            };
        case types.FORGET_REQUEST:
            return state;
        case types.FORGET_PWD_SUCCESS:
            return {
                loginInfo: action.response,
                forgetapiMsg: 'success'
            };
        case types.FORGET_PWD_FAILURE:
            return {
                forgetapiMsg: 'error',
                error: action.error
            };
        case types.FORGET_CLR_RESPONSE:
            return {
                forgetapiMsg: null
            };
        case types.FORGET_PWD_CALL:
            return {
                action: action,
                forgetapiMsg: 'request'
            };
        
        case types.REGISTRATION_SUCCESS:
            return{
                ...state,
                registrationInfo: action.response,
                registrationapiMsg: 'success',
                isRegistered: true,
            }
        case types.REGISTRATION_FAILURE:
            console.log("kjaction", action,action.error);
            return{
                ...state,
                registrationapiMsg: 'error',
                registrationerror:action.error,
                isRegistered: false
            }
        case types.REGISTRATION_REQUEST:
            return{
                ...state,
                ...action.registrationUserPayload,
            }
        case types.GETSTARTED_REQUEST: {
            console.log("this is new payload ..............................")
            return{
                ...state,
                name: action.payload?.name,
                dob: action.payload?.dob,
                gender: action.payload?.gender
            }
        }
        case types.GOAL_SELECT: {
            return {
                ...state,
                current_goal: action.payload?.current_goal
            };
        }
        case types.REGISTER_REQUEST:
            console.log(action.payload,"reducer for registration");
            return {
                ...state,
                email: action.payload?.email,
                password: action.payload?.password,
                password_confirmation: action.payload?.password_confirmation,
            };
        case types.HOMESCREEN_DATA:
            // console.log('hello',action.payload);
            return {
                ...state,
                // user_id: action.payload?.user_id,
                // display_name: action.payload?.display_name
            };
            
            case types.HOMELISTINGSCREEN_DATA:
                // console.log('hello',action.payload);
                return {
                    ...state,
                    isHomeScreenLoading: true
                    // user_id: action.payload?.user_id,
                    // display_name: action.payload?.display_name
                };

        case types.HOME_SUCCESS:
            console.log("ytdujfvj", initialState.current_index, initialState.fin_list)

            initialState.current_index=initialState.current_index+action.response[1]
            console.log('saganew listing',initialState.fin_list.push(...action.response[0])
            );
            console.log("dksjfnvkdsj", initialState.current_index, initialState.fin_list)
            return {
                ...state,
                // user_ids : action.response.,
                fin_list: initialState.fin_list,
                current_index: initialState.current_index,
                // listing_list: action.response[1],
                // listing_list: action.response[1],
                homeapimsg:'success',
                isHomeScreenLoading: false,
                // chatlistapimsg: 'ER'
                // homeapimsg:'success'
                // user_id: action.payload?.user_id,
                // display_name: action.payload?.display_name
            } 
        case types.GOAL_REQUEST:
            return{
                ...state
            }
        case types.GOAL_SUCCESS:
            console.log("jtrsjgtd")
            initialState.fin_list = []
            initialState.listing_list = []
            initialState.current_index = 0
            initialState.current_listing_index = 0
            return{
                ...state,
                home_goal: action.response,
                current_goal: action.response,
                fin_list:initialState.fin_list,
                current_index:initialState.current_index,
                listing_list:initialState.listing_list,
                current_listing_index: initialState.current_listing_index
            }

        case types.GOAL_FAILURE:
            return{
                ...state,
            }

        case types.HOME_LISTING_SUCCESS:
            initialState.current_listing_index=initialState.current_listing_index+action.response[1]
            console.log('saganew listing',initialState.listing_list.push(...action.response[0]));
                console.log('saganew listing',action.response[0]);
                return {
                    ...state,
                    current_listing_index: initialState.current_listing_index,
                    // user_ids : action.response.,
                    // home_goal: action.response[1],
                    listing_list: initialState.listing_list,
                    homelistingapimsg:'success',
                    isHomeScreenLoading: false,
                    // chatlistapimsg:'er'
                    // homeapimsg:'success'
                    // user_id: action.payload?.user_id,
                    // display_name: action.payload?.display_name
                } 
        case types.HOME_USERS: 
            console.log('saga>>>>>>>>>>>>>>>', action.response);
            if(action.response){
                initialState.prospect_us=action.response;
                initialState.home_data_length=action.response?.prospect_user_ids.length;
            }
            return {
                ...state,
                prospect_us:initialState.prospect_us,
                home_data_length: initialState.home_data_length,
                // user_ids : action.response.prospect_user_ids,
                // homeapimsg:'success'
                // user_id: action.payload?.user_id,
                // display_name: action.payload?.display_name
            } 

            case types.HOME_LISTING_USERS:
                console.log('saga>>>>>>>>>>>>>>>', action.response);
                if(action.response){
                    initialState.prospect_li=action.response;
                    initialState.home_listing_data_length=action.response?.prospect_listing_ids.length;
                }
                return {
                    ...state,
                    prospect_li:initialState.prospect_li,
                    home_listing_data_length: initialState.home_listing_data_length,
                    // user_ids : action.response.prospect_user_ids,
                    // homeapimsg:'success'
                    // user_id: action.payload?.user_id,
                    // display_name: action.payload?.display_name
                } 
        case types.HOME_FAILURE:
            console.log("failure!.....")
            return {
                ...state,
                homeapimsg:'error',
                isHomeScreenLoading: false
                // user_id: action.payload?.user_id,
                // display_name: action.payload?.display_name
            } 
            case types.HOME_LISTING_FAILURE:
                console.log("failure!.....")
                return {
                    ...state,
                    homelistingapimsg:'error',
                    isHomeScreenLoading: false
                    // user_id: action.payload?.user_id,
                    // display_name: action.payload?.display_name
                } 
            case types.CHATLIST_DATA:
                return{
                    ...state,
                }
            case types.CHATLIST_SUCCESS:
                console.log('Chat List Action respnse: ', action.response)
                return{
                    ...state,
                    chat_list:action.response,
                    chatlistapimsg:'success',
       
                }

          
            case types.CHATLIST_FAILURE:
                return{
                    ...state,
                }

        case types.LIKE_USER:
            return{
                ...state,
            }
        case types.LIKE_USER_SUCCESS:
            return{
                ...state,
                likeuserapiMsg:'success'
            }
        case types.LIKE_USER_FAILURE:
            return{
                ...state,
                likeuserapiMsg:'error'
            }
        case types.DISLIKE_USER:
            return{
                ...state,
            }
        case types.DISLIKE_USER_SUCCESS:
            return{
                ...state,
                dislikeuserapiMsg:'success'
            }
        case types.DISLIKE_USER_FAILURE:
            return{
                ...state,
                dislikeuserapiMsg:'error'
            }


        case types.LIKE_LISTING:
            return{
                ...state,
            }
        case types.LIKE_LISTING_SUCCESS:
            return{
                ...state,
                likelistingapiMsg:'success'
            }
        case types.LIKE_LISTING_FAILURE:
            return{
                ...state,
                likelistingapiMsg:'error'
            }
        case types.RELIST_REQUEST:
            return{
                ...state,
                relistapiMsg:'changed'
            }
        case types.RELIST_SUCCESS:
            return{
                ...state,
                relistapiMsg:'success'
            }
        case types.RELIST_FAILURE:
            return{
                ...state,
                relistapiMsg:'error'
            }
        case types.DISLIKE_LISTING:
            return{
                ...state,
            }
        case types.DISLIKE_LISTING_SUCCESS:
            return{
                ...state,
                dislikelistingapiMsg:'success'
            }
        case types.DISLIKE_LISTING_FAILURE:
            return{
                ...state,
                dislikelistingapiMsg:'error'
            }
        


            case types.USER_PROFILE:
                console.log('[Reducer] User Profile Request');
                return {
                    ...state
                };
            case types.USER_PROFILE_SUCCESS:
                console.log('[Reducer] User Profile Success', action.response);
                return {
                    ...state,
                    userProfile: action.response
                };
            case types.USER_PROFILE_ERROR:
                console.log('[Reducer] User Profile Error');
                return {
                    ...state
                };
            case types.LOGOUT_REQUEST:
                console.log('[Reducer] Logout Request');
                return {
                    ...state
                };
            case types.LOGOUT_SUCCESS:
                console.log('[Reducer] Logout Success');
                return {
                    ...state,
                    isLogout: true,
                    logoutApiMsg:'success',
                    isLogin:false,
                    username: '',
                    password: ''
                };
            case types.LOGOUT_FAILURE:
                console.log('[Reducer] Logout Failure');
                return {
                    ...state,
                    isLogout: false,
                    logoutApiMsg:'error',
                    
                };

            case types.PROFILE_LIST_UPDATE:
                // let type = action?.payload?.data?.element
                // let name = action?.payload?.data?.name
                // // let currentTab_copy = state.profileEditInfo[type][name]
                // let currrentTab_copy = state.profileEditInfo
                // // console.log("update response: ",currrentTab_copy, action?.payload?.data[name]);

                // Object.keys(currrentTab_copy).map((item, i) => {
                //     if(item === type) {
                //         Object.keys(currrentTab_copy[item]).map((sub_item, i) => {
                //             if (sub_item === name) {
                //                 currrentTab_copy[item][sub_item] = action?.payload?.data[name]
                //             }
                //         });
                //     }
                // })
                // console.log('currrentTab_copy', currrentTab_copy)
                return {
                    ...state,
                    // profileEditInfo: currrentTab_copy,
                    requestData: {
                        ...action.payload.data
                    }
                };
            case types.PROFILE_LIST_UPDATE_SUCCESS:
                console.log('profile data>>>', action)
                return {
                    ...state,
                    profileUpdateApiMsg: 'success',
                    profileUpdateMsg: áction?.payload?.data?.response,
                };
            case types.PROFILE_LIST_UPDATE_FAILURE:
                // console.log("update response: ",action);
                return {
                    ...state,
                    profileViewApiMsg: 'error',
                    error: action.error,
                };
            case types.PROFILE_VIEW_REQUEST:
            return {
                ...state,
                profileViewApiMsg: 'request'
                };
            case types.PROFILE_VIEW_SUCCESS:
                console.log('profile data>>>', action)
                return {
                    ...state,
                    profileViewApiMsg: 'success',
                    profileEditInfo: action?.response,
                };
            case types.PROFILE_VIEW_FAILURE:
                // console.log("update response: ",action);
                return {
                    ...state,
                    profileViewApiMsg: 'error',
                    error: action.error,
                };
            case types.PROFILE_EDIT_JSON:
                console.log('profile update>>>', action)
                return {
                    ...state,
                    ...action?.payload?.data
                };
            case types.PROFILE_PROMPT_UPDATE:
                // let type_prompt = action?.payload?.data?.element
                // let index_prompt = action?.payload?.data?.index
                // // let currentTab_copy = state.profileEditInfo[type][name]
                // let currrentTab_prompt = state.profileEditInfo
                // console.log("update response: ",currrentTab_prompt, action?.payload?.data);
                // Object.keys(currrentTab_prompt).map((item, i) => {
                //     if(item === type_prompt) {
                //         console.log('currrentTab_copy', currrentTab_prompt[item])

                //         if(currrentTab_prompt[item]?.some((ele) => ele.index === index_prompt)) {
                //             currrentTab_prompt[item].map((sub_item, i) => {
                //                 console.log('currrentTab_copy true', sub_item, index_prompt, currrentTab_prompt[item][i])
                //                 if (sub_item?.index === index_prompt) {
                //                     currrentTab_prompt[item][i] = {
                //                         ...action?.payload?.data
                //                     }
                //                 }
                //             });
                //         } else {
                //             currrentTab_prompt[item].push({...action?.payload?.data})
                //         }
                //     }
                // })
                // console.log('currrentTab_copy', currrentTab_prompt)
                return {
                    ...state,
                    // profileEditInfo: currrentTab_prompt,
                    requestData: {
                        ...action.payload.data
                    }
                };
            case types.PROFILE_PROMPT_UPDATE_SUCCESS:
                console.log('profile data>>>', action)
                return {
                    ...state,
                    profilePromptApiMsg: 'success',
                    profileUpdateMsg: action?.payload?.data?.response,
                };
            case types.PROFILE_PROMPT_UPDATE_FAILURE:
                // console.log("update response: ",action);
                return {
                    ...state,
                    profilePromptApiMsg: 'error',
                    error: action.error,
                };
            case types.PROFILE_PROMPT_DELETE:
                return {
                    ...state,
                    // profileEditInfo: currrentTab_prompt,
                    requestData: {
                        ...action.payload.data
                    }
                };
            case types.PROFILE_PROMPT_DELETE_SUCCESS:
                console.log('profile data>>>', action)
                return {
                    ...state,
                    profilePromptDeleteApiMsg: 'success',
                    // profileUpdateMsg: áction?.payload?.data?.response,
                };
            case types.PROFILE_PROMPT_DELETE_FAILURE:
                // console.log("update response: ",action);
                return {
                    ...state,
                    profilePromptDeleteApiMsg: 'error',
                    error: action.error,
                };
            case types.PROFILE_MEDIA_UPDATE:
                return {
                    ...state,
                    // profileEditInfo: currrentTab_prompt,
                    requestData: {
                        ...action.payload.data
                    }
                };
            case types.PROFILE_MEDIA_SUCCESS:
                console.log('profile data>>>', action)
                return {
                    ...state,
                    profileMediaApiMsg: 'success',
                };
            case types.PROFILE_MEDIA_FAILURE:
                // console.log("update response: ",action);
                return {
                    ...state,
                    profileMediaApiMsg: 'error',
                    error: action.error,
                };
            case types.PROFILE_MEDIA_DELETE:
                return {
                    ...state,
                    // profileEditInfo: currrentTab_prompt,
                    requestData: {
                        ...action.payload.data
                    }
                };
            case types.PROFILE_MEDIA_DELETE_SUCCESS:
                console.log('profile data>>>', action)
                return {
                    ...state,
                    profileMediaDeleteApiMsg: 'success',
                };
            case types.PROFILE_MEDIA_DELETE_FAILURE:
                // console.log("update response: ",action);
                return {
                    ...state,
                    profileMediaDeleteApiMsg: 'error',
                    error: action.error,
                };
            case types.LISTINGS_MEDIA_UPDATE:
                return {
                    ...state,
                    // profileEditInfo: currrentTab_prompt,
                    requestData: {
                        ...action.payload.data
                    },
                    listingsMediaApiMsg: 'changed',
                };
            case types.LISTINGS_MEDIA_SUCCESS:
                console.log('profile data>>>', action)
                return {
                    ...state,
                    listingsMediaApiMsg: 'success',
                };
            case types.LISTINGS_MEDIA_FAILURE:
                // console.log("update response: ",action);
                return {
                    ...state,
                    listingsMediaApiMsg: 'error',
                    error: action.error,
                };
            case types.LISTINGS_MEDIA_DELETE:
                return {
                    ...state,
                    // profileEditInfo: currrentTab_prompt,
                    requestData: {
                        ...action.payload.data,
                        listingsMediaDeleteApiMsg: 'changed'
                    }
                };
            case types.LISTINGS_MEDIA_DELETE_SUCCESS:
                //console.log('profile data>>>', action)
                return {
                    ...state,
                    listingsMediaDeleteApiMsg: 'success',
                };
            case types.LISTINGS_MEDIA_DELETE_FAILURE:
                // console.log("update response: ",action);
                return {
                    ...state,
                    listingsMediaDeleteApiMsg: 'error',
                    error: action.error,
                };
    
        case types.ADDLISTING_REQUEST:
            console.log(action.payload,"this is addlisting payload")
            return {
                ...state,
                AddListingapiMsg: 'changed',
            }
        case types.ADDLISTING_SUCCESS:
            return{
                ...state,
                AddListingapiMsg: 'success',
                isAddedListing: true
            }
        case types.ADDLISTING_FAILURE:
            return{
                ...state,
                AddListingapiMsg: 'error',
                isAddedListing: false
            }
        case types.ADDLISTING_CHANGE:
            console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuhello is this working!... ")
            return{
                ...state,
                AddListingapiMsg: 'changed',
                isAddedListing: false
            }
        case types.LISTING_REQUEST:
            return{
                ...state,
                ListingapiMsg: 'changed',
            }
        case types.CONFIRM_TENANT:
            return{
                ...state,
                FoundRoommatesapiMsg:'changed'
            }
        case types.CONFIRM_LISTING_REQUEST:
            return{
                ...state,
                FoundRoommatesapiMsg: 'success'
            }
        case types.LISTING_SUCCESS:
            console.log("this is response --------",action.response.listings);
            console.log("arr1")
        //     var array =[...action.response]; // make a separate copy of the array
        //     var arr1=[...action.response.listings]
        //     console.log("arr2",arr1)
        //     for(var i=0;i<state.softdelete?.length;i++)
        //    {var index = array.listings.indexOf(softdelete[i])
        //     console.log("array",array.listings.length)
        //     if (index !== -1) {
        //     array.listings.splice(index, 1);
        //     }
         //   }
            
            return{
                ...state,
                user_total_data:action.response.current,
                user_total_deleted_data:action.response.previous,
                ListingapiMsg: 'success',
            }
        case types.LISTING_FAILURE:
            return{
                ...state,
                ListingapiMsg: 'error',
                isListed: false,
            }
        case types.LISTING_LIKE_REQUEST:
            console.log("reducer",action)
            return{
                ...state,
                ListingLikeapiMsg: 'changed',
            }
        case types.LISTING_LIKE_SUCCESS:
            return{
                ...state,
                listing_liked_users: action.response,
                ListingLikeapiMsg: 'success',
            }
        case types.LISTING_LIKE_FAILURE:
            return{
                ...state,
                ListingLikeapiMsg: 'error',
            }
        case types.UPDATELISTING_REQUEST:
            return{
                ...state,
                UpdateListingapiMsg: 'changed'
            }
        case types.UPDATELISTING_SUCCESS:
            //console.log("this is response ",action.response);
            return{
                ...state,
                UpdateListingapiMsg: 'success',
            }
        case types.UPDATELISTING_FAILURE:
            return{
                ...state,
                UpdateListingapiMsg: 'error',
            }
        case types.VIEWLISTING_REQUEST:
            return{
                ...state,
                Listing_total_data: action.response,
                ViewListingapiMsg: 'changed'
            }
        case types.VIEWLISTING_SUCCESS:
            console.log("=============----------------actionnnnsucess",action.response)
            return{
                ...state,
                current_listing_data : action.response,
                ViewListingapiMsg: 'success',
            }
        case types.VIEWLISTING_FAILURE:
            return{
                ...state,
                ViewListingapiMsg: 'error',
            }
        case types.DELETELISTING_REQUEST:
            return{
                ...state,
                DeleteListingapiMsg: 'changed'
            }
        case types.DELETELISTING_SUCCESS:
            //console.log("this is response ",action.response);
            return{
                ...state,
                DeleteListingapiMsg: 'success',
            }
        case types.DELETELISTING_FAILURE:
            return{
                ...state,
                DeleteListingapiMsg: 'error',
            }
        case types.EDITLISTING_REQUEST:
            console.log("kdshfgksdgfksdgf reducer")
            return{
                ...state,
                current_edit_listing_id:action.payload?.listing_id,
                
            }
        case types.PROFILE_MODAL_VIEW:
            // console.log('profile data>>> req', action)
            return {
                ...state,
                profileInfoApiMsg: 'request',
                requestData: {
                    ...action.payload.data
                }
            };
        case types.PROFILE_MODAL_VIEW_SUCCESS:
            console.log('profile data>>>', action)
            return {
                ...state,
                profileInfoApiMsg: 'success',
                modalProfile: action?.response,
            };
        case types.PROFILE_MODAL_VIEW_FAILURE:
            // console.log("update response: ",action);
            return {
                ...state,
                profileInfoApiMsg: 'error',
                error: action.error,
            };
        case types.PROFILE_MODAL_LIST_VIEW:
            return {
                ...state,
                profileInfoListApiMsg: 'request',
                requestData: {
                    ...action.payload.data
                }
            };
        case types.PROFILE_MODAL_LIST_VIEW_SUCCESS:
            // console.log('profile data>>>', action)
            return {
                ...state,
                profileInfoListApiMsg: 'success',
                listProfile: action?.response,
            };
        case types.PROFILE_MODAL_LIST_VIEW_FAILURE:
            // console.log("update response: ",action);
            return {
                ...state,
                profileInfoListApiMsg: 'error',
                error: action.error,
            };
        case types.PREFERENCE_VIEW_REQUEST:
            return {
                ...state,
                preferenceViewApiMsg: 'request'
            };
        case types.PREFERENCE_VIEW_SUCCESS:
            console.log('profile data>>>', action)
            return {
                ...state,
                preferenceViewApiMsg: 'success',
                preferenceEditInfo: action?.response,
            };
        case types.PREFERENCE_VIEW_FAILURE:
            // console.log("update response: ",action);
            return {
                ...state,
                preferenceViewApiMsg: 'error',
                error: action.error,
            };
        case types.PREFERENCE_LIST_UPDATE:
            return {
                ...state,
                // profileEditInfo: currrentTab_copy,
                requestData: {
                    ...action.payload.data
                }
            };
        case types.PREFERENCE_LIST_UPDATE_SUCCESS:
            console.log('profile data>>>', action)
            return {
                ...state,
                preferenceUpdateApiMsg: 'success',
                preferenceUpdateMsg: action?.payload?.data?.response,
            };
        case types.PREFERENCE_LIST_UPDATE_FAILURE:
            // console.log("update response: ",action);
            return {
                ...state,
                preferenceViewApiMsg: 'error',
                error: action.error,
            };
        case types.GOAL_CHANGE_REQUEST:
            return{
                ...state,
            }
        case types.GOAL_CHANGE_SUCCESS:
            return{
                ...state,
                goalChangeApiMsg: 'success',
            }
        case types.GOAL_CHANGE_FAILURE:
            return{
                ...state,
                goalChangeApiMsg: 'error'
            }
        case types.GET_FRIENDS_LIST_SUCCESS:
            console.log('[Reducer]GET_FRIENDS_LIST_SUCCESS ', action.response);
            return{
                ...state,
                friendsList: action.response.user_ids,
                friendsListApiMsg: 'success'
            }
        case types.ROOMMATE_LIST_SUCCESS:
          console.log("Roomatesuccess");
          return{
            ...state,
            RoommateList:action.response.user_ids,
            roommatelistapimsg:'success'

          }
        case types.GET_ROOMMATE_PROFILE_SUCCESS:
            console.log("Roommateprofile")
            console.log('[REDUCER][GET_FRIEND_PROFILE_SUCCESS][action.allFriendsProfileData]: ', action.allRoommatesprofileData);
            const RoommateData = [];
            action.allRoommatesprofileData.map(data => {
                const friendProfile = data.profile;
                const listingprofile =data.listings;
                const friendImage = data.media && data.media.length > 0 ? data.media[0].uri : null;
                const profileData={user_id:friendProfile.user_id, display_name:friendProfile.display_name, image_url: friendImage,listing:listingprofile,confirm:'yes'};
                RoommateData.push(profileData);
                
            })
                console.log('[REDUCER][GET_FRIEND_PROFILE_SUCCESS][profilesData]: ', profilesData);
            return{
                ...state,
                RoommateListprofile:RoommateData,
                roomateprofileapi:'success'

            }
        case types.UNCONFIRMED_USER:
            var j=0;
            console.log("hello67")
            for(var i=0;i<state.friendsProfileList.length;i++)
            { 
               if(state.friendsProfileList[i].user_id===action.payload.user_id)
               {
                state.friendsProfileList[i].confirm='yes';
               }


            }
            return{
                ...state,
    
               
            }

        case types.GET_FRIENDS_LIST_ERROR:
            return{
                ...state,
                friendsList: [],
                friendsListApiMsg: 'error'
            }
        case types.GET_FRIEND_PROFILE_SUCCESS:
            const profilesData = [];
            console.log('[REDUCER][GET_FRIEND_PROFILE_SUCCESS][action.allFriendsProfileData]: ', action.allFriendsProfileData);
            action.allFriendsProfileData.map(data => {
                const friendProfile = data.response.profile;
                const listingprofile =data.response.listings;
                const friendImage = data.response.media && data.response.media.length > 0 ? data.response.media[0].uri : null;
                const profileData={user_id:friendProfile.user_id, display_name:friendProfile.display_name, image_url: friendImage,listing:listingprofile,isavailable:data.is_available};
                profilesData.push(profileData);
            });
            console.log('[REDUCER][GET_FRIEND_PROFILE_SUCCESS][profilesData]: ', profilesData);
            
            return{
                ...state,
                friendsProfileList: profilesData,
                friendsProfileListApiMsg: 'success',
               
            }
        case types.GET_FRIEND_PROFILE_ERROR:
            return{
                ...state,
                friendsProfileListApiMsg: 'error'
            }
        case types.DO_UN_FRIEND_SUCCESS:
            console.log('[Reducer]DO_UN_FRIEND_SUCCESS-action.payload: ', action.payload);
            return{
                ...state,
                friendsList: state.friendsList.filter(user_id => user_id !== action.payload.user_id),
                doUnFriendApiMsg: 'success'
            }
        case types.DO_UN_FRIEND_ERROR:
            return{
                ...state,
                doUnFriendApiMsg: 'error'
            }
        case types.ACCOUNT_DEACTIVATE_REQUEST:
            // console.log('acc req>>', action)
            return {
                ...state,
                deactivateApiMsg: 'request',
            };
        case types.ACCOUNT_DEACTIVATE_SUCCESS:
            // console.log('acc req>> suc', action)
            return {
                ...state,
                deactivateApiMsg: 'success',
            };
        case types.ACCOUNT_DEACTIVATE_ERROR:
            // console.log("acc req>> fail",action);
            return {
                ...state,
                deactivateApiMsg: 'error',
                error: action.error,
            };
        case types.GET_PROFILE_MODAL_SUCCESS:
            return {
                ...state,
                userProfile: action.response,
                userProfileModalApiMsg: 'success'
            };
        case types.GET_PROFILE_MODAL_ERROR:
            return {
                ...state,
                userProfileModalApiMsg: 'error'
            };
        case types.CLEAR_PROFILE_MODAL:
            return {
                ...state,
                userProfile: {}
            };
        case types.ADD_TENANATS_REQUEST:
            return {
                ...state,
                addTenantsApiMsg:'changed'
            };
        case types.ADD_TENANATS_SUCCESS:
            return {
                ...state,
                addTenantsApiMsg: 'success',
            };
        case types.ADD_TENANATS_FAILURE:
            return {
                ...state,
                addTenantsApiMsg: 'error',
            };
        case types.GET_PROFILE_DATA:
            return {
                ...state,
            }
        case types.CONFIRMED_USER_PROFILE_DATA:
            return {
                ...state,
            }
        case types.CONFIRMED_USERS_REQUEST:
            return {
                ...state,
                ConfirmedUsersapiMsg: 'changed'
            };
        case types.CONFIRMED_USERS_SUCCESS:
            return {
                ...state,
                ConfirmedUsersapiMsg: 'success',
                confirm_user_details: action?.response,
            };
        case types.CONFIRMED_USERS_FAILURE:
            // console.log("update response: ",action);
            return {
                ...state,
                ConfirmedUsersapiMsg: 'error',
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;