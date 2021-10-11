import { Header } from '../components/header';

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

export default function Web({ route }) {
	const { url } = route.params;
	return (
		<SafeAreaView style={{ flex: 1 }}>
            <Header backButton = {true}/>
			<WebView style={{ flex: 1 }} source={{ uri: url }} />
		</SafeAreaView>
	);
}
