import axios from "axios"


const baseUrl = 'https://5369-171-224-181-255.ngrok-free.app/'


//products
export const getAllProducts = async () => {
    try {

        const allProducts = await axios.get(`${baseUrl}api/product/?page=1&perPage=1000`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        })
        if (allProducts) {
            return allProducts?.data?.result?.data
        } else {
            return null;
        }

    } catch (error) {
        console.log("getAllProduct" + error)
    }
}

// https://358a-171-224-181-255.ngrok-free.app/api/shop/?page=1&perPage=1000


//shop
export const getShop = async () => {
    try {

        const shop = await axios.get(`${baseUrl}api/shop/?page=1&perPage=1000`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        })
        if (shop) {
            console.log( shop?.data?.result?.data)
            return shop?.data?.result?.data
        } else {
            return null;
        }

    } catch (error) {
        console.log("shop" + error)
    }
}


//new



//getAllNews
export const getNews = async () => {
    try {

        const New = await axios.get(`${baseUrl}api/news/?page=1&perPage=1000`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        })
        if (New) {
            console.log( New?.data?.result?.data)
            return New?.data?.result?.data
        } else {
            return null;
        }

    } catch (error) {
        console.log("allNew" + error)
    }
}

//getNewById
export const getNewsById = async (id) => {
    try {

        const New = await axios.get(`${baseUrl}api/news/${id}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        })
        if (New) {
            return New?.data?.data
        } else {
            return null;
        }

    } catch (error) {
        console.log("newId" + error)
    }
}

//createNew
export const createNew = async (body) => {
    try {

        const New = await axios.post(`${baseUrl}api/news/`, 
        {

           ...body
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        })
        if (New) {
           if (New?.data?.message === "Successful response") {
            return true;
           }
          
        } else {
            return null;
        }

    } catch (error) {
        console.log("createNew" + error)
    }
}

//deleteNew
export const deleteNew = async (id) => {
    try {

        const New = await axios.delete(`${baseUrl}api/news/${id}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        })
        if (New?.data?.message === "Successful response") {
            return true
        } else {
            return null;
        }

    } catch (error) {
        console.log("delete" + error)
    }
}



//post
export const getPosts = async () => {
    try {

        const Post = await axios.get(`${baseUrl}api/post/report`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        })
        if (Post) {
            return Post?.data?.data
        } else {
            return null;
        }

    } catch (error) {
        console.log("post" + error)
    }
}