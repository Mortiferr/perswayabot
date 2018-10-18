module.exports = {
  apps: [{
    name: 'Perswayabot',
    script: 'index.js',
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production: {
      user: 'root',
      host: '159.65.184.19',
      ref: 'origin/master',
      repo: 'https://gitlab.com/Mortiferr/perswayable-bot.git',
      path: '/home/perswayabot',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}