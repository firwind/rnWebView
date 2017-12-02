import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, AsyncStorage,Dimensions} from "react-native";
import {getJSON} from '../network/index';
import {changeProgress} from '../redux/Actions';
import { List,ListView,Toast} from 'antd-mobile';
const {width,height} = Dimensions.get('window');
var mdata = [];
var merid = '';
var data = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class MangeMember extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      dataSource:data.cloneWithRows([]),
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      loadingMore: false
    };
  //   this.setState({
  //     dataSource: data.cloneWithRows(),
  // });
  }

  componentDidMount() {
    
    // AsyncStorage.getItem('id',(error,value)=>{
    //     if(value.length>0){
    //        merid=value;
            this.fethData();
    //     }
    //     else{
    //      Toast.info('权限出错', 2, null, false);
    //     }
   // });
     
  }
  async fethData() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    let mparams = 'dispenserId';
    if (params.type===1) {
      mparams='cardId';
    }
    this.setState({ loading: true });
    const { page, seed } = this.state;
    const url = `socialCard/fetchRecord?${mparams}=${params.id}&pageIndex=${this.state.page}&pageSize=10`;
    
    try {

        const json = await getJSON(url);
         if (json.success) {
            mdata = page === 1 ? json.recordList : [...mdata, ...json.recordList]
            this.setState({
              dataSource:data.cloneWithRows(mdata),
              loadingMore:false
            }); 
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
    if (this.state.loadingMore) return;
    this.setState(
      {
        loadingMore: true,
        page: this.state.page + 1
      },
      () => {
        this.fethData();
      }
    );
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
  render() {
    return (
        <List style={{height,width}}>
            <ListView
            style={{height:height,width}}
            dataSource={this.state.dataSource}
           
            renderRow={(item) => (
                <List.Item  
                    multipleLine 
                    extra={`打水量：${item.volume}L`}>
                        <View>
                            <Text style={{fontSize:18}}>{item.alias.length>0?item.alias:item.cardNo}</Text>
                            <Text style={{color:'lightgray'}}>{item.fetchAt}</Text>

                        </View>
                </List.Item>
            )}
            renderFooter={()=>this.renderFooter()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={10}
            />
        </List>
    );
  }
}

export default MangeMember;


// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { SearchBar, Button, WhiteSpace, WingBlank, Tabs, Badge } from 'antd-mobile';
// // create a component
// class MangeMember extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             searchText:''
//         };
//     }
    
//     callback = ()=>{
//         console.log('====================================');
//         console.log('sadadsasd');
//         console.log('====================================');
//     }
//     handleTabClick = ()=>{
//         console.log('====================================');
//         console.log('sadadsasd');
//         console.log('====================================');
//     }
//     render() {
//         return (
//             <View style={styles.container}>
//                 <SearchBar
//                     value={this.state.searchText}
//                     placeholder="搜索"
//                     onSubmit={value => console.log(value, 'onSubmit')}
//                     onClear={value => console.log(value, 'onClear')}
//                     onFocus={() => console.log('onFocus')}
//                     onBlur={() => console.log('onBlur')}
//                     onCancel={() => console.log('onCancel')}
                   
//                     onChange={(value)=>{this.setState({searchText:value})
//                     }}
//                 />
//                 <Tabs 
//                      defaultActiveKey="1" 
//                      onChange={this.callback} 
//                      onTabClick={this.handleTabClick}
//                      activeUnderlineColor='#D30031'
//                      activeTextColor='#D30031'
//                      textColor='gray'
//                      >
//                     <Tabs.TabPane tab='今日打水' key="1">
                        
//                     </Tabs.TabPane>
//                     <Tabs.TabPane tab='水卡列表' key="2">
                        
//                     </Tabs.TabPane>
//                     <Tabs.TabPane tab='待充值' key="3">
                        
//                     </Tabs.TabPane>
                    
//                 </Tabs>
//             </View>
//         );
//     }
// }

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#EDEFF4',
//     },
// });

// //make this component available to the app
// export default MangeMember;
