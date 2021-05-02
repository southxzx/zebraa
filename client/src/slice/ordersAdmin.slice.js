import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderApi from '../api/orderApi'


export const fetchOrdersAdmin = createAsyncThunk(
  'ordersAdmin/GET_ALL',
  async () => {
    const response = await orderApi.getAll();
    return response.data
  }
)

export const updateOrderStatus = createAsyncThunk(
  'ordersAdmin/PUT_STATUS',
  async (data) => {
    const response = await orderApi.updateStatus(data);
    return response;
  }
)

export const reloadOrderAdmin = createAsyncThunk(
  'ordersAdmin/RELOAD',
  async () => {
    const response = await orderApi.getAll();
    return response.data
  }
)

const orderAdminSlice = createSlice({
  name: 'ordersAdmin',
  initialState: {
    loading: true,
    orders: [],
    loadingUpdateStatus: false,
    reload: false,
    filterStatus: 'All'
  },
  reducers: {
    setFilterStatus(state, action){
      state.filterStatus = action.payload || 'All';
    }
  },
  extraReducers: {
    [fetchOrdersAdmin.fulfilled]: (state, action) => {
      state.orders = action.payload || [];
      state.loading = false;
    },
    [updateOrderStatus.pending] : (state, action) => {
      state.loadingUpdateStatus = true;
      state.reload = true;
    },
    [updateOrderStatus.fulfilled] : (state, action) => {
      state.loadingUpdateStatus = false;
    },
    [reloadOrderAdmin.pending] : (state, action) => {
      state.reload = true;
    },
    [reloadOrderAdmin.fulfilled] : (state, action) => {
      state.orders = action.payload || [];
      state.reload = false;
    }
  }
})

export const { setFilterStatus } = orderAdminSlice.actions;

export default orderAdminSlice.reducer