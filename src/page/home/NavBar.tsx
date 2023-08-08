import { KEY_GROUPS, KEY_INVITATIONS, KEY_SHOPPING_LISTS, KEY_USERNAME } from "@/local/keys"
import "./styles/HomeStyles.css"
import "./styles/NavBarStyles.css"
import { useEffect, useState } from "react"
import { useStore } from "@/hook/useStore"
import { groupEndpoint } from "@/remote/endpoint/group"
import { ChangingType, Group, Invitation, ShoppingList } from "@/model/models"
import { shoppingListEndpoint } from "@/remote/endpoint/shoppingList"
import { invitationEndpoint } from "@/remote/endpoint/invitation"
import { changesEndpoint } from "@/remote/endpoint/changes"
import { ChangeRequest } from "@/remote/requests"
import { ReactSVG } from "react-svg"
import icOut from "@/assets/ic_out.svg"
import { useNavigate } from "react-router-dom"
import NavbarLabelRow from "@/component/NavbarLabelRow"
import NavbarListRow from "@/component/NavbarListRow"
import NavbarGroupRow from "@/component/NavbarGroupRow"
import NavbarInvitationRow from "@/component/NavbarInvitationRow"
import { emptyUserStorage } from "@/local/emptyUserStorage"
import { getUniqueElements } from "@/util/getUniqueElements"

const UPDATE_CHANGES_INTERVAL = 8000

const NavBar = () => {
    const [username] = useState(localStorage.getItem(KEY_USERNAME) || "User")
    const [groups, setGroups] = useStore<Group[]>(KEY_GROUPS, [])
    const [shoppingLists, setShoppingLists] = useStore<ShoppingList[]>(KEY_SHOPPING_LISTS, [])
    const [invitations, setInvitations] = useStore<Invitation[]>(KEY_INVITATIONS, [])
    const navigate = useNavigate()

    useEffect(() => {
        groupEndpoint.getUserGroups({
            onSuccess: result => {
                if (!result) return
                setGroups(result)
                result.forEach(group => {
                    shoppingListEndpoint.getGroupLists({
                        request: { groupId: group.id },
                        onSuccess: result => {
                            result && setShoppingLists(current => 
                                getUniqueElements([...current, ...result])
                            )
                        }
                    })
                })
            }
        })

        shoppingListEndpoint.getUserLists({
            onSuccess: result => {
                result && setShoppingLists(current => 
                    getUniqueElements([...current, ...result])
                )
            }
        })

        invitationEndpoint.getUserInvitations({
            onSuccess: result => result && setInvitations(result)
        })
    }, [UPDATE_CHANGES_INTERVAL])

    const getStateAsChangeRequests = () => {
        const groupsChangeRequests: ChangeRequest[] = groups.map(group => {
            return {
                id: group.id,
                type: ChangingType.Group,
                timestampOfLastChange: group.timestampOfLastChange
            }
        })
        const shoppingListsChangeRequests: ChangeRequest[] = shoppingLists.map(list => {
            return {
                id: list.id,
                type: ChangingType.ShoppingList,
                timestampOfLastChange: list.timestampOfLastChange
            }            
        })
        return [...groupsChangeRequests, ...shoppingListsChangeRequests]
    }

    const updateChanges = () => {
        const changesRequest = {
            changes: getStateAsChangeRequests()
        }
        changesEndpoint.getChanges({
            request: changesRequest,
            onSuccess: result => {
                if (!result || !result.changesExist) return
                setGroups(current => {
                    const updatedIds = result.groups.map(group => group.id)
                    const unchangedCurrent = current.filter(group => 
                        !updatedIds.includes(group.id)
                    )
                    return [...unchangedCurrent, ...result.groups]
                })
                setShoppingLists(current => {
                    const updatedIds = result.shoppingLists.map(list => list.id)
                    const unchangedCurrent = current.filter(list => 
                        !updatedIds.includes(list.id)    
                    )
                    return [...unchangedCurrent, ...result.shoppingLists]
                })
            }
        })
    }

    useEffect(() => {
        const interval = setInterval(() => updateChanges(), UPDATE_CHANGES_INTERVAL)
        return () => clearInterval(interval)
    }, [groups, shoppingLists])

    const signOut = () => {
        emptyUserStorage()
        navigate("/")
    }

    const addUserList = () => {}
    const addGroup = () => {}
    const addGroupList = () => {}
    const openInvitation = () => {}

    return (
        <div className="navbar">
            <span className="navbar__title-row">
                <span className="home__title">{username}'s CartBud</span>
                <ReactSVG
                    src={icOut}
                    content="Sign out"
                    beforeInjection={svg => {
                        svg.classList.add("navbar__icon-clickable")
                        svg.classList.add("navbar__icon--out")
                    }}
                    onClick={signOut}
                />
            </span>
            <NavbarLabelRow
                title="Your Lists"
                onAdd={addUserList}
                addContent="Add shopping list"
            />
            {
                shoppingLists
                    .filter(list => !list.hasGroupParent)
                    .map(list => 
                        <NavbarListRow
                            key={list.id} 
                            listName={list.name} 
                        />
                    )
            }
            <NavbarLabelRow
                title="Groups"
                onAdd={addGroup}
                addContent="Add group"
            />
            {
                groups.map(group =>
                    <>
                        <NavbarGroupRow
                            key={group.id}
                            groupName={group.name}
                            onAddList={addGroupList}
                        />
                        {
                            shoppingLists
                                .filter(list => list.parentId === group.id)
                                .map(list =>
                                    <NavbarListRow
                                        key={list.id} 
                                        listName={list.name} 
                                    />
                                )
                        }
                    </>
                )
            }
            <NavbarLabelRow
                title="Invitations"
                onAdd={openInvitation}
                addContent="Send invitation"
            />
            {
                invitations.map(invitation =>
                    <NavbarInvitationRow
                        key={invitation.groupId}
                        forGroupName={invitation.groupName}
                        adminName={invitation.fromAdminName}
                    />
                )
            }
        </div>
    )
}

export default NavBar