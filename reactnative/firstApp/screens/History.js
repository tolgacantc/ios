import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Alert } from 'react-native';
import DataFetcher from "../components/DataFetcher";
import { Message, Styles } from "../components/commons";
import {
  Container,
  List,
  ListItem,
  Spinner,
  Content,
  Left,
  Right,
  Body,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: [], isFetching: true };
  }

  async componentDidMount() {
		console.log("Did mount");
    let records = await DataFetcher.GetRecords();
    this.setState({records, isFetching: false});
  }


  _twoOptionAlertHandler=()=>{
    //function to make two option alert
    Alert.alert(
      //title
      'Hello',
      //body
      'I am two option alert. Do you want to cancel me ?',
      [
        {text: 'Yes', onPress: () => console.log('Yes Pressed')},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }

  render() {
		const removeFromRecords = (index) => {
			let records = this.state.records;
			records.splice(index, 1);
    	this.setState({records});
  	}

	let { records, isFetching } = this.state;

	if (isFetching) {
		return (
        <View style={Styles.container}>
		  <ActivityIndicator size="large" color="#0000ff" />
        </View>
		);
    } else if (records === null || records.length === 0) {
      return (
        <Message>
          <Text>No records</Text>
        </Message>
      );
    } else {
      return (
        <Container>
          <Content>
            {records.map((record, index) => (
              <RecordListItem key={record.id} record={record} ind={index} {...this.props} 
								deleteFunc={removeFromRecords}/>
            ))}
          </Content>
        </Container>
      );
    }
  }
}

export const RecordListItem = props => {
  const confirmDelete = () => {
    Alert.alert(
      'Alert Title',
      'Alert message here...',
      [
        {text: 'NO', onPress: () => {}, style: 'cancel'},
        {text: 'YES', onPress: () => {
					props.deleteFunc(props.ind);
					DataFetcher.DeleteRecord(props.record.id);
				}},
      ]
    );
  }

  return (
    <List>
      <ListItem thumbnail>
        <Body>
          <Text numberOfLines={2}>{props.record.action}</Text>
          <Text>{props.record.date}</Text>
        </Body>
        <Right>
          <Button
						title="Delete"
            onPress={confirmDelete}/>
        </Right>
      </ListItem>
    </List>
  );
};
