import { build } from 'esbuild';

build({
  entryPoints: ['index.ts'],
  outdir: 'dist',
  bundle: true,
  minify: true,
  format: 'esm',
});

build({
  entryPoints: ['worker.ts'],
  outdir: 'dist',
  bundle: true,
  minify: true,
  format: 'esm',
});
