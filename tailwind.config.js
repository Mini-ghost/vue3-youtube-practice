module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './src/**/*.vue'
  ],
  theme: {
    extend: {
      inset: {
        '1': '0.25rem'
      },
      padding: {
        '16:9': '56.25%'
      }
    },
  },
  variants: {},
  plugins: [],
}
