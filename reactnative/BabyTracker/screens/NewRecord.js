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

export default function NewRecord ({navigation}) {
	let now = new Date();
	let nowStr = Moment(now).format(FORMATS['datetime']);

	const [action, setAction] = useState("");
	const [actionTime, setActionTime] = useState(now);
	const [actionTimeStr, setActionTimeStr] = useState(nowStr);
	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

	const handleConfirm = date => {
		setActionTime(date);
		setActionTimeStr(Moment(date).format(FORMATS['datetime']));
		setIsDatePickerVisible(false);
	};

	const addButtonAction = () => {
		if (action) {
			console.log(action + " " + actionTimeStr);
			db.addRecord(action, actionTimeStr);
			setAction("");
			setIsDatePickerVisible(false);
			navigation.navigate('History')
		}
	};

	return (
		<Container style={Styles.container}>
			<Text> Add action here! </Text>

			<ActionDropDown valueChangeAction={(date) => setAction(date)}/>

			<Button onPress={() => setIsDatePickerVisible(false)} title={actionTimeStr} />

			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="datetime"
				date={actionTime}
				onConfirm= {handleConfirm}
				onCancel= {() => setIsDatePickerVisible(false)}
			/>

			<Button onPress={addButtonAction} title="Add"/>
		</Container>
	);
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
