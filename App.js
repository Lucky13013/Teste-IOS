import * as SplashScreen from 'expo-splash-screen';
import { Pressable, StatusBar, TouchableOpacity, View, Text, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import './constants/i18n.js';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { startTransition } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './app/screens/1TelaInicial';
import Ajustes from './app/screens/3Ajustes';
import Favoritos from './app/screens/2Favoritos';
import Cadastro from './app/screens/Cadastro';
import Loguin from './app/screens/Login';
import Aba_pesquisa from './app/screens/Aba_pesquisa';
import Ajuda from './app/screens/Ajuda';
import Interesses from './app/screens/Interesses';
import Noti from './app/screens/Noti.js';
import Preferencias from './app/screens/Preferencias';
import Sobre_a_revista from './app/screens/Sobre_a_revista';
import Tela_de_leitura from './app/screens/Tela_de_leitura';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
import Teste from './app/screens/Testes';
import ArticleList from './app/screens/ArticleList.js';
import Ler_PDF from './app/screens/Ler_PDF.js';
import Tutorial from './app/screens/Tutorial.js';
import SobreOAPp from './app/screens/Sobre_o_APP.js';
import PasswordReset from './app/screens/PasswordReset.js';
import ForgotPassword from './app/screens/ForgotPassword.js';
import { FontSizeProvider } from './components/FontSizeProvider';

import { GoogleSignin } from '@react-native-google-signin/google-signin';


// Habilita o uso de telas nativas
enableScreens();

//teste
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -2 }} {...props} />;
}

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'TelaInicial',
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const statusbarHeight = StatusBar.currentHeight;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.hideAsync();
SplashScreen.preventAutoHideAsync();

GoogleSignin.configure({
  webClientId: '522347973020-b4aeo7h4af25uhk72flfq2hjsh2cnvsr.apps.googleusercontent.com', // usado para verificar token no backend
  iosClientId: '522347973020-l71k92fglp4k4d42rra764ksi4edcbjp.apps.googleusercontent.com', // usado no iOS para gerar o idToken corretamente
  offlineAccess: false,
  forceCodeForRefreshToken: false,
});


function Tabs() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const inicio = t('pages.Início');
  const fav = t('pages.Favoritos');
  const ajustes = t('pages.Ajustes');

  const [isTutorialSeen, setIsTutorialSeen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const checkTutorial = async () => {
      const tutorialSeen = await AsyncStorage.getItem('tutorialSeen');
      if (tutorialSeen) {
        setIsTutorialSeen(true);
      } else {
        navigation.navigate('Tutorial');
      }
    };

    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('Token not found');
          return;
        }
        const response = await axios.get('https://textocontexto.pythonanywhere.com/api/user-notifications/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const notifications = response.data;
        const unreadCount = notifications.filter((notification) => !notification[1]).length; // Assuming notification[1] is the 'visto' field
        setNotificationCount(unreadCount);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    checkTutorial();
    fetchNotifications();
  }, []);

  const Notif = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Noti');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const NotificationIcon = () => (
    <TouchableOpacity style={{ padding: 10, right: 20 }} onPress={Notif}>
      <View>
        <FontAwesome name="bell" size={25} color="#fff" />
        {notificationCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10 }}>{notificationCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#a74e9e',
          height: 60,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: '#a74e9e',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerRight: () => <NotificationIcon />,
        headerLeft: () => (
          <FontAwesome 
            name="search" 
            size={24} 
            color="#fff" 
            style={{ marginLeft: 25 }}
            onPress={() => navigation.navigate('Aba_pesquisa')}
          />
        ),
      }}
    >
      {/* Tela Início - Personalização Específica */}
      <Tab.Screen
        name="Inicio"
        component={TelaInicial}
        options={{
          tabBarLabel: inicio,
          tabBarLabelStyle: {
            textAlign: 'center',
            width: '100%',
            fontSize: 12,
            marginBottom: 3,
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome 
              name="home" 
              size={24} 
              color={color}
              style={{ marginTop: 3 }}
            />
          ),
          headerTitle: inicio,
        }}
      />

      {/* Tela Favoritos - Personalização Específica */}
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarLabel: fav,
          tabBarLabelStyle: {
            textAlign: 'center',
            width: '100%',
            fontSize: 12,
            marginBottom: 3,
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome 
              name="star" 
              size={22} 
              color={color}
              style={{ marginTop: 5 }}
            />
          ),
          headerTitle: fav,
        }}
      />

      {/* Tela Ajustes - Personalização Específica */}
      <Tab.Screen
        name="Ajustes"
        component={Ajustes}
        options={{
          tabBarLabel: ajustes,
          tabBarLabelStyle: {
            textAlign: 'center',
            width: '100%',
            fontSize: 12,
            marginBottom: 3,
            fontStyle: 'italic',
          },
          tabBarIcon: ({ color }) => (
            <Entypo 
              name="dots-three-horizontal" 
              size={24} 
              color={color}
              style={{ marginTop: 3 }}
            />
          ),
          headerTitle: ajustes,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { t } = useTranslation();

  const pesquisa = t('pages.Pesquisar');
  const ajuda = t('pages.Ajuda');
  const perfil = t('pages.Perfil');
  const notifi = t('pages.Notificações');
  const preferencias = t('pages.Preferencias');
  const sobre = t('pages.Sobre a Revista');
  const artigo = t('pages.artigo');
  const artigoList = t('pages.artigos');
  const Sobre = t('pages.Sobre o APP');

  useEffect(() => {
    const linguasalva = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
        }
      } catch (e) {
        console.log(e);
      }
    };
    linguasalva();
  }, []);

  return (
    <FontSizeProvider>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='1TelaInicial'>
          <Stack.Screen name="Tabs" options={{headerShown: false,}} component={Tabs} />
            <Stack.Screen name="Aba_pesquisa" options={{ title:pesquisa ,headerStyle: {backgroundColor: "#a74e9e"},headerTintColor:"#fff",}} component={Aba_pesquisa}/>
            <Stack.Screen name="Ajuda" options={{ title:ajuda ,headerStyle: {backgroundColor: "#a74e9e"},headerTintColor:"#fff", }} component={Ajuda}/>
            <Stack.Screen name="Interesses" options={{ title: perfil,headerStyle: {backgroundColor: "#a74e9e"},headerTintColor:"#fff", }} component={Interesses} />
            <Stack.Screen name="Login" options={{ headerShown: false, }} component={Loguin} />
            <Stack.Screen name="Noti" options={{ title: notifi ,headerStyle: {backgroundColor: "#a74e9e"},headerTintColor:"#fff", }} component={Noti}/>
            <Stack.Screen name="Preferencias" options={{ title: preferencias ,headerStyle: {backgroundColor: "#a74e9e"},headerTintColor:"#fff", }} component={Preferencias} />
            <Stack.Screen name="Sobre_a_revista" options={{ title: sobre ,headerStyle: {backgroundColor: "#a74e9e"},headerTintColor:"#fff", }} component={Sobre_a_revista}/>
            <Stack.Screen name="Tela_de_leitura" options={{title:artigo, headerStyle: {backgroundColor: "#a74e9e"},headerTintColor:"#fff",}} component={Tela_de_leitura} />
            <Stack.Screen name="Cadastro" options={{ headerShown: false }} component={Cadastro} />
            <Stack.Screen name='Teste' component={Teste} />
            <Stack.Screen name='ArticleList' component={ArticleList} options={{title:artigoList, headerStyle: {backgroundColor: "#a74e9e"},headerTintColor:"#fff",}} />
            <Stack.Screen name='Ler_PDF'options={{title: "PDF" , headerStyle: {backgroundColor: "#a74e9e"},headerTintColor:"#fff",}} component={Ler_PDF}/>
            <Stack.Screen name="Tutorial" options={{ headerShown: false }} component={Tutorial} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
            <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown: false }}/> 
            <Stack.Screen name='Sobre_o_APP' component={SobreOAPp} options={{title: Sobre , headerStyle: {backgroundColor: "#a74e9e"},headerTintColor:"#fff",}}/>
          </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </FontSizeProvider>
  );
}
