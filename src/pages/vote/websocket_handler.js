class WebSocketHandler {
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      console.log('web socket connected!')
    };
    this.socket.onclose = (event) => {
      console.log('web socket disconnected')
    };
    this.socket.onmessage = (msg) => {
      try {
        console.log(`received event: ${JSON.stringify(msg.data, undefined, 4)}`)
        const event = JSON.parse(msg.data);
        console.log(`parsed event: ${JSON.stringify(event)}`)
        this.receiveOptions(event.options);
      } catch (err) {
        console.error('error parsing message:', err)
      }
    };
  }

  addOption(room, option) {
    this.socket.send(JSON.stringify({ room, option }));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveOptions(options) {
    this.handlers.forEach((handler) => {
      handler(options);
    });
  }
}

const WSHandler = new WebSocketHandler();
export { WSHandler };

