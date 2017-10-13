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
import shuizhanicon from '../images/shuizhanicon.png';
const { width,height} = Dimensions.get('window');


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
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={Bg2} style={{width:width,height:120,flexDirection:'row'}}>
                      <Image source={shuizhanicon} style={styles.icon} resizeMode='contain'/>
                  <View>
                    <Text style={styles.text1}>{this.state.dispenserName}</Text>
                    <Text style={styles.text2}>{`水站编号：${this.state.serialCode}`}</Text>
                    <Text style={styles.text2}>{`安装位置：${this.state.address}`}</Text>   
                  </View>
                </ImageBackground>
                <List>
                  <List.Item 
                       extra={<Text style={{fontSize:14,color:'#666666'}}>{this.state.netStatus}</Text>} 
                       >
                      <Text style={{fontSize:14,color:'#666666'}}>
                         联网状态
                      </Text>
                 </List.Item>
                  <List.Item 
                       extra={<Text style={{fontSize:14,color:'#666666'}}>查看</Text>} 
                       arrow='horizontal' 
                       onClick={()=>this.onclick()}>
                      <Text style={{fontSize:14,color:'#666666'}}>
                          打水记录
                      </Text>
                 </List.Item>
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

