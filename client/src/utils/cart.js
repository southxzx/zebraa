import { useDispatch } from "react-redux";
import store from "../store";

export const AddItem = (data) => {

    let newCart;

    // Kiểm tra cart có chưa
    if (localStorage.getItem('cart')){
        let cart = JSON.parse(localStorage.getItem('cart'));
        newCart = cart;
        const index = newCart.findIndex(item => item.idSize == data.idSize);
        // nếu trùng thì tăng số lượng
        if (index !== -1){
            newCart[index].quantity += data.quantity;
        }
        // không trùng thì add tiếp
        else{
            newCart.push(data);
            localStorage.setItem('cart',JSON.stringify(newCart));
        }
    }
    // nếu chưa thì add data vào
    else{
        newCart = [];
        newCart.push(data);
        localStorage.setItem('cart',JSON.stringify(newCart));
    }
    // lưu vào store
    store.dispatch({ type: 'addItem', payload: newCart});
    
}

export const RemoveItem = (data) => {
    // Lấy cart trong localStorage ra
    let cart = JSON.parse(localStorage.getItem('cart'));

    // Tìm item id trùng thì xóa
    const index = cart.findIndex(item => item.idSize == data.idSize);
    if (index !== -1){
        cart.splice(index, 1);
        console.log('splice');
    }
    // set lại localstorage mới
    localStorage.setItem('cart',JSON.stringify(cart));
    store.dispatch({ type: 'addItem', payload: cart});
    
}