import * as React from 'react';
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import NumericInput from 'react-native-numeric-input'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { MonoText } from '../components/StyledText';

import Moment from 'moment';

const FORMATS = {
	'datetime': 'YYYY-MM-DD HH:mm',
};

export default function RecordScreen({ props, navigation }) {
	/*
	React.useEffect(
    () => navigation.addListener('focus', () => alert('HomeScreen was focused')),
    []
  );

  React.useEffect(
    () => navigation.addListener('blur', () => alert('HomeScreen was unfocused')),
    []
  );
	*/
	let now = new Date();
	let nowStr = Moment(now).format(FORMATS['datetime']);

	const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);
	const [recordTime, setRecordTime] = React.useState(now);
	const [recordTimeStr, setRecordTimeStr] = React.useState(nowStr);
	const [weight, setWeight] = React.useState(100);

	const handleConfirm = date => {
		setRecordTime(date);
		setRecordTimeStr(Moment(date).format(FORMATS['datetime']));
		setIsDatePickerVisible(false);
	};
	const addButtonAction = () => {
		setIsDatePickerVisible(false);
		navigation.navigate('Graph')
	};


	return (
		<View style={styles.container}>
			<View/>
			<View>
		  	<NumericInput
          value={weight}
          onChange={value => setWeight(value)}
          totalWidth={240}
          totalHeight={60}
          iconSize={10}
          minValue={0}
					step={0.1}
          valueType="real"
          rounded editable={true}
          textColor="#B0228C"
					extraTextInputProps={style=styles.specialButton}
          iconStyle={{ color: "white" }}
          rightButtonBackgroundColor="blue"
          leftButtonBackgroundColor="red"
        />
			</View>

			<Button onPress={() => setIsDatePickerVisible(true)} title={recordTimeStr} />

			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="datetime"
				date={recordTime}
				onConfirm= {(date) => handleConfirm(date)}
				onCancel= {() => setIsDatePickerVisible(false)}
			/>

			<Button onPress={addButtonAction} title="Add"/>

		</View>
		);
}

RecordScreen.navigationOptions = {
  header: "TAM BURA",
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
  },
 	inputBar: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
	specialButton: {
    borderRadius: 38,
  }
});
