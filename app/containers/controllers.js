import ApplyCard from './ApplyCard';
import Scanner from './Scanner';
import Mine from './Mine/index';
import ManageStation from './ManageStattion';
import StationSign from './StationSign';
import StationDetail from './StationDetail';
import MangeMember from './MangeMember';
import Getpassword from './Getpassword';


const NavColor = '#D5002F';
export const NavBarConfig = {
    headerStyle: { backgroundColor: NavColor },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    tabBarVisible: false,
    headerBackTitle: '',
};

const Routes = {
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
            title: '会员管理',
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
