const express = require('express');
const app = express();
const path = require("path");
const AtomicKafkaServer = require('atomic-kafka/server')

const port = 3002;


app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, './assets')));
app.get('/', (req, res) => {
  console.log('*** serving root of demo app ( / )');
  res.sendFile(path.resolve(__dirname + '/index.html'))
})

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const atomicKafkaInstance = new AtomicKafkaServer(server);
atomicKafkaInstance.newConsumer('truck-group');
atomicKafkaInstance.socketConsume('truck-group', 'test_topic_2', 'newMessage');

