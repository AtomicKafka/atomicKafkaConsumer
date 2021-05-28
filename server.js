/**
 * This is a typical Node.js server setup, which is used to serve up a demo React app that
 * will be using atomic-kafka to produce data to a Kafka cluster.
 */

const express = require('express');
const app = express();
const path = require("path");

//Require in the server side class of the Atomic Kafka package
const AtomicKafkaServer = require('atomic-kafka/server')

//This port will be used for express and the socket io connection
const port = 3002;


app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//Serving up the styles sheet
app.use('/assets', express.static(path.join(__dirname, './assets')));

app.get('/', (req, res) => {
  console.log('*** serving root of demo app ( / )');
  res.sendFile(path.resolve(__dirname + '/index.html'))
})

//Global 404 handler
app.use('*', (req, res) => {
  return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/**
 * Pass in the server that the Atomic Kafka instance will interact with on the backend
 * as well as the front end. These ports need to match so that the socket on the back 
 * and front end are connected correctly.
 */
const atomicKafkaInstance = new AtomicKafkaServer(server);

//newConsumer generates a kafka consumer instance using the group name passed in by the user
atomicKafkaInstance.newConsumer('truck-group');

//socketConsume selects the consumer based on the group name, subscribes it to a topic,
//and perfoms a socket emission to the event name provided by the user
atomicKafkaInstance.socketConsume('truck-group', 'test_topic', 'newMessage');

