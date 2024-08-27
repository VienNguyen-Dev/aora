import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants";

const FormField = ({ title, handleChangeText, value, otherStyles, placeholder, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className=" rounded-2xl items-center h-16 border-2 border-black-200 px-4 bg-black-100 focus:border-secondary w-full flex-row">
        <TextInput
          className="text-base font-psemibold text-white flex-1 w-full"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          keyboardType={props.keyboardType}
          placeholderTextColor={"#7B7B8B"}
          secureTextEntry={title === "Password" && !showPassword}
          // maxLength={title === "Username" && "25"}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
