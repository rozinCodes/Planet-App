import React, { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { Header } from '../components/header';


export default function Web({ route }) {
	const [ visible, setVisible ] = useState(true);
	const { url } = route.params;
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header backButton={true} />
			<Spinner visible={visible} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
			<WebView
				onLoadStart={() => setVisible(true)}
				onLoad={() => setVisible(false)}
				style={{ flex: 1 }}
				source={{ uri: url }}
			/>
		</SafeAreaView>
	);
}
