import React, { useState, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from "./components/SearchScreen";
import HomeScreen from './components/HomeScreen';
import { FontAwesome5 } from '@expo/vector-icons'
import ProfilScreen from "./components/ProfilScreen";
import LoginScreen from './components/LoginScreen';
import AboutScreen from './components/AboutScreen';
import Inscription from './components/Inscription';
import CombainisonScreen from './components/CombainisonScreen';
const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigationRef = useRef(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentUser({ email: 'user@example.com' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const getTabIconName = (routeName) => {
    
    switch (routeName) {
      case 'Accueil':
        return 'home';
      case 'Inscription':
        return 'user-plus';
      case 'À Propos':
        return 'info-circle';
      case 'Recherche':
        return 'search';
      case 'Profil':
        return 'user';
        case 'Combainison':
        return 'user';
      default:
        return '';
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {!isAuthenticated ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>ProfSwap </Text>
            {!isLoggedIn ? (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => setIsLoggedIn(true)}
              >
                <FontAwesome5 name="sign-in-alt" size={16} color="white" />
                <Text style={styles.loginButtonText}>LogIn</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          {isLoggedIn ? (
            <LoginScreen
              navigation={navigationRef.current}
              setIsAuthenticated={setIsAuthenticated}
              setCurrentUser={setCurrentUser}
            />
          ) : (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => (
                  <View style={styles.tabIconContainer}>
                    <FontAwesome5
                      name={getTabIconName(route.name)}
                      size={20}
                      color={focused ? 'red' : 'gray'}
                    />
                  </View>
                ),
                tabBarShowLabel: false,
                tabBarStyle: [{ display: 'flex' }, null],
              })}
            >
              <Tab.Screen name="Accueil" component={HomeScreen} />
              <Tab.Screen name="Inscription" component={Inscription} />
              <Tab.Screen name="À Propos" component={AboutScreen} />
            </Tab.Navigator>
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>ProfSwap</Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <FontAwesome5 name="sign-out-alt" size={16} color="white" />
              <Text style={styles.loginButtonText}>LogOut</Text>
            </TouchableOpacity>
          </View>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused }) => (
                <View style={styles.tabIconContainer}>
                  <FontAwesome5
                    name={getTabIconName(route.name)}
                    size={20}
                    color={focused ? 'red' : 'gray'}
                  />
                </View>
              ),
              tabBarShowLabel: false,
              tabBarStyle: [{ display: 'flex' }, null],
            })}
          >
            <Tab.Screen name="Accueil" component={HomeScreen} />
            <Tab.Screen name="Recherche" component={SearchScreen} />
            <Tab.Screen name="Combainison" component={CombainisonScreen} />

            <Tab.Screen name="À Propos" component={AboutScreen} />
            <Tab.Screen name="Profil">
              {() => <ProfilScreen currentUser={currentUser} />}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex:0.14,
    backgroundColor: 'black', // Couleur de fond du header
    height: 60, // Hauteur du header
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red', // Couleur du texte du titre du header
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
});