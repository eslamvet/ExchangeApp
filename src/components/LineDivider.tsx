import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { useTheme } from '@react-navigation/native'
import { LineDividerProps } from '../types/component.types'

const LineDivider = ({customLineStyle}:LineDividerProps) => {
  const {colors:{card:backgroundColor}} = useTheme()
 
  return <View style={[styles.lineStyle,{backgroundColor},customLineStyle]}  />
}

export default memo(LineDivider)
 
const styles = StyleSheet.create({
    lineStyle:{
        height:2,
        marginVertical:20
    },
})