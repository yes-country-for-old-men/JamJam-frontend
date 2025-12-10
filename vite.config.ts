import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import svgrPlugin from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      proxy: {
        '/api': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: true,
          ws: true,
        },
      },
      ...(command === 'serve' && {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
        },
      }),
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      svgrPlugin(),
      mkcert(),
    ],
    resolve: {
      alias: [
        { find: '@apis', replacement: path.resolve(__dirname, 'src/apis') },
        { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
        { find: '@atoms', replacement: path.resolve(__dirname, 'src/atoms') },
        {
          find: '@components',
          replacement: path.resolve(__dirname, 'src/components'),
        },
        {
          find: '@constants',
          replacement: path.resolve(__dirname, 'src/constants'),
        },
        { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
        { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
        {
          find: '@providers',
          replacement: path.resolve(__dirname, 'src/providers'),
        },
        { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') },
        {
          find: '@schemas',
          replacement: path.resolve(__dirname, 'src/schemas'),
        },
        {
          find: '@services',
          replacement: path.resolve(__dirname, 'src/services'),
        },
        { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
        { find: '@type', replacement: path.resolve(__dirname, 'src/types') },
        { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      ],
    },
  };
});
