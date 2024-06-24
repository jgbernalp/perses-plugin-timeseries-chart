import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  server: {
    port: 3005,
  },
  dev: {
    assetPrefix: '/plugins-dev/TimeSeriesChart/',
  },
  output: {
    assetPrefix: '/plugins/TimeSeriesChart/',
  },
  plugins: [pluginReact()],
  tools: {
    htmlPlugin: false,
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'TimeSeriesChart';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'TimeSeriesChart',
          exposes: {
            './Chart': './src/Chart.tsx',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
            echarts: { singleton: true },
            'date-fns': { singleton: true },
            'date-fns-tz': { singleton: true },
            lodash: { singleton: true },
            '@perses-dev/components': { singleton: true },
            '@perses-dev/plugin-system': { singleton: true },
            '@emotion/react': { singleton: true },
            '@emotion/styled': { singleton: true },
            '@hookform/resolvers': { singleton: true },
            'use-resize-observer': { singleton: true },
            'mdi-material-ui/Refresh': { singleton: true },
          },
          dts: false,
          runtime: false,
        }),
      ]);
    },
  },
});
