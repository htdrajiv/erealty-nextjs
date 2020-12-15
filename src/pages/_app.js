import '../../styles/globals.css';
import '../../styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SecureRoute from '../components/SecureRoute';
import Layout from '../components/Layout';
import { Provider as ReduxProvider } from 'react-redux';
import Store from '../redux/Store';
import { CookiesProvider } from 'react-cookie';
import { Provider as NextAuthProvider } from 'next-auth/client'


function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <ReduxProvider store={Store}>
        <NextAuthProvider session={pageProps.session}>
          <SecureRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SecureRoute>
        </NextAuthProvider>
      </ReduxProvider>
    </CookiesProvider >

  )
}
export default MyApp;