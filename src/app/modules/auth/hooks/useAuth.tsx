'use client';

import { useMutation } from 'react-query';
import React, { createContext, useContext, useState } from 'react';
import securedStorage from 'react-secure-storage';
import axios from '@/utils/axios';

/**
 * @description AuthProvider provides the session,signUp,signIn and signOut.
 * The session holds the user objects (example username, email, phone etc).
 * The signUp accepts a user and a callback to return the authentication status.
 *
 */

type callbackArgs = { status: string; message: string; data?: any };

type contextValues = {
  session: any;
  setSession: React.Dispatch<any>;
  signUp: (
    user: any,
    callBack: ({ status, message }: callbackArgs) => void,
  ) => void;
  signOut: any;
  signOutAux: (
    user: any,
    callBack: ({ status, message }: callbackArgs) => void,
  ) => void;
  signIn: (
    user: any,
    callBack: ({ status, message }: callbackArgs) => void,
  ) => void;
  SendCode: (
    user: any,
    callBack: ({ status, message }: callbackArgs) => void,
  ) => void;
  loggingOut: boolean;
  setLoggingOut: React.Dispatch<any>;
  resetPassword: (
    userData: any,
    callBack: ({ status, message }: callbackArgs) => void,
  ) => void;
};

const defaultContextValues: contextValues = {
  session: {},
  setSession: () => {},
  signUp: () => {},
  signOut: () => {},
  signOutAux: () => {},
  signIn: () => {},
  SendCode: () => {},
  loggingOut: false,
  setLoggingOut: () => {},
  resetPassword: () => {},
};

const AppContext = createContext<contextValues>(defaultContextValues);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const initSession = securedStorage.getItem('jwt_token') || {};
  const [session, setSession] = useState(initSession);
  const [loggingOut, setLoggingOut] = useState(false);

  const mutationSignup = useMutation((userData) =>
    axios({ url: '/register', method: 'POST', data: userData }),
  );

  const mutationSignout = useMutation((signoutBody) =>
    axios({ url: '/logout', method: 'POST', data: signoutBody }),
  );

  const mutationSignIn = useMutation((user) =>
    axios({
      url: '/login',
      method: 'POST',
      data: user,
    }),
  );

  const mutationVerifyOTP = useMutation((user) =>
    axios({
      url: `/verify_otp`,
      method: 'POST',
      data: user,
    }),
  );

  const mutationResetPassword = useMutation((userData) =>
    axios({ url: `/forgot_password`, method: 'POST', data: userData }),
  );

  const signUp = (
    user: any,
    callBack: ({ status, message }: callbackArgs) => void,
  ) =>
    mutationSignup.mutate(user, {
      onSuccess: (data: any) => {
        setSession(data.data);
        callBack({ status: 'success', message: data.message });
      },
      onError: (err: any) => {
        callBack({
          status: 'error',
          message: err?.response?.data?.message ?? err.message,
        });
      },
    });

  const signOut = (user: any, callBack: any) => {
    setLoggingOut(true);
    mutationSignout.mutate(user, {
      onSuccess: (data: any) => {
        callBack({
          status: 'success',
          message: 'Login successful',
          data: data,
        });
      },
      onError: (err: any) => {
        callBack({
          status: 'error',
          message: err?.response?.data?.message ?? err?.message,
        });
      },
    });
  };

  const signOutAux = (
    user: any,
    callBack: ({ status, message }: callbackArgs) => void,
  ) => {
    mutationSignout.mutate(user, {
      onSuccess: (data: any) => {
        callBack({ status: 'success', message: data.message });
      },
      onError: (err: any) => {
        callBack({
          status: 'error',
          message: err?.response?.data?.message ?? err?.message,
        });
      },
    });
  };

  const signIn = (
    user: any,
    callBack: ({ status, message }: callbackArgs) => void,
  ) =>
    mutationSignIn.mutate(user, {
      onSuccess: (data: any) => {
        const token = data?.data?.JWT_token;
        if (token) {
          setSession(data?.data);
          callBack({
            status: 'success',
            message: 'Login successful',
            data: data,
          });
        } else {
          callBack({ status: 'error', message: 'Token not found in response' });
        }
      },
      onError: (err: any) => {
        callBack({
          status: 'error',
          message: err?.response?.data?.message ?? err?.message,
        });
      },
    });

  const SendCode = (
    email: any,
    callBack: ({ status, message }: callbackArgs) => void,
  ) =>
    mutationVerifyOTP.mutate(email, {
      onSuccess: (data: any) => {
        callBack({ status: 'success', message: data.data.message });
      },
      onError: (err: any) => {
        callBack({
          status: 'error',
          message: err?.response?.data?.message ?? err?.message,
        });
      },
    });

  const resetPassword = (
    userData: any,
    callBack: ({ status, message }: callbackArgs) => void,
  ) =>
    mutationResetPassword.mutate(userData, {
      onSuccess: (data: any) => {
        callBack({ status: 'success', message: data.data.message });
      },
      onError: (err: any) => {
        callBack({
          status: 'error',
          message: err?.response?.data?.message ?? err?.message,
        });
      },
    });

  const value: contextValues = {
    session,
    setSession,
    signUp,
    signOut,
    signOutAux,
    signIn,
    SendCode,
    loggingOut,
    setLoggingOut,
    resetPassword,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const useAuth = () => {
  const context = useContext<contextValues>(AppContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
