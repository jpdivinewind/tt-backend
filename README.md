# tt-backend

time spent: ~2:40

### ENV:
```
LOG_LEVEL -- default: debug
MONGO_URL -- default: mongodb://127.0.0.1:27017/tt-backend
PORT -- default: 3000
CORS_ORIGIN -- cors origin
JOB_UPDATE_EXCHANGE_RATES_RULE -- in cron format, default: * /2 * * * *
COINMARKETCAP_API_KEY -- coinmarketcap.com api key
CRYPTOCOMPARE_API_KEY -- cryptocompare.com api key
NPM_TOKEN -- your npm token
```

### Do you want to run locally?
* install ```docker``` and ```docker-compose```
* create an ```.env``` file and put the following lines in it:
```
PORT=3000 # or whatever
MONGO_URL=mongodb://mongo:27017/tt-backend
COINMARKETCAP_API_KEY=$YOUR_KEY # get it from coinmarketcap.com
CRYPTOCOMPARE_API_KEY=$YOUR_KEY # get it from cryptocompare.com
```
* run ```docker-compose up``` in the project directory
* now server is available at ```localhost:$PORT```
