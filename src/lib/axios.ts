import axios from "axios";

export const api = axios.create({  //criando constante com o nome api recebendo a url base desejada
    baseURL:"http://localhost:3335",
});