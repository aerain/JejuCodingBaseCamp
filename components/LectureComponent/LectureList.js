import React, {useState, useEffect} from 'react';
import { 
   View, Text, FlatList
  ,ActivityIndicator, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
} from "react-native";
import { getPlayList } from '../../service/DataProcessor';
import { normalize } from 'react-native-elements';

const LectureList = ({navigation, screenProps }) => {
    const [playList, setPlayList] = useState(null);
    const [pageToken , setPageToken] = useState(null);

    const _getPlayList = async () => {
        setPlayList(await getPlayList(screenProps.plId, pageToken));
    }
    useEffect(()=> {_getPlayList()}, [pageToken]); 

    const PushPageToken = () => {
        const { pageToken: { nextPageToken , prevPageToken}} = playList;
        return(
            <View style={style.buttonWrap}> 
            <TouchableOpacity  style={style.button}
                onPress={()=> !prevPageToken ? {}: setPageToken(`pageToken=${prevPageToken}`)}>
                  <Text>이전</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button}
                onPress={()=> !nextPageToken ? {}: setPageToken(`pageToken=${nextPageToken}`)}>
                  <Text>다음</Text>
            </TouchableOpacity>
            </View>
        )
    }
    
    const renderVideo = ({item: {title, img , desc, date, videoId}}) => (
        <TouchableOpacity 
            onPress={()=> navigation.navigate('LectureVideo', {
                videoId: videoId,
                title: title,
                desc: desc,     })}>
        <View style={style.container}>
            <View style={style.itemBox}>
                <Image source={{uri:`${img}`}} style={{width:'auto', height:200}} />
            </View>
            <View style={style.itemTitleBox}>
              <Text style={style.title}>{title}</Text>  
              <Text numberOfLines={1} style={style.date}>{date}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )

    const renderHeader = () => (
        <View style={style.header}>
            <Text style={{fontSize: normalize(16), fontWeight: 'bold' , color: '#6e6e6e'}}>{screenProps.title} 강좌</Text>
        </View>
    )
    
    return !playList ? (
        <View style={{alignItems: 'center',justifyContent:'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' />
        </View> 
    ) : (
        <SafeAreaView style={{flex:1,backgroundColor: '#FFFFFF',}}>
            <FlatList
              data={playList.videoInfo}
              renderItem={renderVideo}
              keyExtractor={item => item.videoId}
              ListHeaderComponent={renderHeader}
              style={{height:'85%'}}
            />   
            <PushPageToken />
        </SafeAreaView>
    );
} 

const style = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    itemBox: {
        flex:2,
        minWidth: '98%',
        backgroundColor: '#FFFFFF',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#e8e8e8',
        marginTop: 10,
        marginLeft:5,
        resizeMode: 'contain'
    },
    title:{
       fontSize: normalize(13),
       fontWeight: 'bold',
       marginBottom: 5,

    },
    date: {
        color: '#8a8a8a',
        fontSize: normalize(10)
      },
    buttonWrap: {
        flex:6,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent:'space-around',
        marginVertical:5,
        // justifyContent: 'space-between'
    },
    button: {
        flex:0.35,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 2, 
        borderWidth: 0.8,
        borderColor: '#dedede',
    },
    header: {
        flex:1,
        marginTop:5,
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    itemTitleBox : {
        paddingTop: 3,
        paddingHorizontal: 15,
    }

})

export default LectureList;



