import { ActivityIndicator, Alert, FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import LineDivider from '../../components/LineDivider'
import CurrencyListItem from './CurrencyListItem'
import IconButton from '../../components/IconButton'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootNavigationParamList } from '../../types/navigation.types'
import { useTheme } from '@react-navigation/native'
import Input from '../../components/Input'
import TextComponent from '../../components/TextComponent'

const CurrencyListScreen = ({ navigation }: NativeStackScreenProps<RootNavigationParamList, 'CurrencyList'>) => {
  const [currencies, setCurrencies] = useState<string[][] | undefined>(undefined)
  const [searchText, setSearchText] = useState<string | undefined>()
  const selectedCurrencies = useRef<string[]>([]).current
  const allCurrencies = useRef<string[][]>([])
  const currentIndex = useRef(0)
  const timeRef = useRef<NodeJS.Timeout>()
  const { colors: { primary } } = useTheme()
  const listRef = useRef<FlatList | null>(null)

  useEffect(() => {
    import('../../utils/currenciesData').then(data => {
      allCurrencies.current = Object.entries(data.currencies)
      setCurrencies(allCurrencies.current.slice(0, 30))
    }).catch(console.error)

    return () => timeRef.current && clearTimeout(timeRef.current)
  }, [])

  useEffect(() => {
    if(searchText !== undefined){
      timeRef.current = setTimeout(() => {
        setCurrencies(allCurrencies.current.filter(([code,country])=>code.toLocaleLowerCase().includes(searchText) || country.toLocaleLowerCase().includes(searchText)).slice(0, 30))
        if(currentIndex.current !==0) currentIndex.current=0 
      }, 300)
    }

    return () => timeRef.current && clearTimeout(timeRef.current)
  }, [searchText])
  

  const ItemSeparatorComponent = useCallback(() => <LineDivider />, [])

  const renderItem = useCallback<ListRenderItem<string[]>>(({ item }) => <CurrencyListItem data={item} selectedCurrencies={selectedCurrencies} onPress={currencyListItemPressHandler} />, [])

  const getItemLayout = useCallback((_: any, index: number) => ({ index, length: 21, offset: index * (20.7 + 42.2) }), [])

  const keyExtractor = useCallback((item: any, index: number) => item[0].toString(), [])

  const onEndReachedhandler = useCallback(() => {
    currentIndex.current++
    if ((currentIndex.current * 30 + 30) - allCurrencies.current.length <= 30) {
      setCurrencies(searchText ? allCurrencies.current.filter(([code,country])=>code.toLocaleLowerCase().includes(searchText) || country.toLocaleLowerCase().includes(searchText)).slice(0, currentIndex.current * 30 + 30) : allCurrencies.current.slice(0, currentIndex.current * 30 + 30))
    }
  }, [searchText])

  const currencyListItemPressHandler = useCallback((code: string) => {
    const codeIndex = selectedCurrencies.findIndex(c => c == code)
    codeIndex > -1 ? selectedCurrencies.splice(codeIndex, 1) : selectedCurrencies.push(code)
  }, [])

  const goToChartScreen = useCallback(() => {
    if(selectedCurrencies.length == 2) navigation.navigate("Chart",{currencies:selectedCurrencies})
    else Alert.alert('you should not select more than two currencies')
  }, [])

  return (
    <Layout loading={!currencies}>
      <>
          <FlatList
            data={currencies}
            ref={listRef}
            style={[styles.currencylistStyle]}
            contentContainerStyle={styles.currencylistVontentContainerStyle}
            onEndReached={onEndReachedhandler}
            onEndReachedThreshold={.7}
            ListHeaderComponent={<Input placeHolder='search by currency code or country name' value={searchText} optional={true} setValue={setSearchText} label='' customInputContainerStyle={styles.customInputContainerStyle} />}
            ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
            scrollEventThrottle={16}
            maxToRenderPerBatch={100}
            removeClippedSubviews
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            ListEmptyComponent={<TextComponent>There are no curreny codes for your search</TextComponent>}
            ItemSeparatorComponent={ItemSeparatorComponent}
            ListFooterComponent={(currencies?.length && (searchText ?  currencies?.length !== allCurrencies.current.filter(([code,country])=>code.toLocaleLowerCase().includes(searchText) || country.toLocaleLowerCase().includes(searchText)).length  : currencies?.length !== allCurrencies.current.length)) ? <View style={styles.listFooterContainerStyle}><ActivityIndicator size="small" color={primary} /></View> : null}
          />
          <IconButton label='Compare Currencies' customLabelStyle={styles.customLabelStyle} customContainerStyle={styles.customButtonContainerStyle} onPress={goToChartScreen} />
      </>
    </Layout>
  )
}

export default CurrencyListScreen

const styles = StyleSheet.create({
  currencylistStyle: {
    flex: 1
  },
  currencylistVontentContainerStyle: {
    paddingVertical: 20
  },
  customLabelStyle: {
    color: 'white'
  },
  customButtonContainerStyle: {
    marginVertical: 15
  },
  listFooterContainerStyle: {
    alignItems: 'center',
    paddingVertical: 10
  },
  ListHeaderComponentStyle:{
    marginBottom:30
  },
  customInputContainerStyle:{
    elevation:0,
    backgroundColor:"white"
  }
})