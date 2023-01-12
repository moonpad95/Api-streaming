//Dependencias necesarias para este archivo
import styled from 'styled-components';
import { useChatContext} from 'stream-chat-react';
import { useEffect, useState } from 'react';

//Rutas de los scripts necesarios para este archivo
import ChannelItem from './ChannelItem';

//Estilos para el container
const Container = styled.div`
    display: flex;

    ul {
        width: 100%;
        padding: 0;
    }
`;

//Funcion para entrar a nuevos canales
export default function BrowseChannnels({ onClose }) {
    const {client, setActiveChannel} = useChatContext()
    const [channels, setChannels] = useState([])
    const [loadingChannels, setLoadingChannels] = useState(true)

    useEffect(() => {
        const fetchChannels = async () => {
            const response = await client.queryChannels();

            const filteredChannels  = response.filter(c => c.type === 'team');
            setChannels(filteredChannels);
            setLoadingChannels(false);
        };
        fetchChannels()
    }, []);

    const joinChannel = (id) => {
        const channel = channels.find(c => c.id === id)

        if(!channel) return onClose();

        channel.addMembers([client.user.id]);
        setActiveChannel(channel);

        onClose();
    }

    return (
        <Container>
            {loadingChannels ? (
            <div className='loading-text'>Cargando canales...</div>
            ) : (
                <ul>
                    {channels.map((c) => (
                        <ChannelItem key={c.cid} onJoin={joinChannel} channel={c} /> 
                    ))}
                </ul>
                
            )}
        </Container>
    )
}