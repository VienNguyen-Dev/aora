import { Alert, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className=" rounded-2xl items-center h-16 border-2 border-black-200 px-4 bg-black-100 focus:border-secondary w-full flex-row space-x-4">
      <TextInput
        className="text-base font-psemibold text-white flex-1 w-full mt-0.5"
        value={query}
        placeholder={"Search for a video topic"}
        onChangeText={(e) => setQuery(e)}
        placeholderTextColor={"#CDCDE0"}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert("Miss query", "Please fill someting to search result across database");
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
