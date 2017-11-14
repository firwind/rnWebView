import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions, TouchableOpacity } from 'react-native';
import { List, InputItem } from 'antd-mobile';
import { Toast } from 'antd-mobile';
import { getText, getJSON, postJSON } from '../network';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeProgress , onClick} from '../redux/Actions';
import mPubSub from 'pubsub-js';

const {width,height} = Dimensions.get('window');
// create a component
class EditCard extends Component {
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
      <View style={{height:20,width,backgroundColor:'#EDEEEF',justifyContent:'center',padding:15}}>
      </View>
    )
    renderFooter = () => (
      <View style={ {height: 65, width, justifyContent:'center', alignItems: 'center'} }>
        <TouchableOpacity style={styles.button} onPress={()=>{this.confirm()}}>
          <Text style={styles.buttontext}>完成</Text>
        </TouchableOpacity>
      </View>
    )
    confirm = async () => {
      const { navigation } = this.props;
      const { state } = navigation;
      const { params } = state;
      this.fethData(params.id);

      const param = `cardId=${params.id}&alias=${this.state.alias}&mobile=${this.state.mobile}`;
      const url = 'socialCard/update';
       try {
          const json = await postJSON(url,param);
          console.log('====================================', json);
          navigation.goBack();
          mPubSub.publishSync('ReloadItem')
       }  catch (error) {
        Toast.info('网络错误!', 2, null, false);
       //    this.props.changeProgress(false);
          console.log('====================================');
          console.log(`请求接口失败${error}`);
          console.log('====================================');
      }
    }
    render() {
        return (
            <List style={styles.container} renderHeader={()=>this.renderHeader()} renderFooter={()=>this.renderFooter()}>
                <InputItem
                  placeholder={this.state.alias}
                  clear
                  moneyKeyboardAlign="right"
                  onChange={(v) => { this.setState({ alias: v }) }}
                  onBlur={(v) => { console.log('onBlur', v); }}
                >
                  持卡人
                </InputItem>
                <InputItem
                  placeholder={this.state.mobile}
                  clear
                  moneyKeyboardAlign="right"
                  onChange={(v) => { this.setState({ mobile: v }) }}
                  onBlur={(v) => { console.log('onBlur', v); }}
                >
                  联系电话
                </InputItem>
            </List>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button:{
      backgroundColor: 'green',
      height:45,
      margin:10,
      width: 200,
      borderRadius:5,
      borderWidth:2,
      borderColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttontext:{
      fontSize:16,
      color:'white'
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);