import { 
    KEY_ENTRIES, 
    KEY_GROUPS, 
    KEY_INVITATIONS, 
    KEY_SHOPPING_LISTS, 
    KEY_TOKEN, 
    KEY_USERNAME 
} from "./keys"

export const emptyUserStorage = () => {
    const emptyArrayItem = JSON.stringify([]) 

    localStorage.setItem(KEY_TOKEN, "")
    localStorage.setItem(KEY_USERNAME, "")
    localStorage.setItem(KEY_GROUPS, emptyArrayItem)
    localStorage.setItem(KEY_SHOPPING_LISTS, emptyArrayItem)
    localStorage.setItem(KEY_ENTRIES, emptyArrayItem)
    localStorage.setItem(KEY_INVITATIONS, emptyArrayItem)
}