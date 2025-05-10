import axios from "../../../config/AxiosConfiguration";
import {IProduct} from "../../model/IProduct.ts";

function handelError(err?: any) {
    throw Error(err)
}


export const fetchAllProducts = async (): Promise<IProduct[]> => {

    const response = await axios.get<IProduct[]>('/products');
    return response.data;

};
export const updateProduct = async (product: IProduct): Promise<IProduct> => {

    const response = await axios.post<IProduct>('/products', product);
    return response.data;
};