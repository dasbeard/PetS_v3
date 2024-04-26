import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

export default function AuthStack() {
  const { session } = useAuth();

  if(session){
    return <Redirect href={('/')} />
  }

  return <Stack />
}