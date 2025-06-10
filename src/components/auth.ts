// src/auth.ts
import { supabase } from './supabase'

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) {
    console.error('Signup error:', error.message)
  } else {
    console.log('User signed up:', data)
  }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    console.error('Login error:', error.message)
  } else {
    console.log('User signed in:', data)
  }
}
