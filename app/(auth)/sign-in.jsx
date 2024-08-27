import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmiting(true);
    try {
      await signIn(form.email, form.password);
      //Set user after user signout
      const results = await getCurrentUser();
      setUser(results);
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
          <Text className="text-2xl text-white font-psemibold mt-10">Login to Aora</Text>
          <FormField title="Email" value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })} otherStyles={"mt-7"} keyboardType="email-address" />
          <FormField title="Password" value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })} otherStyles={"mt-7"} keyboardType="password" />
          <CustomButton title={"Sign In"} handlePress={submit} isLoading={isSubmiting} containerStyles={"w-full mt-7"} />
          <View className="flex-row gap-2 mt-5 items-center justify-center">
            <Text className="text-white font-pregular text-lg">Don't have an account?</Text>
            <Link href={"/sign-up"} style={{ color: "#FF9001" }} className="font-psemibold text-lg">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
