import { Group } from "@/model/models";
import { EndpointHandle, defaultEndpointHandle } from "./handle";
import { remote } from "@/remote/remote";

export const groupEndpoint = {

    getUserGroups: (handle: EndpointHandle<any, Group[], any>) => {
        const { onSuccess, onError, onFallbackError } = { ...defaultEndpointHandle, ...handle }
        remote
            .get("group/user/groups")
            .then(response => {
                if (response.status != 200) {
                    console.log(response)
                    onFallbackError()
                    return
                }
                onSuccess([...response.data])
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