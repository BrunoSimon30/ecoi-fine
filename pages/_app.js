import "@/styles/globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
    <main className={outfit.variable}>
    <Component {...pageProps} />
    </main>
    
    </>
  )
  
}
