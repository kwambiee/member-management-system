import { AuthProvider } from "@/context"; // Update the path if necessary
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
  
      <Component {...pageProps} />
    
  );
}