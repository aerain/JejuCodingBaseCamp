import { createAppContainer,} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LectureList from '../LectureComponent/LectureList';
import LectureVideo from '../LectureComponent/LectureVideo';
import Home from '../Home';

const LectureStackNavigation = createStackNavigator({
    // 강좌 개요
    LectureList:{
        screen: LectureList,
    },

    //강좌 영상
    LectureVideo: {
        screen: LectureVideo,
    },

    Home: {
        screen: Home,
    }
   

}, {
    initialRouteName: 'LectureList',
    headerMode: 'none'
    
  } 
);
export default createAppContainer(LectureStackNavigation);

