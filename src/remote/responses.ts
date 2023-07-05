import { Entry, Group, ShoppingList } from "@/model/models";

export interface ChangesResponse {
    changesExist: boolean,
    groups: Group[],
    shoppingLists: ShoppingList[],
    entries: Entry[],
    deletedIds: string[]
}