//Dependencias necesarias para este archivo
import { useEffect, useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import styled from 'styled-components';

//Rutas de los scripts necesarios para este archivo
import ChannelListContainer from './ChannelListContainer';

//Estilos para el container
const Container = styled.div`
    height: 100vh;
    background-color: #333;
    padding: 20px 10px;
    
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h2 {
            color: white;
            margin: 0 0 10px;
            font-size: 16px;
        }
        button {
            color: white;
            font-size: 20px;
            background: none;
            border: none;
            cursor: pointer;
        }
    }

    .str-chat {
        height: mex-content;
        &.str-chat-channel-list {
            float: none;
        }
    }

    .channel-list {
        width: 100%;
        &__message {
            color: white;
        }
    }
`;

//Funcion para mostrar los canales en la lista de canales a los que un usuario esta unido
const randomStr = () => Math.random().toString(36).substring(7);
export default function CustomChannelList({onClickAdd}) {
    const {client} = useChatContext();
    const [channelListKey, setChannelListKey] = useState(randomStr());
    const filters = {
        members: {$in: [client.user.id]},
    };

    useEffect(() => {
        client.on("members.added", () => {
            setChannelListKey(randomStr());
        });
    }, []);

    return (
    <Container>
        <div className='header'>
        <h2>Canales</h2>
        <button onClick={onClickAdd}>+</button>
        </div>
        
        <ChannelList 
            key={channelListKey}
            List={listProps => <ChannelListContainer {...listProps} />}
            filters={filters}
        />
    </Container>
    );
}