import { flatten, mergeAll } from 'ramda'
import React from 'react'
import { Text as RNText } from 'react-native'
import { presets } from './text_preset'

export const Text = ({children, preset = "default", style}) => {
    const textStyles = mergeAll(
        flatten([presets[preset] || presets.default, style])
    )
    return (
            <RNText style={textStyles}>
                {children}
            </RNText>
    )
}

