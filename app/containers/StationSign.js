//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Image } from 'react-native';
import QianShouImage from '../images/qs.png';
import { Toast } from 'antd-mobile';
import { getText, getJSON, postJSON } from '../network';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeProgress } from '../redux/Actions';

const texts = '   运营商通过后台申请升级水站设备后，日日顺会安排售后服务人员免费上门更换主板。更换后输入主板编号即可正常使用';
// create a component
class StationSign extends Component {
    constructor(props) {
        super(props);
        this.state = {
          num:''
        };
    }

    async fethData(value) {
        this.props.changeProgress(true);
        const url = `socialDispenser/dispenserDetail?dispenserId=${value}`;
         try {
            const json = await getJSON(url);
             this.props.changeProgress(false);
             if (json.success) {
                this.setState({
                    ...json
                })   
             }
             else{
              Toast.info('请求接口失败!', 2, null, false);
             }
         } catch (error) {
           Toast.info('网络错误!', 2, null, false);
           this.props.changeProgress(false);
         }
      }
    mPress = () =>{
        if (this.state.num.length>0) {
            const { navigation } = this.props;
            const { state } = navigation;
            const { params } = state;
           
        }else{
            Toast.info('主板编号不能为空', 2, null, false);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{marginLeft:10,marginTop:20,flexDirection:'row'}}>
                  <Image source={QianShouImage}/>
                  <Text style={[styles.buttontext,{color:'gray',margin:10,fontSize:20}]}>
                  待签收
                </Text>
                </View>
                <Text style={[styles.buttontext,{color:'gray',margin:10}]}>
                  {texts}
                </Text>
                <View style={styles.input}>
                        <TextInput
                            autoCapitalize='none'
                            multiline={false}
                            style={styles.accountTextInput}
                            underlineColorAndroid='transparent'
                            keyboardType='email-address'
                            secureTextEntry={true}
                            value = {this.state.num}
                            onChangeText = {(text) => {
                                this.setState({num:text}); 
                            }}
                            placeholder='请在此输入更换后的主板编号'/>
                    </View>
                <TouchableOpacity style={styles.button} onPress={this.mPress}>
                        <Text style={styles.buttontext}>
                            签 收
                        </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    buttontext:{
        fontSize:16,
        color:'white'
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
    destext:{
        fontSize:14,
        color:'white',
        textAlign:'center',
        backgroundColor:'transparent',
        margin:10,
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

export default connect(mapStateToProps, mapDispatchToProps)(StationSign);

