import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/header/header';
import ButtonComponent from '../components/button/buttonComponent';
import { Text } from '../components/text/text';
import { PLANET_LIST } from '../local_json/planets';
import { colors, spacing } from '../theme';

const ROTATION_TIME = [ 0, 2000 ];
const RADIUS = [ 0, 70000 ];

//Bottom modal component
const Modal = ({ visible, closeModal, filterAction, resetFilter }) => {
	const { height } = useWindowDimensions();
	const [ rotationTime, setRotationTime ] = useState(ROTATION_TIME);
	const [ radius, setRadius ] = useState(RADIUS);

	//Filter resutlts on filter button click
	const onPressFilter = () => {
		filterAction({ rotationTime, radius });
		closeModal();
	};

	//To reset filtered results on reset filter pressed
	const onResetPressed = () => {
		resetFilter();
		closeModal();
		setRotationTime(ROTATION_TIME);
		setRadius(RADIUS);
	};

	//Bottom Modal
	return (
		<ReactNativeModal
			isVisible={visible}
			swipeDirection={[ 'up', 'down' ]}
			onSwipeComplete={closeModal}
			style={{ justifyContent: 'flex-start', marginTop: 80 }}
			onBackdropPress={closeModal}
		>
			<View
				style={{
					backgroundColor: colors.white,
					borderRadius: spacing[8],
					height: height / 2,
					paddingHorizontal: spacing[2]
				}}
			>
				<View>
					<Text preset="h3" style={{ margin: spacing[6] }}>
						Filter your search
					</Text>

					<FilterBar
						customParameter={setRotationTime}
						step={100}
						min={0}
						max={2000}
						customValue={rotationTime}
						textTitle={`Rotation Time ${rotationTime[0]} - ${rotationTime[1]}`}
					/>
					<FilterBar
						customParameter={setRadius}
						step={2000}
						min={0}
						max={70000}
						customValue={radius}
						textTitle={`Radius ${radius[0]} - ${radius[1]}`}
					/>
				</View>

				<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
					<ButtonComponent onPress={onPressFilter} title="FILTER" />
					<ButtonComponent onPress={onResetPressed} title="RESET FILTER" />
				</View>
			</View>
		</ReactNativeModal>
	);
};

//Common component for filter bar
function FilterBar({ textTitle, customValue, step, min, max, customParameter }) {
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: spacing[4] }}>
			<View style={{ alignSelf: 'flex-start', marginLeft: spacing[6] }}>
				<Text preset="just_bold">{textTitle}</Text>
			</View>
			<MultiSlider
				markerStyle={{ backgroundColor: colors.black, height: 18, width: 18 }}
				trackStyle={{ backgroundColor: 'red', height: 1 }}
				values={customValue}
				onValuesChange={(values) => customParameter(values)}
				step={step}
				min={min}
				max={max}
				isMarkersSeparated={true}
			/>
		</View>
	);
}

//Home screen component
export const Home = ({ navigation }) => {
	const [ planetList, setPlanetList ] = useState(PLANET_LIST);
	const [ visible, setVisible ] = useState(false);

	//Function used to search by name
	const searchFilter = (text) => {
		if (text) {
			const filteredList = planetList.filter((item) => {
				const itemData = item.name.toUpperCase();
				const userInput = text.toUpperCase();
				return itemData.indexOf(userInput) > -1;
			});
			setPlanetList(filteredList);
		} else {
			setPlanetList(PLANET_LIST);
		}
	};

	//Filter planets based on their rotation time and radius
	const onFilterPressed = (data) => {
		const { rotationTime, radius } = data;

		const filteredList = planetList.filter((item) => {
			return (
				item.rotationTime >= rotationTime[0] &&
				item.rotationTime <= rotationTime[1] &&
				item.radius >= radius[0] &&
				item.radius <= radius[1]
			);
		});
		setPlanetList(filteredList);
	};

	//Set home screen to default on reset filter pressed
	const onResetPressed = () => {
		setPlanetList(PLANET_LIST);
	};

	//Render items in home screen from flatlist
	const renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity onPress={() => navigation.navigate('Details', { planet: item })} style={styles.item}>
				<View style={styles.centerRow}>
					<Image source={item.surfaceImage} style={{ height: 20, width: 20 }} />
					<Text preset="primary" style={styles.planetName}>
						{item.name}
					</Text>
				</View>
				<AntDesign name="right" size={12} color="black" />
			</TouchableOpacity>
		);
	};

	return (
	//Home screen view
		<SafeAreaView>
			<Header />
			<View
				style={styles.searchStyle}
			>
				<AntDesign name="search1" size={15} color={colors.grey} />
				<TextInput
					style={styles.searchInputStyle}
					placeholder="Search for a planet"
					keyboardType="default"
					autoCorrect={false}
					onChangeText={(text) => searchFilter(text)}
				/>
				<Ionicons
					onPress={() => {
						setVisible(true);
					}}
					name="filter"
					size={15}
					color={colors.grey}
				/>
			</View>
			<FlatList
				data={planetList}
				renderItem={renderItem}
				keyExtractor={(item, index) => item.name}
				contentContainerStyle={{ padding: spacing[5] }}
				ItemSeparatorComponent={() => <View style={{ height: 0.8, backgroundColor: colors.grey }} />}
			/>
			<Modal
				visible={visible}
				closeModal={() => setVisible(false)}
				filterAction={onFilterPressed}
				resetFilter={onResetPressed}
			/>
		</SafeAreaView>
	);
};

//Common styles for different home screen components
const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		justifyContent: 'space-between'
	},
	circle: {
		height: 20,
		width: 20,
		borderRadius: 10
	},
	centerRow: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	planetName: {
		textTransform: 'uppercase',
		marginLeft: spacing[5]
	},
	searchInputStyle: {
		height: 40,
		margin: 5,
		borderColor: colors.darkgrey,
		padding: 10,
		flex: 1
	},
	searchStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		justifyContent: 'flex-start',
		borderWidth: 0.1,
		marginTop: 20,
		marginHorizontal: 13,
		borderRadius: 8
	}
});
