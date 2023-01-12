//Dependencias necesarias para este archivo
import {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import styled from 'styled-components';
import {Channel, Chat} from 'stream-chat-react';

//Rutas de los scripts necesarios para este archivo
import CustomChannelList from './components/CustomChannelList';
import 'stream-chat-react/dist/css/index.css';
import ChannelBody from './components/ChannelBody';
import AddingChannel from './components/AddingChannel/AddingChannel';

//Estilos para el container
const  Container = styled.div`
  display: flex;
  .left-column {
    width: 300px;
  }

  .right-column {
    flex: 1;
  }
`;

//Variable de entorno que guardan el token de la API
const API_KEY=process.env.REACT_APP_API_KEY


//Usuarios predefinidos para utilizar de forma local
const USER1 = {
  id: "user1",
  name: "user1",
  image: "https://picsum.photos/id/195/200/300",
};

const USER2 = {
  id: "user2",
  name: "user2",
  image: "https://picsum.photos/id/195/200/300",
};

const USER3 = {
  id: "user3",
  name: "user3",
  image: "https://picsum.photos/id/195/200/300",
};


//Arreglo con los usuarios y funcion para elegirlos de forma aleatoria
const users = [USER1, USER2, USER3];
const getRandomUser = () => {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex]; 
}

//Funcion principal para iniciar la aplicación
function App() {

  //Funciones importadas desde react
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [addingTeamChannel, setAddingTeamChannel] = useState(false);


  //Creando el canal general
  useEffect(() => {
    async function initChat() {
      const client =StreamChat.getInstance(API_KEY);

      const user = getRandomUser()

      client.connectUser(user, client.devToken(user.id));

      const channel = client.channel("team", "general", {
        name: "General",
        image: "https://picsum.photos/id/195/200/300",
      })

      await channel.create()
      channel.addMembers([user.id])
      setChannel(channel)

      setChatClient(client);
    }

    initChat();

    return () => {
      if(chatClient) chatClient.disconnectUser()
    }
  }, []);

  if(!chatClient || !channel) return <></>;


  //Contenido html que se mostrará al iniciar la aplicacion
  return (
    <div>
      <Chat client={chatClient} theme={'messaging light'}>
        <Container>
          <div className='left-column'>
            <CustomChannelList onClickAdd={() => setAddingTeamChannel(true)} />
          </div>
          <div className='right-column'>
            <Channel>
              {addingTeamChannel ? (
              <AddingChannel onClose={() => setAddingTeamChannel(false)} />
              ) : (
              <ChannelBody />
            )} 
            </Channel>
          </div>
        </Container>
      </Chat>
    </div>
  );
}

export default App;
