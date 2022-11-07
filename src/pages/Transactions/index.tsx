import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";
import { useContextSelector } from "use-context-selector";

export function Transactions() {

    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    });

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transactions => {       //map para percorrer as transactions e trazer seus valores
                            return (
                            <tr key={transactions.id}>     {/*retorna o id único de cada transaction*/}
                                <td width="50%">{transactions.description}</td>  {/*retorna a descrição de cada transaction*/}
                                <td>
                                    <PriceHighLight variant={transactions.type}> 
                                        {transactions.type === "outcome"  && "- "}   {/*retorna o tipo de cada transaction*/}
                                        {priceFormatter.format(transactions.price)}  {/*retorna preço de cada transaction*/} 
                                    </PriceHighLight>
                                </td>
                                <td>{transactions.category}</td> {/*retorna a categoria de cada transaction*/}
                                <td>{dateFormatter.format(new Date(transactions.createdAt))}</td> {/*retorna a data de cada transaction*/}
                            </tr>
                        )})}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}