//Dependencias necesarias para este archivo
import styled from 'styled-components';
import {ChannelHeader, MessageList, MessageInput} from 'stream-chat-react';

//Estilos para el container
const Container = styled.div`
width: 100%;
height: 100vh;

.str-chat-header-livestream {
    width: 100%;
    height: 70px;
}

.str-chat__list {
    height: calc(100vh - 70px);
}
.str-chat__input-flat-wrapper {
    position: absolute;
    bottom: 10px;
    width: 100%;
}
`;

//Funcion para mostrar el contenido principal de la pagina
export default function ChannelBody() {
    return(
        <Container>
            <ChannelHeader />
            <MessageList />
            <MessageInput />    
        </Container>
        
    )
}