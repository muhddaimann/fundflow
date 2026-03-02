import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToken } from './tokenContext';

type AuthContextType = {
  user: string | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken, saveToken, deleteToken } = useToken();

  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedUser = await getToken();
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (e) {
        console.error('Failed to load session', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  const signIn = async (username: string, password: string) => {
    if (username === 'user' && password === '123') {
      try {
        await saveToken(username);
        setUser(username);
        return true;
      } catch (e) {
        console.error('Failed to save session', e);
        return false;
      }
    }
    return false;
  };

  const signOut = async () => {
    try {
      await deleteToken();
      setUser(null);
    } catch (e) {
      console.error('Failed to delete session', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
