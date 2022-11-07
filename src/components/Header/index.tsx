import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from '../../assets/logo.svg';
import { NewTransactionModal } from "../NewTransactionModal";

export function Header(){
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg}  />
                
               <Dialog.Root>        {/* criando um novo modal para adicionar as transactions */}
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>Nova Transação</NewTransactionButton>
                    </Dialog.Trigger>

                    <NewTransactionModal />
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}