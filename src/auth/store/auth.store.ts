import { create } from 'zustand'
import type { User } from '../interfaces/auth.interface'
import { login } from '../actions/login.action'


type AuthStatus = 'authenticathed' | 'not-authenticated' | 'checking'

type AuthState = {
  user: User | null,
  token: string | null,
  loading: boolean,
  authStatus: AuthStatus

  login: (email: string, password : string)  => Promise<boolean>,
  logout: () => void;
  
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  authStatus: 'checking',

  login:  async ( email: string, password : string ) =>   {
    try {
        set({ loading: true })
        const data = await  login( email, password);
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token, loading: false })
        return true;
    } catch (error) {        
        set({ user: null, token: null, loading: false,  })
        localStorage.removeItem('token')
        throw error
    }
  },
  logout: () => {
    set({ user: null, token: null, loading: false,  })
    localStorage.removeItem('token');
  }
}))

