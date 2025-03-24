import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Acceder a las variables de entorno de forma segura
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || 
                   process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || 
                        process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validar que las credenciales estén disponibles
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

// Crear y exportar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funciones de utilidad para manejo de errores
export const handleApiError = (error: any, customMessage = 'Error en la operación') => {
  console.error(`${customMessage}:`, error);
  return {
    error: true,
    message: error?.message || customMessage,
    details: error?.details || null
  };
};