// supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Reemplaza con tu URL de proyecto de Supabase
const supabaseUrl = 'https://edjsuhmsgfzffhssypie.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkanN1aG1zZ2Z6ZmZoc3N5cGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNzAwMTMsImV4cCI6MjA2NTg0NjAxM30.XHdoxrm6UhECMivE5zAgoHJYUBNCgaOFbaGV1XfdjJY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Verificar conexión
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('writeups').select('count', { count: 'exact' })
    if (error) {
      console.error('Error de conexión a Supabase:', error)
      return false
    }
    console.log('Conexión exitosa a Supabase. Registros en writeups:', data)
    return true
  } catch (err) {
    console.error('Error al conectar con Supabase:', err)
    return false
  }
}