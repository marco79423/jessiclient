const WebSocket = require('ws')
const {Subject, iif, interval, empty} = require('rxjs')
const {switchMap} = require('rxjs/operators')
const {webSocket} = require('rxjs/webSocket')


class WSService {

  constructor() {
  }

  connect(url) {

  }

  close() {

  }

  isConnected() {

  }

  subscribe() {}

  send(text) {

  }
}


// const command$ = new Subject()
// command$.subscribe(command => console.log(command))
//
//
// webSocketConnection$ = command$.pipe(
//   switchMap(command => iif(() => command.type === 'connect', interval(1000)))
// )
//
// webSocketConnection$.subscribe(command => console.log(command))
//
//
// command$.next({
//   type: 'connect',
//   data: {
//     'url': 'ws://localhost:8000/player-api/ws'
//   }
// })


// command$.next({
//   type: 'disconnect',
// })

//
// function* connect() {
//   const subject = webSocket({
//     url: 'ws://localhost:8000/player-api/ws',
//     WebSocketCtor: WebSocket,
//   })
//
//   subject.next({
//     'command': 'subscribeInPlayMatch',
//     'seq': 'string'
//   })
//
//   while (true) {
//     yield subject.first()
//   }
//
//   // subject.subscribe(
//   //   msg => console.log('message received: ' + JSON.stringify(msg)), // Called whenever there is a message from the server.
//   //   err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
//   //   () => console.log('complete') // Called when connection is closed (for whatever reason).
//   // )
// }
//
// for (const message of connect()) {
//   console.log(message)
// }
//
// subject.subscribe(
//   msg => console.log('message received: ' + JSON.stringify(msg)), // Called whenever there is a message from the server.
//   err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
//   () => console.log('complete') // Called when connection is closed (for whatever reason).
// )
//
// subject.next({
//   'command': 'subscribeInPlayMatch',
//   'seq': 'string'
// })

