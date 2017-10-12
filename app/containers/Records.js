import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, AsyncStorage,Dimensions} from "react-native";
import {getJSON} from '../network/index';
import {changeProgress, onClick} from '../redux/Actions';
import { List } from 'antd-mobile';
import CardDetail from './CardDetail';

const {width,height} = Dimensions.get('window');

var merid = '';
class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('id',(error,value)=>{
        if(value.length>0){
           merid=value;
           this.fethData();
        }
        else{
         Toast.info('权限出错', 2, null, false);
        }
    });
     
  }
  async fethData() {
    this.setState({ loading: true });
    const { page, seed } = this.state;
    const url = `socialCard/queryCard?memberId=${merid}&pageIndex=${this.state.page}&pageSize=10`;
     try {
        const json = await getJSON(url);
         if (json.success) {
            this.setState({
                data: page === 1 ? json.cardList : [...this.state.data, ...json.cardList],
                refreshing: false,
                loading: false
            });
         }
         else{
              Toast.info('请求接口失败!', 2, null, false);
         }
     } catch (error) {
       Toast.info('网络错误!', 2, null, false);
       
     }
  }
  
  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.fethData();
      }
    );
  };
 //加载更多
  handleLoadMore = () => {
    // this.setState(
    //   {
    //     page: this.state.page + 1
    //   },
    //   () => {
    //     this.fethData();
    //   }
    // );
  };
 
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <View  />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  mPress = (item) =>{
    const { navigation } = this.props;
    navigation.navigate('CardDetail', {id: item.cardId}); 
  }
  render() {
    return (
        <List style={{height,width}}>
            <FlatList
            style={{height,width}}
            data={this.state.data}
            
            renderItem={({ item }) => (
                <List.Item  
                    arrow='horizontal'
                    multipleLine 
                    onClick={()=>this.mPress(item)}
                    extra={`余额：￥${item.balance}元`}>
                        {item.alias.length>0?item.alias:item.cardNo}
                </List.Item>
            )}
            keyExtractor={item => item.cardId}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={90}
            />
        </List>
    );
  }
}

export default Records;