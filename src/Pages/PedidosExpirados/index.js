import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.PNG';
import { FiPower } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
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




    async function handleAccept(idS, idB) {
        const alteraStatusS = {
            status: "fechado"
        }
        const alteraStatusB = {
            status: "aceito"
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
        
        return alert('Você aceitou o pedido n#' + idS)
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




    function handleAvaliacoes(idProf) {
        
        setVisibleFin(true);
        localStorage.setItem('idProfAv', idProf);
    }

    async function handleAvaliar(idS, aP, aFP) {
        if(aP === undefined) {
            alert('Você deve avaliar o profissional.');
            return
        }
        if(aFP === undefined) {
            alert('Você deve avaliar a plataforma FacilitaPRO')
        }

        

        setIdProfAv(parseInt(localStorage.getItem('idProfAv')));

        alert('nota prof '+ aP + ' idProf ' + idProfAv);

        setClient_id(30011261);
        
        setValue(parseInt(aP));

        const avalia = {
            client_id,
            value
        }

        alert(avalia.client_id);
        alert(avalia.value);

        
        await api.post(`/client/reviews/31`, avalia, {
                headers: {
                    'Authorization': `Bearer ` + token
                    }
                }
            );
        

        alert('Avaliação Cadastrada com Sucesso.')


        alert('nota prof ' + aP + '\nnota facilita ' + aFP +'\nid serviço '+idS);
    
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
            
            

            {(solicitation.filter(solicitation => solicitation.client_id === cliId).filter(solicitation => solicitation.status === "expirado").length > 0) ?
                <span>     
                    <h3 style={{ marginBottom: 10, marginTop: -15 }}>Você possui {solicitation.filter(solicitation => solicitation.client_id === cliId).length} pedidos</h3>
                 
                    <ul>
                        {solicitation.filter(solicitation => solicitation.client_id === cliId)
                        .sort(({ id: previousID }, { id: currentID }) => -previousID + currentID)
                        .filter(solicitation => solicitation.status === "expirado")
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
                                    .filter(budget => budget.status === "enviado").map(budget => (
                                        <li key={budget.id}>
                                            <p>#{budget.id}</p>
                                            <h2>{professional.filter(professional => professional.id === budget.professional_id).map(professional => (
                                                <li key={professional.id}>
                                                    <p>Nome: {professional.name}</p>
                                                    <p>Profissão: {professional.profession.name}</p>
                                            
                                                    {solicitation.status === "fechado" ? <span>
                                                        <button type="button" onClick={() => handleFinalizar(solicitation.id, budget.id, professional.id)}>Serviço Finalizado</button>
                                                    </span> : null}
                                                    {solicitation.status === "finalizado" ? <span>
                                                        <button type="button" onClick={() => handleAvaliacoes(professional.id)}>Realizar Avaliação</button>
                                                    </span> : null}
                                                </li>
                                            ))}
                                            </h2>
                                            <p>Valor R$ {budget.total}</p>
                                            
                                            <button type="button" onClick={() => handleDetails(budget.professional_id)}>Informações</button>
                                            
                                        </li>
                                ))}</h3>

                                </span>  : null }</p>
                                <p>{(visibleFin === true && solicitation.status === 'finalizado' && solicitation.id === filtraId) ?
                                    <span>
                                        <li>
                                            <p>Parabéns! Seu serviço foi finalizado com sucesso!</p>
                                            <p>Pedimos que você avalie nosso profissional e a plataforma FacilitaPRO</p>
                                            <p>Seu boleto está disponível no E-mail de cadastro</p>
                                            
                                            <form style={{ marginTop: 10}}>
                                                
                                                <Box component="fieldset" mb={3} borderColor="transparent">
                                                    <Typography component="legend">Avaliação do Profissional</Typography>
                                                    <Rating
                                                    name="customized-icons"
                                                    defaultValue={null}
                                                    value={notaProf}
                                                    getLabelText={(value) => customIcons[value].label}
                                                    IconContainerComponent={IconContainer}
                                                    onChange={(event, newValue) => {
                                                        setNotaProf(newValue);
                                                        }}
                                                    />
                                                </Box>
                                                <p>Avaliação do FacilitaPRO</p>
                                                <Rating size="large"
                                                    name="hover-feedback"
                                                    value={notaFP}
                                                    precision={0.5}
                                                    onChange={(event, newValue) => {
                                                    setNotaFP(newValue);
                                                    }}
                                                    onChangeActive={(event, newHover) => {
                                                    setHover(newHover);
                                                    }}
                                                />
                                                {notaFP !== null && <Box ml={2}>{labels[hover !== -1 ? hover : notaFP]}</Box>}
                                                <button onClick={() => handleAvaliar(solicitation.id, notaProf, notaFP)}>Enviar Avaliações</button>
                                            </form>
                                        </li>
                                    </span> : null}</p>
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