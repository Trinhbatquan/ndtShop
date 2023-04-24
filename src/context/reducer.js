const SET_ALL_NEWS = 'setAllNews';
const SET_ALERT_TYPE = 'setAlertType'
const POST_IDS = 'postId'
const SET_ALL_PRODUCTS = 'setAllProducts'
const SET_ALL_POSTS = 'setAllPosts'
const SET_SHOP = 'setShops'
const SET_AUTH = 'setAuth'


export const setAllNews = (payload) => {
    return {
        type: SET_ALL_NEWS,
        payload
    }
}
const PRODUCT_ID = 'product_id';
const NEW_ID = 'newId';

 export const setProductId = (payload) => {
    return {
        type: PRODUCT_ID,
        payload
    }
}

export const setPostId = (payload) => {
    return {
        type: POST_IDS,
        payload
    }
}


export const setAlertType = (payload) => {
    return {
        type: SET_ALERT_TYPE,
        payload
    }
}

export const setAllProductsContext = (payload) => {
    return {
        type: SET_ALL_PRODUCTS,
        payload
    }
}

export const setShopContext = (payload) => {
    return {
        type: SET_SHOP,
        payload
    }
}

export const setNewId = (payload) => {
    return {
        type: NEW_ID,
        payload
    }
}

export const setAuth = (payload) => {
    return {
        type: SET_AUTH,
        payload
    }
}

export const setAllPosts = (payload) => {
    return {
        type: SET_ALL_POSTS,
        payload
    }
}


const reducer = (state, action) => {
    switch (action.type) {
        case SET_ALL_NEWS :
            return {

                ...state,
                allNews: action.payload
            }

        case PRODUCT_ID:
            return {
                ...state,
                productId: action.payload
            }

        case POST_IDS:
        return {
            ...state,
            postId: action.payload
        }

        case SET_ALERT_TYPE:
            return {
                ...state,
                alertType: action.payload
            }

        case SET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload
            }

        case SET_SHOP:
        return {
            ...state,
            shop: action.payload
            }

        case NEW_ID:
            return {
                ...state,
                newId: action.payload
                }


        case SET_ALL_POSTS:
            return {
                ...state,
                allPosts: action.payload
                }

        case SET_AUTH:
            return {
                ...state,
                auth: action.payload
                }
        


        default:
            throw new Error('invalid action')
    }
}


export default reducer;