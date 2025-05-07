import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert, Image } from 'react-native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Importando ícones

const PasswordResetScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false); // Controle de visibilidade para a nova senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Controle de visibilidade para a confirmação de senha
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert(t('password_reset.passwords_do_not_match'));
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(`https://textocontexto.pythonanywhere.com/api/forgot/${code}`, {
        new_password: newPassword,
        confirm_password: confirmPassword,
        language: i18n.language
      }, { headers: { 'Content-Type': 'application/json' } });
      Alert.alert(t('password_reset.success'));
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert(t('password_reset.error'));
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/icone.png")} style={styles.image} />
      <View style={styles.container2}>
        <Text style={styles.title}>{t('password_reset.title')}</Text>

        <TextInput
          style={styles.input2}
          placeholder={t('password_reset.code')}
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('password_reset.new_password')}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword} // Alterna visibilidade da senha
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowNewPassword(!showNewPassword)}>
            <FontAwesomeIcon
              icon={showNewPassword ? faEye : faEyeSlash}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('password_reset.confirm_password')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword} // Alterna visibilidade da confirmação de senha
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEye : faEyeSlash}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>{t('password_reset.submit')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fef6ff',
  },
  container2: {
    padding: 25,
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor:"#e06eaa",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#e06eaa',
    borderRadius: 5,
    marginBottom: 10,
    width:"90%"
  },
  input2: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#e06eaa',
    borderRadius: 5,
    marginBottom: 10,
    width:"100%"
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#e06eaa',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  image: {
    width: 130,
    height: 150,
    margin: '5%',
  },
});

export default PasswordResetScreen;