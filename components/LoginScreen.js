import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image , Text } from 'react-native';
import bcrypt from 'bcryptjs';
import Background from './Background';
import {darkGreen} from './Constants';
const LoginScreen = ({ setIsAuthenticated, setCurrentUser, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const professor = data.find(prof => prof.email === email);
        if (professor) {
          bcrypt.compare(password, professor.password, (err, res) => {
            if (res) {
              setIsAuthenticated(true);
              setCurrentUser(professor);
            } else {
              Alert.alert('Erreur', 'Identifiants incorrects');
            }
          });
        } else {
          Alert.alert('Erreur', 'Identifiants incorrects');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la connexion');
      });
  };

  return (
    <Background>
    <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
      <TextInput
      style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
        placeholder="E-mail"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
      style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button style={{
        backgroundColor: 'green',
        borderRadius: 100,
        alignItems: 'center',
        width: 350,
        paddingVertical: 5,
        marginVertical: 10
      }} title="Connexion" onPress={handleLogin} />
    </View>
    </View>
    </Background>
  );
};



export default LoginScreen;
