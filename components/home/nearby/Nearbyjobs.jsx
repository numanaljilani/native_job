import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import { FlatList } from "react-native-gesture-handler";
import  useFetch  from '../../../hooks/useFetch'
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () => {

  const router = useRouter();
  const { data , isLoading , error , reFetchData} =  useFetch('search' , {query : 'react developer ', num_pages : 1})

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby  jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>Something went wrong</Text>
          
          
        ) && {reFetchData} : (
        data?.map((job)=>( <NearbyJobCard key={`nearby_job_${job?.job_id}`} job={job && job} handleNavigate={()=> router.push(`/job-details/${job?.job_id}`)}/> ))
         
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs