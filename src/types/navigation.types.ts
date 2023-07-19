export type RootNavigationParamList = {
    Home:undefined
    CurrencyList:undefined
    Chart:{currencies:string[]}
}

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootNavigationParamList {}
    }
}