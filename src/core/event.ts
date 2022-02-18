
class Request {

    public path: string | undefined
    public query: any
    public method: string | undefined
    public url: string | undefined
    public originalUrl: string | undefined
    public params: any
    public res: any
    public header: any
    public get: any
    public accepts: any
    public protocol: any
    public host: any
}

class Extensions {
    public request: Request
}

class Event {
    public data: any
    public extensions: Extensions
}

export { Event, Extensions, Request }