import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
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

	React.useEffect(
		() => navigation.addListener('focus', () => alert('Screen was focused')),
		[]
	);

	React.useEffect(
		() => navigation.addListener('blur', () => alert('Screen was unfocused')),
		[]
	);

	const data = getData();
	return (
		<View>
		<Text>Line Chart</Text>
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
