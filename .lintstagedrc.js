module.exports = {
  '{src,test}/**/*.ts': [
    (filenames) =>
      filenames.map((filename) => `prettier --write '${filename}'`),
    (filenames) =>
      filenames.length > 10
        ? 'npm run lint'
        : `eslint ${filenames.join(' ')} --fix`,
  ],
};
