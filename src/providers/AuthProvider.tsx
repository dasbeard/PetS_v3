import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/util/supabase";
import "core-js/stable/atob";
import { Session } from "@supabase/supabase-js";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Alert } from "react-native";

interface JWT extends JwtPayload {
  user_role: string
}

type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: any;
  role: string | null;
  logOutUser: () => void;
  signInWithEmail: (email:string, password: string) =>  void;
}

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  role: null,
  logOutUser: () => {},
  signInWithEmail: () => {}
});

export default function AuthProvider({ children}: PropsWithChildren) {
  const [ session, setSession ] = useState<Session | null>(null)
  const [ profile, setProfile ] = useState<any | null>(null)
  const [ loading, setLoading] = useState(true)
  const [ role, setRole ] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSession = async () => {
      const { data: {session}} = await supabase.auth.getSession();
      
      setSession(session)
      
      if(session) {
        // fetch profile
        const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', session?.user.id)
        .single();
        
        setProfile(data || null)

        // decode the jwt to get role
        const jwt = jwtDecode<JWT>(session.access_token)
        setRole(jwt.user_role)
      }

      setLoading(false)
    }

    fetchSession()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      // if(session){
      //   // decode the jwt to get role
      //   const jwt = jwtDecode<JWT>(session.access_token)
      //   setRole(jwt.user_role)
      // }
    })

  },[])

  const logOutUser = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signOut();
    if(error){
      Alert.alert(error.message)
    };

    setRole(null);
    setProfile(null);
    setSession(null);
    setLoading(false);
  }

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error) { 
      Alert.alert(error.message)
    }

    if(data){
      if(data.session) {
        // fetch and set profile       
        const { data:profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.session?.user.id)
        .single();
        setProfile(profile || null)

        // decode the jwt to get role
        const jwt = jwtDecode<JWT>(data.session.access_token)
        setRole(jwt.user_role)
      }
      setLoading(false);
    }
  }

  return(
    <AuthContext.Provider value={{ session, loading, profile, role, logOutUser, signInWithEmail }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)