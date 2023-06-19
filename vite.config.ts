import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikReact } from "@builder.io/qwik-react/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getBundleGrouping } from './src/routes/api/v1/[publicApiKey]/bundles/chunks';
import {connectRemoteLibsSqlDB} from './src/db/remote-libsql';

export default defineConfig(async () => {
  return {
    plugins: [qwikCity(), qwikVite(
      {
        entryStrategy: {
          type: 'smart',
          manual: await getBundleGrouping({
            publicApiKey: '13bfevpuljv.i',
            db: await connectRemoteLibsSqlDB({ 
            url: loadEnv('', process.cwd(),'').PRIVATE_LIBSQL_DB_URL, 
            authToken: loadEnv('', process.cwd(),'').PRIVATE_LIBSQL_DB_API_TOKEN
          })}),
        },
      }
    ), tsconfigPaths(), qwikReact()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});

