interface TypedRequestQuery<T> extends Express.Request {
    query: T
}

interface TypedRequestBody<T> extends Express.Request {
    body: T
}

interface TypedRequestParams<T> extends Express.Request {
    params: T
}

export { TypedRequestQuery, TypedRequestBody, TypedRequestParams };