type Listener = (data: any) => void;

export default abstract class Stream {
  listeners: Record<string, Array<any>> = {};

  on(type: string, listener: Listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(listener);
  }

  off(type: string, listener: Listener) {
    if (!this.listeners[type]) {
      return;
    }

    const index = this.listeners[type].indexOf(listener);
    const found = index > -1;
    if (found) {
      this.listeners[type] = this.listeners[type].slice().splice(index, 1);
    }

    return found;
  }

  trigger(type: string, _buffer?: unknown) {
    const callbacks = this.listeners[type];
    if (!callbacks) {
      return;
    }

    if (arguments.length === 2) {
      const length = callbacks.length;

      for (let i = 0; i < length; ++i) {
        callbacks[i].call(this, arguments[1]);
      }
    } else {
      const args = Array.prototype.slice.call(arguments, 1);
      const length = callbacks.length;

      for (let i = 0; i < length; ++i) {
        callbacks[i].apply(this, args);
      }
    }
  }

  dispose() {
    this.listeners = {};
  }

  protected abstract push(data: string): void;

  pipe(destination: InstanceType<typeof Stream>) {
    this.on('data', function (data) {
      destination.push(data);
    });
  }
}
