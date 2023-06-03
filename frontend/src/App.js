import React, { useState } from "react";
import axios from "axios";
import "./App.css";


function App() {
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("0x1");
  const [txs, setTxs] = useState(null);

  async function fetchTxs() {
    let res = await axios.get(`http://localhost:3000/txs`, {
      params: { address: address, chain: chain },
    });

    console.log(res);

    setTxs(res.data.result);
  }

  function addressChange(e) {
    setAddress(e.target.value);
    setTxs(null);
  }

  function chainChange(e) {
    setChain(e.target.value);
    setTxs(null);
  }

  return (
    <>

      <div className="App">
        <div style={{ fontSize: "23px", fontWeight: "700" }}>
          Get Wallet Transactions
        </div>
        <button className="bu" onClick={fetchTxs}>
          Get Txs
        </button>
        <div className="inputs">
          <div style={{ display: "flex" }}>
            <div style={{ width: "80px" }}>Wallet:</div>

            {/****  WALLET INPUT ****/}
            <input
              className="input"
              value={address}
              onChange={(e) => addressChange(e)}
            ></input>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "80px" }}>Chain:</div>

            {/**** CHAIN SELECTION ****/}
            <select className="input" onChange={(e) => chainChange(e)}>
              <option value="0x1">Ethereum</option>

            </select>
          </div>
        </div>

        {/**** Results ****/}

        {txs && (
          <div className="results">
            {txs.result?.map((e, i) => {
              return (

                <a href={`https://etherscan.io/tx/${e.hash}`} key={i} className="tx" target="_blank">
                  <div> Time {e.block_timestamp.slice(0, 10)}</div>
                  <div style={{ color: 'yellow' }}>
                    {e.decoded_call === null ? " " : e.decoded_call.label.toUpperCase()}
                  </div>
                  {e.from_address.toLowerCase() === address.toLowerCase() ?
                    <div style={{ color: 'red' }}> Send - {(e.value / 1E18).toFixed(2)} ETH  </div> :
                    <div style={{ color: 'green' }}> Receive + {(e.value / 1E18).toFixed(2)} ETH  </div>
                  }
                  <div> gas used {((e.gas_price * e.receipt_gas_used) / 1E18).toFixed(6)} ETH</div>
                  <div> interacted contract address : {e.to_address.toLowerCase()} </div>

                </a>
              )
            })}
          </div>
        )}
      </div >
    </>
  );
}

export default App;
