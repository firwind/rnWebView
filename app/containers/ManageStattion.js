//import liraries
import React, { Component } from 'react';
import { 
       View, 
       Text, 
       StyleSheet, 
       FlatList,
       Dimensions,
       Image,
       TouchableOpacity,
       AsyncStorage
} from 'react-native';
import { Toast } from 'antd-mobile';
import { getText, getJSON, postJSON } from '../network';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeProgress } from '../redux/Actions';
import Qianbao from '../images/shuizhanicon.png';


const { width, height } =Dimensions.get('window');


// const datas = [
//     {
//         dispenserId:1
//         dispenserName:"南岔河水站"
//         status:"运营中"
//         todayFetch:487
//     },
//     {
//         title:'南岔adad护额',
//         id: 2,
//         dashui: 487,
//         state:2,

//     }
// ];


// create a component
class ManageStation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };

    }
    componentDidMount() {
       AsyncStorage.getItem('id',(error,value)=>{
           if(value.length>0){
              this.fethData(value);
           }
           else{
            Toast.info('权限出错', 2, null, false);
           }
       });
        
    }
    async fethData(value) {
        this.props.changeProgress(true);
        const url = `socialDispenser/queryDispenser?memberId=${value}`;
         try {
            const json = await getJSON(url);
             this.props.changeProgress(false);
             if (json.dispenserList) {
                this.setState({data:json.dispenserList})
             }
             else{
                Toast.info('请求接口失败!', 2, null, false);
             }
         } catch (error) {
           Toast.info('网络错误!', 2, null, false);
           this.props.changeProgress(false);
         }
      }
    onClick = (item) => {
        const { navigation } = this.props;
        
    }
    itemCell = ({item}) => {
        const { navigation } = this.props;
        const mstyle = item.status==='运营中'? styles.textState : styles.textState1;
        //navigation.navigate('Home', {name: ''});
        return (
           <TouchableOpacity onPress={()=>{
               if (item.status==='运营中') {
                    navigation.navigate('StationDetail', {id: item.dispenserId}) 
                }else{
                    navigation.navigate('StationSign', {id: item.dispenserId,callback:this.fethData})  
            }}}>
                <View style={styles.cell}>
                    <View style={{width,height:0.5,backgroundColor:'lightgray',position:'absolute'}}/>
                    <View style={styles.arrow}>
                            <Text style={styles.arrowtext}>
                                >
                            </Text>
                    </View>
                    <Image source={Qianbao} style={styles.icon} resizeMode='contain'/>
                    <View style={styles.content}>
                        <View style={styles.top}>
                            <Text style={styles.text1}>
                                {item.dispenserName}
                            </Text>
                            <Text style={mstyle}>
                                {item.status}
                            </Text>
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.text2}>
                                当天打水
                            </Text>
                            <Text style={styles.text3}>
                                {item.todayFetch}L
                            </Text>
                        </View>
                    </View>
                    
                </View>
           </TouchableOpacity>
        );
    }
    separatorComponent =() => {
        return (
           <View style={styles.seperater}>
           </View>
        );
    }
    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={(item)=>this.itemCell(item)}
                ItemSeparatorComponent={this.separatorComponent}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFF6',
    },
    cell:{
        height: 80,
        alignItems:'center',
        backgroundColor: 'white',
        width,
        flexDirection:'row',
    },
    seperater:{
        height:10,
        backgroundColor:'transparent'
    },
    icon:{
        margin:10,
        height:50,
        width: 50
    },
    arrow:{
        width:16,
        height:16,
        backgroundColor:'lightgray',
        position:'absolute',
        right:15,
        borderRadius:8,
        paddingLeft:1
    },
    arrowtext:{
        width:15,
        height:15,
        textAlign:'center',
        color: 'white',
        backgroundColor:'transparent',
        fontSize:12
    },
    content:{
        width:width-110,
        flexDirection:'column'
    },
    top:{
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:10,
    },
    bottom:{
        flex:1,
        justifyContent:'flex-start',
        flexDirection:'row',
        marginTop:10,
    },
    textState:{
        backgroundColor:'#53C65C',
        color:'white',
        textAlign:'center',
        height:25,
        width:50,
        lineHeight:20,
        fontSize:12,
        
    },
    textState1:{
        backgroundColor:'lightgray',
        color:'white',
        textAlign:'center',
        height:25,
        width:50,
        lineHeight:20,
        fontSize:12,
    },
    text1:{
        color:'gray',
        fontSize:14,
        backgroundColor:'transparent',
        marginTop:5
    },
    text2:{
        color:'gray',
        fontSize:12,
        backgroundColor:'transparent'
    },
    text3:{
        color:'red',
        fontSize:12,
        backgroundColor:'transparent',
        marginLeft:10
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageStation);


