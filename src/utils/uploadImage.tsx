import axios from "axios"

export const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "od7lpeqi");
    return axios.post(`https://api.cloudinary.com/v1_1/ddhb3f9rg/image/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    }).then((res: any) => {
        return res?.data?.secure_url
    })
        .catch((err: any) => {
            const data = {
                data: {
                    message: err.response?.data?.error?.message
                }
            }
            return data;
        });
}