import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Platform,
  ScrollView,
  Text,
  SafeAreaView,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { supabase } from "../../services/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Erro no login:", error.message);
    } else {
      Alert.alert("Login realizado com sucesso!");
    }
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert(
        "Por favor, verifique sua caixa de entrada para confirmar o email!"
      );
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>
          Por favor, entre ou cadastre-se para continuar
        </Text>
        <View style={styles.inputGroup}>
          <Input
            label="Email"
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "#6200ea",
            }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@endereco.com"
            autoCapitalize="none"
            inputContainerStyle={styles.inputContainer}
          />
          <Input
            label="Senha"
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              color: "#6200ea",
            }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Senha"
            autoCapitalize="none"
            inputContainerStyle={styles.inputContainer}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            title="Entrar"
            disabled={loading}
            onPress={signInWithEmail}
            buttonStyle={styles.button}
          />
          <Button
            title="Cadastrar-se"
            disabled={loading}
            onPress={signUpWithEmail}
            buttonStyle={[styles.button, styles.signUpButton]}
            titleStyle={styles.signUpTitle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6200ea",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 12 : 6,
    marginVertical: 10,
  },
  buttonGroup: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6200ea",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: "100%",
  },
  signUpButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6200ea",
  },
  signUpTitle: {
    color: "#6200ea",
  },
});
