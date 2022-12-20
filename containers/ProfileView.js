import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GET_USER_PROFILE, GET_PROFILE_MODAL } from '../actions/actionTypes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused } from '@react-navigation/native';

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
const globalProfile = {
  about: {
    label: "About Me",
    elements: {
      ethnicity: {
        label: "Ethnicity",
        type: "radio",
        options: {
          A: "American Indian",
          B: "Black/African Descent",
          C: "East Asian",
          D: "Hispanic/Latino",
          E: "Middle Eastern",
          F: "Pacific Islander",
          G: "South Asian",
          H: "Southeast Asian",
          I: "White/Caucasian",
          J: "Other"
        }
      },
      hometown: {
        label: "Hometown",
        type: "text",
        placeholder: "Chicago, IL or Mumbai, India"
      },
      relationship_status: {
        label: "Relationship Status",
        type: "radio",
        options: {
          A: "Single",
          B: "In a Relationship",
          C: "Engaged",
          D: "Married",
          E: "In a civil partnership",
          F: "In a domestic partnership",
          G: "In an open relationship",
          I: "It's Complicated",
          H: "Separated",
          J: "Divorced",
          K: "Widowed"
        }
      },
      dietary_preference: {
        label: "Dietary Preference",
        type: "radio",
        options: {
          A: "No Restrictions",
          B: "Vegetarian",
          C: "Vegan",
          D: "Ketogenic",
          E: "Halal",
          F: "Paleo",
          G: "Dairy free and lactose free",
          H: "Gluten free and coeliac",
          I: "Tree nut and peanut allergies",
          J: "Fish and shellfish allergies",
          K: "Other"
        }
      },
      // "work": {
      //   label: "Work",
      //   type: "text",
      //   "placeholder": "Product Manager at Google"
      // },
      "education_level": {
        label: "Education Level",
        type: "radio",
        options: {
          "HS": "High School",
          "UG": "Undergrad",
          "PG": "Postgrad"
        }
      },
      "political_views": {
        label: "Political Views",
        type: "radio",
        options: {
          A: "Liberal",
          B: "Moderate",
          C: "Conservative",
          D: "Not Political",
          E: "Other"
        }
      },
      "religion": {
        label: "Religious Beliefs",
        type: "radio",
        options: {
          A: "Agnostic",
          B: "Atheist",
          C: "Buddhist",
          D: "Catholic",
          E: "Christian",
          F: "Hindu",
          G: "Jewish",
          H: "Muslim",
          I: "Sikh",
          J: "Spiritual",
          K: "Other"
        }
      },
      "pets": {
        label: "Pets",
        type: "checkbox",
        options: {
          A: "Dog",
          B: "Cat",
          C: "Monkey",
          D: "Bird",
          E: "Rabbit",
          F: "Pig",
          G: "Fish",
          H: "Snake",
          I: "Mouse",
          J: "Turtle",
          K: "Spider",
          L: "Other"
        }
      }
    }
  },
  "vices": {
    label: "Vices",
    "elements": {
      "smoking": {
        label: "Smoking",
        type: "radio",
        options: {
          Y: "Yes",
          N: "No",
          S: "Socially"
        }
      },
      "drinking": {
        label: "Drinking",
        type: "radio",
        options: {
          Y: "Yes",
          N: "No",
          S: "Socially"
        }
      },
      "marijuana": {
        label: "Marijuana",
        type: "radio",
        options: {
          Y: "Yes",
          N: "No",
          S: "Socially"
        }
      },
      "drugs": {
        label: "Drugs",
        type: "radio",
        options: {
          Y: "Yes",
          N: "No",
          S: "Socially"
        }
      }
    }
  },
  "personal_information": {
    label: "Personal Information",
    "elements": {
      "display_name": {
        label: "Full Name",
        type: "text",
        "placeholder": "Full Name",
        "info": "Hide your name to show your initials to unmatched profiles."
      },
      "dob": {
        label: "Date of Birth",
        type: "date",
        "placeholder": "Date of Birth",
        "info": "Only your age is visible on your profile."
      },
      "gender": {
        label: "Gender",
        type: "radio",
        options: {
          F: "Female",
          M: "Male",
          N: "Non-Binary"
        }
      },
      "pronouns": {
        label: "Pronouns",
        type: "checkbox",
        options: {
          A: "she/her",
          B: "he/him",
          C: "they/them",
          D: "ze/zir",
          E: "xe/xim",
          F: "ey/em",
          G: "ve/ver"
        }
      }
    }
  }
};
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


const ProfileView = (props) => {
  const dispatch = useDispatch();

  const userProfile = useSelector(state => state.userProfile);
  const isFocused = useIsFocused();
  let profile;
  let prompts;

  const authorization = useSelector(state => state.Authorization);
  useEffect(() => {
    console.log('[ProfileView]isFocused', isFocused);
    if (isFocused === true) {
      if (props.user_id) {
        console.log('[ProfileView]GET_PROFILE_MODAL action dispacthed with user_id: ', props.user_id);
        dispatch({ type: GET_PROFILE_MODAL, payload: { authorization: authorization, user_id: props.user_id } });
      } else {
        console.log('[ProfileView]GET_USER_PROFILE action dispacthed');
        dispatch({ type: GET_USER_PROFILE, payload: { authorization } });
      }
    }
  }, [isFocused]);

  function removeSpecialCharacters(str) {
    if (str) {
      return str.replace(/[^a-zA-Z0-9 /,]/g, "");
    }
    return str;
  }
  let listings;
  // let showListingImage = false;
  console.log("User profile:", userProfile);
  if (userProfile && userProfile.listings && userProfile.listings.length > 0) {
    console.log("userprofile listings:", userProfile.listings)
    listings = userProfile.listings[0];
    // showListingImage = listings.media && listings.media.length > 0 ? true : false;
  }
  console.log('[ProfileView]', userProfile);
  function constructProfile() {
    const profile = {
      displayName: userProfile.profile.display_name ? removeSpecialCharacters(userProfile.profile.display_name) : null,
      gender: userProfile.profile.gender ? globalProfile.personal_information.elements.gender.options[removeSpecialCharacters(userProfile.profile.gender)] : null,
      dob: userProfile.profile.dob ? getAge(userProfile.profile.dob) : null,
      id: userProfile.profile.id ? userProfile.profile.id : null,
      ethnicity: userProfile.profile.ethnicity ? globalProfile.about.elements.ethnicity.options[removeSpecialCharacters(userProfile.profile.ethnicity)] : null,
      hometown: userProfile.profile.hometown ? removeSpecialCharacters(userProfile.profile.hometown) : null,
      relationship_status: userProfile.profile.relationship_status ? globalProfile.about.elements.relationship_status.options[removeSpecialCharacters(userProfile.profile.relationship_status)] : null,
      dietary_preference: userProfile.profile.dietary_preference ? globalProfile.about.elements.dietary_preference.options[removeSpecialCharacters(userProfile.profile.dietary_preference)] : null,
      work: userProfile.profile.work ? removeSpecialCharacters(userProfile.profile.work) : null,
      education_level: userProfile.profile.education_level ? globalProfile.about.elements.education_level.options[removeSpecialCharacters(userProfile.profile.education_level)] : null,
      political_views: userProfile.profile.political_views ? globalProfile.about.elements.political_views.options[removeSpecialCharacters(userProfile.profile.political_views)] : null,
      religion: userProfile.profile.religion ? globalProfile.about.elements.religion.options[removeSpecialCharacters(userProfile.profile.religion)] : null,
      pets: userProfile.profile.pets ? handle_types("about","pets")  : null,
      smoking: userProfile.profile.smoking ? globalProfile.vices.elements.smoking.options[removeSpecialCharacters(userProfile.profile.smoking)] : null,
      drinking: userProfile.profile.drinking ? globalProfile.vices.elements.drinking.options[removeSpecialCharacters(userProfile.profile.drinking)] : null,
      marijuana: userProfile.profile.marijuana ? globalProfile.vices.elements.marijuana.options[removeSpecialCharacters(userProfile.profile.marijuana)] : null,
      drugs: userProfile.profile.drugs ? globalProfile.vices.elements.drugs.options[removeSpecialCharacters(userProfile.profile.drugs)] : null,
      pronouns: userProfile.profile.pronouns ? handle_types("personal_information","pronouns") : null,
    }
    return profile;
  }
  function handle_types(type,obj)
  {
    pron=removeSpecialCharacters(userProfile.profile[obj].toString())
    let z=""
    let pron=pron.split(",")
    for (let i=0;i<pron.length;i++){
        let x=pron[i].trim()
        let y= globalProfile[type].elements[obj].options[x]
        z=z.concat(y,",")
    }
    return (z.substring(0,z.length-1))
  }
  function constructPrompts() {
    return userProfile.prompts.map((eachPrompt) => { return { key: eachPrompt.key, value: eachPrompt.value } })
  }

  if (userProfile && userProfile.profile) {
    profile = constructProfile();
  }

  if (userProfile && userProfile.prompts && userProfile.prompts.length > 0) {
    prompts = constructPrompts();
  }

  let showProfileImage = false;
  if (userProfile && userProfile.media && userProfile.media.length > 0) {
    showProfileImage = true;
  }

  const tilesStyles = () => {
    if (props.modalView) {
      return styles.modalViewTiles;
    }
    return styles.tiles;
  }

  const containerStyles = () => {
    if (props.modalView) {
      return styles.modalContainer;
    }
    return styles.container;
  }

  const imageStyles = () => {
    if (props.modalView) {
      return styles.modalImage;
    }
    return styles.image;
  }

  return (
    <ScrollView>
      <View style={containerStyles()}>

        {profile && <View>
          {showProfileImage && <Image style={imageStyles()} source={{ uri: "https://d138zt7ce8doav.cloudfront.net/".concat(userProfile.media[0].uri) }}></Image>}
          {!showProfileImage && <Image style={imageStyles()} source={require('../assets/png/blank-profile-picture.png')}></Image>}
          {profile && profile.displayName && <Text style={styles.personalData}>{`${profile.displayName}, ${profile.dob}`}</Text>}
        </View>}
        {profile && <View style={tilesStyles()}>
          {profile.pronouns && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome name="user" size={20}></FontAwesome>
              <Text>{profile.pronouns}</Text>
            </View>
          </View>}
          {profile.gender && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              {profile.gender === 'Male' && <FontAwesome name="male" size={20}></FontAwesome>}
              {profile.gender !== 'Male' && <FontAwesome name="female" size={20}></FontAwesome>}
              <Text>{profile.gender}</Text>
            </View>
          </View>}
          {profile.work && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome name="briefcase" size={20}></FontAwesome>
              <Text>{profile.work}</Text>
            </View>
          </View>}
          {profile.ethnicity && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome name="globe" size={20}></FontAwesome>
              <Text>{profile.ethnicity}</Text>
            </View>
          </View>}
          {profile.hometown && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome name="home" size={20}></FontAwesome>
              <Text>{profile.hometown}</Text>
            </View>
          </View>}
          {profile.relationship_status && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome name="heart" size={20}></FontAwesome>
              <Text>{profile.relationship_status}</Text>
            </View>
          </View>}
          {profile.education_level && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome name="graduation-cap" size={20}></FontAwesome>
              <Text>{profile.education_level}</Text>
            </View>
          </View>}
          {profile.dietary_preference && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome name="cutlery" size={20}></FontAwesome>
              <Text>{profile.dietary_preference}</Text>
            </View>
          </View>}
          {profile.political_views && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome name="university" size={20}></FontAwesome>
              <Text>{profile.political_views}</Text>
            </View>
          </View>}
          {profile.religion && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome5 name="praying-hands" size={20}></FontAwesome5>
              <Text>{profile.religion}</Text>
            </View>
          </View>}
          {profile.pets && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome name="paw" size={20}></FontAwesome>
              <Text>{profile.pets}</Text>
            </View>
          </View>}
          {profile.smoking && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome5 name="smoking" size={20}></FontAwesome5>
              <Text>{profile.smoking}</Text>
            </View>
          </View>}
          {profile.drinking && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome5 name="cocktail" size={20}></FontAwesome5>
              <Text>{profile.drinking}</Text>
            </View>
          </View>}
          {profile.marijuana && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome5 name="cannabis" size={20}></FontAwesome5>
              <Text>{profile.marijuana}</Text>
            </View>
          </View>}
          {profile.drugs && <View style={styles.tilePadding}>
            <View style={styles.tile}>
              <FontAwesome5 name="capsules" size={20}></FontAwesome5>
              <Text>{profile.drugs}</Text>
            </View>
          </View>}
        </View>}
        {!props.hideListing && prompts && <View style={styles.prompts}>
          {prompts.map(eachPrompt => (
            <View style={styles.prompt} key={Math.random()}>
              <Text>{globalPrompt[eachPrompt.key]}</Text>
              <Text>{eachPrompt.value}</Text>
            </View>))}
        </View>}
        {/* {!listings && <Image style={styles.listingImage} source={require('../assets/png/OIP.jpg')}></Image>}
        {listings && <View style={styles.listingsContainer}>
          {showListingImage && <Image style={styles.image} source={{ uri: "https://d138zt7ce8doav.cloudfront.net/".concat(listings.media[0].image_url) }}></Image>}
          {!showListingImage && <Image style={styles.listingImage} source={require('../assets/png/OIP.jpg')}></Image>}
          {listings.listing && listings.listing.title && <Text style={styles.titleListing}>{listings.listing.title}</Text>}
          {listings.listing && listings.listing.monthly_rent && <Text style={styles.rentAmount}>{`$ ${listings.listing.monthly_rent}`}</Text>}
        </View>} */}
      </View>

    </ScrollView>)
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listingsContainer: {
    marginTop: 15,
    marginBottom: 15
  },
  prompts: {
    marginTop: 20
  },
  prompt: {
    display: 'flex',
    flexDirection: 'column',
    width: 286,
    backgroundColor: 'lightgray',
    marginTop: 10,
    padding: 10
  },
  image: {
    width: 286,
    height: 186
  },
  modalImage: {
    width: 286,
    height: 186,
    marginTop: -30
  },
  listingImage: {
    width: 286,
    height: 186
  },
  titleListing: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 12
  },
  rentAmount: {
    position: 'absolute',
    top: 30,
    left: 10,
    fontSize: 12
  },
  personalData: {
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#ffffff',
    fontSize: 20,
    zIndex: 100
  },
  tiles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 37,
    marginRight: 35
  },
  modalViewTiles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: 35
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
    paddingRight: 9
  }
});

export default ProfileView;