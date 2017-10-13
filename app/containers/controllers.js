import React from 'react';
import { TouchableOpacity,Text } from 'react-native';
import ApplyCard from './ApplyCard';
import Scanner from './Scanner';
import Mine from './Mine/index';
import ManageStation from './ManageStattion';
import StationSign from './StationSign';
import StationDetail from './StationDetail';
import MangeMember from './MangeMember';
import Getpassword from './Getpassword';
import Records from './Records';
import ChargeCard from './ChargeCard';
import CardDetail from './CardDetail';


const NavColor = '#c7003a';
export const NavBarConfig = {
    headerStyle: { backgroundColor: NavColor },
    headerTitleStyle: { color: 'white',alignSelf:'center' },
    headerTintColor: 'white',
    tabBarVisible: false,
    headerBackTitle: null,
    headerRight: (
        <TouchableOpacity
            style = {{height:44,width:40,justifyContent:'center',alignItems:'center'}}>
            <Text style={{width:40, height:20, color:'white'}}></Text>
        </TouchableOpacity>
    ),

};

const Routes = {
    CardDetail: {
        name: 'CardDetail',
        description: 'CardDetail',
        screen: CardDetail,
        navigationOptions: {
            title: '水卡信息',
            ...NavBarConfig,
        }
    },
    ChargeCard: {
        name: 'ChargeCard',
        description: 'ChargeCard',
        screen: ChargeCard,
        navigationOptions: {
            title: '水卡充值',
            ...NavBarConfig,
        }
    },
    Records: {
        name: 'Records',
        description: 'Records',
        screen: Records,
        navigationOptions: {
            title: '水卡管理',
            ...NavBarConfig,
        }
    },
    Getpassword: {
        name: 'Getpassword',
        description: 'Getpassword',
        screen: Getpassword,
        navigationOptions: {
            title: '找回密码',
            ...NavBarConfig,
        }
    },
    MangeMember: {
        name: 'MangeMember',
        description: 'MangeMember',
        screen: MangeMember,
        navigationOptions: {
            title: '打水记录',
            ...NavBarConfig,
        }
    },
    StationDetail: {
        name: 'StationDetail',
        description: 'StationDetail',
        screen: StationDetail,
        navigationOptions: {
            title: '水站信息',
            ...NavBarConfig,
        }
    },
    StationSign: {
        name: 'StationSign',
        description: 'StationSign',
        screen: StationSign,
        navigationOptions: {
            title: '水站签收',
            ...NavBarConfig,
        }
    },
    ManageStation: {
        name: 'ManageStation',
        description: 'ManageStation',
        screen: ManageStation,
        navigationOptions: {
            title: '水站管理',
            ...NavBarConfig,
        }
    },
    ApplyCard: {
        name: 'ApplyCard',
        description: 'ApplyCard',
        screen: ApplyCard,
        navigationOptions: {
            title: '办理水卡',
            ...NavBarConfig,
        }
    },
    Mine: {
        name: 'Mine',
        description: 'Mine',
        screen: Mine,
        navigationOptions: {
            header: null
        }
    },
    Scanner: {
        name: 'Scanner',
        description: 'Scanner',
        screen: Scanner,
        navigationOptions: {
            title: '扫描水卡',
            ...NavBarConfig,
        }
    },
};

export default Routes;
