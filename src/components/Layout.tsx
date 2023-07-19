import { StyleSheet } from 'react-native'
import React from 'react'
import { LayoutProps } from '../types/component.types'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'

const Layout = ({children,customContainerStyle,loading,error}:LayoutProps) => {
  if(loading) return <Loader  />
  if(error) return <ErrorComponent errorMsg={error}  />
  return (
    <SafeAreaView style={[styles.container,customContainerStyle]} edges={['right','left']}>
      {children}
    </SafeAreaView>
  )
}

export default Layout

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:20
    }
})