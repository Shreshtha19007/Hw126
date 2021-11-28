import * as React from 'react'
import { Button,Image,View,Platform }from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

export default class PickImage extends React.Component {
state = {
    image : null
}
getPermission = async()=>{
if(Platform.OS!=="web"){
    const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(status!=="granted"){
        alert("Sorry! We need camera permissions to carry out this task")
    }
}
}
componentDidMount(){
    this.getPermission()
}
_pickImage = async()=>{
    try{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })
        if(!result.cancelled){
            this.setState({image: result.data})
            this.uploadImage(result.uri)

        }
    }
    catch(E){
        console.log(E)
    }
}
uploadImage = async(uri)=>{
    const data = new FormData()
    let filename = uri.split("/")[uri.split("/").length-1]
}

render(){
    let {image} = this.state
    return(
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <Button title="Upload Image"
        onPress = {this._pickImage}>
            </Button>
    </View>
    )
}
}