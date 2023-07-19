import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextComponentProps } from '../types/component.types'
import { useTheme } from '@react-navigation/native'

const TextComponent = ({customTextStyle,children,numOfLines=1}:TextComponentProps) => {
  const {colors:{text:color}} = useTheme()
  return <Text style={[styles.textStyle,{color},customTextStyle]} numberOfLines={numOfLines}>{children}</Text>
}

export default TextComponent

const styles = StyleSheet.create({
    textStyle:{
        fontSize:15,
        fontWeight:'600'
    }
})