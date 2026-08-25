import { create } from 'zustand'
import type { User } from '../interfaces/auth.interface'
import { login } from '../actions/login.action'
import { checkAuth } from '../actions/check-auth.action'
import { register } from '../actions/register.action'


type AuthStatus = 'authenticathed' | 'not-authenticated' | 'checking'

type AuthState = {
  //Properties
  user: User | null,
  token: string | null,
  loading: boolean,
  authStatus: AuthStatus,

  //Getters
  isAdmin: () => boolean,

  // Actions
  login: (email: string, password : string)  => Promise<boolean>,
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>
  register: (name: string, email: string, password : string)  => Promise<boolean>,
  
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  authStatus: 'checking',

  isAdmin() {
    const roles = get().user?.roles ?? [];
    return roles.includes('admin')
  },

  login:  async ( email: string, password : string ) =>   {
    try {
        set({ loading: true })
        const data = await  login( email, password);
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token, loading: false, authStatus: 'authenticathed' })
        return true;
    } catch (error) {        
        set({ user: null, token: null, loading: false, authStatus: 'not-authenticated'  })
        localStorage.removeItem('token')
        throw error
    }
  },

  logout: () => {
    set({ user: null, token: null, loading: false, authStatus: 'not-authenticated'  })
    localStorage.removeItem('token');
  },
  checkAuthStatus: async() => {
    try {
        const { user, token }  = await checkAuth();
        localStorage.setItem('token', token);
        set({ 
          user: user, 
          token: token, 
          authStatus: 'authenticathed' })
        return true;
    } catch (error) {
      set({ 
        user: undefined, 
        token: undefined,  
        authStatus: 'not-authenticated' 
      })

      throw error;
    }
  },

  register:  async ( fullName: string, email: string, password : string ) =>   {
    try {
        set({ loading: true })
        const data = await  register(fullName, email, password);
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token, loading: false, authStatus: 'authenticathed' })
        return true;
    } catch (error) {        
        set({ user: null, token: null, loading: false, authStatus: 'not-authenticated'  })
        localStorage.removeItem('token')
        throw error
    }
  },
}))

