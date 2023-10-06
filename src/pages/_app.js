// ** React Imports
import { useEffect } from 'react';
// ** Locale date picker
import { registerLocale, setDefaultLocale } from 'react-datepicker';
// ** Third Party Import
import { Toaster } from 'react-hot-toast';
// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css';

// ** Next Imports
import Head from 'next/head';
import { Router, useRouter } from 'next/router';

// ** Emotion Imports
import { CacheProvider } from '@emotion/react';
// ** React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ja from 'date-fns/locale/ja';
// ** Loader Import
import NProgress from 'nprogress';
// ** Prismjs Styles
import 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-tomorrow.css';

import AclGuard from 'src/@core/components/auth/AclGuard';
import AuthGuard from 'src/@core/components/auth/AuthGuard';
import GuestGuard from 'src/@core/components/auth/GuestGuard';
// ** Spinner Import
import Spinner from 'src/@core/components/spinner';
import {
  SettingsConsumer,
  SettingsProvider
} from 'src/@core/context/settingsContext';
// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast';
import ThemeComponent from 'src/@core/theme/ThemeComponent';
// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache';
// ** Fake-DB Import
import 'src/@fake-db';
// ** Config Imports
import { defaultACLObj } from 'src/configs/acl';
import themeConfig from 'src/configs/themeConfig';
// ** Contexts
import { AuthProvider } from 'src/context/AuthContext';
import 'src/iconify-bundle/icons-bundle-react';
// ** Component Imports
import UserLayout from 'src/layouts/UserLayout';

// ** Global css styles
import '../../styles/globals.css';

// ** Create a react query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};

// ** Configure JSS & ClassName
const App = (props) => {
  const router = useRouter();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false;

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
    ));
  const setConfig = Component.setConfig ?? undefined;
  const authGuard = Component.authGuard ?? true;
  const guestGuard = Component.guestGuard ?? false;
  const aclAbilities = Component.acl ?? defaultACLObj;

  useEffect(() => {
    registerLocale('ja', ja);
    setDefaultLocale('ja');
  }, []);

  useEffect(() => {
    console.log('router.asPath', router.asPath);

    if (router.asPath !== '/') {
      router.push(window.location.pathname);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{themeConfig.templateName}</title>
        <meta name="description" content={themeConfig.templateName} />
        <meta name="keywords" content={themeConfig.templateName} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SettingsProvider
            {...(setConfig ? { pageSettings: setConfig() } : {})}
          >
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <AclGuard
                        aclAbilities={aclAbilities}
                        guestGuard={guestGuard}
                        authGuard={authGuard}
                      >
                        {getLayout(<Component {...pageProps} />)}
                      </AclGuard>
                    </Guard>
                    <ReactHotToast>
                      <Toaster
                        position={settings.toastPosition}
                        toastOptions={{ className: 'react-hot-toast' }}
                      />
                    </ReactHotToast>
                  </ThemeComponent>
                );
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CacheProvider>
  );
};

export default App;
