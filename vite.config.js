import { defineConfig } from 'vite';

// GitHub Pages のサブディレクトリでも、生成したアセットを相対参照する。
export default defineConfig({ base: './' });
