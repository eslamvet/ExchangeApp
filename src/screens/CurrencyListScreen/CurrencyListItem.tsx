import { Animated, Pressable, StyleSheet } from 'react-native'
import React, { memo, useRef } from 'react'
import TextComponent from '../../components/TextComponent'
import { useTheme } from '@react-navigation/native'
import { CurrencyListItemProps } from '../../types/component.types'

const CurrencyListItem = ({data,onPress,selectedCurrencies}:CurrencyListItemProps) => {
  const isChecked = useRef(selectedCurrencies.includes(data[0]))
  const {colors:{primary}} = useTheme()
  const scale = useRef(new Animated.Value(Number(selectedCurrencies.includes(data[0])))).current
  const backgroundColor = scale.interpolate({inputRange:[0,1.2],outputRange:['transparent',primary],extrapolate:'clamp'})

  function currencyListItemClickHandler() {
    Animated.timing(scale,{toValue:isChecked.current ? 0 : 1.2,duration:300,useNativeDriver:true}).start(()=>{
        onPress(data[0])
    })
    isChecked.current=!isChecked.current
  }

  return (
    <Pressable style={styles.currencyListItemContainerStyle}  onPress={currencyListItemClickHandler}>
        <Animated.View style={[styles.checkBoxContainer,{backgroundColor}]}>
            <Animated.Text style={[styles.checkBoxTextStyle,{transform:[{scale}]}]}>✔</Animated.Text>
        </Animated.View>
      <TextComponent>{data[0] + ' - ' + data [1]}</TextComponent>
    </Pressable>
  )
}

export default memo(CurrencyListItem)

const styles = StyleSheet.create({
    currencyListItemContainerStyle:{
        flexDirection:'row',
        alignItems:'center',
        gap:15
    },
    checkBoxContainer:{
        width:20,
        height:20,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    checkBoxTextStyle:{
        color:'white',
        fontSize:12
    }
})