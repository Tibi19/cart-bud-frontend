import { KEY_TOKEN, KEY_USERNAME } from "@/local/keys";
import { remote } from "@/remote/remote";
import { AuthRequest } from "../requests";
import { EndpointHandle, defaultEndpointHandle } from "./handle";

export const authEndpoint = {

    signIn: (handle: EndpointHandle<AuthRequest, any, any>) => {
        const { request, onSuccess, onError, onFallbackError } = { ...defaultEndpointHandle, ...handle }
        remote
            .post("signin", request)
            .then(response => {
                if (response.status != 200) {
                    console.log(response)
                    onFallbackError()
                    return
                }
                const token = response.data["token"]
                localStorage.setItem(KEY_TOKEN, token)
                localStorage.setItem(KEY_USERNAME, request?.username || "User")
                onSuccess()
            })
            .catch(error => {
                console.log(error)
                const response = error.response
                if (response && response.status === 409) {
                    onError()
                    return
                }
                onFallbackError()
            })
    },

    signUp: (handle: EndpointHandle<AuthRequest, any, any>) => {
        const { request, onSuccess, onError, onFallbackError } = { ...defaultEndpointHandle, ...handle }
        remote
            .post("signup", request)
            .then(response => {
                if (response.status != 200) {
                    console.log(response)
                    onFallbackError()
                    return
                }
                onSuccess()
            })
            .catch(error => {
                console.log(error)
                const response = error.response
                if (response && response.status === 409) {
                    onError()
                    return
                }
                onFallbackError()
            })
    }
    
}