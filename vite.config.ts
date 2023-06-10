import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
import {getRUBundles} from './src/ru-bundles';

export default defineConfig(async () => {
  return {
    plugins: [qwikCity(), qwikVite(
      {
        entryStrategy: {
          type: 'smart',
          manual: await getRUBundles('.db/__self__/'),
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

