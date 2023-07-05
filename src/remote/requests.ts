import { ChangingType } from "@/model/models"

export interface AuthRequest {
    username: string,
    password: string
}

export interface GroupListsRequest {
    groupId: string
}

export interface ChangesRequest {
    changes: ChangeRequest[]
}

export interface ChangeRequest {
    id: string,
    type: ChangingType,
    timestampOfLastChange: number
}