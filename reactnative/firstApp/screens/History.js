import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import SQL from "../components/SQL";
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
    let records = await SQL.GetRecords();
    this.setState({records, isFetching: false});
  }

  render() {
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
	      <Button
            title="Add some friends"
            onPress={() =>
              this.props.navigation.navigate('NewRecord')
            }
          />
        </Message>
      );
    } else {
      return (
        <Container>
          <Content>
            {records.map(record => (
              <RecordListItem key={record.id} record={record} {...this.props} />
            ))}
          </Content>
        </Container>
      );
    }

/*
    return (
      <View style={styles.container}>
      <Text>We have { records.length } friends!</Text>
        {
          records.map((friend, index) => (
            <Button
              key={ index }
              title={ `Remove ${ friend.name } ${ index} ` }
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
            this.props.navigation.navigate('NewRecord')
          }
        />
      </View>
    );
*/
  }
}

export const RecordListItem = props => {
  return (
    <List>
      <ListItem thumbnail>
        <Body>
          <Text numberOfLines={2}>{props.record.name}</Text>
          <Text>{props.record.date}</Text>
        </Body>
        <Right>
          <Button
			title="Update"
            onPress={() => {
              props.navigation.navigate("Result", {
                qr: props.qr.value
              });
            }}
          >
            <Text>View</Text>
          </Button>
        </Right>
      </ListItem>
    </List>
  );
};
