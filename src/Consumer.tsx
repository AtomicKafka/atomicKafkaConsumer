/**
 * Consumer.tsx renders a functional component that uses Atomic Kafka to open a websocket
 * that will listen for any consumed messages emitted from the Kafka cluster.
 */

import React, { useState, useEffect , useRef } from "react";

//Typescript declaration for the javascript require function
declare function require(name:string)
//Require the client class of the Atomic Kafka package
const AtomicKafkaClient = require('atomic-kafka/client').default

//Inventory interface for the sku object
interface Inventory {
  [SKU: string]: number
}


//Example inventory provided for demonstrative purposes
const inventory: Inventory = {
  apples: 3000,
  oranges: 1700,
  truffles: 200,
  tomatoes: 9000,
  ramps: 2400,
}

//Functional Consumer component that will receive socket emissions of Kafka messages from
//the server side consumer instantiation
function Consumer() {
  const [inv, setInv] = useState(inventory);
  const [sku, setSku] = useState({});

  //Instantiation of the client class using the server that was also used to instantiate
  //the server class
  const akc = new AtomicKafkaClient("http://localhost:3002");


  /**
   * 
   * @param {JSON Object} arg: The function cb is a callback that will be used to update
   * state of this functional component. This should be adjusted to whatever usecase is
   * for state management of this or any consumer component.
   */
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

  /**
   * useInterval takes an anonymous function that will invoke the consumer function of the
   * Atomic Kafka Client class and the user defined time at which to invoke the consumer function. 
   * The consumer function will open up a socket to listen for any messages that can be consumed
   * on the specific event name provided. This event name should match what is emited from the server consumer.
   */

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