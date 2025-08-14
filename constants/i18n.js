import 'intl-pluralrules'
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import es from "./es.json";
import pt from "./pt.json";
<<<<<<< HEAD
import { Platform, NativeModules } from 'react-native';
// A importação do AsyncStorage não estava sendo usada, então pode ser removida se não for usada para salvar o idioma do usuário.

export const Lresources = {
  en: { translation: en },
  es: { translation: es },
  pt: { translation: pt }
};

// Função getLinguagem mais robusta
const getLinguagem = () => {
  // Tenta obter a string de idioma do dispositivo
  const deviceLanguage = Platform.OS === 'android'
    ? NativeModules.I18nManager.localeIdentifier // Para Android
    : (
        NativeModules.SettingsManager.settings.AppleLocale || // Para iOS (primeira tentativa)
        (NativeModules.SettingsManager.settings.AppleLanguages && NativeModules.SettingsManager.settings.AppleLanguages[0]) // Para iOS (segunda tentativa)
      );

  // 1. Verifica se a string de idioma foi encontrada e é válida antes de processá-la
  if (deviceLanguage && typeof deviceLanguage === 'string') {
    // 2. Extrai a primeira parte do código do idioma (ex: 'pt' de 'pt_BR')
    //    Usa uma expressão regular para separar por '_' ou '-'
    const languageCode = deviceLanguage.split(/[-_]/)[0];
    
    // 3. Verifica se o idioma extraído é um dos que temos suporte
    if (['en', 'pt', 'es'].includes(languageCode)) {
      return languageCode;
    }
  }
  
  // 4. Se nada for encontrado ou o idioma não for suportado, retorna um padrão seguro.
  return 'pt'; 
};
=======
import { Platform,NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

 export const Lresources = {
    en: { translation: en },
    es: { translation: es },
    pt: { translation: pt }
  };

  const getLinguagem = () => {
    // Se não houver idioma salvo, obtém o idioma do dispositivo
    const linguagemCompleta = Platform.OS == "android" ? NativeModules.I18nManager.localeIdentifier : NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0];
    const primeiraSilaba = linguagemCompleta.split('_')[0]; // Extrai a primeira parte da linguagem
    return ['en', 'pt', 'es'].includes(primeiraSilaba) ? primeiraSilaba : 'en'; // Define a linguagem como 'en' se não for 'pt', 'es' ou 'en'
  };

 
  
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d

i18next
  .use(initReactI18next) // inicializa o react-i18next
  .init({
<<<<<<< HEAD
    compatibilityJSON: 'v3', // Corrigido de 'compatibilityJson' para 'compatibilityJSON'
=======
    compatibilityJson: 'v3',
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
    resources: Lresources,
    lng: getLinguagem(), // idioma padrão
    fallbackLng: 'pt', // idioma de fallback
    debug: true, // habilita logs para debug
    interpolation: {
      escapeValue: false // evita a necessidade de escapar strings traduzidas
    }
  });

<<<<<<< HEAD
export default i18next;
=======
export default i18next;
>>>>>>> 36538e8c46eb20a50b6ad5d48a2777b622ff4a2d
