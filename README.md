# AtomicKafkaConsumer
## Getting Started: 

<br>

AtomicKafkaProducer is a demo-consumer-app for people who want to see how [AtomicKafka](https://github.com/oslabs-beta/AtomicKafka) can be integrated into a front-end app as a consumer. There is also a [demo-producer-app](https://github.com/AtomicKafka/atomicKafkaProducer) to be paired with this demo-consumer-app. To download AtomicKafka npm package, please [click here](https://github.com/oslabs-beta/AtomicKafka). To download the demo-producer-app, please [click here](https://github.com/AtomicKafka/atomicKafkaProducer). 


<br>

----

<br>

### 1. Install your dependencies: 

<br>

```
npm install
```

<br>

### 2. Connect to Kafka Cluster:

<br>

Establish your server connection first. In server.js, set up your port (default port is 3002).

<br>

```
const express = require('express');
const app = express();
const path = require("path");
const AtomicKafkaServer = require('atomic-kafka/server')

const port = 3002;
```

<br>

If you decide to use a different port number, be sure to modify Producer.tsx to establish a proper connection with the Kafka cluster (default port is 3002). 

<br>

```
const akc = new AtomicKafkaClient('http://localhost:3002')
```

<br>

### 3. data format ###

<br>

The app is set up to handle data in the following format: 
- id (unique id of the products)
- SKU (name of the products)
- qty (quantity of the products)

<br>

### 4.  ###

- Import React, useState, useEffect from "react" 

