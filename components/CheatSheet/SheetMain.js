import React from 'react'
import {useState, useEffect} from 'react';
import { View, Text, FlatList, Modal, StyleSheet,TouchableOpacity, Button, Dimensions} from 'react-native'
import data from '../tool/data';
import { normalize } from 'react-native-elements';

const SheetMain = ({navigation})=>{
    
    const _renderItem = ({item:{imglink, name}}) =>(
        <TouchableOpacity
        onPress={()=> navigation.navigate('Sheet',{name:name, imglink:imglink})}>
            <View style={style.content}>
                <Text style={style.sheetName}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>
    )
    const [SheetList, setSheetList] = useState("")
    const setSheet = async () => {setSheetList(await data("sheet"))}
    const DATA = Object.values(SheetList)
    useEffect(()=> {setSheet()},[])
    return (
        <View style={style.container}>
            <FlatList
                data = {DATA}
                renderItem = {({item})=><_renderItem item={item}/>}
                numColumns={3}
            />
        </View>
    )
}
export default SheetMain


const style = StyleSheet.create({
    container:{
        flex:1,
        
        alignItems: 'center',
        justifyContent:'center'
    },
    content:{
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'space-around',
        backgroundColor: '#FFFFFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 7,
        borderWidth: 0.3,
        borderColor: '#BCBCBC',
        minWidth:'33%',
        height:120
    },
    sheetName:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize: normalize(13)
    }
})