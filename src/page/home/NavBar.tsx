import { KEY_GROUPS, KEY_INVITATIONS, KEY_SHOPPING_LISTS, KEY_TOKEN, KEY_USERNAME } from "@/local/keys"
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
import { clearInterval } from "timers"
import { ReactSVG } from "react-svg"
import icOut from "@/assets/ic_out.svg"
import icPlus from "@/assets/ic_plus.svg"
import icList from "@/assets/ic_list.svg"
import icOptions from "@/assets/ic_options.svg"
import icGroup from "@/assets/ic_group.svg"
import { useNavigate } from "react-router-dom"
import NavbarLabelRow from "@/component/NavbarLabelRow"
import NavbarListRow from "component/NavbarListRow"
import NavbarGroupRow from "component/NavbarGroupRow"

const UPDATE_CHANGES_INTERVAL = 8000

const NavBar = () => {
    const [username] = useState(localStorage.getItem(KEY_USERNAME) || "User")
    const navigate = useNavigate()

    const groups = [
        { id: "a", name: "Family", adminName: "_", isAdmin: false, timestampOfLastChange: 0 },
        { id: "b", name: "Party", adminName: "_", isAdmin: false, timestampOfLastChange: 0 }
    ]
    const shoppingLists = [
        { id: "aa", parentId: "0", name: "Gaming", hasGroupParent: false, timestampOfLastChange: 0 },
        { id: "bb", parentId: "0", name: "Books", hasGroupParent: false, timestampOfLastChange: 0 },
        { id: "cc", parentId: "a", name: "Groceries", hasGroupParent: true, timestampOfLastChange: 0 },
        { id: "dd", parentId: "a", name: "House", hasGroupParent: true, timestampOfLastChange: 0 },
        { id: "ee", parentId: "b", name: "Drinks", hasGroupParent: true, timestampOfLastChange: 0 },
        { id: "ff", parentId: "b", name: "Snacks", hasGroupParent: true, timestampOfLastChange: 0 },
    ]
    const invitations = [
        { fromAdminName: "Waldo", groupId: "c", groupName: "Where Is" },
        { fromAdminName: "Willy", groupId: "d", groupName: "Wonka's Factory" }
    ]

    // const [groups, setGroups] = useStore<Group[]>(KEY_GROUPS, [])
    // const [shoppingLists, setShoppingLists] = useStore<ShoppingList[]>(KEY_SHOPPING_LISTS, [])
    // const [invitations, setInvitations] = useStore<Invitation[]>(KEY_INVITATIONS, [])

    // useEffect(() => {
    //     groupEndpoint.getUserGroups({
    //         onSuccess: result => {
    //             if (!result) return
    //             setGroups(result)
    //             result.forEach(group => {
    //                 shoppingListEndpoint.getGroupLists({
    //                     request: { groupId: group.id },
    //                     onSuccess: result => {
    //                         result && setShoppingLists(current => [...current, ...result])
    //                     }
    //                 })
    //             })
    //         }
    //     })

    //     shoppingListEndpoint.getUserLists({
    //         onSuccess: result => {
    //             result && setShoppingLists(current => [...current, ...result])
    //         }
    //     })

    //     invitationEndpoint.getUserInvitations({
    //         onSuccess: result => result && setInvitations(result)
    //     })
    // }, [])

    // const getStateAsChangeRequests = () => {
    //     const groupsChangeRequests: ChangeRequest[] = groups.map(group => {
    //         return {
    //             id: group.id,
    //             type: ChangingType.Group,
    //             timestampOfLastChange: group.timestampOfLastChange
    //         }
    //     })
    //     const shoppingListsChangeRequests: ChangeRequest[] = shoppingLists.map(list => {
    //         return {
    //             id: list.id,
    //             type: ChangingType.ShoppingList,
    //             timestampOfLastChange: list.timestampOfLastChange
    //         }            
    //     })
    //     return [...groupsChangeRequests, ...shoppingListsChangeRequests]
    // }

    // const updateChanges = () => {
    //     const changesRequest = {
    //         changes: getStateAsChangeRequests()
    //     }
    //     changesEndpoint.getChanges({
    //         request: changesRequest,
    //         onSuccess: result => {
    //             if (!result || !result.changesExist) return
    //             setGroups(current => {
    //                 const updatedIds = result.groups.map(group => group.id)
    //                 const unchangedCurrent = current.filter(group => 
    //                     !updatedIds.includes(group.id)
    //                 )
    //                 return [...unchangedCurrent, ...result.groups]
    //             })
    //             setShoppingLists(current => {
    //                 const updatedIds = result.shoppingLists.map(list => list.id)
    //                 const unchangedCurrent = current.filter(list => 
    //                     !updatedIds.includes(list.id)    
    //                 )
    //                 return [...unchangedCurrent, ...result.shoppingLists]
    //             })
    //         }
    //     })
    // }

    // useEffect(() => {
    //     const interval = setInterval(() => updateChanges(), UPDATE_CHANGES_INTERVAL)
    //     return () => clearInterval(interval)
    // }, [])

    const signOut = () => {
        localStorage.setItem(KEY_TOKEN, "")
        navigate("/")
    }

    const addUserList = () => {}
    const addGroup = () => {}
    const addGroupList = () => {}
    const sendInvitation = () => {}
    const invitationOptions = () => {}

    return (
        <div className="navbar">
            <span className="navbar__title-row">
                <p className="home__title">{username}'s CartBud</p>
                <ReactSVG
                    src={icOut}
                    content="Sign out"
                    beforeInjection={svg => svg.classList.add("navbar__icon-clickable navbar__icon--out")}
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
                        <NavbarListRow listName={list.name} />
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
                            groupName={group.name}
                            onAddList={addGroupList}
                        />
                        {
                            shoppingLists
                                .filter(list => list.parentId === group.id)
                                .map(list =>
                                    <NavbarListRow listName={list.name} />
                                )
                        }
                    </>
                )
            }
            // TODO Invitations label row
            // TODO Map invitations to invitation rows
        </div>
    )
}

export default NavBar