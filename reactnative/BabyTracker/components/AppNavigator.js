import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import History from '../screens/History';
import Home from '../screens/Home';
import NewRecord from '../screens/NewRecord';

const RootStack = createStackNavigator({
	History: { screen: History },
	Home: { screen: Home },
	NewRecord: { screen: NewRecord }
},
	{
		initialRouteName: "Home" //Default screen name
	}
);

export default createAppContainer(RootStack);
