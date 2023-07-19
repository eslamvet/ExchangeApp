import { ImageSourcePropType, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { PropsWithChildren } from "react"

export type IconButtonProps = {
    customContainerStyle?:StyleProp<ViewStyle>
    customLabelStyle?:StyleProp<TextStyle>
    prefixIcon?:ImageSourcePropType
    suffixIcon?:ImageSourcePropType
    disabled?:boolean
    showLoader?:boolean
    label:string
    onPress?:(key:string)=>void
}

export type LayoutProps = PropsWithChildren<{
    customContainerStyle?:StyleProp<ViewStyle>
    loading:boolean
    error?:string
}>

export type FilterButtonGroupProps={
    onPress:(code:string)=>void
}

export type ListItemProps={
    id:number
    image_url:string
    name:string
    onPress:(id:number,imgSrc:string)=>void
}

export type ModelDetailListProps={
    imgSrc:string
}

export type TextComponentProps=PropsWithChildren<{
    customTextStyle?:StyleProp<TextStyle>
    numOfLines?:number
}>

export type ImageComponentProps={
    uri?:string
}

export type LineDividerProps={
    customLineStyle?:StyleProp<ViewStyle>
}

export type CurrencyListItemProps = {
    data:string[]
    selectedCurrencies:String[]
    onPress:(currencyCode:string)=>void
}

export type ErrorComponentProps={
    errorMsg:string
}


export type InputProps = {
    value:string|undefined
    optional?:boolean
    setValue:React.Dispatch<React.SetStateAction<string|undefined>>
    suffixInputIcon?:ImageSourcePropType
    customInputContainerStyle?:StyleProp<ViewStyle>
    customInputStyle?:StyleProp<TextStyle>
    placeHolder:string
} & IconButtonProps