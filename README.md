![AtomicKafka_MastHead](./assets/logo_rect.png)

---

<p align="center">AtomicKafka is a lightweight <a href="https://github.com/oslabs-beta/AtomicKafka"> NPM Package </a> developed to simplify the process of establishing bidirectional, real-time data streaming with Apache Kafka in your web-app.
<br>
<a href="http://www.atomickafka.com/">Website</a><span> &nbsp; | &nbsp;</span><a href="https://github.com/oslabs-beta/AtomicKafka">Library</a><span> &nbsp; | &nbsp;</span><a href="https://github.com/AtomicKafka">Demo Apps</a><span> &nbsp; | &nbsp;</span><a href="https://medium.com/@dbehmoaras/2eb79b20eaae?source=friends_link&sk=843b83b81eb79f37f0d2b8a96ce26212">Featured on Medium</a></p>


<p align="center">

  <a href="https://www.npmjs.com/package/atomic-kafka">
    <img alt="npm" src="https://img.shields.io/npm/v/atomic-kafka?color=%2366FCF1&style=for-the-badge">
  </a>
  <a href="https://github.com/oslabs-beta/atomickafka/graphs/contributors">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/oslabs-beta/atomickafka?color=%2366FCF1&style=for-the-badge">
  </a>
  <a href="https://github.com/oslabs-beta/AtomicKafka/stargazers">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/AtomicKafka?color=%fFCF1&style=for-the-badge">
  </a>
  <a href="https://github.com/oslabs-beta/atomickafka/blob/main/LICENSE">
    <img alt="Last Commit" src="https://img.shields.io/github/last-commit/oslabs-beta/AtomicKafka?color=%2366FCF1&style=for-the-badge">
  </a>
  <a href="https://github.com/oslabs-beta/atomickafka/blob/main/LICENSE">
    <img alt="NPM" src="https://img.shields.io/npm/l/atomic-kafka?color=%2366FCF1&style=for-the-badge">
  </a>
</p>


# **AtomicKafkaConsumer**

**AtomicKafkaConsumer** demonstrates a functioning standalone Consumer microservice built into a React Component. This demo app was built to be used alongside [AtomicKafkaProducer](https://github.com/AtomicKafka/atomicKafkaProducer).

If you are running the corresponding [Producer](https://github.com/AtomicKafka/atomicKafkaProducer), the Consumer will listen to the data that you produce from your producer app in real time. Try it with your colleagues by setting up a free [Confluent Cloud](https://www.confluent.io/confluent-cloud/) and sharing the ***API credentials*** with each to see how AtomicKafka integrates with the cloud!



---


## **Getting Started**

### **1.** Set up your Kafka service

**Docker:**
  - If using Docker, use the [.yml](https://github.com/AtomicKafka/atomicKafkaConsumer/blob/main/docker-compose.yml) file provided herein and run in the root directory of this app.

    ```sh
    docker-compose up -d
    ```
**Confluent Cloud:**
  - Follow the steps on [Confluent Cloud](https://www.confluent.io/confluent-cloud/) to create a free account. Obtain the ***API_ACCESS_KEY***, ***API_ACCESS_SECRET***, and ***BOOTSTRAP_SERVER***.
  - Note that if you already have a Kafka instance running from a docker image (e.g. from the Producer demo), you do not need to compose again.
---
### **2.** Configure .env file
- Default ports are configured on the local host for the dev-server **9002** and the Kafka broker **3002**.
- Docker .env config: (**_API_KEY_** and **_API_SECRET_** are intentionally left blank).
  ```js
  API_KEY=
  API_SECRET=
  KAFKA_BOOTSTRAP_SERVER=localhost:9092
  ```
- Confluent Cloud .env config:
  ```js
  API_KEY=<API_ACCESS_KEY>
  API_SECRET=<API_ACCESS_SECRET>
  KAFKA_BOOTSTRAP_SERVER=<BOOTSTRAP_SERVER>
  ```

---
### **3.** Install dependencies and build the package
```
$ npm install
$ npm run build
```
---

### **4.** Run the dev server

```
$ npm run dev
```



