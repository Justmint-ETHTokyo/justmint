import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { alertReducer } from "./alert/alertReducer";
import { nftReducer } from "./nft/nftReducer";
import { userDataReducer } from "./userData/userDataReducer";
import { walletReducer } from "./wallet/walletReducer";

const rootReducer = combineReducers({
    userData: userDataReducer,
    nft: nftReducer,
    alert: alertReducer,
    wallet: walletReducer,
})

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));   

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
