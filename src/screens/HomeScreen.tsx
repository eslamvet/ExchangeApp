import { Keyboard, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Input from '../components/Input'
import IconButton from '../components/IconButton'
import Geolocation from '@react-native-community/geolocation';
import { RootNavigationParamList } from '../types/navigation.types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

const HomeScreen = ({navigation}:NativeStackScreenProps<RootNavigationParamList,'Home'>) => {
  const [cityInputValue, setCityInputValue] = useState<string | undefined>()

  useEffect(() => {
    new Promise((resolve,reject)=>{
      Geolocation.getCurrentPosition(resolve,reject)
    }).then((info:any)=>{
      return fetch(`http://api.positionstack.com/v1/reverse?access_key=6af37e22ead61a19b5c32396d7acb7b7&query=${info.coords.latitude},${info.coords.longitude}&limit=1`)
    }).then(res=>res.json()).then(({data})=>{
      setCityInputValue(data ? data[0]?.region ?? '' : '')
    }).catch(err=>{
        console.error(err);
        setCityInputValue('')
    })
  }, [])

  const goToCurrencyList = useCallback(() => {
      Keyboard.dismiss()
      navigation.navigate('CurrencyList')
  },[])
  
  
  return (
    <Layout customContainerStyle={styles.customLayoutContainerStyle} loading={cityInputValue == undefined} >
      <Input value={cityInputValue} setValue={setCityInputValue} placeHolder='Enter Your City' label='' />
      <IconButton label='Go To Currency List' onPress={goToCurrencyList} disabled={!cityInputValue} customContainerStyle={styles.customButtonContainerStyle} customLabelStyle={styles.customLabelStyle} />
    </Layout>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  customLayoutContainerStyle:{
    justifyContent:'center'
  },
  customLabelStyle:{
    color:'white'
  },
  customButtonContainerStyle:{
    marginTop:30
  }
})