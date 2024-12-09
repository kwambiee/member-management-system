import Image from "next/image";
import { AuthProvider } from "@/context"; 
import type { AppProps } from "next/app";

export default function Home({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
