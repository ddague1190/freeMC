import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";
import Welcome from "../../components/admin/content/Welcome";
import NewUserForm from "../../components/admin/content/NewUserForm";
import ShopInfoForm from "../../components/admin/content/ShopInfoForm";
import AllCustomerRecords from "../../components/admin/content/AllCustomersRecords";
import AddCustomerForm from "../../components/admin/content/AddCustomerForm";
import { addCustomer } from "../customer/action";
import { CustomerState } from "../customer/state";
import CustomerDetailView from "../../components/admin/content/CustomerDetailView";
import SelectedMotorcycle from "../../components/admin/content/SelectedMotorcycle";

export const COMPONENT_MAP = {
    'Welcome': Welcome,
    'NewUserForm': NewUserForm,
    'ShopInfoForm': ShopInfoForm,
    'AllCustomerRecords': AllCustomerRecords,
    'AddCustomerForm': AddCustomerForm,
    'CustomerDetailView': CustomerDetailView,
    'SelectedMotorcycle': SelectedMotorcycle

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
                tab: "Existing records",
                component: "AllCustomerRecords"
            },
            {
                tab: "Detail view",
                component: "CustomerDetailView"
            },
            {
                tab: "New",
                component: "AddCustomerForm"
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
            },
            {
                tab: "Selected",
                component: "SelectedMotorcycle"
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

// const initialState: AdminRouteState = {
//     route: 'home',
//     tabs: [
//         {
//             tab: "",
//             component: "CustomersForm"
//         }
//     ],
//     selectedTabIndex: 0,
//     heading: "Welcome",
// }

const initialState: AdminRouteState = {
    route: 'Customers',
    tabs: adminRouteData['Customers'].tabs,
    selectedTabIndex: 0,
    heading: "Customers",
}
/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const slice = createSlice({
    name: FeatureKey.ADMINROUTE,
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
    },
    extraReducers: (builder : ActionReducerMapBuilder<any>) => {
        builder
        .addCase(addCustomer.fulfilled, (state: CustomerState, action: PayloadAction<CustomerState>) => { 
            return {
                ...state,
                selectedTabIndex: 0
            }
        })
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
export const adminRouteSelector = (state: RootState): AdminRouteState => state.adminRoute

