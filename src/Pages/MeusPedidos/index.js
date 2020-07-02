import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.PNG';
import { FiPower } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api'







export default function Profile() {

    const cliId = parseInt(localStorage.getItem('client_id'));
    const token = localStorage.getItem('token');
    const history = useHistory();



    const [solicitation, setSolicitation] = useState([]);
    const [budget, setBudget] = useState([]);
    const [professional, setProfessional] = useState([]);
    const [service, setService] = useState([]);
    
    const cliNome = localStorage.getItem('cliNome');


    const Nome = cliNome;

    const [visible, setVisible] = useState();
    const [visibleFin, setVisibleFin] = useState();
    localStorage.removeItem('professionalId');
    
    const[filtraId, setFiltraId] = useState();





    const[msg, setMsg] = useState('Clique agora para realizar o seu primeiro pedido:')


    function handleToggle(idFilter) {
        setVisible(!visible)
        setFiltraId(idFilter)
        setVisibleFin(false)
        localStorage.setItem('idFilter', idFilter);
    }


    
    useEffect(() => {
        api.get(`/solicitations`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setSolicitation(response.data)
        })
    }, );

    useEffect(() => {
        api.get(`/services/paranoid`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setService(response.data)
        })
    }, );

    useEffect(() => {
        api.get(`/budgets`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setBudget(response.data)
        })
    }, );

    useEffect(() => {
        api.get(`/professionals`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setProfessional(response.data)
        })
    }, );


    function handleLogout() {
                     
        localStorage.clear();
        history.push('/');
    }

    function handleHome() {
                     
        history.push('/');
    }

    function handleDetails(idprof) {
        localStorage.setItem('professionalId', idprof);

        history.push('/detalhesprof')
    }


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
                'Authorization': `Bearer ` + token
                }
            }
        );

        alert('Pedido Cancelado com Sucesso.')
                
    }




    async function handleAccept(idS, idB, bValue, bTax) {
        const alteraStatusS = {
            status: "fechado"
        }
        const alteraStatusB = {
            status: "aceito",
            value: bValue,
            tax: bTax
        }

        await api.put(`/solicitations/${idS}`, alteraStatusS, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            }
        );
        await api.put(`/budgets/${idB}`, alteraStatusB, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            }
        );
        
        alert('Você aceitou o pedido n#' + idS)
        history.push('/andamento')
    }



    return (
        <div className="div profile-container">
            <header>
                <img src={logoImg} alt="FacilitaPRO" />
                <span>Bem vindo, {Nome}</span>
                <Link className="button" to="/pedido">Solicitar Novo Orçamento</Link>
                <button title="Novo Endereço" onClick={handleHome} type="button">
                    <AiFillHome size={28} color="#E02041" />  
                </button>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            
            <div className="div profile-container">
                <Link className="buttonMenu" to="/main">Meus Pedidos</Link>
                <Link className="buttonMenu" to="/andamento">Serviços em Andamento</Link>
                <Link className="buttonMenu" to="/fechados">Serviços Finalizados</Link>
                <Link className="buttonMenu" to="/expirados">Serviços Expirados</Link>
                <Link className="buttonMenu" to="/cancelados">Serviços Cancelados</Link>
            </div>
            
            <h1>Listagem de Pedidos</h1>
            
            

            {(solicitation.filter(solicitation => solicitation.client_id === cliId).filter(solicitation => solicitation.status === "aberto").length > 0) ?
                <span>     
                    <h3 style={{ marginBottom: 10, marginTop: -15 }}>Você possui {solicitation.filter(solicitation => solicitation.client_id === cliId).length} pedidos</h3>
                 
                    <ul>
                        {solicitation.filter(solicitation => solicitation.client_id === cliId)
                        .sort(({ id: previousID }, { id: currentID }) => -previousID + currentID)
                        .filter(solicitation => solicitation.status === 'aberto')
                        .map(solicitation => (
                            <li key={solicitation.id}>
                                <strong>Pedido #{solicitation.id}</strong>
                                <strong>Serviço: {service.filter(service => service.id === solicitation.service_id).map(service => (
                                    <span key={service.id}>
                                        <h3>{service.name}</h3>
                                    </span>
                                ))}
                                </strong>
                                <img style={{maxWidth: 200}} src={solicitation.photoUrl} alt="Foto"/>
                                <p>Período Para Orçamentos: {handleData(solicitation.initialDate)} à {handleData(solicitation.finallyDate)}</p>
                                <strong>DESCRIÇÃO:</strong>
                                <h3>{solicitation.description}</h3>
                                <button style={{ marginRight: 50 }} onClick={() => handleToggle(solicitation.id)} type="button">Ver {solicitation.budgets.filter(budget => budget.status === 'enviado').length} Orçamentos</button>
                                <button style={{ marginTop: 0 }} title="Cancelar" onClick={ () => { if (window.confirm('Você deseja cancelar o pedido ' + solicitation.id + ' ?')) handleCancelar(solicitation.id)} } type="button">
                                    <FiTrash2 size={18} color="#E02041" />  
                                </button>
                                <p className="status">Status: {solicitation.status}</p>
                                <p>{visible ?
                                <span>
                                    <h3>{solicitation.budgets.filter(budget => budget.solicitation_id === filtraId)
                                    .filter(budget => budget.status === "enviado").map(budget => (
                                        <li key={budget.id}>
                                            <p>#{budget.id}</p>
                                            <h2>{professional.filter(professional => professional.id === budget.professional_id).map(professional => (
                                                <li key={professional.id}>
                                                    <p>{professional.name}</p>
                                                    <p>{professional.profession.name}</p>

                                                    <button style={{ marginTop: 0, marginRight: -25 }} type="button" onClick={() => handleAccept(solicitation.id, budget.id, budget.value, budget.tax)}>Aceitar</button>

                                                </li>
                                            ))}
                                            </h2>
                                            <p>Valor R$ {budget.total}</p>
                                            
                                            <button type="button" onClick={() => handleDetails(budget.professional_id)}>Informações</button>
                                            
                                        </li>
                                ))}</h3>

                                </span>  : null }</p>
                                
                            </li>
                        ))}
                                    
                    </ul>

                </span>
                     
                     :   <span>
                            <p>{msg}</p>
                            <button className="buttonFk2" onClick={() => history.push('/pedido')}>Solicitar Orçamento</button>
                         </span>
         
                     }


        </div>
        
    );
}