

const InitialState = {
    productList: [],  
    loading: true,  
    error: '' 
}

const productReducer =  (state = InitialState, action) => {
    switch (action.type) {
        case 'OnSuccess':  
            return {  
                ...state,
                loading: false,  
                productList: action.payload,  
                error: ''  
            } 
        case 'OnFailure':  
            return {  
                ...state,
                loading: false,  
                productList: {},  
                error: 'Something went wrong'  
            } 

        default:
            return state
    }
}

export default productReducer;