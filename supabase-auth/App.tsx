import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";

import { View, Text } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./src/services/supabase";
import SignIn from "./src/screens/SignIn";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      <SignIn />
      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
  );
}
