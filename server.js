const express = require('express');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression()); // Compress responses

// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// Set security headers
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com; img-src 'self' https://*.stripe.com https://*.googleapis.com data:; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-src https://*.stripe.com; object-src 'none'");
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// For any request that doesn't match a static file, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
