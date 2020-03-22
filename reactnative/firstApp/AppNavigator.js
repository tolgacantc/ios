import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';

const RootStack = createStackNavigator({
  	Home: { screen: Home },
	Friends: { screen: Friends }
  },
  {
    initialRouteName: "Home" //Default screen name
  }
);

export default createAppContainer(RootStack);
