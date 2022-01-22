import React, { useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

export default function Native() {

  const [searchText, setSearchText] = useState('');
  const [hanbokList, setHanboks] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const hanboks = [
    {name: '은방울'},
    {name: '풀색고름'},
    {name: '자주은줄'},
    {name: '수국흰색'},
    {name: '크림무지'},
  ]
  
  const searchPath = process.env.NODE_ENV == 'production' ? '/search' : 'http://localhost:3000/search'
  // const searchPath = 'http://localhost:3000/search'

  useEffect(() => {
      axios.get(searchPath)
      .then((result) =>{
          setHanboks(result.data);
          setSearchList(result.data);

        console.log(result.data);
        console.log(process.env.NODE_ENV);
      })
      
  },[])

  // filter식 검색
  // const search2 = () => {
  //     const nameReg = new RegExp(`${name}`, 'gi');
  //     let searched = hanboks.filter(item => nameReg.test(item.gs_name));
  //     const typeReg = new RegExp(`${type}`, 'gi');
  //     searched = searched.filter(item => typeReg.test(item.gs_kind));
  //     setSearchList(searched);
  // }

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput}
        placeholder='Type your word'
        onChangeText={(txt) => setSearchText(txt)}
        defaultValue={searchText}
      >
      </TextInput>
      {/* <Button defaultValue='추가'>추가 하기</Button>*/}
      {/* <StatusBar style="auto" /> */}
      <FlatList
        data={hanboks}
        renderItem={({item}) => 
          <Text style={styles.item}>{item.name}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    top: 50,
    alignItems: 'center',
    justifyContent: 'start',
  },
  searchInput: {
    height: 40,
    borderBottomEndRadius: 10,
    borderRadius: 5,
    borderColor: '#f02'
  },
  item :{
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
