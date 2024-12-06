class WebSocketHandler {
  handlers = [];
  connected = false

  connect() {
    if (this.connected) {
      return
    }
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.connected = true
      console.log('web socket connected!')
    };
    this.socket.onclose = (event) => {
      this.connected = false
      console.log('web socket disconnected')
    };
    this.socket.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data);
        this.receiveEvent(event);
      } catch (err) {
        console.error('error parsing message:', err)
      }
    };
  }

  addOption(room, option) {
    this.socket.send(JSON.stringify({ type: 'new_option', room, option }));
  }

  lockIn(room, votes) {
    this.socket.send(JSON.stringify({ type: 'lock_in', room, votes }))
  }

  closeRoom(room) {
    this.socket.send(JSON.stringify({ type: 'close_room', room }))
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const WSHandler = new WebSocketHandler();
export { WSHandler };

