const redux=require('redux')
const createStore=redux.createStore

const applyMiddleware=redux.applyMiddleware
const thunkMiddleware=require('redux-thunk').default
const axios=require('axios')



const initialState={
    loading:false,
    users:[],
    error:''
}

const FETCH_USERS_REQUEST='FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS='FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE='FETCH_USERS_FAILURE'

const fetchUsersRequest=()=>{
    return {
        type:FETCH_USERS_REQUEST
    }
}
const fetchUsersSucess=(users)=>{
return {
    type:FETCH_USERS_SUCCESS,
    payload:users
}
}
const fetchUsersFailure=(error)=>{
    type:FETCH_USERS_FAILURE,
    payload.error
}

const reducer=(state=initialState,action)=>{
switch(action.type){
    case FETCH_USERS_REQUEST:
        return {
            ...state,
            loading:true
        }
    case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading:false,
                users:action.payload
            }
    case FETCH_USERS_FAILURE:
            return {
                    ...state,
                    loading:false,
                    error:action.payload
                }
}
}
const fetchUsers =()=>{
    return function(dispath){
        dispath(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            const users=response.data.map(user=>user.id)
            dispath(fetchUsersSucess(users))
        })
        .catch(error=>{
                dispath(fetchUsersFailure(error))
        })
    }
}



const store=createStore(reducer,applyMiddleware(thunkMiddleware));
store.subscribe(()=>{console.log('Users State',store.getState())})
store.dispatch(fetchUsers())