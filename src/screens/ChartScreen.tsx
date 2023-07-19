import { Alert, Dimensions, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootNavigationParamList } from '../types/navigation.types'
import { LineChart } from 'react-native-gifted-charts'
import Layout from '../components/Layout'
import { useTheme } from '@react-navigation/native'
import TextComponent from '../components/TextComponent'
import IconButton from '../components/IconButton'

const ChartScreen = ({ route: { params: { currencies } } }: NativeStackScreenProps<RootNavigationParamList, 'Chart'>) => {
  const [records, setRecords] = useState<any>()
  const [loading, setLoading] = useState(false)
  const { colors: { text: color, primary } } = useTheme()
  const filterButtons = useRef(['1D', '1M', '3M', '1Y', '5Y']).current

  useEffect(() => {
    fetch(`https://api.currencybeacon.com/v1/convert?api_key=bllDaVEIUbNphNheZePrKZmEs7U17S5H&from=${currencies[0]}&to=${currencies[1]}&amount=1`)
      .then(res => res.json()).then(data => {
        setRecords([{
          value: data.response.value, dataPointText: data.response.value.toFixed(4), label: currencies[1], labelTextStyle: {
            color
          }
        }])
      }).catch(console.error)
  }, [])

  const loadCurrencyData = useCallback((key:string)=>{
    if(key != "1Y" && key != "5Y"){
      setLoading(true)
      const endDate = new Date().toISOString().split('T')[0]
      const startDate = new Date(Date.now() - (key == '1D' ? 24*60*60*1000 : key == '1M' ? 30*24*60*60*1000 : key == '3M' ? 3*30*24*60*60*1000 : key == '1Y' ? 12*30*24*60*60*1000 : 5*12*30*24*60*60*1000)).toISOString().split('T')[0]
      console.log('key',key,startDate,endDate);
       fetch(`https://api.currencybeacon.com/v1/timeseries?api_key=bllDaVEIUbNphNheZePrKZmEs7U17S5H&base=${currencies[0]}&start_date=${startDate}&end_date=${endDate}&symbols=${currencies[1]}`).then(res=>res.json()).then(data=>{
        setRecords(Object.entries(data.response).map(([key,value]:any[])=>({
          value: value[currencies[1]], dataPointText: value[currencies[1]].toFixed(4), label: key, labelTextStyle: {
            color
          }
        })))
       }).catch(console.error).finally(()=>setLoading(false))
    }else{
      Alert.alert('This api not support more than 9 months and it is the only api who is free and meet the requirments')
    }
  },[])

  return (
    <Layout loading={!records} customContainerStyle={styles.customLayoutStyle}>
      <View style={styles.btnWrapperStyle}>
        <View style={styles.btnContainerStyle}>
          {
            filterButtons.map((key) => <IconButton key={key} label={key} onPress={loadCurrencyData} disabled={loading} customLabelStyle={styles.customBtnTextStyle} />)
          }
        </View>
        <TextComponent>{currencies[0]}</TextComponent>
      </View>
      <LineChart
        data={records}
        height={250}
        width={Dimensions.get('window').width}
        showVerticalLines
        spacing={100}
        yAxisTextStyle={{ color }}
        initialSpacing={50}
        endSpacing={50}       
        textColor1="white"
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor1={primary}
        textShiftY={-5}
        textShiftX={-5}
        textFontSize={11}
        color="#07BAD1"
        areaChart
        startFillColor={'rgb(84,219,234)'}
        endFillColor={'rgb(84,219,234)'}
        startOpacity={0.4}
        endOpacity={1}
        backgroundColor="#414141"
      />
    </Layout>
  )
}

export default ChartScreen

const styles = StyleSheet.create({
  btnWrapperStyle:{
    paddingStart: 15
  },
  btnContainerStyle:{
    flexDirection: 'row',
    gap: 15, 
    flexWrap: 'wrap', 
    marginBottom: 30
  },
  customBtnTextStyle:{
    color: 'white'
  },
  customLayoutStyle:{
    paddingHorizontal: 0,
    paddingVertical: 20
  }
})