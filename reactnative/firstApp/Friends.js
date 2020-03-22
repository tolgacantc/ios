import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class Friends extends React.Component {
  constructor(props) {
    super(props);
	this.state = {name: ''};
  } 

  render() {
    return (
      <View style={styles.container}>
        <Text> Add friends here! </Text>
   <TextInput
          style={{height: 40}}
          placeholder="Type here!"
          onChangeText={(name) => this.setState({name:name})}
          value={this.state.name}
        />
       <Button 
        // onPress={console.log(JSON.stringify(this.props))} 
        onPress={() =>  {
			console.log(JSON.stringify(this.props));
			if (this.state.name) {
				this.props.screenProps.addFriendByName(this.state.name)
			}
            this.props.navigation.navigate('Home')
		} } 
        title="Add" 
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
