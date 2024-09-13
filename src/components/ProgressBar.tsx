import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';

export const ProgressBarComponent = ({ list }:{
  list: string[]
}) => {
    return(
        <ProgressBar
        styleAttr={"Horizontal"}
        indeterminate={false}
        color={"#CCDBEB"}
        progress={list?.length/3}
        style={styles.progressBar}
        />
    );
}

const styles = StyleSheet.create({
  progressBar:{
    flex: 1
  },
})