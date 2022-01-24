# BaseStaking
Simple staking contract


In a new terminal window run 

```
hardhat node
```

In a new terminal window
contract setup and deploy

```
cd  contracts
npm install
hardhat run contracts/scripts/deploy.js  --network localhost
```

Copy BaseStaking contract address from the console
paste BasicStakeAddress in api/server.js line 10
run the API server :

```
cd ../api 
npm install
npm run start
```

### stake events url 
http://localhost:8082/stake


### unStake events url 
http://localhost:8082/unstake


### wallet details url 
http://localhost:8082/wallet/:walletAddress