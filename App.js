import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Details } from './src/screens/details';
import { Home } from './src/screens/home';
import Web from './src/screens/web';

const Stack = createNativeStackNavigator();

export default function App() {
	let [ fontsLoaded ] = useFonts({
		'StickNoBills-SemiBold': require('./assets/fonts/StickNoBills-SemiBold.ttf'),
		'Ephesis-Regular': require('./assets/fonts/Ephesis-Regular.ttf'),
		'ScheherazadeNew-Regular': require('./assets/fonts/ScheherazadeNew-Regular.ttf')
	});

	if (!fontsLoaded) {
		return <View />;
	} else
		return (
			<NavigationContainer>
				<StatusBar backgroundColor="transparent" />
				<Stack.Navigator>
					<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
					<Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
					<Stack.Screen name="Web" component={Web} options={{ headerShown: false }} />
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
