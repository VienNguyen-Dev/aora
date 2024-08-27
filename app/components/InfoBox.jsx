import { StyleSheet, Text, View } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, containerStyles, textStyles }) => {
  return (
    <View className={`${containerStyles}`}>
      <Text className={`text-xl text-white font-psemibold mt-3 text-center ${textStyles}`}>{title}</Text>
      <Text className={`text-gray-100 text-sm text-center font-pregular `}>{subtitle}</Text>
    </View>
  );
};

export default InfoBox;

const styles = StyleSheet.create({});
