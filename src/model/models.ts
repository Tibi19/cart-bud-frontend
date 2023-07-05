
export interface ShoppingList {
    id: string,
    parentId: string,
    name: string,
    hasGroupParent: boolean,
    timestampOfLastChange: number
}

export interface Group {
    id: string,
    name: string,
    adminName: string,
    isAdmin: boolean,
    timestampOfLastChange: number
}

export interface Invitation {
    fromAdminName: string,
    groupId: string,
    groupName: string
}

export interface Entry {
    id: string,
    parentListId: string,
    text: string,
    isCompleted: boolean,
    timestampOfLastChange: number
}

export enum ChangingType {
    Group = "Group",
    ShoppingList = "ShoppingList",
    Entry = "Entry"
}