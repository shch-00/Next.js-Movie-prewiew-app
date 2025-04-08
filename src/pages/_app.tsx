import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { store } from "@/src/store/store";
import { Provider } from "react-redux";
import { AuthModalProvider } from "@/src/contexts/AuthModalContext";
import { ModalProvider } from "@/src/contexts/ModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import "@/src/styles/global.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 60,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ModalProvider>
      <AuthModalProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Head>
              <link rel="icon" type="image/svg+xml" href="/logo.svg" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
            <Header />
            <motion.main className="page-content">
              <div className="container">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={router.asPath}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="app"
                  >
                    <Component {...pageProps} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.main>
            <Footer />
          </QueryClientProvider>
        </Provider>
      </AuthModalProvider>{" "}
    </ModalProvider>
  );
}
