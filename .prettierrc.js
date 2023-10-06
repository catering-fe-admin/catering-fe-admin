module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  importOrder: [
    '^react',
    '^react(/.*|$)',
    '^next',
    '^next(/.*|$)',
    '<THIRD_PARTY_MODULES>',
    '^(src)(/.*|$)',
    '^(components)(/.*|$)',
    '^(@mui)(/.*|$)',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};
