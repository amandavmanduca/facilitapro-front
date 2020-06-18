import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.PNG';
import { FiPower } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
//import { FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faSpinner } from '@fortawesome/free-solid-svg-icons'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { grey } from '@material-ui/core/colors';






export default function Profile() {

    const cliId = parseInt(localStorage.getItem('client_id'));
    const token = localStorage.getItem('token');
    const history = useHistory();



    const [solicitation, setSolicitation] = useState([]);
    const [budget, setBudget] = useState([]);
    const [professional, setProfessional] = useState([]);
    
    const cliNome = localStorage.getItem('cliNome');


    const Nome = cliNome;

    const [visible, setVisible] = useState();
    const [visibleFin, setVisibleFin] = useState();
    localStorage.removeItem('professionalId');

    const[statusS, setStatusS] = useState();
    localStorage.setItem('statusS', statusS);
    

    const[statusB, setStatusB] = useState('');

    const[notaFP, setNotaFP] = useState();
    const[notaProf, setNotaProf] = useState();
    const[hover, setHover] = React.useState(-1);

    const[filtraId, setFiltraId] = useState();

    const[idProfAv, setIdProfAv] = useState();
    const[value, setValue] = useState();
    const[client_id, setClient_id] = useState();




    

    const labels = {
        0.5: '',
        1: 'Não tive uma boa experiência',
        1.5: '',
        2: 'Regular',
        2.5: '',
        3: 'Bom',
        3.5: '',
        4: 'Muito Bom',
        4.5: '',
        5: 'Excelente',
      };

    const[msg, setMsg] = useState('Clique agora para realizar o seu primeiro pedido:')


    if(statusS === '' || statusS === undefined){
        setStatusS('open');
    }


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

    async function handleFinalizar(idS, idB) {
        

        const alteraStatusS = {
            status: "finalizado"
        }
        const alteraStatusB = {
            status: "finalizado"
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
        
        return alert('Que legal! Seu pedido n#' + idS + " foi finalizado!")
    }



    function handleMeusPedidos() {
        setStatusS('open');
        setStatusB('');
        setStatusB('enviado');
        setVisible(false);
        setVisibleFin(false);
    }

    function handleEmAndamento() {
        setStatusS('fechado');
        setStatusB('');
        setStatusB('aceito');
        setMsg('Você não possui nenhum serviço em andamento.')
        setVisible(false);
        setVisibleFin(false);
        
    }

    function handleFinalizados() {
        setStatusS('finalizado');
        setStatusB('');
        setStatusB('aceito');
        setStatusB('finalizado');
        setVisible(false);
        setVisibleFin(false);
        setMsg('Você não possui nenhum serviço finalizado.')
    }

    function handleExpirados() {
        
        setStatusS('expirado');

        
        setStatusB('');
        setVisible(false);
        setVisibleFin(false);
        setMsg('Você não possui nenhum pedido expirado.')
    }

    function handleCancelados() {
        setStatusS('cancelado');
        setStatusB('');
        setVisible(false);
        setVisibleFin(false);
        setMsg('Você não possui nenhum pedido cancelado.')
    }



    const customIcons = {
        1: {
          icon: <SentimentVeryDissatisfiedIcon />,
          label: 'Very Dissatisfied',
        },
        2: {
          icon: <SentimentDissatisfiedIcon />,
          label: 'Dissatisfied',
        },
        3: {
          icon: <SentimentSatisfiedIcon />,
          label: 'Neutral',
        },
        4: {
          icon: <SentimentSatisfiedAltIcon />,
          label: 'Satisfied',
        },
        5: {
          icon: <SentimentVerySatisfiedIcon />,
          label: 'Very Satisfied',
        },
    };
    
    function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }
    
    IconContainer.propTypes = {
        value: PropTypes.number.isRequired,
    };





    

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
                        .filter(solicitation => solicitation.status === 'aberto')
                        .map(solicitation => (
                            <li key={solicitation.id}>
                                <strong>Pedido #{solicitation.id}</strong>
                                <strong>Serviço: {solicitation.services.name}</strong>
                                <p>Período Para Orçamentos: {handleData(solicitation.initialDate)} à {handleData(solicitation.finallyDate)}</p>
                                <strong>DESCRIÇÃO:</strong>
                                <h3>{solicitation.description}</h3>
                                <button style={{ marginRight: 50 }} onClick={() => handleToggle(solicitation.id)} type="button">Ver {solicitation.budgets.filter(budget => budget.status === 'enviado').length} Orçamentos</button>
                                <button style={{ marginTop: 0 }} title="Cancelar" onClick={ () => { if (window.confirm('Você deseja cancelar o pedido ' + solicitation.id + ' ?')) handleCancelar(solicitation.id)} } type="button">
                                    <FiTrash size={18} color="#E02041" />  
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