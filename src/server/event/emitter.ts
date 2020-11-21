

class TopicEmitter
{
    private events: WeakMap<String, Function>;
    constructor()
    {
        this.events = new WeakMap();
    }

    on (event: String, callback:Function) {
      this.events.get(event);
    }
}