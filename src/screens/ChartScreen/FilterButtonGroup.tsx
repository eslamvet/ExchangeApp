import { StyleSheet, View } from 'react-native'
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react'
import IconButton from '../../components/IconButton'
import { FilterButtonGroupProps } from '../../types/component.types'

const FilterButtonGroup = ({onPress}:FilterButtonGroupProps,ref:React.Ref<any>) => {
  const filterButtons = useRef(['1D', '1M', '3M','1Y', '5Y']).current
  const [activeBtn, setActiveBtn] = useState<string | null>(null)
  useImperativeHandle(ref,() => ({
      resetActivebtn:()=>setActiveBtn(null)
  }),[])

  const filterBtnPressHandler = useCallback((code:string)=>{
    setActiveBtn(code)
    onPress(code)
  },[])

  return (
        <View style={styles.btnContainerStyle}>
            {
                filterButtons.map((key) => <IconButton key={key} label={key} onPress={filterBtnPressHandler} disabled={activeBtn != null} showLoader={activeBtn == key} customLabelStyle={styles.customBtnTextStyle} />)
            }
        </View>
  )
}

export default memo(forwardRef(FilterButtonGroup))

const styles = StyleSheet.create({
    btnContainerStyle:{
        flexDirection: 'row',
        gap: 15, 
        flexWrap: 'wrap', 
        marginBottom: 30
    },
    customBtnTextStyle:{
        color: 'white'
    }
})