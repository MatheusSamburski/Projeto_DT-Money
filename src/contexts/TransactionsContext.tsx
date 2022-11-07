import {  ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

interface Transactions{
    id: number;
    description: string;
    type: "income" | "outcome"
    price: number;
    category: string;
    createdAt: string;
}

interface CreateTransactionsInput{
    description: string;
    price: number;
    category: string;
    type: "income" | "outcome";
}

interface TransactionContextType{
    transactions: Transactions[];
    fetchTransactions:(query?: string) => Promise<void>;
    createTransactions: (data: CreateTransactionsInput) => Promise<void>
}

interface TrasactionsProviderProps{
    children: ReactNode; 
}

export const TransactionsContext = createContext({} as TransactionContextType); //criando contexto com a tipagem TransactionContextType

export function TransactionsProvider({children}: TrasactionsProviderProps){ 

    const [transactions, setTransactions] = useState<Transactions[]>([]) //useState recebe um array de transactions

    async function fetchTransactions(query?: string){      //função assincrona de buscar transações
       const response = await api.get('/transactions',{  
        params: {
            _sort: "createdAt",  
            _order: "desc",  //ordem decrescente de transações
            q: query,  //para fazer o busca tem que adicionar um q(query)param na url, exemplo: transactions?q=agiotagem
        }
       })
            setTransactions(response.data)  //salva o novo valor dentro das transactions no useState
    }

    const createTransactions = useCallback( async (data: CreateTransactionsInput) => {  //constante de criar transações
        const { description, category, price, type } = data;  //desestrutura o data pegando esses valores

        const response =  await api.post('transactions', {    //puxando a api do axios e adicionando(post) uma nova transação com os seguintes valores
            description,
            category,
            price,
            type,
            createdAt: new Date(),
        })

        setTransactions(state => [response.data,...state]) //pega o estado atual e adiciona mais uma transação
    }, 
        []
    )

    useEffect(() => {
        fetchTransactions()
    }, [])
  

    return(
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}