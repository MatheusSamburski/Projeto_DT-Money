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

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}: TrasactionsProviderProps){

    const [transactions, setTransactions] = useState<Transactions[]>([])

    async function fetchTransactions(query?: string){
       const response = await api.get('/transactions',{
        params: {
            _sort: "createdAt",
            _order: "desc",
            q: query,
        }
       })
            setTransactions(response.data)
    }

    const createTransactions = useCallback( async (data: CreateTransactionsInput) => {
        const { description, category, price, type } = data;

        const response =  await api.post('transactions', {
            description,
            category,
            price,
            type,
            createdAt: new Date(),
        })

        setTransactions(state => [response.data,...state]) 
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