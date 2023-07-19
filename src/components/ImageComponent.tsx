import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { ImageComponentProps } from '../types/component.types'

const ImageComponent = ({uri}:ImageComponentProps) => {
  const {colors:{border:shadowColor}} = useTheme()

  return (
    <View style={[styles.imageWrapperStyle,{shadowColor}]}>
        <Image source={{uri}} style={styles.imageStyle} resizeMode='contain'  />
    </View>
  )
}

export default ImageComponent

const styles = StyleSheet.create({
    imageWrapperStyle:{
        flex:1,
        backgroundColor:'white',
        elevation:20,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        padding:15,
        borderRadius:20
    },
    imageStyle:{
        width:'100%',
        height:'100%'
    },
})