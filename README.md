ScreenEasy.me
==========

ScreenEasy app

# Config
/tmp/config.json
```
{
  "twitter": {
    "key": "foo",
    "secret": "bar"
  },
  "github": {
    "key":"foo",
    "secret":"bar"
  },
  "db": {
    "dsn":"postgres://user:pass@host:port/schema"
  }
}
```

# Import Schema
```
- node schema.js
```

# Run project
```
- npm install
- ./node_modules/nodemon/nodemon.js app.js -e js,css,html
- You may also need to install postgresql-server-dev package (e.g: sudo apt-get install postgresql-server-dev-9.1)
```

# Deploy
```
- git push heroku master
- heroku addons:add shared-database
- heroku run node schema.js
```
