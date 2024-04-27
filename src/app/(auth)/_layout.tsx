import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

export default function AuthStack() {
  const { session } = useAuth();

  if(session){
    return <Redirect href={('/')} />
  }

  return (
  <Stack>
    <Stack.Screen name="sign-in" options={{title: 'Sign in', headerShown: false}}/>
    <Stack.Screen name="sign-up" options={{title: 'Create an account'}}/>
  </Stack>
)
}