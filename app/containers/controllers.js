import ApplyCard from './ApplyCard';
import Scanner from './Scanner';
import Mine from './Mine/index';


const NavColor = '#D5002F';
export const NavBarConfig = {
    headerStyle: { backgroundColor: NavColor },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    tabBarVisible: false,
    headerBackTitle: '',
};

const Routes = {
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
