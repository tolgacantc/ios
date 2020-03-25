import React from 'react';
import AppNavigator from './components/AppNavigator';
import DataFetcher from "./components/DataFetcher";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
 
  async componentDidMount() {
    DataFetcher.Init();
  }

  render() {
    return (
      <AppNavigator />
    );
  }
}
