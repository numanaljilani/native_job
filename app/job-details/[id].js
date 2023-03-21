import React, { memo, useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter, Stack, useSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import {
  ScreenHeaderBtn,
  Company,
  JobTabs,
  JobAbout,
  JobFooter,
  Specifics,
} from "../../components";

import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hooks/useFetch";
import { isLoading } from "expo-font";
import About from "../../components/jobdetails/about/About";

const tabs = ["About", "Qualification", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const navigation = useNavigation();

  const { data, isLoading, error, reFetchData } = useFetch("job-details", {
    job_id: params.id,
  });
  
  const onRefresh = () => {
    setRefreshing(true)
    reFetchData();
    setRefreshing(false)
    return;
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualification":
        return (
          <Specifics
            title="Qualification"
            points={data[0].job_highlights?.Qualifications ?? ["N/A "]}
          />
        );
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? " No data Provided"} />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A "]}
          />
        );
      default:
        return;
        break;
    }
  };

 
  // console.log(data[0].jo)
  const handleBack = () => {
    console.log("hello");
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite }}
      className="border"
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={ handleBack}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              // handlePress={() => { navigation.goBack()}}
            />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No Data Found</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                CompanyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                componyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://carrers.google.com/jobs/results"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default memo(JobDetails);
