import { IJankableResult, IJankableGet } from "./interfaces";
import Axios from "axios";

export const getData = async (request: IJankableGet): Promise<IJankableResult> => {
    const endpoint = "http://maturita.delta-studenti.cz/prakticka/cvicna-tajne-funkce/tajne-funkce.php";

    const res = await Axios.get(endpoint, {params: request});

    return res.data;
};