import "@/styles/globals.css";
import { Outfit } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux"; // ✅ import
import { store } from "@/lib/redux/store"; // ✅ your store path
import { Toaster } from 'sonner';
const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <main className={outfit.variable}>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Component {...pageProps} />
          <Toaster position="bottom-right" richColors />  
        </Provider>
      </SessionProvider>
    </main>
  );
}