import * as React from 'react';
import { FlatList } from 'react-native';
import { JobListItem } from './JobListItem';
import { listItemI } from '../interfaces';

export const JobList = ({ list }:{
  list: listItemI[]
}) => {

  const renderItems = ({item}: {item: listItemI}) => {
    return(
        <JobListItem data={item} />
    );
  }

  return (<FlatList
      data={list}
      renderItem={renderItems}
      keyExtractor={(item) => item.title}
      showsVerticalScrollIndicator={false}/>
    );
}
