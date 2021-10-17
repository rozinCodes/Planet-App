import React from 'react';
import { colors, spacing } from '../../theme';
import { TouchableOpacity } from 'react-native';
import { Text } from '../text/text';

export default function ButtonComponent({ title, onPress }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				borderRadius: 10,
				backgroundColor: colors.darkgrey,
				paddingHorizontal: spacing[6],
				paddingVertical: spacing[2]
			}}
		>
			<Text style={{ color: colors.white }}>{title}</Text>
		</TouchableOpacity>
	);
}
