import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import SQL from "../components/SQL";
import { Styles } from "../components/commons";
import {
  Container,
  Content,
} from "native-base";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <Container style={Styles.container}>
          <Button
            title="Add New Record"
            onPress={() =>
              this.props.navigation.navigate('NewRecord')
            }
          />
          <Button
            title="History"
            onPress={() =>
              this.props.navigation.navigate('History')
            }
          />
        </Container>
      );
    }
}

