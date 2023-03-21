import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import { icons, images, SIZES } from "../../../constants";
import styles from "./welcome.style";

const jobsType = ["Full-time", "Part-time", "Contractor" ];


const Welcome = ({ searchTerm ,setSearchTerm ,handleClick}) => {
  const router = useRouter();

  const [activeJobType, setActiveJobType] = useState("Part-time");
  return (
    <View className="">
      <View className="" style={styles.container}>
        <Text style={styles.userName}>Hello Friends</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            onChangeText={(text) => { setSearchTerm(text)}}
            value= {searchTerm}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            style={styles.searchBtnImage}
            source={icons.search}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobsType}
          keyExtractor={(item, index) => `key-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tab(activeJobType, item)} onPress={()=>{setActiveJobType(item) ; router.push(`/search/${item}`)}}>
              <Text style={styles.tabText}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{columnGap : SIZES.small}}
          horizontal

        />
      </View>
    </View>
  );
};

export default Welcome;
