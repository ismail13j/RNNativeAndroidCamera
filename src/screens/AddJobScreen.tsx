import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImagePlaceholderList } from '../components';
import { Props } from '../interfaces';

export const AddJobScreen = ({navigation}: Props) => {

  return (
    <View style={styles.container}>
      <ImagePlaceholderList navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    width: '100%', 
    paddingTop: 50,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    justifyContent:'space-evenly',
  },
})