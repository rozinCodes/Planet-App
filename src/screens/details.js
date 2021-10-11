import { EvilIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/header';
import { Text } from '../components/text/text';
import { colors, spacing } from '../theme';

const PlanetSection = ({ title, value }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				paddingHorizontal: spacing[4],
				borderColor: colors.black,
				borderWidth: 1,
				marginHorizontal: spacing[5],
				marginVertical: spacing[4],
				paddingVertical: spacing[4]
			}}
		>
			<Text>{title}</Text>
			<Text preset='h4'>{value}</Text>
		</View>
	);
};

export const Details = ({ route, navigation }) => {
	const { planet } = route.params;
	const { name, description, wikiLink, rotationTime, revolutionTime, avgTemp, radius, surfaceImage } = planet;
	return (
		<SafeAreaView>
			<Header backButton={true} />
			<ScrollView>
				<View style = {{
					marginBottom: 60
				}}>
				<Image source={surfaceImage} style={styles.imageStyle} />
				<View style={{ alignItems: 'center' }}>
					<Text preset='h3' style={styles.nameStyle}>
						{name}
					</Text>
					<Text style={styles.descriptionStyle}>{description}</Text>
				</View>

				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<Text>Source: </Text>
					<View>
						<Pressable style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Web', {url: wikiLink})}>
							<Text style={{ textDecorationLine: 'underline', color: colors.blue }}>wikipedia</Text>
							<EvilIcons name='external-link' size={10} color='blue' />
						</Pressable>
					</View>
				</View>
				<PlanetSection title={'Rotation time: '} value={rotationTime} />
				<PlanetSection title={'Revolution time: '} value={revolutionTime} />
				<PlanetSection title={'Radius: '} value={radius} />
				<PlanetSection title={'Average temperature: '} value={avgTemp} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	imageStyle: {
		alignSelf: 'center',
		height: 200,
		resizeMode: 'contain',
		marginTop: spacing[4]
	},
	nameStyle: {
		textTransform: 'uppercase',
		marginTop: spacing[5]
	},
	descriptionStyle: {
		marginTop: spacing[1],
		padding: spacing[5],
		lineHeight: spacing[6]
	}
});
