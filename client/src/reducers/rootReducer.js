import {combineReducers} from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import ordersAdminSlice from "../slice/ordersAdmin.slice";

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    ordersAdmin: ordersAdminSlice 
});

export default rootReducer;