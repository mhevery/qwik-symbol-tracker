import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikReact } from "@builder.io/qwik-react/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getBundleGrouping } from './src/routes/api/v1/[publicApiKey]/bundles/chunks';

export default defineConfig(async () => {
  return {
    plugins: [qwikCity(), qwikVite(
      {
        entryStrategy: {
          type: 'smart',
          manual: await getBundleGrouping('13bfevpuljv.i'),
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

