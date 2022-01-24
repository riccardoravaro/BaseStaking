function routes(app, contract, signer) {
  app.get("/stake", async (req, res) => {
    let eventFilter = contract.filters.Staked();
    let events = await contract.queryFilter(eventFilter);
    res.json(events);
  });

  app.get("/unstake", async (req, res) => {
    let eventFilter = contract.filters.unStaked();
    let events = await contract.queryFilter(eventFilter);
    res.json(events);
  });

  app.get("/wallet/:address", async (req, res) => {
    console.log;
    if (req.params.address) {
      const address = req.params.address;
      const signerAddress = await signer.getAddress();
      console.log(signerAddress);
      try {
        const wd = await contract.wallets(address);
        res.json([
          {
            wallet: address,
            "staked-amount": wd.stakedAmount,
            "staking-timestamp": wd.stakingTimestamp,
            "unstaking-timestamp": wd.unstakingTimestamp,
          },
        ]);
      } catch (e) {
        res.status(400).json({ status: "Failed", reason: "wrong input" });
      }
    } else {
      res.status(400).json({ status: "Failed", reason: "wrong input" });
    }
  });
}

module.exports = routes;
