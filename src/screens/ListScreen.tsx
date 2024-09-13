import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectJobList } from '../redux/slices';
import { JobList } from '../components';
import { Props } from '../interfaces';
import { CONST } from '../constants';

export const ListScreen = ({navigation}: Props) => {
  const jobList = useSelector(selectJobList);
  const [ jobArray, setJobsArray ] = React.useState([]);

  React.useEffect(() => {
    setJobsArray(jobList)
  }, [jobList])

  const navigateToAddScreen = () => navigation.navigate('AddJob')

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.card, styles.cardAdd]} onPress={navigateToAddScreen}>
        <Text style={styles.text}>
          {CONST.listScreen.new_job}
        </Text>
      </TouchableOpacity>
      {jobArray.length == 0 ? 
        <Text style={styles.emptyListText}>
          {CONST.listScreen.no_jobs}
        </Text>
        : <JobList list={jobArray} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    width: '100%', 
    paddingHorizontal: 20, 
    paddingTop: 40, 
    backgroundColor: '#F2F2F2'
  },
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
  emptyListText:{
    textAlign: 'center',
    marginTop: 20
  }
})