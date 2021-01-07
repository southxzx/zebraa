const InitialState = {
    cartList: []
}

const cartReducer = (state=InitialState, action) =>{
    switch(action.type){
        case 'getCart':
            return{
                ...state,
                cartList: action.payload
            }
        case 'removeItem':
            return{
                ...state
            }
        default: 
            return state
    }
}

export default cartReducer;