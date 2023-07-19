import { StyleSheet , View } from 'react-native'
import React from 'react'
import { ErrorComponentProps } from '../types/component.types'
import { useTheme } from '@react-navigation/native'
import TextComponent from './TextComponent'

const ErrorComponent = ({errorMsg}:ErrorComponentProps) => {
  const {colors:{notification}} = useTheme()

  return (
    <View style={styles.errorContainerStyle}>
        <TextComponent customTextStyle={{color:notification}}>{errorMsg}</TextComponent>
    </View>
  )
}

export default ErrorComponent

const styles = StyleSheet.create({
    errorContainerStyle:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})