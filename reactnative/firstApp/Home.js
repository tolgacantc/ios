import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text>We have { this.props.screenProps.currentFriends.length } friends!</Text>
        {
          this.props.screenProps.currentFriends.map((friend, index) => (
            <Button
              key={ index }
              title={ `Remove ${ friend } ${ index} ` }
              onPress={() =>
                this.props.screenProps.removeFriend(index)
              }
            />
          )
        )
        }
	  <Button
          title="Add some friends"
          onPress={() =>
            this.props.navigation.navigate('Friends')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


