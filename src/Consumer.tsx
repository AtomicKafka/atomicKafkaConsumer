import React, { useState, useEffect , useRef } from "react";
import io from "socket.io-client";
declare function require(name:string)
const AtomicKafkaClient = require('atomic-kafka/client').default

// const socket = io("http://localhost:3001");

interface Inventory {
  [SKU: string]: number
}

const inventory: Inventory = {
  apples: 3000,
  oranges: 1700,
  truffles: 200,
  tequila: 9000,
  ethereum: 2400,
}


function Consumer() {
  const [inv, setInv] = useState(inventory);
  const [sku, setSku] = useState({});

  const akc = new AtomicKafkaClient("http://localhost:3002");

  const cb = (arg) => {
    let dupe = false;
    const latest = JSON.parse(arg);

    if (latest.id === undefined) {
      latest.id = "gen" + this.genId;
      this.genId++;
    }

    if (Object.keys(sku).length > 0) {
      if (latest.id in sku) dupe = true;
    }

    if (!dupe) {
      const newState = { ...sku };
      newState[latest.id] = latest;
      setSku(newState);
    }

    if (inv && !dupe) {
      const newInv = { ...inv };
      newInv[latest.SKU] -= latest.qty;
      setInv(newInv);
    }
  }

  akc.useInterval(() => akc.consumer('newMessage', cb), 4000);


  function restock(sku) {
    console.log('restocking for sku: ', sku);
    const newInv = {...inv};
    newInv[sku] += 100;
    setInv(newInv);
  }

  return (
    <div>
      <div className='inv-container'>
        {Object.keys(inv).map((key, idx) => {
          return (
            <li className='inv-li' key={idx}>
            <div className='inv-sku'>{`${key}`}</div>
            <div className='inv-qty'>{`${inv[key]}`}</div>
            {/* {`${key}: ${inv[key]}`} */}
            <button onClick={() => restock(key)}>Restock</button>
            </li>
          )
        })}
      </div>
      <h1>New Sales (Streaming Data)</h1>
      <div className='sales-container'>
        {Object.keys(sku).map((num, idx) => {
          let _id = sku[num].id;
          let _sku = sku[num].SKU;
          let _qty = sku[num].qty;
          if (sku[num] !== undefined) {
            return (
              <li className='sales-li' key={idx}>
                <span className='order'><b>ID:</b> {_id} | <b>SKU:</b> {_sku} | <b>QTY:</b> {_qty}</span>
              </li>
            )
          }
        })}
      </div>
    </div>
  );
}

export default Consumer;