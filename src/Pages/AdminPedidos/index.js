import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.PNG';

import { FiTrash2 } from 'react-icons/fi';
//import { FiTrash22 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api'

import HeaderAdmin from '../../HeaderAdmin'






export default function Profile() {


    const token = localStorage.getItem('admin_token');
    const Nome = localStorage.getItem('adminNome');




    const [solicitation, setSolicitation] = useState([]);
    const [clients, setClients] = useState([]);
    const [budget, setBudget] = useState([]);
    const [professional, setProfessional] = useState([]);
    const [statusBusca, setStatusBusca] = useState('aberto');
    
    


    const [visible, setVisible] = useState();
    const [visibleFin, setVisibleFin] = useState();
    localStorage.removeItem('professionalId');

    const[filtraId, setFiltraId] = useState();



    function handleToggle(idFilter) {
        setVisible(!visible)
        setFiltraId(idFilter)
        setVisibleFin(false)
        localStorage.setItem('idFilter', idFilter);
    }


    
    useEffect(() => {
        api.get(`/solicitations`, {
            headers: {
                //'Authorization': `Bearer ` + token
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE1OTI0ODM5NTMsImV4cCI6MTU5MjU3MDM1M30.IcnsraME-ith9kXDWgaFh-soyGZE03CLERXPInx_TKM`
                }
            })
            .then(response => {
                setSolicitation(response.data)
        })
    }, );

    useEffect(() => {
        api.get(`/budgets`, {
            headers: {
                //'Authorization': `Bearer ` + token
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE1OTI0ODM5NTMsImV4cCI6MTU5MjU3MDM1M30.IcnsraME-ith9kXDWgaFh-soyGZE03CLERXPInx_TKM`
                }
            })
            .then(response => {
                setBudget(response.data)
        })
    }, );

    useEffect(() => {
        api.get(`/professionals`, {
            headers: {
                //'Authorization': `Bearer ` + token
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE1OTI0ODM5NTMsImV4cCI6MTU5MjU3MDM1M30.IcnsraME-ith9kXDWgaFh-soyGZE03CLERXPInx_TKM`
                }
            })
            .then(response => {
                setProfessional(response.data)
        })
    }, );

    useEffect(() => {
        api.get(`/clients`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setClients(response.data)
        })
    }, );




    function handleData(data) {
        const NewData = (data.substr(0,10).split('-'));
        return NewData[2] + '/' + NewData[1] + '/' + NewData[0];
    }


    async function handleCancelar(idS) {
        
        const alteraStatusS = {
            status: "cancelado"
        }

        await api.put(`/solicitations/${idS}`, alteraStatusS, {
            headers: {
                //'Authorization': `Bearer ` + token
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE1OTI0ODM5NTMsImV4cCI6MTU5MjU3MDM1M30.IcnsraME-ith9kXDWgaFh-soyGZE03CLERXPInx_TKM`
                }
            }
        );

        alert('Pedido Cancelado com Sucesso.')
                
    }

    async function handleCancelarBudget(idB, totalB) {
        
        const alteraStatusB = {
            status: "cancelado",
            total: totalB
        }

        await api.put(`/budgets/${idB}`, alteraStatusB, {
            headers: {
                //'Authorization': `Bearer ` + token
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE1OTI0ODM5NTMsImV4cCI6MTU5MjU3MDM1M30.IcnsraME-ith9kXDWgaFh-soyGZE03CLERXPInx_TKM`
                }
            }
        );

        alert('Orçamento Cancelado com Sucesso.')
                
    }



    async function handleWhatsApp(phone) {
        const nu = phone.split(' ').join('')
        const n = nu.split('-').join('')
        const num = n.split(')').join('')
        const wp = (num.split('(').join(''))
        const link = "https://wa.me/55" + wp
        window.open(link)
    }

    


    

    return (
        <div>
            <HeaderAdmin />
        
            <div className="div profile-container">
                

                <header>
                    <img src={logoImg} alt="FacilitaPRO" />
                    <span>Bem vindo, {Nome}</span>

                    
                </header>
                <body style={{display: "flex", justifyContent: "space-between"}}>
                    <section>
                        <h3 style={{ marginTop: 20 }}>Filtrar Pedidos por Status</h3>
                        <select value={statusBusca} onChange={e => setStatusBusca(e.target.value)}>
                            <option value="aberto">Aberto</option>
                            <option value="fechado">Fechado</option>
                            <option value="expirado">Expirado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </section>
                    <section>
                        <div style={{ marginRight: 100 }}>
                            <h3>Dados Gerais</h3>
                            <li>{solicitation.length} Pedidos</li>
                            <li>{budget.length} Orçamentos</li>
                            <li>{professional.length} Profissionais</li>
                            <li>{clients.length} Clientes</li>
                        </div>
                    </section>
                </body>

                
                <h1>Listagem de Pedidos</h1>
                
                

                {(solicitation.length > 0) ?
                    <span>     

                        <ul>
                            {solicitation
                            .filter(solicitation => solicitation.status === statusBusca)
                            .map(solicitation => (
                                <li key={solicitation.id}>
                                    <strong>Pedido #{solicitation.id}</strong>
                                    <strong>Cliente #{solicitation.client_id}</strong>
                                    <strong>
                                        {clients.filter(client => client.id === solicitation.client_id).map(client => (
                                            <div>
                                                <strong key={client.id}>{client.name} Contato: [ {client.phone}, {client.email} ]</strong>
                                                <button className="new-Button" type="button" onClick={() => handleWhatsApp(client.phone)}>Enviar WhatsApp</button>
                                            </div>                                         
                                        ))}
                                    </strong>
                                    <strong>Endereço: {solicitation.address.street} nº{solicitation.address.number} [{solicitation.address.complement}]</strong>
                                    <br />
                                    <strong>Serviço: {solicitation.services.name}</strong>
                                    <p style={{ margin: 0 }}>Período Para Orçamentos: {handleData(solicitation.initialDate)} à {handleData(solicitation.finallyDate)}</p>
                                    <strong>DESCRIÇÃO:</strong>
                                    <h3>{solicitation.description}</h3>
                                    {(solicitation.budgets.length) > 0 ?
                                        <button style={{ marginRight: 50 }} onClick={() => handleToggle(solicitation.id)} >Ver {solicitation.budgets.length} Orçamentos</button>
                                        : <button style={{ marginRight: 50 }} type="button">Não possui Orçamentos</button> }
                                    
                                    <button style={{ marginTop: 0 }} title="Cancelar" onClick={ () => { if (window.confirm('Você deseja cancelar o pedido ' + solicitation.id + ' ?')) handleCancelar(solicitation.id)} } type="button">
                                        <FiTrash2 size={18} color="#E02041" />  
                                    </button>
                                    <p className="status">Status: {solicitation.status}</p>
                                    <p>{visible ?
                                    <span>
                                        <h3>{solicitation.budgets.filter(budget => budget.solicitation_id === filtraId)
                                        .map(budget => (
                                            <li key={budget.id}>

                                                <p>#{budget.id}</p>
                                                {(budget.status === 'aceito') ?
                                                <p style={{color: "red" }}>ORÇAMENTO {budget.status}</p>
                                                : <p>ORÇAMENTO {budget.status}</p>}
                                                <h2>{professional.filter(professional => professional.id === budget.professional_id).map(professional => (
                                                    <li key={professional.id}>
                                                        <p>#{professional.id}</p>
                                                        <p>{professional.name}</p>
                                                        <p>{professional.profession.name}</p>
                                                        <br />
                                                        <p>{professional.phone}</p>
                                                        <p>{professional.email}</p>

                                                        <button style={{color: "black"}} className="new-Button" type="button" onClick={() => handleWhatsApp(professional.phone)}>Enviar WhatsApp</button>

                                                    </li>
                                                ))}
                                                </h2>
                                                
                                                <p>Total R$ {budget.total}</p>
                                                <p>Taxa FacilitaPRO R$ {budget.tax}</p>

                                                
                                                <button type="button" style={{ backgroundColor: "transparent", marginTop: 0 }} title="Cancelar" onClick={ () => { if (window.confirm('Você deseja cancelar o orçamento ' + budget.id + ' ?')) handleCancelarBudget(budget.id, budget.total)} } >
                                                    <FiTrash2 size={18} color="#E02041" />  
                                                </button>
                                            </li>
                                    ))}</h3>
                                    </span>  : null }</p>
                                </li>
                            ))}       
                        </ul>
                    </span>
                        :   <span>
                                <h2 style={{color: 'grey'}}>... Carregando Listagem de Pedidos</h2>
                            </span>
                        }
            </div>
        </div>
    );
}