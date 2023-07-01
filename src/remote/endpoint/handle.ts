
export interface EndpointHandle<T, R, E> {
    request?: T,
    onSuccess?: (result?: R) => void,
    onError?: (error?: E) => void,
    onFallbackError?: () => void
}

export const defaultEndpointHandle = {
    request: null,
    onSuccess: () => {},
    onError: () => {},
    onFallbackError: () => {}
}