import { MagnifyingGlass } from "phosphor-react"
import { useForm } from "react-hook-form"
import { SearchFormContainer } from "./styles"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFromSchema = z.object({ //tipagem do zod para validação 
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFromSchema>

export function SearchForm(){

    const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions
    })

    const { register, handleSubmit, formState:{isSubmitting} } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFromSchema),
    })

    async function handleSearchTransactions(data: SearchFormInputs){
        await fetchTransactions(data.query)   //para buscar transações entrou na função fetchTransactions acessou o data pegando o valor de query
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque por transações"
                {...register('query')}
            />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SearchFormContainer>
    )
}