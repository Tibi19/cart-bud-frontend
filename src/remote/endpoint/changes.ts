import { remote } from "@/remote/remote";
import { ChangesRequest } from "@/remote/requests";
import { ChangesResponse } from "remote/responses";
import { EndpointHandle, defaultEndpointHandle } from "./handle";

export const changesEndpoint = {

    getChanges: (handle: EndpointHandle<ChangesRequest, ChangesResponse, any>) => {
        const { request, onSuccess, onError, onFallbackError } = { ...defaultEndpointHandle, ...handle }
        remote
            .get("changes", { params: request })
            .then(response => {
                if (response.status != 200) {
                    console.log(response)
                    onFallbackError()
                    return
                }
                onSuccess(...response.data)
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