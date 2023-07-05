import { Invitation } from "@/model/models"
import { remote } from "@/remote/remote"
import { EndpointHandle, defaultEndpointHandle } from "./handle"

export const invitationEndpoint = {

    getUserInvitations: (handle: EndpointHandle<any, Invitation[], any>) => {
        const { onSuccess, onError, onFallbackError } = { ...defaultEndpointHandle, ...handle }
        remote
            .get("invitation/user/invitations")
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