module.exports = {
  apps: [
    {
      name: 'express',
      cwd: './backend',
      script: 'server.js',
      interpreter: 'node',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
    {
      name: 'chatbot',
      cwd: './chatbot',
      script: 'app.py',
      interpreter: 'python',
      watch: false,
      env: {
        FLASK_ENV: 'production',
      },
    },
  ],
};
