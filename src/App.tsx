import type { AppProps } from 'next/app';
import '../styles/globals.css';
import QueryProvider from './app/pageWrapper';
import 'antd/dist/antd.css';
import { AuthProvider } from './app/modules/auth/hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryProvider>
        <Component {...pageProps} />
      </QueryProvider>
    </AuthProvider>
  );
}

export default MyApp;
