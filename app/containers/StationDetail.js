//import liraries
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground,
    Dimensions,
    Image
} from 'react-native';
import Bg2 from '../images/bg2.jpg';
import icon1 from '../images/icon1.png';
import { List, InputItem, Switch, Stepper, Range, Button, createTooltip,Toast } from 'antd-mobile';
import { getText, getJSON, postJSON } from '../network';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeProgress } from '../redux/Actions';
import Qianbao from '../images/qianbao.png';
const { width,height} = Dimensions.get('window');

// dispenserId	String(64)	可选	水站ID
// dispenserName	String(64)	可选	水站名称
// serialCode	String(64)	可选	水站编码(eg:88888888)
// address	String(64)	可选	安装位置
// netStatus	String(64)	可选	联网状态（正常或断网）
// create a component
class StationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dispenserName:'',
            serialCode: '',
            address: '',
            netStatus:''
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;
        this.fethData(params.id);
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
    onclick = () =>{
        const { navigation } = this.props;
        navigation.navigate('MangeMember', {id: this.state.cardId,type:2});  
        console.log('====================================');
        console.log('打印日志阿道夫');
        console.log('====================================');
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={Bg2} style={{width:width,height:120,flexDirection:'row'}}>
                  <View style={styles.icon}>
                      <Image source={icon1} style={{height:30,width:30}} resizeMode='contain'/>
                  </View>
                  <View>
                    <Text style={styles.text1}>{this.state.dispenserName}</Text>
                    <Text style={styles.text2}>{`水站编号：${this.state.serialCode}`}</Text>
                    <Text style={styles.text2}>{`安装位置：${this.state.address}`}</Text>   
                  </View>
                </ImageBackground>
                <List>
                  <List.Item extra={this.state.netStatus}>联网状态</List.Item>
                  <List.Item extra='查看' arrow='horizontal' onClick={()=>this.onclick()}>打水记录</List.Item>
               </List>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEFF6',
    },
    top:{
        padding:10,
        flexDirection:'row'
    },
    icon:{
        height:50,
        width:50,
        backgroundColor:'lightgray',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        margin:15
    },
    text1:{
        fontSize:18,
        color:'white',
        backgroundColor:'transparent',
        marginTop:20,
        marginBottom:10
    },
    text2:{
        fontSize:14,
        color:'white',
        backgroundColor:'transparent',
        marginBottom:5
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

export default connect(mapStateToProps, mapDispatchToProps)(StationDetail);

