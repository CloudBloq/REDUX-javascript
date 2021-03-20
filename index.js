
const redux=require('redux');
const createStore=redux.createStore
const combineReducers=redux.combineReducers
const reduxLogger = require('redux-logger')
const logger=reduxLogger.createLogger()
const applyMiddleWare=redux.applyMiddleware()

const BUY_CAKE='BUY_CAKE'
const BUY_ICECREAM='BUY_ICECREAM'


function buy_cake(){
// return buy cake action
return {
    type:BUY_CAKE,
    
}
}
function buy_iceCream(){
// return buy iceCream action
return {
    type:BUY_ICECREAM
}

}

const initialCakeState={
    numberOfCake:10
}
const initialIceCreamState={
    numberOfIceCream:5
}

const cakeReducer=(state=initialCakeState,action)=>{
    // cake reducer
  switch(action.type){
    case BUY_CAKE:
        return {
            ...state,
            numberOfCake:state.numberOfCake - 1
        }
        default:
            return state;
  }
  
  
  
  
}
const iceCreamReducer=(state=initialIceCreamState,action)=>{
// ice cream reducer
switch(action.type){
    case BUY_ICECREAM :
        return {
            ...state,
            numberOfIceCream :state.numberOfIceCream - 1
        }
        default:
            return state
}
}

const rootReducer=combineReducers(
    {
        cake:cakeReducer,
        iceCream:iceCreamReducer
    }
)

const store=createStore(rootReducer);
console.log("Initial State", store.getState())
const unsubscribe=store.subscribe(()=>console.log("Store Updated", store.getState()))
store.dispatch(buy_cake())
store.dispatch(buy_cake())
store.dispatch(buy_cake())
store.dispatch(buy_iceCream())
store.dispatch(buy_iceCream())
unsubscribe();