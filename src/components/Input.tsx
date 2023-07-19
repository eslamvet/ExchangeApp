import React, { memo } from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'
import { InputProps } from '../types/component.types'
import IconButton from './IconButton'
import { useTheme } from '@react-navigation/native'
import TextComponent from './TextComponent'


const Input = ({suffixInputIcon,customInputStyle,customInputContainerStyle,label,placeHolder,value,setValue,optional=false,...iconButtonProps}:InputProps) => {
  const {colors:{text:color}} = useTheme()
  
  return (
    <View>
      {!!label && <IconButton label='save' {...iconButtonProps} />}
      <View style={[styles.inputContainerStyle,customInputContainerStyle]}>
        <TextInput value={value} placeholder={placeHolder} placeholderTextColor={color} onChangeText={setValue} style={[styles.inputStyle,{color},customInputStyle]} multiline  />
        {suffixInputIcon && <Image source={suffixInputIcon} resizeMode='cover' />}
      </View>
      {value == '' && !optional && <TextComponent customTextStyle={styles.customErrorTextStyle}>you should enter value</TextComponent>}
    </View>
  )

}

export default memo(Input)

const styles = StyleSheet.create({
  inputContainerStyle:{
    flexDirection:'row',
    backgroundColor:'#F0F0F0',
    elevation:15,
    borderRadius:30,
    paddingHorizontal:30,
    gap:15,
  },
  inputStyle:{
    flex:1,
    height:50,
    padding:0,
    fontSize:16,
  },
  customErrorTextStyle:{
    fontSize:10,
    color:'#df4759',
    marginTop:10
  }
})