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
    TextInput,
    AsyncStorage,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import Home from './Home';
import Bg from '../images/bg.png';
import Logo from '../images/logo.png';
import headicon from '../images/headicon.png';
import passicon from '../images/passicon.png';
import { Toast } from 'antd-mobile';
import { postJSON } from '../network';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeProgress } from '../redux/Actions';

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
    
  
    componentDidMount() {
        AsyncStorage.getItem('name',(error,value)=>{
            if (value) {
                this.setState({nameStr:value});
            }
          
           console.log('====================================');
           console.log();
           console.log('====================================');
        });
        AsyncStorage.getItem('pwd',(error,value)=>{
            if (value) {
                this.setState({pwdStr:value});
                this.loginApps();
            }
           
            console.log('====================================');
            console.log();
            console.log('====================================');
        });
    }
    async loginApps() {
      this.props.changeProgress(true);
      const params = `mobile=${this.state.nameStr}&passWord=${this.state.pwdStr}`;
      const url = 'socialLogin/login';
       try {
          const json = await postJSON(url,params);
           this.props.changeProgress(false);
           if (json.success) {
            AsyncStorage.setItem('name',this.state.nameStr,null);
            AsyncStorage.setItem('pwd',this.state.pwdStr,null);
            AsyncStorage.setItem('id',`${json.memberId}`,null);
            const { navigation } = this.props;
            navigation.navigate('Home', {...json});
            
           }
           else{
            Toast.info('用户名或密码错误!', 2, null, false);
           }
          console.log('====================================');
          console.log(`请求接口数据${JSON.stringify(json)}`);
          console.log('====================================');

        //   this.props.changeHomeApp(json);
       } catch (error) {
         Toast.info('网络错误!', 2, null, false);
         this.props.changeProgress(false);
        //    this.props.changeProgress(false);
           console.log('====================================');
           console.log(`请求接口失败${error}`);
           console.log('====================================');
       }
    }
    mPress = () =>{
        if (this.state.nameStr.length>0&&this.state.pwdStr.length>0) {
             
             this.loginApps();
            
           
        }else{
            Toast.info('用户名和密码都不能为空!', 2, null, false);
        }
    }
    nPress = () =>{
        // const { navigation } = this.props;
        // navigation.navigate('Getpassword', {name: ''});
    }
    render() {
       const mstyle = Platform.OS === 'android' ? styles.destextandroid : styles.destext;
        return (
            <View style={styles.container}>
               
             <ImageBackground source={Bg} style={{height,width}}>
                <View style={styles.topcontainer}>
                  <Image source={Logo} style={{width:0.3*width}} resizeMode='contain'/>
                </View>
                <KeyboardAvoidingView behavior="padding"style={styles.avoid}>
                <View style={{flex:1}}>
                    <View style={styles.input}>
                        <Image source={headicon} style={styles.icon} resizeMode='contain'/>
                        <TextInput
                            autoCapitalize='none'
                            multiline={false}
                            style={styles.accountTextInput}
                            underlineColorAndroid='transparent'
                            keyboardType='numeric'
                            placeholderTextColor='grey' 
                            value = {this.state.nameStr}
                            onChangeText = {(text) => {
                                this.setState({nameStr:text}); 
                            }}
                            returnKeyType='done'
                            placeholder='请输入账号'/>
                    </View>
                    <View style={styles.input}>
                        <Image source={passicon} style={styles.icon} resizeMode='contain'/>
                        
                        <TextInput 
                             style={styles.accountTextInput}
                             autoCapitalize = 'none'  
                             value = {this.state.pwdStr}
                             placeholder="请输入密码" 
                             underlineColorAndroid="transparent" 
                             placeholderTextColor='grey' 
                             secureTextEntry={true} 
                             onChangeText = {(text) => {
                                this.setState({pwdStr:text}); 
                             }}
                             returnKeyType='done' />
                        
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.mPress}>
                        <Text style={styles.buttontext}>
                            登  录
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.getpassword} onPress={this.nPress}>
                        <Text style={[styles.buttontext,{color:'gray'}]}>
                            忘记密码？
                        </Text>
                    </TouchableOpacity>
                </View>  
                </KeyboardAvoidingView>
                <Text style={[mstyle,{color:'gray'}]}>
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
        fontSize:12,
        color:'white',
        textAlign:'center',
        backgroundColor:'transparent',
        margin:10,
     },
     destextandroid:{
        fontSize:12,
        color:'white',
        textAlign:'center',
        backgroundColor:'transparent',
        margin:10,
        marginBottom:30,
     },
     avoid:{
        flex: 1,
        backgroundColor:'white',
        justifyContent: 'center',//
        backgroundColor:'transparent'
     }

});



const mapDispatchToProps = dispatch => bindActionCreators({
    changeProgress
},dispatch);

const mapStateToProps = (state, ownProps) => {
    return {
        progressHud: state.progressHud,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

