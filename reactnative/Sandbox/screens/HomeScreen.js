import * as React from 'react';
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

export default function RecordScreen({ navigation }) {
	console.log("----", navigation);

	React.useEffect(
    () => navigation.addListener('focus', () => alert('HomeScreen was focused')),
    []
  );

  React.useEffect(
    () => navigation.addListener('blur', () => alert('HomeScreen was unfocused')),
    []
  );
	
	const [isDatePickerVisible, setIsDatePickervisible] = useState(true);
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
			<View style={styles.container}>
			<Text> Add action here! </Text>

			<Button onPress={showDatePicker} title={this.state.actionTimeStr} />

			<DateTimePickerModal
			isVisible={this.state.isDatePickerVisible}
			mode="datetime"
			date={this.state.actionTime}
			onConfirm= {handleConfirm}
			onCancel= {setIsDatePickerVisible(false)}
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
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
});
