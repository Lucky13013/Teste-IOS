<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';

// Navegação
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

// Ícones
import { FontAwesome, Entypo } from '@expo/vector-icons';

// Utilitários e Configurações
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Traduções (i18n)
import './constants/i18n.js';
import { useTranslation } from 'react-i18next';
import i18n from './constants/i18n.js'; // Importando a instância configurada

// Provedores e Componentes
import { FontSizeProvider } from './components/FontSizeProvider';

// Importação de todas as suas telas
import TelaInicial from './app/screens/1TelaInicial';
import Favoritos from './app/screens/2Favoritos';
import Ajustes from './app/screens/3Ajustes';
=======
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
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
import Cadastro from './app/screens/Cadastro';
import Loguin from './app/screens/Login';
import Aba_pesquisa from './app/screens/Aba_pesquisa';
import Ajuda from './app/screens/Ajuda';
import Interesses from './app/screens/Interesses';
import Noti from './app/screens/Noti.js';
import Preferencias from './app/screens/Preferencias';
import Sobre_a_revista from './app/screens/Sobre_a_revista';
import Tela_de_leitura from './app/screens/Tela_de_leitura';
<<<<<<< HEAD
=======
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
import Teste from './app/screens/Testes';
import ArticleList from './app/screens/ArticleList.js';
import Ler_PDF from './app/screens/Ler_PDF.js';
import Tutorial from './app/screens/Tutorial.js';
import SobreOAPp from './app/screens/Sobre_o_APP.js';
import PasswordReset from './app/screens/PasswordReset.js';
import ForgotPassword from './app/screens/ForgotPassword.js';
<<<<<<< HEAD


// --- CONFIGURAÇÕES INICIAIS ---

// Mantém a splash screen visível enquanto o app carrega
SplashScreen.preventAutoHideAsync();

// Configura o Google Sign-In uma única vez
GoogleSignin.configure({
  webClientId: '522347973020-b4aeo7h4af25uhk72flfq2hjsh2cnvsr.apps.googleusercontent.com',
  iosClientId: '522347973020-l71k92fglp4k4d42rra764ksi4edcbjp.apps.googleusercontent.com',
});
=======
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
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

<<<<<<< HEAD

// --- COMPONENTES DE NAVEGAÇÃO ---

/**
 * Componente para o ícone de notificação com contador.
 */
function NotificationIcon() {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('https://textocontexto.pythonanywhere.com/api/user-notifications/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const unreadCount = response.data.filter(n => !n[1]).length;
=======
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
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
        setNotificationCount(unreadCount);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
<<<<<<< HEAD
    
    // Adiciona um listener para focar e atualizar as notificações quando o usuário volta para a tela
    const unsubscribe = navigation.addListener('focus', () => {
        fetchNotifications();
    });

    fetchNotifications(); // Busca inicial

    return unsubscribe; // Limpa o listener ao desmontar
  }, [navigation]);

  const navigateToNotifications = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate('Noti');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <TouchableOpacity style={{ padding: 10, marginRight: 15 }} onPress={navigateToNotifications}>
      <View>
        <FontAwesome name="bell" size={25} color="#fff" />
        {notificationCount > 0 && (
          <View style={{ position: 'absolute', right: -6, top: -3, backgroundColor: 'red', borderRadius: 8, width: 16, height: 16, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{notificationCount}</Text>
=======

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
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
<<<<<<< HEAD
}


/**
 * Componente que define a Navegação por Abas (Tabs).
 */
function TabNavigator() {
  const { t } = useTranslation();
  const navigation = useNavigation();
=======
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
<<<<<<< HEAD
        tabBarInactiveTintColor: '#e0e0e0',
        tabBarStyle: { backgroundColor: '#a74e9e', height: 60, paddingTop: 5, paddingBottom: 5 },
        headerStyle: { backgroundColor: '#a74e9e' },
=======
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#a74e9e',
          height: 60,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: '#a74e9e',
        },
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerRight: () => <NotificationIcon />,
        headerLeft: () => (
<<<<<<< HEAD
          <TouchableOpacity style={{ marginLeft: 25 }} onPress={() => navigation.navigate('Aba_pesquisa')}>
            <FontAwesome name="search" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    >
=======
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
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
      <Tab.Screen
        name="Inicio"
        component={TelaInicial}
        options={{
<<<<<<< HEAD
          title: t('pages.Início'),
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
=======
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
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
<<<<<<< HEAD
          title: t('pages.Favoritos'),
          tabBarIcon: ({ color, size }) => <FontAwesome name="star" size={size} color={color} />,
        }}
      />
=======
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
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
      <Tab.Screen
        name="Ajustes"
        component={Ajustes}
        options={{
<<<<<<< HEAD
          title: t('pages.Ajustes'),
          tabBarIcon: ({ color, size }) => <Entypo name="dots-three-horizontal" size={size} color={color} />,
=======
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
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
        }}
      />
    </Tab.Navigator>
  );
}

<<<<<<< HEAD

// --- COMPONENTE PRINCIPAL (APP) ---

export default function App() {
  const { t } = useTranslation();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Carrega o idioma salvo
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          await i18n.changeLanguage(savedLanguage);
        }
        
        // Verifica se o tutorial já foi visto
        const tutorialSeen = await AsyncStorage.getItem('tutorialSeen');
        // A lógica de navegação para o tutorial será movida para dentro de um componente de tela
        // para não bloquear a renderização inicial.

      } catch (e) {
        console.warn(e);
      } finally {
        // Informa que o app está pronto para ser exibido
        setIsAppReady(true);
      }
    }

    prepareApp();
  }, []);

  // Esconde a splash screen apenas quando o app estiver pronto.
  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null; // Não renderiza nada até que as preparações estejam completas
  }

  return (
    <SafeAreaProvider>
      <FontSizeProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar barStyle="light-content" backgroundColor="#a74e9e" />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs">
              {/* Grupo de Telas Principais */}
              <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
              
              {/* Telas que abrem sobre as abas */}
              <Stack.Screen name="Aba_pesquisa" component={Aba_pesquisa} options={{ title: t('pages.Pesquisar'), headerStyle: { backgroundColor: "#a74e9e" }, headerTintColor: "#fff" }} />
              <Stack.Screen name="Ajuda" component={Ajuda} options={{ title: t('pages.Ajuda'), headerStyle: { backgroundColor: "#a74e9e" }, headerTintColor: "#fff" }} />
              <Stack.Screen name="Interesses" component={Interesses} options={{ title: t('pages.Perfil'), headerStyle: { backgroundColor: "#a74e9e" }, headerTintColor: "#fff" }} />
              <Stack.Screen name="Noti" component={Noti} options={{ title: t('pages.Notificações'), headerStyle: { backgroundColor: "#a74e9e" }, headerTintColor: "#fff" }} />
              <Stack.Screen name="Preferencias" component={Preferencias} options={{ title: t('pages.Preferencias'), headerStyle: { backgroundColor: "#a74e9e" }, headerTintColor: "#fff" }} />
              <Stack.Screen name="Sobre_a_revista" component={Sobre_a_revista} options={{ title: t('pages.Sobre a Revista'), headerStyle: { backgroundColor: "#a74e9e" }, headerTintColor: "#fff" }} />
              <Stack.Screen name="Tela_de_leitura" component={Tela_de_leitura} options={{ title: t('pages.artigo'), headerStyle: { backgroundColor: "#a74e9e" }, headerTintColor: "#fff" }} />
              <Stack.Screen name="ArticleList" component={ArticleList} options={{ title: t('pages.artigos'), headerStyle: { backgroundColor: "#a74e9e" }, headerTintColor: "#fff" }} />
              <Stack.Screen name="Ler_PDF" component={Ler_PDF} options={{ title: "PDF", headerStyle: { backgroundColor: "#a74e9e" }, headerTintColor: "#fff" }} />
              <Stack.Screen name="Sobre_o_APP" component={SobreOAPp} options={{ title: t('pages.Sobre o APP'), headerStyle: { backgroundColor: "#a74e9e" }, headerTintColor: "#fff" }} />
              <Stack.Screen name="Teste" component={Teste} />
              
              {/* Grupo de Telas de Autenticação e Onboarding (sem cabeçalho) */}
              <Stack.Screen name="Login" component={Loguin} options={{ headerShown: false }} />
              <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
              <Stack.Screen name="Tutorial" component={Tutorial} options={{ headerShown: false }} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
              <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </FontSizeProvider>
    </SafeAreaProvider>
=======
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
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
  );
}
