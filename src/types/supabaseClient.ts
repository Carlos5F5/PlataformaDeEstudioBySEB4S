import { createClient } from '@supabase/supabase-js';

// Cargar desde variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Verificar conexión
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('writeups').select('count', { count: 'exact' });
    if (error) {
      console.error('Error de conexión a Supabase:', error);
      return false;
    }
    console.log('Conexión exitosa a Supabase. Registros en writeups:', data);
    return true;
  } catch (err) {
    console.error('Error al conectar con Supabase:', err);
    return false;
  }
};
