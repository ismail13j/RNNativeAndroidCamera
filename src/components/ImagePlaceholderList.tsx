import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, NativeModules, PermissionsAndroid, BackHandler, Alert } from 'react-native';
import FIcons from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { updateJobList } from '../redux/slices';
import { CONST } from '../constants';

const { CameraModule } = NativeModules;

export const ImagePlaceholderList = ({navigation}:{
    navigation: any
}) => {
    const dispatch = useDispatch();
    const [imageArray, setImageArray] = React.useState([]);

    React.useEffect(()=>{
        const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
        );
        return () => backHandler.remove();
    },[]);

    React.useEffect(()=>{
        if(imageArray.length === 3){
        saveJobBeforeYouGo()
        }
    },[imageArray])

    const backAction = () =>{
        if(imageArray.length < 3){
        Alert.alert('Stop', CONST.AddJobScreen.backAlert.message, [
            {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
            },
            {text: 'Proceed', onPress: () => navigation.goBack()},
        ]);
        }
        return true
    }

    const saveJobBeforeYouGo = () => {
        dispatch(updateJobList(imageArray))
        setTimeout(()=>{
        navigation.goBack();
        },1000);
    }

    const requestCameraPermission = async () => {
        try {   
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                title: CONST.AddJobScreen.cameraPermissionAlert.title,
                message:  CONST.AddJobScreen.cameraPermissionAlert.message,
                buttonNeutral:  CONST.AddJobScreen.cameraPermissionAlert.askMeLater,
                buttonNegative:  CONST.AddJobScreen.cameraPermissionAlert.cancel,
                buttonPositive:  CONST.AddJobScreen.cameraPermissionAlert.ok,
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
                triggerCamera()
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const triggerCamera = () => {
        CameraModule.openCamera('imageID', CallbackFunction)
    };

    const CallbackFunction = (file: any) => {
        if(file){
        let newArray: any = [...imageArray, file]
        setImageArray(newArray)
        }
    };

    const isDisabled = imageArray.length > 2

    return (<>
        {CONST.AddJobPlaceholderArray.map((item, index)=>
            <TouchableOpacity 
            key={item.key} 
            style={styles.imageCard} 
            onPress={requestCameraPermission} 
            disabled={isDisabled}>
            {imageArray[index] !== undefined ? 
                (<Image 
                source={{uri: imageArray[index]}}
                style={styles.image}/>) :( <View style={styles.iconBox}>
                <FIcons name="plus-circle" size={40}/>
                </View>)}
                <View style={styles.cardText}>
                    <Text>{item.title}</Text>
                </View>
            </TouchableOpacity>)}
        </>
    );
}

const styles = StyleSheet.create({
    imageCard:{
        flexDirection: 'column',
        borderColor: '#CCDBEB',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: 'white',
        width: '30%',
        height: '20%',
        justifyContent:'space-between',
        overflow: 'hidden'
    },
    cardText:{
        backgroundColor:"#CCDBEB",
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11,
    },
    iconBox:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    image:{
        width: '100%',
        height: '100%',
        resizeMode:'cover',
    }
  })