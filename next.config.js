// Import i18n configuration for internationalization
const { i18n } = require("./next-i18next.config");

/**
 * Next.js configuration file
 * Contains settings for internationalization and API routing
 */
module.exports = {
  // Enable internationalization with configured settings
  i18n,
  
  // Configure API route rewrites
  async rewrites() {
    return [
      {
        // Rewrite API requests to the PHP backend
        source: "/api/:path*",
        destination: "http://localhost/ProyectoFinal/final-project/pages/api/:path*",
      },
    ];
  },
};
