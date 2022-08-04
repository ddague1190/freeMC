import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";
import Welcome from "../../components/admin/content/Welcome";
import NewUserForm from "../../components/admin/content/NewUserForm";
import ShopInfoForm from "../../components/admin/content/ShopInfoForm";

export const COMPONENT_MAP = {
    'Welcome': Welcome,
    'NewUserForm': NewUserForm,
    'ShopInfoForm': ShopInfoForm
}
const adminRouteData = {
    'Createupdate-receipt': {
        heading: "Receipts",
        tabs: [
            {
                tab: "",
                component: "Welcome"
            }
        ],
    },
    'Reports': {
        heading: "Reports",
        tabs: [
            {
                tab: "Sales",
                component: "Welcome"
            },
            {
                tab: "Customer reviews",
                component: "NewUserForm"
            }
        ]
    },
    "Customers": {
        heading: "Customers",
        tabs: [
            {
                tab: "",
                component: "Welcome"
            }
        ],
    },
    "Customer's-bikes": {
        heading: "Serviced motorcycles",
        tabs: [
            {
                tab: "Active",
                component: "Welcome"
            },
            {
                tab: "Completed",
                component: "NewUserForm"
            }
        ]
    },
    "Bikes-for-sale": {
        heading: "Inventory",
        tabs: [
            {
                tab: "New",
                component: "Welcome"
            },
            {
                tab: "Pre-owned",
                component: "NewUserForm"
            }
        ]
    },
    "Receipts": {
        heading: "Receipts",
        tabs: [
            {
                tab: "Pending work",
                component: "Welcome"
            },
            {
                tab: "Payment required",
                component: "NewUserForm"
            },
            {
                tab: "Past work",
                component: "NewUserForm"
            }
        ]
    },
    "Inventory": {
        heading: "Other inventory",
        tabs: [
            {
                tab: "Parts",
                component: "Welcome"
            },
            {
                tab: "Accessories",
                component: "NewUserForm"
            },
            {
                tab: "Gear",
                component: "NewUserForm"
            },
            {
                tab: "Tires",
                component: "NewUserForm"
            }
        ]
    },
    "Update-shop-info": {
        heading: "General information",
        tabs: [
            {
                tab: "",
                component: "ShopInfoForm"
            }
        ],
    },
    "Customize-website": {
        heading: "Website parameters",
        tabs: [
            {
                tab: "",
                component: "Welcome"
            }
        ],
    },
    "Pages": {
        heading: "Website pages",
        tabs: [
            {
                tab: "",
                component: "Welcome"
            }
        ],
    },
    "Open website": {
        heading: "Website pages",
        tabs: [
            {
                tab: "",
                component: "Welcome"
            }
        ],
    }


}


/**
 * Payload
 */
export type AdminRoutePayload = {
    route: string,
    selectedTabIndex: number,
}

/**
 * State
 */

type TabObject = {
    tab: string,
    component: string
}
export type AdminRouteState = {
    route: string,
    tabs: TabObject[],
    selectedTabIndex: number,
    heading: string,
}

const initialState: AdminRouteState = {
    route: 'home',
    tabs: [
        {
            tab: "",
            component: "Welcome"
        }
    ],
    selectedTabIndex: 0,
    heading: "Welcome",
}

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const slice = createSlice({
    name: FeatureKey.NOTIFICATION,
    initialState,
    reducers: {
        changeRoute: (
            state: AdminRouteState,
            action: PayloadAction<AdminRoutePayload>
        ): AdminRouteState => {
            let { route } = action.payload;
            return {
                route: route,
                tabs: adminRouteData[route].tabs,
                selectedTabIndex: 0,
                heading: adminRouteData[route].heading,
            }
        },
        changeTab: (
            state: AdminRouteState,
            action: PayloadAction<AdminRoutePayload>
        ): AdminRouteState => {
            let { index } = action.payload
            return {
                ...state,
                selectedTabIndex: index,
            }
        }
    }
})

/**
 * Reducer
 */
export const adminRouteReducer = slice.reducer

/**
 * Action
 */
export const { changeRoute, changeTab } = slice.actions

/**
 * Selector
 * @param state PageStateType
 */
export const adminRouteSelector = (state: RootState): NotificationState => state.adminRoute

