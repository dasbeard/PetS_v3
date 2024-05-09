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
  role: string | null;
  logOutUser: () => void;
  signInWithEmail: (email:string, password: string) =>  void;
  createAccount: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  role: null,
  logOutUser: () => {},
  signInWithEmail: () => {},
  createAccount: () => {},
});

export default function AuthProvider({ children}: PropsWithChildren) {
  const [ session, setSession ] = useState<Session | null>(null)
  const [ loading, setLoading] = useState(true)
  const [ role, setRole ] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSession = async () => {
      const { data: {session}} = await supabase.auth.getSession();
      
      setSession(session)
      
      if(session) {
        // decode the jwt to get role
        // const jwt = jwtDecode<JWT>(session.access_token)
        // // console.log(jwt.user_role)
        // setRole(jwt.user_role)
        
// ONLY FOR LOCAL AS JWT IS NOT AVAILABLE
setRole('owner')

      }

      setLoading(false)
    }

    fetchSession()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

    })

  },[])

  const logOutUser = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signOut();
    if(error){
      console.log('Errr', error);
      
      Alert.alert(error.message)
    };

    setRole(null);
    setSession(null);
    setLoading(false);
  }

  const createAccount = async (email: string, password: string) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
    // const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if(error){
      Alert.alert(error.message)
      console.log({error});
    }

    if(data){
      // decode the jwt to get role
      if( data.session){
        const jwt = jwtDecode<JWT>(data.session.access_token)
        setRole(jwt.user_role || 'client')
      }
    }

    setLoading(false)
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
        // decode the jwt to get role
        // const jwt = jwtDecode<JWT>(data.session.access_token)
        // setRole(jwt.user_role)

// ONLY FOR LOCAL AS JWT IS NOT AVAILABLE
setRole('owner')
      }
    }
    setLoading(false);
  }

  return(
    <AuthContext.Provider 
      value={{ 
        session, 
        loading, 
        role, 
        logOutUser, 
        signInWithEmail,
        createAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)