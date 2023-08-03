module.exports = {
  '*.{ts,tsx}': [() => 'tsc --skipLibCheck --noEmit --incremental', 'eslint --cache --fix', 'prettier --write'],
  '*.js': ['eslint --cache --fix', 'prettier --write'],
  '*.{css,md}': 'prettier --write',
};
