import axios from "axios";
//------------------PASSWORD RESET------------------------------->
export function passwordReset(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/resetPassword`, data,
                {
                    withCredentials: true
                });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

//-----------------RESET TOKEN--------------------------------->
export function passwordResetToken(params = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/resetPassword`,
                {
                    params: params,
                    withCredentials: true
                });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

//------------------NEW PRODUCT------------------------------------->

export function newPost(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post/new`, data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

//----------------GET ALL PRODUCT-------------------------------------------->

export function getAll(params = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/all`,
                {
                    params: params,
                    withCredentials: true
                }
            );
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}



//--------------DELETE PRODUCT---------------------------------------------------->


export function Delete(productId) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/post/${productId}`);
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}


