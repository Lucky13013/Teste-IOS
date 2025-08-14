<<<<<<< HEAD
import { 
  TouchableOpacity, 
  TextInput, 
  BackHandler, 
  Image,
  ActivityIndicator,
  View,
  StyleSheet // Importando StyleSheet
} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text } from '../../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
import { TouchableOpacity, TextInput, BackHandler, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View } from '../../components/Themed';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
import { useNavigation } from '@react-navigation/native';
import '../../constants/i18n.js';
import { useTranslation } from 'react-i18next';
import { AntDesign } from '@expo/vector-icons';
<<<<<<< HEAD
// A importação do useDynamicStyles foi removida

export default function Loguin() {
  const { t } = useTranslation();
  const senhaPlaceholder = t("login.Senha");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
=======
import useDynamicStyles from '../../components/Css.js';

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signInWithGoogle } from '../../components/googlelogin.js';

export default function Loguin() {
  const { t } = useTranslation();
  const senha = t("login.Senha");
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);
<<<<<<< HEAD

=======
  const styles = useDynamicStyles();


  // Logica de Login
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, insira o email e a senha.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://textocontexto.pythonanywhere.com/api/login/', { email, password }, { headers: { 'Content-Type': 'application/json' } });
      const token = response.data.access;
      await AsyncStorage.setItem('token', token);
<<<<<<< HEAD
      console.log('Login bem-sucedido, token salvo.');
      navigation.navigate(check ? 'Interesses' : 'Tabs');
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
      console.log('Erro de login:', error);
=======
      console.log(token);
      console.log('entrou');
      if (check) {
        navigation.navigate('Interesses');
      } else {
        navigation.navigate('Tabs');
      }
    } catch (error) {
      alert('Erro ao fazer login');
      console.log('erro', error);
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

<<<<<<< HEAD
=======
  // Logica para voltar para a tela inicial e não acessar páginas quando não estiver logado
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Tabs');
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Image source={require("../../assets/images/icone.png")} style={styles.image}/>
=======
      <Image source={require("../../assets/images/icone.png") }style={styles.image}/>
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
      <View style={styles.conteiner_loguin}>
        <Text style={styles.texto}>
          {t("login.texto1")}
        </Text>
<<<<<<< HEAD
        
=======
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
<<<<<<< HEAD
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={senhaPlaceholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.toggleButton} onPress={togglePasswordVisibility}>
            <Text style={styles.toggleButtonText}>
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>{t("login.forgot_your_password")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCheck(!check)} style={styles.checkboxContainer}>
          {check ? <AntDesign name="checksquare" size={24} color="#a74e9e" /> : <AntDesign name="checksquareo" size={24} color="#a74e9e" />}
          <Text style={styles.checkboxLabel}> {t("login.Notificações")} </Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size={'large'} color={'#a74e9e'} style={{ marginVertical: 20 }}/>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>{t("login.ENTRAR")}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.button, styles.Button]} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.buttonText}>{t("login.Cadastre-se")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos recriados com base na imagem do emulador
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef6ff', // Fundo lilás bem claro
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  conteiner_loguin: {
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0d1e0'
  },
  texto: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  toggleButton: {
    padding: 10,
  },
  toggleButtonText: {
    color: '#a74e9e',
    fontWeight: '600',
  },
  forgotPasswordText: {
    color: '#a74e9e',
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#a74e9e',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
=======
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={senha}
            value={password}
            onChangeText={setSenha}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity style={{ padding: 20 }} onPress={togglePasswordVisibility}>
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{ color: 'blue', fontSize: 16, alignSelf: 'center', textAlign: 'center' }}>{t("login.forgot_your_password")}</Text>
          </TouchableOpacity>
        <Text style={{ fontSize: 16 }}>{t("login.texto2")}</Text>
        <TouchableOpacity onPress={() => setCheck(!check)} style={{flexDirection:"row", backgroundColor:"#fff",margin:"4%",alignContent:"flex-start"}}>
          {check ? <AntDesign name="checksquare" size={24} color="#e06eaa" /> :
           <AntDesign name="checksquareo" size={24} color="#e06eaa" />}
           <Text> {t("login.Notificações")} </Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size={'large'} color={'#333'} />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>{t("login.ENTRAR")}</Text>
            </TouchableOpacity>
            
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.buttonText}>{t("login.Cadastre-se")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => signInWithGoogle(navigation, check)}>
              <FontAwesomeIcon icon={faGoogle} size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.buttonText}>{t("login.Cadastre-se")}</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
