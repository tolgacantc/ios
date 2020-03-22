import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import SQL from "../components/SQL";
import { Styles } from "../components/commons";

export default class NewRecord extends React.Component {
  constructor(props) {
    super(props);
	this.state = {name: ''};
  } 

  render() {
    return (
      <View style={Styles.container}>
        <Text> Add friends here! </Text>
   <TextInput
          style={{height: 40}}
          placeholder="Type here!"
          onChangeText={(name) => this.setState({name:name})}
          value={this.state.name}
        />
       <Button 
        onPress={() =>  {
			if (this.state.name) {
				SQL.AddRecord(this.state.name);
				this.setState({name: ""});
			}
		} } 
        title="Add" 
      />
	  </View>
    );
  }
}
