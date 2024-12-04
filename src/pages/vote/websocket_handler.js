class WebSocketHandler {
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    // this.socket.onopen = (event) => {
    //   this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'connected' }));
    // };
    // this.socket.onclose = (event) => {
    //   this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'disconnected' }));
    // };
    this.socket.onmessage = async (msg) => {
      try {
        console.log(`received event: ${JSON.stringify(msg, undefined, 4)}`)
        const event = JSON.parse(await msg.data.text());
        console.log(`parsed event: ${event}`)
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

