import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client/react";
import type { AppProps } from "next/app";
import HeaderLayout from "@/compoment/header_layout";
import client from "@/graphql/client";

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className="flex min-h-full flex-col">
        <HeaderLayout />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default App;
