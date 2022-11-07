import * as Dialog from "@radix-ui/react-dialog";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form"
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const newTransactionFormSchema = z.object({   //tipagem do zod para validação
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(["income", "outcome"]),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {

    const createTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.createTransactions
    });

    const { control, register, handleSubmit, formState: { isSubmitting }, reset } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: "income"
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {  //evento de criar nova transaction
        const { description, category, price, type } = data;   //desestrutura os valores de data

        await createTransactions({          //espera o contexto de criar transaction com os valores abaixo
            description,
            category,
            price,
            type,
        })
        reset();   //reseta os campos que foram preenchidos
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register("description")}
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        required
                        {...register("price", { valueAsNumber: true })}  //o valor desse input é do tipo number
                    />
                    <input
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register("category")}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={({field}) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                        />

                    <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}