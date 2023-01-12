//Dependencias necesarias para este archivo
import styled from 'styled-components';
import { useState } from 'react';

//Rutas de los scripts necesarios para este archivo
import BrowseChannnels from './BrowseChannels';
import CreateChannel from './CreateChannel';

//Estilos para el container
const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 20px;

    .tabs{
        padding: 20px 0;
        border-bottom: 1px solid  #333333;

        button {
            margin-right: 20px;
            background: none;
            padding: 10px 20px;
            cursor: pointer;
            border: 1px solid #333333;
            
            &.active {
                background: #333333;
                color: white;
            }
        }
    }
`;

//Creando botones para entrar a chats y crearlos
const TABS = [
    {
        name: "Entrar",
        id: "browse",
    },
    {
        name: "Crear",
        id: "create",
    },
];


//Funcion para agragar un nuevo canal
export default function AddingChannel({onClose}) {
    const [activeTab, setActiveTab] = useState(TABS[0].id);

    return (
        <Container>
            <div className="tabs">
                {TABS.map((tab) => (
                    <button 
                    className={activeTab === tab.id ? 'active': undefined}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}>
                        {tab.name}
                    </button>
                ))}
                <button onClick={onClose}>Cerrar</button>
            </div>
            {activeTab === "browse" && <BrowseChannnels onClose={onClose} />}
            {activeTab === "create" && <CreateChannel onClose={onClose} />}

        </Container>
    );
} 