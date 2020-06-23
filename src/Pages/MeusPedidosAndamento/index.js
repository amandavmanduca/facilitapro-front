import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.PNG';
import { FiPower } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import './styles.css';
import api from '../../services/api'
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';






export default function ProfileAndamento() {

    const cliId = parseInt(localStorage.getItem('client_id'));
    const token = localStorage.getItem('token');




    const [solicitation, setSolicitation] = useState([]);
    const [budget, setBudget] = useState([]);
    const [professional, setProfessional] = useState([]);
    const [service, setService] = useState([]);
    
    const cliNome = localStorage.getItem('cliNome');
    const history = useHistory();

    const Nome = cliNome;

    const [visible, setVisible] = useState();
    const [visibleFin, setVisibleFin] = useState();
    localStorage.removeItem('professionalId');
    

    const[notaFP, setNotaFP] = useState();
    const[notaProf, setNotaProf] = useState();
    const[hover, setHover] = React.useState(-1);

    const[filtraId, setFiltraId] = useState();

    const[idProfAv, setIdProfAv] = useState();
    const[value, setValue] = useState();
    const[client_id, setClient_id] = useState();




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

    useEffect(() => {
        api.get(`/services`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setService(response.data)
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


    async function handleFinalizar(idS, idB, bValue, bTax) {
        

        const alteraStatusS = {
            status: "finalizado"
        }
        const alteraStatusB = {
            status: "finalizado",
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

        history.push('/fechados')
        
        return alert('Que legal! Seu pedido n#' + idS + " foi finalizado!")
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
            
            

            {(solicitation.filter(solicitation => solicitation.client_id === cliId).filter(solicitation => solicitation.status === "fechado").length > 0) ?
                <span>     
                    <h3 style={{ marginBottom: 10, marginTop: -15 }}>Você possui {solicitation.filter(solicitation => solicitation.client_id === cliId).length} pedidos</h3>
                 
                    <ul>
                        {solicitation.filter(solicitation => solicitation.client_id === cliId)
                        .sort(({ id: previousID }, { id: currentID }) => -previousID + currentID)
                        .filter(solicitation => solicitation.status === "fechado")
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
                                <button onClick={() => handleToggle(solicitation.id)} type="button">Ver Detalhes</button>
                                <p className="status">Status: {solicitation.status}</p>
                                <p>{visible ?
                                <span>
                                    <h3>{solicitation.budgets.filter(budget => budget.solicitation_id === filtraId)
                                    .filter(budget => budget.status === "aceito").map(budget => (
                                        <li key={budget.id}>
                                            <p>#{budget.id}</p>
                                            <h2>{professional.filter(professional => professional.id === budget.professional_id).map(professional => (
                                                <li key={professional.id}>
                                                    <p>{professional.name}</p>
                                                    <p>{professional.profession.name}</p>
                                                    <button className="new-Button" style={{backgroundColor: "transparent", color: "black", fontSize: 14 }} type="button" onClick={() => handleWhatsApp(professional.phone)}>{professional.phone}</button>
                                            
                                                    <button style={{ marginTop: 0, marginRight: -25 }} type="button" onClick={() => handleFinalizar(solicitation.id, budget.id, budget.value, budget.tax)}>Serviço Finalizado</button>
                                                    
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
                            
                            <button className="buttonFk2" onClick={() => history.push('/pedido')}>Solicitar Orçamento</button>
                         </span>
         
                     }


        </div>
        
    );
}