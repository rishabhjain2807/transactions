const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/txs", async (req, res) => {

    try {
        const { query } = req;

        const balance = await Moralis.EvmApi.transaction.getWalletTransactionsVerbose({
            address: query.address,
            chain: query.chain,
        });

        const result = balance.raw;

        return res.status(200).json({ result });
    } catch (e) {
        console.log(e);
        console.log("something went wrong");
        return res.status(400).json();
    }
});

Moralis.start({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjgxOTJiODJiLTE0MzAtNDYwZi05Zjc3LTU4MWUwYzE1NDYyNyIsIm9yZ0lkIjoiMzE0MTg1IiwidXNlcklkIjoiMzIzMDQ4IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiI3NTU1YWVkMy04OTgzLTRiMDAtODQ1Ni1lNTZlMDgwYWIzZWUiLCJpYXQiOjE2ODU0NTQ4MjIsImV4cCI6NDg0MTIxNDgyMn0.1o2I4aaZEowUTyB-t6TEep-NUHdTJMjH13FRvIpAp4s",
}).then(() => {
    app.listen(port, () => {
        console.log(`Listening for API Calls`);
    });
});