import React from 'react';
import AppNavigator from './components/AppNavigator';
import SQL from "./components/SQL";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
 

  async componentDidMount() {
    SQL.InitDatabase();
  }

  render() {
    return (
      <AppNavigator />
    );
  }
}
