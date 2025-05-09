import axios from "../../../config/AxiosConfiguration";
 import {IProducts} from "../../model/IProduct";

function handelError(err?: any) {
    throw Error(err)
}



export const getAllProducts = async (): Promise<IProducts[]> => {
    try {
        const response = await axios.get<IProducts[]>('/api/products');
        return response.data;
    } catch (error) {
        handelError(error);
    }
};