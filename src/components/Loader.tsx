import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'

const Loader = () => {
  const {colors:{primary}} = useTheme()
     
  return (
    <View style={styles.loaderContainerStyle}>
        <ActivityIndicator size='large' color={primary} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    loaderContainerStyle:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})