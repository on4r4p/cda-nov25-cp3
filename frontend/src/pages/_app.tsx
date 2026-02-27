import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client/react";
import type { AppProps } from "next/app";
import HeaderLayout from "@/compoment/header_layout";
import client from "@/graphql/client";

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only absolute left-2 top-2 z-50 rounded bg-base-100 px-3 py-2 text-base-content shadow focus:not-sr-only focus:outline-2 focus:outline-offset-2 focus:outline-base-content"
        >
          Skip to main content
        </a>
        <HeaderLayout />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default App;
