import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import SQL from "../components/SQL";
import { Styles } from "../components/commons";
import {
  Container,
} from "native-base";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';

const FORMATS = {
  'datetime': 'YYYY-MM-DD HH:mm',
};

export default class NewRecord extends React.Component {
  constructor(props) {
    super(props);
	let now = new Date();
	let nowStr = Moment(now).format(FORMATS['datetime']);
	this.state = {
	  action: '', 
	  actionTime: now, 
      isDone: '', 
      actionTimeStr: nowStr,
      isDatePickerVisible: false};
  } 

  render() {

  const hideDatePicker = () => {
	this.setState({isDatePickerVisible: false});
  };

  const showDatePicker = () => {
	this.setState({isDatePickerVisible: true});
  };


  const handleConfirm = date => {
	this.setState({actionTime: date, actionTimeStr: Moment(date).format(FORMATS['datetime'])});
	hideDatePicker();
  };

    return (
      <Container style={Styles.container}>
        <Text> Add action here! </Text>
        <Text> {this.state.isDone} </Text>

        <RNPickerSelect style={pickerSelectStyles}
            onValueChange={(value) => this.setState({action: value})}
            items={[
                { label: 'Sleep', value: 'SLEEP_START' },
                { label: 'Wake up', value: 'WAKE_UP' },
                { label: 'Breast Feeding Start', value: 'BREAST_FEEDING_START' },
                { label: 'Breast Feeding End', value: 'BREAST_FEEDING_END' },
            ]}
        />
	  <Button onPress={showDatePicker} title={this.state.actionTimeStr} />
      <DateTimePickerModal
        isVisible={this.state.isDatePickerVisible}
        mode="datetime"
		date={this.state.actionTime}
        onConfirm= {handleConfirm}
        onCancel= {hideDatePicker}
      />

        <Button 
         onPress={() =>  {
			if (this.state.action) {
				console.log(this.state.action + " " + this.state.actionTimeStr);
				SQL.AddRecord(this.state.action, this.state.actionTimeStr);
				this.setState({action: "", isDone: 'Recorded', isDatePickerVisible: false});
				this.props.navigation.navigate('History')
			}
		} } 
        title="Add" 
      />
	  </Container>
    );
  }
}

export const Dropdown = () => {
    return (
        <RNPickerSelect style={Styles.container}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Sleep Start', value: 'SLEEP_START' },
                { label: 'Sleep End', value: 'SLEEP_END' },
                { label: 'Breast Feeding Start', value: 'BREAST_FEEDING_START' },
                { label: 'Breast Feeding End', value: 'BREAST_FEEDING_END' },
            ]}
        />
    );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

function UserInfoFunction() {
  const [userInfo, setUserInfo] = React.useState({ 
    firstName: 'John', lastName: 'Doe',
  });

  return (
    <div>
      <p>userInfo: {JSON.stringify(userInfo)}</p>
      <button onClick={() => setUserInfo({ firstName: 'Jason' })}>Update name to Jason</button>
    </div>
  );
}
