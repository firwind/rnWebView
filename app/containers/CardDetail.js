//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { List } from 'antd-mobile';
import { Toast } from 'antd-mobile';
import { getText, getJSON, postJSON } from '../network';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeProgress , onClick} from '../redux/Actions';

const {width,height} = Dimensions.get('window');
// create a component
class CardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardId:'',
            cardNo:'',
            alias:'',
            mobile:'',
            balance:''
            
        };
    }
    mPress = ()=>{
        const { navigation } = this.props;
        navigation.navigate('MangeMember', {id: this.state.cardId,type:1});  
    }
    componentDidMount() {
        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;
        this.fethData(params.id);
    }
    async fethData(value) {
        this.props.changeProgress(true);
        const url = `socialCard/cardDetail?cardId=${value}`;
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
    renderHeader = () =>(
      <View style={{height:120,width,backgroundColor:'#EDEEEF',justifyContent:'center',padding:15}}>
          <Text style={{color:'gray',fontSize:20,}}>水卡编号：{this.state.cardNo}</Text>
          <View style={{flexDirection:'row',marginTop:10}}>
              <Text style={{color:'gray'}}>水卡余额：{this.state.balance}元</Text>
              <Text style={{color:'red',marginLeft:20}}>状态：正常</Text>
          </View>
      </View>
    )
    render() {
        return (
            <List style={styles.container} renderHeader={()=>this.renderHeader()}>
                <List.Item arrow='horizontal' extra={this.state.alias}>
                    持卡人
                </List.Item>
                <List.Item arrow='horizontal' extra={this.state.mobile}>
                    联系电话
                </List.Item>
                <List.Item arrow='horizontal' extra='查看' onClick={()=>this.mPress()}>
                    打水记录
                </List.Item>
            </List>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
const mapDispatchToProps = dispatch => bindActionCreators({
    changeProgress
},dispatch);

const mapStateToProps = (state, ownProps) => {
    return {
        progressHud: state.progressHud,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail);
//make this component available to the app
