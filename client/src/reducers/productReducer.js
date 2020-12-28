

const InitialState = {
    productList: [],  
    loading: true,  
    error: '' 
}

const productReducer =  (state = InitialState, action) => {
    switch (action.type) {
        case 'OnSuccess':  
            // const newList = [];
            // newList.push(action.payload);
            return {  
                ...state,
                productList: action.payload, 
                loading: false,  
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