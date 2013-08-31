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

# Run project
```
- npm install
- ./node_modules/nodemon/nodemon.js app.js -e js,css,html
```
