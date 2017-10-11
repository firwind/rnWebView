//import liraries
import React, { Component } from 'react';
import { 
       View, 
       Text, 
       StyleSheet, 
       FlatList,
       Dimensions,
       Image,
       TouchableOpacity
} from 'react-native';
import Qianbao from '../images/qianbao.png';


const { width, height } =Dimensions.get('window');

const datas = [
    {
        title:'南岔护额',
        id: 1,
        dashui: 487,
        state:1,

    },
    {
        title:'南岔adad护额',
        id: 2,
        dashui: 487,
        state:2,

    }
];

// create a component
class ManageStation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:datas
        };

    }
    onClick = (item) => {
        const { navigation } = this.props;
        
    }
    itemCell = ({item}) => {
        const { navigation } = this.props;
        const path = item.state === 2 ? 'StationSign' : 'StationDetail'; 
        //navigation.navigate('Home', {name: ''});
        return (
           <TouchableOpacity onPress={()=>{
               if (item.state === 1) {
                    navigation.navigate('StationDetail', {name: '水站信息'}) 
                }else{
                    navigation.navigate('StationSign', {name: '水站签收'})  
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
                                asdasdasd
                            </Text>
                            <Text style={styles.textState}>
                                运营中
                            </Text>
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.text2}>
                                asdasdasd
                            </Text>
                            <Text style={styles.text3}>
                                487L
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
        
    },
    text1:{
        color:'gray',
        fontSize:18,
        backgroundColor:'transparent'
    },
    text2:{
        color:'gray',
        fontSize:16,
        backgroundColor:'transparent'
    },
    text3:{
        color:'red',
        fontSize:16,
        backgroundColor:'transparent',
        marginLeft:10
    }
});

//make this component available to the app
export default ManageStation;
