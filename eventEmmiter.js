export class EventEmmiter {
    subscribers = {}

    subscribe(eventName, callback) {
        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = []
        }
        this.subscribers[eventName].push(callback)
    }

    emit(eventName, data = null) {
        this.subscribers[eventName]?.forEach(cb => cb(data))
    }

    unsubscribe(eventName, callback) {
        this.subscribers[eventName] = this.subscribers[eventName].filter(cb => cb !== callback)
    }
}