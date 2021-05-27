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

function useInterval(callback, delay) {
  const savedCallback = useRef(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback?.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Consumer() {
  const [inv, setInv] = useState(inventory);
  const [sku, setSku] = useState({});
  const akc = new AtomicKafkaClient("http://localhost:3001");

  const cb = (arg) => {
    console.log("new data: ", arg);
    // console.log("data type: ", typeof arg);
    console.log("new truck state: ", sku);
    // if(arg.SKU === state[state.length - 1].SKU) return;
    let dupe = false;
    const latest = JSON.parse(arg);
    if (latest.id === undefined) {
      latest.id = "gen" + this.genId;
      this.genId++;
    }
    if (Object.keys(sku).length > 0) {
      // if (state[state.length - 1].SKU === latest.SKU && state[state.length - 1].qty === latest.qty) dupe = true;
      if (latest.id in sku) dupe = true;
    }
    if (!dupe) {
      const newState = { ...sku };
      newState[latest.id] = latest;
      setSku(newState);
    }
    //  setState([...state, latest]);

    if (inv && !dupe) {
      const newInv = { ...inv };
      // const latest = JSON.parse(arg);
      newInv[latest.SKU] -= latest.qty;
      setInv(newInv);
    }
  }

  useInterval(() => akc.consumer('newMessage', cb), 4000);
  // useInterval(() => {
  //   if (sku.length > 0) {
  //     const newInv = {...inv};
  //     const latest = JSON.parse(sku[sku.length - 1]);
  //     console.log('sku latest: ', latest);
  //     // const newInv = inv[latest.SKU] - latest.qty;

  //     newInv[latest.SKU] -= latest.qty;

  //     // const skuUpdate = latest.SKU;
  //     // const newInv = {
  //     //   ...inv,
  //     //   skuUpdate : inv[latest.SKU] - latest.qty,
  //     // }
  //     return setInv(newInv);
  //   }
  // }, 4000)

  // function displayInventory () {
  //   let output = [];
  //   for (const sku in inv) {
  //     output.push(<li key={sku}>{`${sku}: ${inv[sku]}`}</li>);
  //   }
  //   return output;
  // }
  // const dispInv = displayInventory();

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