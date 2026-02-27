import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client/react";
import type { AppProps } from "next/app";
import Link from "next/link";
import client from "@/graphql/client";

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className="flex min-h-full flex-col">
        <header className="border-b border-base-300 bg-base-100">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="text-2xl font-extrabold tracking-tight">
              Dev Blob
            </Link>

            <form action="/" method="get" className="w-full max-w-sm">
              <label className="sr-only" htmlFor="header-search">
                Rechercher un article
              </label>
              <input
                id="header-search"
                name="title"
                type="search"
                placeholder="Rechercher un article..."
                className="input input-bordered w-full"
              />
            </form>
          </div>
        </header>

        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default App;
