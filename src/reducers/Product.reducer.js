import { productConstant } from "../actions/Constants";

// done by me to display added product immediately 
const initialState = {
    products: [],
    loading: false,
    error: ""
}

// const showProducts = (products, product, categories) => {

//     let newProducts = [];
//     for (let prod of products) {
//         newProducts.push({
//             ...prod
//         })
//     }

//     categories.forEach((cat) => {
//         if (cat._id === product.category) {
//             let category = {
//                 _id: cat._id,
//                 name: cat.name
//             }
//             product.category = category;
//         }
//     })

//     newProducts.push({
//         ...product
//     });
//     return newProducts;
// }

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstant.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;


        case productConstant.ADD_NEW_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstant.ADD_NEW_PRODUCT_SUCCESS:
            state = {
                ...state,
                // products: showProducts(state.products, action.payload.product, action.payload.categories),
                loading: false,
                error:""

            }
            break;
        case productConstant.ADD_NEW_PRODUCT_FAILURE:
            state = {
                ...state,
                error:action.payload.error,
            }
            break;
        case productConstant.UPDATE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstant.UPDATE_PRODUCT_SUCCESS:
            state = {
                ...state,
                // categories: showCategories(state.categories, action.payload.category),
                loading: false

            }
            break;
        case productConstant.UPDATE_PRODUCT_FAILURE:
            state = {
                ...state,
                error:action.payload.error
            }
            break;
        case productConstant.DELETE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstant.DELETE_PRODUCT_SUCCESS:
            state = {
                ...state,
                // categories: showCategories(state.categories, action.payload.category),
                loading: false

            }
            break;
        case productConstant.DELETE_PRODUCT_FAILURE:
            state = {
                ...initialState
            }
            break;
        default: break;
    }
    return state;
}

export default productReducer;