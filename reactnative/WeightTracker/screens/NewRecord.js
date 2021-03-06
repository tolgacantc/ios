import React, {
	useState
} from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button
} from 'react-native';

import {
	Styles
} from "../components/commons";
import {
	Container,
} from "native-base";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import Database from '../components/Database';
const db = new Database();

const FORMATS = {
	'datetime': 'YYYY-MM-DD HH:mm',
};

export default class NewRecord extends React.Component {
	constructor(props) {
		super(props);
		let now = new Date();
		let nowStr = Moment(now)
			.format(FORMATS['datetime']);
		this.state = {
			action: '',
			actionTime: now,
			actionTimeStr: nowStr,
			isDatePickerVisible: false
		};
	}

	onValueChange = value => {
		this.setState({
			action: value
		});
	}

	render() {

		const hideDatePicker = () => {
			this.setState({
				isDatePickerVisible: false
			});
		};

		const showDatePicker = () => {
			this.setState({
				isDatePickerVisible: true
			});
		};

		const handleConfirm = date => {
			this.setState({
				actionTime: date,
				actionTimeStr: Moment(date)
					.format(FORMATS['datetime'])
			});
			hideDatePicker();
		};

		const addButtonAction = () => {
			if (this.state.action) {
				console.log(this.state.action + " " + this.state.actionTimeStr);
				db.addRecord(this.state.action, this.state.actionTimeStr);
				this.setState({
					action: "",
					isDatePickerVisible: false
				});
				this.props.navigation.navigate('History')
			}
		};

		return (
			<Container style={Styles.container}>
			<Text> Add action here! </Text>

			<ActionDropDown valueChangeAction={this.onValueChange}/>

			<Button onPress={showDatePicker} title={this.state.actionTimeStr} />

			<DateTimePickerModal
			isVisible={this.state.isDatePickerVisible}
			mode="datetime"
			date={this.state.actionTime}
			onConfirm= {handleConfirm}
			onCancel= {hideDatePicker}
			/>

			<Button onPress={addButtonAction} title="Add"/>
			</Container>
		);
	}
}

const ActionDropDown = props => {
	return (
		<RNPickerSelect style={pickerSelectStyles} onValueChange={props.valueChangeAction}
	    items={[
			{ label: 'Sleep', value: 'SLEEP_START' },
			{ label: 'Wake up', value: 'WAKE_UP' },
			{ label: 'Breast Feeding Start', value: 'BREAST_FEEDING_START' },
			{ label: 'Breast Feeding End', value: 'BREAST_FEEDING_END' },
			{ label: 'Snack Start', value: 'SNACK_START' },
			{ label: 'Snack End', value: 'SNACK_END' },
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
