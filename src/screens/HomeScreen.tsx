import { Keyboard, PermissionsAndroid, Platform, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Input from '../components/Input'
import IconButton from '../components/IconButton'
import Geolocation from '@react-native-community/geolocation';
import { RootNavigationParamList } from '../types/navigation.types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

Geolocation.setRNConfiguration({skipPermissionRequests:true})

const HomeScreen = ({navigation}:NativeStackScreenProps<RootNavigationParamList,'Home'>) => {
  const [cityInputValue, setCityInputValue] = useState<string | undefined>()

  useEffect(() => {
    if(Platform.OS == 'android'){
      PermissionsAndroid.requestMultiple(['android.permission.ACCESS_FINE_LOCATION','android.permission.POST_NOTIFICATIONS']).then(results=>{
        results['android.permission.ACCESS_FINE_LOCATION'] == 'granted' ? getCurrentUserLocation() : setCityInputValue('')
      }).catch(console.error)
    }else{
      getCurrentUserLocation()
    }

    async function getCurrentUserLocation() {
      return new Promise((resolve,reject)=>{
        Geolocation.getCurrentPosition(resolve,reject)
      }).then((info:any)=>{
        return fetch(`http://api.positionstack.com/v1/reverse?access_key=6af37e22ead61a19b5c32396d7acb7b7&query=${info.coords.latitude},${info.coords.longitude}&limit=1`)
      }).then(res=>res.json()).then(({data})=>{
        setCityInputValue(data ? data[0]?.region ?? '' : '')
      }).catch(err=>{
          console.error(err);
          setCityInputValue('')
      })
    }
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