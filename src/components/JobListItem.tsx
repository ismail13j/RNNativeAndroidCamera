import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ProgressBarComponent } from './ProgressBar';
import { listItemI } from '../interfaces';

export const JobListItem = ({ data }:{
  data: listItemI
}) => {
    const { title, images } = data;

    return(
      <View style={[styles.card, styles.cardListItem]} key={title}>
      <Text style={styles.text}>
        {title}
      </Text>
        <View style={styles.bottomRow}>
            <ProgressBarComponent list={images}/>
            <Text style={styles.countText}>
                {images.length}/3
            </Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  card:{
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#FAFAFA',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 25,
    elevation: 1
  },
  cardAdd:{
    backgroundColor: '#FAFAFA',
    paddingVertical: 20,
    marginBottom: 20
  },
  cardListItem:{
    backgroundColor: '#FBFBFB',
    paddingVertical: 15,
  },
  text:{
    fontWeight: 'bold'
  },
  countText:{
    marginLeft:10, 
    fontSize: 12
  },
  progressBar:{
    flex: 1
  },
  bottomRow:{
    flexDirection: 'row', 
    width:'100%', 
    paddingTop: 15
  }
})