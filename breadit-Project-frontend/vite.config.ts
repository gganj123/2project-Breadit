import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  build: {
    chunkSizeWarningLimit: 1000000000,
  },
});

// aws는 정해져있어서 어떻게 저장이 될지 미리 알 수있음
