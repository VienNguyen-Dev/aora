import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser, getCurrentUser } from "../../lib/appwite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmiting(true);
    try {
      await createUser(form.email, form.password, form.username);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } finally {
      setIsSubmiting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="px-4 my-6 w-full h-full justify-center">
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode="contain" />
          <Text className="text-2xl text-white font-psemibold mt-10">Sign up to Aora</Text>
          <FormField title="Username" value={form.username} handleChangeText={(e) => setForm({ ...form, username: e })} otherStyles={"mt-7"} keyboardType="text" />
          <FormField title="Email" value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })} otherStyles={"mt-7"} keyboardType="email-address" />
          <FormField title="Password" value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })} otherStyles={"mt-7"} keyboardType="password" />

          <CustomButton title={"Sign Up"} handlePress={submit} containerStyles={"w-full mt-7"} isLoading={isSubmiting} />
          <View className="flex-row gap-2 mt-5 items-center justify-center">
            <Text className="text-white font-pregular text-lg">Already have an account?</Text>
            <Link href={"/sign-in"} style={{ color: "#FF9001" }} className="font-psemibold text-lg">
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
