import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './src/components/text/text';
import { Details } from './src/screens/details';
import { Home } from './src/screens/home';

const Stack = createNativeStackNavigator();

export default function App() {
	let [ fontsLoaded ] = useFonts({
		'StickNoBills-SemiBold': require('./assets/fonts/StickNoBills-SemiBold.ttf'),
		'Ephesis-Regular': require('./assets/fonts/Ephesis-Regular.ttf'),
		'ScheherazadeNew-Regular': require('./assets/fonts/ScheherazadeNew-Regular.ttf'),
	});

	if (!fontsLoaded) {
		return (
			<View></View>
		)
	} else
		return (
			<NavigationContainer 
			// theme = {DarkTheme}
			>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
					<Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
