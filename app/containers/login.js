//import liraries
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ImageBackground, 
    Dimensions,
    Image,
    TextInput
} from 'react-native';
import Home from './Home';
import Bg from '../images/bg.png';
import Logo from '../images/logo.png';
import headicon from '../images/headicon.png';
import passicon from '../images/passicon.png';
import { Toast } from 'antd-mobile';


const { width, height } = Dimensions.get('window');


// create a component
class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
           nameStr: '',
           pwdStr: '',
        };
    }
    mPress = () =>{
        if (this.state.nameStr.length>0&&this.state.pwdStr.length>0) {
            const { navigation } = this.props;
            navigation.navigate('Home', {name: ''});
           
        }else{
            Toast.info('用户名和密码都不能为空!', 2, null, false);
        }
    }
    render() {
        return (
            <View style={styles.container}>
             <ImageBackground source={Bg} style={{height,width}}>
                <View style={styles.topcontainer}>
                  <Image source={Logo} style={{width:0.3*width}} resizeMode='contain'/>
                </View>
                <View style={{flex:1}}>
                    <View style={styles.input}>
                        <Image source={headicon} style={styles.icon} resizeMode='contain'/>
                        <TextInput
                            autoCapitalize='none'
                            multiline={false}
                            style={styles.accountTextInput}
                            underlineColorAndroid='transparent'
                            keyboardType='email-address'
                            value = {this.state.nameStr}
                            onChangeText = {(text) => {
                                this.setState({nameStr:text}); 
                            }}
                            placeholder='请输入账号（邮箱或手机号）'/>
                    </View>
                    <View style={styles.input}>
                        <Image source={passicon} style={styles.icon} resizeMode='contain'/>
                        <TextInput
                            autoCapitalize='none'
                            multiline={false}
                            style={styles.accountTextInput}
                            underlineColorAndroid='transparent'
                            keyboardType='email-address'
                            secureTextEntry={true}
                            value = {this.state.pwdStr}
                            onChangeText = {(text) => {
                                this.setState({pwdStr:text}); 
                            }}
                            placeholder='请输入密码'/>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.mPress}>
                        <Text style={styles.buttontext}>
                            登  录
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.getpassword}>
                        <Text style={[styles.buttontext,{color:'gray'}]}>
                            忘记密码？
                        </Text>
                    </TouchableOpacity>
                    
                </View>  
                <Text style={[styles.destext,{color:'gray'}]}>
                     Copyright©2017 RRSjk.All Rights Reserved
                </Text>
             </ImageBackground>
            </View>
        );
    }
}

Login.navigationOptions = {
    header: null
};
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    button:{
        backgroundColor: '#C3003B',
        height:45,
        margin:10,
        borderRadius:5,
        borderWidth:2,
        borderColor:'#C3003B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    getpassword:{
        backgroundColor: 'transparent',
        height:45,

        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    topcontainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        height:50,
        borderRadius:5,
        borderWidth:0.5,
        borderColor:'#d2d2d2',
        backgroundColor:'white',
        margin:10,
        flexDirection:'row',
    },
    icon:{
        width:25,
        height:25,
        margin:10,
    },
    accountTextInput: {
        flex: 1,
        color: 'black',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        fontSize: 14,
        fontWeight: 'bold'
    },
    buttontext:{
       fontSize:16,
       color:'white'
    },
    destext:{
        fontSize:14,
        color:'white',
        textAlign:'center',
        backgroundColor:'transparent',
        margin:10,
     }

});

//make this component available to the app
export default Login;
