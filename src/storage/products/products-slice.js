import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TABS_ID } from "../../utils/constants";
import { isLiked } from "../../utils/products";

const initialState = {
    data: [],
    currentSort: '',
    favoriteProducts: [],
    total: 0,
    loading: true,
    error: null,
}

export const sliceName = 'products';

export const fetchProducts = createAsyncThunk(
    `${sliceName}/fetchProducts`,
    async function (_, { fulfillWithValue, rejectWithValue, getState, extra: api }) {
        try {
            const { user } = await getState();
            const data = await api.getProductsList();
            return fulfillWithValue({ ...data, currentUser: user.data });
        }
        catch (err) {
            return rejectWithValue(err)
        }
    }
)


export const fetchChangeLikeProduct = createAsyncThunk(
    `${sliceName}/fetchChangeLikeProduct`,
    async function (product, { fulfillWithValue, rejectWithValue, getState, extra: api }) {

        try {
            const { user } = await getState();
            const liked = isLiked(product.likes, user.data._id);
            const data = await api.changeLikeProductStatus(product._id, liked);
            return fulfillWithValue({ product: data, liked });
        }

        catch (err) {
            return rejectWithValue(err)
        }
    }
)


const productsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        sortedProducts: (state, action) => {
            switch (action.payload) {
                case (TABS_ID.CHEAP):
                    state.data = state.data.sort((a, b) => a.price - b.price);
                    state.currentSort = action.payload;
                    break;
                case (TABS_ID.LOW): state.data = state.data.sort((a, b) => b.price - a.price);
                    state.currentSort = action.payload;
                    break;
                case (TABS_ID.DISCOUNT): state.data = state.data.sort((a, b) => b.discount - a.discount);
                    state.currentSort = action.payload;
                    break;
                default:
                     state.data = state.data.sort((a, b) => a.price - b.price);
                     state.currentSort = TABS_ID.DISCOUNT;
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                const { products, total, currentUser } = action.payload;
                state.data = products;
                state.total = total;
                state.favoriteProducts = products.filter(item => isLiked(item.likes, currentUser._id))
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            .addCase(fetchChangeLikeProduct.fulfilled, (state, action) => {
                const { product, liked } = action.payload;

                state.data = state.data.map(cardState => {
                    return cardState._id === product._id ? product : cardState
                })
                if (!liked) {
                    state.favoriteProducts.push(product);
                } else {
                    state.favoriteProducts = state.favoriteProducts.filter(card => card._id !== product._id)
                }
                state.loading = false;

            })

            .addCase(fetchChangeLikeProduct.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

    }
})
export const { sortedProducts } = productsSlice.actions;
export default productsSlice.reducer;