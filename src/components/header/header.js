import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { colors, spacing } from '../../theme';
import { Text } from '../text/text';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ backButton = false }) => {
	const navigation = useNavigation();
	return (
		<SafeAreaView
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				flexFlow: 'wrap',
				paddingHorizontal: spacing[3],
				paddingVertical: spacing[2],
				borderBottomColor: colors.black,
				borderBottomWidth: 1,
				marginHorizontal: spacing[5]
			}}
		>
			{backButton && (
				<View>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<AntDesign name="arrowleft" size={20} />
					</TouchableOpacity>
				</View>
			)}

			<Text preset="h1"> The Planets </Text>
			<Ionicons name="menu" size={20} />
		</SafeAreaView>
	);
};
