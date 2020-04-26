import * as React from 'react';
import { ScrollView, FlatList, Dimensions, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Svg from 'react-native-svg';

import { useNavigation } from '@react-navigation/native';

import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
} from "react-native-chart-kit";

const getData = () => {
	return {
		labels: ["January", "February", "March", "April", "May", "June"],
		datasets: [
			{
				data: [
					Math.random() * 200,
					Math.random() * 200,
					Math.random() * 200,
					Math.random() * 200,
					Math.random() * 200,
					100
				]
			}
		]
	};
}

export default function GraphScreen({ navigation }) {
/*
	React.useEffect(
		() => navigation.addListener('focus', () => alert('Screen was focused')),
		[]
	);

	React.useEffect(
		() => navigation.addListener('blur', () => alert('Screen was unfocused')),
		[]
	);
*/
	const data = getData();

	const cards = [
		{
			key: 0,
			title: "2020-02-30",
			description: "82"
		}, {
			key: 2,
			title: "2020-01-30",
			description: "82"
		},
	];
	
	renderItem = ({item, index}) => {
		return (
			<TouchableOpacity style={styles.tocontainer} >
          <View style={styles.metaDataContainer}>
            <View style={styles.metaDataContent}>
              <Text style={styles.title}>{item.key}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
		);
	}

	return (
		<View style={styles.container}>

        <FlatList
					ListHeaderComponent={() => <View style={{ marginTop: 10 }}/>}
					ListFooterComponent={() => <View style={{ marginTop: 10 }}/>}
					contentContainerStyle={styles.paragraph}
					ItemSeparatorComponent={() => <View style={{ marginTop: 10 }} />}
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={renderItem}
        />
		<View style={{ marginTop: 10 }} />
		<LineChart
		data={data}
		width={Dimensions.get("window").width} // from react-native
		height={220}
		yAxisLabel="$"
		yAxisSuffix="k"
		chartConfig={{
			backgroundColor: "#e26a00",
				backgroundGradientFrom: "#fb8c00",
				backgroundGradientTo: "#ffa726",
				decimalPlaces: 2, // optional, defaults to 2dp
				color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
				labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
				style: {
					borderRadius: 16
				},
				propsForDots: {
					r: "6",
						strokeWidth: "2",
						stroke: "#ffa726"
				}
		}}
		style={{
			marginVertical: 8,
			borderRadius: 16
		}}
		/>
		</View>
	);
}

GraphScreen.navigationOptions = {
	header: "GRAPH SCREEN",
	tabBarOnPress: (scene, jumpToIndex) => {
		console.log('onPress:', scene.route);
	}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
	},
	paragraph: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
    elevation: 10,
    paddingBottom: 1 
  },
	tocontainer: {
		marginHorizontal: 10,
		backgroundColor: 'papayawhip',
    justifyContent: 'center',
    padding: 0,
    borderRadius: 5,
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowColor: 'black',
    flexDirection: "row",
  },
  metaDataContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 100,
  },
  metaDataContent: {
    marginTop: 5,
    marginLeft: 5,
  },
  title: {
    color: "#444",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#888",
    fontWeight: "700",
  },
});
