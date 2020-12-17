

const InitialState = {
    productList: [],  
    loading: true,  
    error: '' 
}

const productReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'OnSuccess':  
            const newProductList = [...state.productList];
            newProductList.push(action.payload);
            return {  
                ...state,
                loading: false,  
                productList: newProductList,  
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