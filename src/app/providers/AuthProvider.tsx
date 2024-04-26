import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/util/supabase";
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
}

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  role: null,
  logOutUser: () => {},
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
        .from('profiles')
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

      if(session){
        // decode the jwt to get role
        const jwt = jwtDecode<JWT>(session.access_token)
        setRole(jwt.user_role)
      }
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
    setLoading(true);
  }

  return(
    <AuthContext.Provider value={{ session, loading, profile, role, logOutUser }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)