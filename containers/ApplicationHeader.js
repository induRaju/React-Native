import { Platform,View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';


const ApplicationHeader = (props) => {
    const home_goal = useSelector(state => state.home_goal);
    const navigation = props.route.navigation;
    const goal = [{ id: 1, value: 'I have a vacant room looking for flatmate' },
    { id: 2, value: 'I am looking for a vacant room with flat mate' },
    { id: 3, value: 'I am having a house to give for lease' }];

    console.log('[APPLICATION HEADER]HomeGoal', home_goal);
    let goalValue;
    if (home_goal) 
    {
        goalValue = goal.filter((eachGoal) => eachGoal.id == home_goal)[0].value;
    }
   

    const onClickImageHandler = () => {
        console.log('[APLPLICATION HEADER][onClickImageHandler] navigating to Home Screen...');
        navigation.navigate('Rentals&Friends', { screen: 'Hometab' });
    }

    return (
        <View style={styles.containerView}>
            <TouchableOpacity onPress={() => onClickImageHandler()}>
                <Image style={styles.image} source={require('../assets/png/Brand.jpg')} resizeMode='contain'></Image>
                {/* topAdjustment={Platform.OS === 'android' ? currentHeight:0} */}
                
            </TouchableOpacity>
            <View style={styles.flexColumn}>
                <Text style={styles.title}>Rentals&Friends</Text>
                {/* {goalValue && <Text style={styles.subTitle}>{`Your Goal: ${goalValue}`}</Text>} */}
                {goalValue && <Text style={styles.subTitle}>{goalValue}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        display: 'flex',
        flexDirection: 'row',
        // position:'relative',
        // left:0,
        justifyContent:'center',
        alignItems: "center",
        paddingHorizontal: Platform.OS === 'ios' ? 10 : 30
        // marginBottom:20
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        marginLeft:6
    },
    title: {
        fontSize: 18
    },
    subTitle: {
        fontSize: 12
    },
    image: {
        width: 40,
        height: 40
    }
});

export default ApplicationHeader;