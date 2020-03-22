import React from 'react';
import AppNavigator from './AppNavigator';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentFriends: [],
    }
  }
 
   removeFriend = (index) => {
      const {
        currentFriends
      } = this.state

      // Pull friend out of possibleFriends
      const friendToRemove = currentFriends.splice(index, 1)

      // Finally, update our app state
      this.setState({
        currentFriends
      })
    }


	addFriendByName = (name) => {
		this.state.currentFriends.push(name);
		this.setState({currentFriends: this.state.currentFriends});
	}

  render() {
    return (
      <AppNavigator
          screenProps={ {
            currentFriends: this.state.currentFriends,
            removeFriend: this.removeFriend,
			addFriendByName: this.addFriendByName,
          } }
	  />
    );
  }
}

/*import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>We have no friends!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

