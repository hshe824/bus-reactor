Bus-Reactor is a React web app that connects to the Translink API to pull live bus locations and display them on an interactable map. Buses are colour-coded by direction, and display useful route and destination information in a popup when clicked.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Installing:

```
npm install
```
```
npm start
```

NB: Please run this in Google Chrome, with a plugin to ensure CORS (eg. [CORS Toggle plugin](https://chrome.google.com/webstore/detail/cors-toggle/jioikioepegflmdnbocfhgmpmopmjkim?hl=en)) so that Access-Control-Allow-Origin, Access-Control-Allow-Methods and Access-Control-Allow-Headers headers for CORS are enabled.

To run test suite run:

```
npm test
```

Usage:

Load the web application in Chrome. Buses are colour and directionally coded for the different bus directions. Click on the bus to show the route number and destination information.

Screenshot:
![Bus Reactor in action](https://github.com/hshe824/bus-reactor/blob/master/screenshots/screenshot1.png)

