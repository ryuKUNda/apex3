export class InputService {
  private started = false;
  constructor(readonly device: string) {}

  // The client shouldn't be in charge of releasing the keyboard
  async End() {
    if (!this.started) return false;
    const response = await fetch(`/api/input/${this.device}`, { method: 'DELETE'});
    return this.started = !(response.status == 200);
  }

  // TryStart
  async Start() {
    const response = await fetch(`/api/input/${this.device}`);
    return this.started = response.status == 200;
  }

  // TODO: Optimize
  // could make this a promise and store key press requests in a queue
  // and when we can send a new request we can send everything in the queue
  async PressKey(code: number) {
    if (!this.started) return false;
    const body = code.toString();
    const response = await fetch(`/api/input/${this.device}`, { body, method: 'PUT'});
    return this.started = response.status == 200;
  }
}