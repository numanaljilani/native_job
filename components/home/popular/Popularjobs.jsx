import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import { FlatList } from "react-native-gesture-handler";
import  useFetch  from '../../../hooks/useFetch'
import { useRouter } from "expo-router";

const Popularjobs = () => {
  const router = useRouter();
const { data , isLoading , error , reFetchData} = useFetch('search' , {query : 'react developer ', num_pages : 1})
  // const isLoading = false;
  // const error = false;
  const [selectedJob , setSelectedJob ] = useState();
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id)
  }; 
  

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) && reFetchData() : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => `key-${index}`}
            renderItem={({ item }) => <PopularJobCard selectedJob={selectedJob}  handleCardPress={()=>handleCardPress(item)} item={ item} />}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
