import { ShoppingList } from "@/model/models"
import { EndpointHandle, defaultEndpointHandle } from "./handle"
import { remote } from "@/remote/remote"
import { GroupListsRequest } from "@/remote/requests"

export const shoppingListEndpoint = {

    getUserLists: (handle: EndpointHandle<any, ShoppingList[], any>) => {
        const { onSuccess, onError, onFallbackError } = { ...defaultEndpointHandle, ...handle }
        remote
            .get(`list/user/lists`)
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
    },

    getGroupLists: (handle: EndpointHandle<GroupListsRequest, ShoppingList[], any>) => {
        const { request, onSuccess, onError, onFallbackError } = { ...defaultEndpointHandle, ...handle }
        if (!request) {
            console.log("No group id passed for fetching group lists")
            onFallbackError()
            return
        }
        remote
            .get(`list/group/${request.groupId}/lists`)
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