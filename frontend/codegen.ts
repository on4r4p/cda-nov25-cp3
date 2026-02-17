import type { CodegenConfig } from "@graphql-codegen/cli";

const uri = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

const config: CodegenConfig = {
  overwrite: true,
  schema: uri,
  documents: ["src/**/*.gql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/generated/schema.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        { add: { content: "// @ts-nocheck" } },
      ],
    },
  },
  config: {
    apolloReactCommonImportFrom: "@apollo/client/react",
    apolloReactHooksImportFrom: "@apollo/client/react",
  },
};

export default config;
