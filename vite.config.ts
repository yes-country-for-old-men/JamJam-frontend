import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgrPlugin from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
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
      { find: '@stores', replacement: path.resolve(__dirname, 'src/stores') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@type', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
});
