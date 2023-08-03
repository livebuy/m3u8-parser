import Stream from './stream';

export default class LineStream extends Stream {
  buffer: string = '';
  constructor() {
    super();
    this.buffer = '';
  }

  push(data: string) {
    let nextNewline: number;

    this.buffer += data;
    nextNewline = this.buffer.indexOf('\n');

    for (; nextNewline > -1; nextNewline = this.buffer.indexOf('\n')) {
      this.trigger('data', this.buffer.substring(0, nextNewline));
      this.buffer = this.buffer.substring(nextNewline + 1);
    }
  }
}
