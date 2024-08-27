import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import EmptyState from "../components/EmptyState";
import { images } from "../../constants";
import SearchInput from "../components/SearchInput";
import VideoCard from "../components/VideoCard";
import { searchPosts } from "../../lib/appwite";

const Bookmark = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <SafeAreaView className=" bg-primary h-full">
      <FlatList
        data={posts}
        // data={[{ id: 1 }, { id: 2 }]}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="px-4 my-6 space-y-6">
            <View className="justify-between items-start mb-6 flex-row">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Save Videos</Text>
                <Text className="font-psemibold text-2xl text-white">{query}</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
              </View>
            </View>
            <SearchInput initialQuery={query} placeholder="Search your saved videos" />
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="No videos found for this search query" />}
      />
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({});
