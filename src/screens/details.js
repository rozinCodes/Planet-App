import { EvilIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/header/header';
import { Text } from '../components/text/text';
import { colors, spacing } from '../theme';

const PlanetDetails = ({ title, value }) => {
	return (
		<View style={styles.detailsContainer}>
			<Text>{title}</Text>
			<Text preset="h4">{value}</Text>
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
				<View
					style={{
						marginBottom: 80
					}}
				>
					<Image source={surfaceImage} style={styles.imageStyle} />
					<View style={{ alignItems: 'center' }}>
						<Text preset="h3" style={styles.nameStyle}>
							{name}
						</Text>
						<Text style={styles.descriptionStyle}>{description}</Text>
					</View>

					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Text>Source: </Text>
						<View>
							<Pressable
								style={{ flexDirection: 'row' }}
								onPress={() => navigation.navigate('Web', { url: wikiLink })}
							>
								<Text style={{ textDecorationLine: 'underline', color: colors.blue }}>wikipedia</Text>
								<EvilIcons name="external-link" size={10} color="blue" />
							</Pressable>
						</View>
					</View>
					<PlanetDetails title={'Rotation time: '} value={`${rotationTime} days`} />
					<PlanetDetails title={'Revolution time: '} value={`${revolutionTime} years`} />
					<PlanetDetails title={'Radius: '} value={`${radius} km`} />
					<PlanetDetails title={'Average temperature: '} value={avgTemp} />
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
	},
	detailsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: spacing[4],
		borderColor: colors.black,
		borderWidth: 1,
		marginHorizontal: spacing[5],
		marginVertical: spacing[4],
		paddingVertical: spacing[4]
	}
});
