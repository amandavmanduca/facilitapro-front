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
import pagarme from 'pagarme'







export default function ProfileFinalizado() {

    const client_id = parseInt(localStorage.getItem('client_id'));
    const token = localStorage.getItem('token');
    const idProfAv = localStorage.getItem('idProfAv')

    const [solicitation, setSolicitation] = useState([]);
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
    



    const[notaFP, setNotaFP] = useState();
    const[teste, setTeste] = useState();
    const[notaProf, setNotaProf] = useState();
    const[hover, setHover] = React.useState(-1);

    const[filtraId, setFiltraId] = useState();





    async function handleAvaliar() {
        if(notaProf === undefined) {
            alert('Você deve avaliar o profissional.');
            
        }
        else if(notaFP === undefined) {
            alert('Você deve avaliar a plataforma FacilitaPRO')
            
        } else {
            try {

                let value = notaProf
    
                const avaliacoes = {
                    client_id,
                    value
                }
    
                await api.post(`/client/reviews/${idProfAv}`, avaliacoes, {
                    headers: {
                        'Authorization': `Bearer ` + token
                        }
                    }
                );

    
            } catch (err) {
                alert ('Por favor, tente novamente.')
    
            }
    
    
            try {
    
                let value = notaFP
                let user_id = client_id
    
                const avaliacoes = {
                    user_id,
                    value
                }

                await api.post(`/appreviews`, avaliacoes, {
                    headers: {
                        'Authorization': `Bearer ` + token
                        }
                    }
                );
                
                alert('Avaliação Cadastrada com Sucesso.')
    
            } catch (err) {
                alert ('Por favor, tente novamente.')
    
            }

            
            // await api.put(`solicitations/${idS}`, {
            //     body: {
            //         rated: 1
            //     }
            // }, {
            //     headers: {
            //         'Authorization': `Bearer ` + token
            //         }
            //     }
            // );
            
            history.push('/fechados')


        }


    } 


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
        api.get(`/professionals`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setProfessional(response.data)
        })
    }, [solicitation]);

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



    //async function handleAvaliar(aP, aFP) {



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



            

            {(solicitation.filter(solicitation => solicitation.client_id === client_id).filter(solicitation => solicitation.status === "finalizado").length > 0) ?
                <span>     
                    <h3 style={{ marginBottom: 10, marginTop: -15 }}>Você possui {solicitation.filter(solicitation => solicitation.client_id === client_id).length} pedidos</h3>
                 
                    <ul>
                        {solicitation.filter(solicitation => solicitation.client_id === client_id)
                        .sort(({ id: previousID }, { id: currentID }) => -previousID + currentID)
                        .filter(solicitation => solicitation.status === "finalizado")
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
                                <strong>DESCRIÇÃO:</strong>
                                <h3>{solicitation.description}</h3>
                                <button onClick={() => handleToggle(solicitation.id)} type="button">Ver Detalhes</button>
                                <p className="status">Status: {solicitation.status}</p>
                                <p>{visible ?
                                <span>
                                    <h3>{solicitation.budgets.filter(budget => budget.solicitation_id === filtraId)
                                    .filter(budget => budget.status === "finalizado").map(budget => (
                                        <li key={budget.id}>
                                            <p>#{budget.id}</p>
                                            <h2>{professional.filter(professional => professional.id === budget.professional_id).map(professional => (
                                                <li key={professional.id}>
                                                    <p>{professional.name}</p>
                                                    <p>{professional.profession.name}</p>
                  


                                                    <button style={{ marginTop: 0, marginRight: -25 }} type="button" onClick={() => handleAvaliacoes(professional.id)}>Realizar Avaliação</button>

                                                </li>
                                            ))}
                                            </h2>
                                            <p>Valor R$ {budget.total}</p>
                                            
                                            <button style={{ marginTop: 0, marginLeft: 0 }} type="button" onClick={() => handleDetails(budget.professional_id)}>Informações</button>
                                            
                                        </li>
                                ))}</h3>

                                </span>  : null }</p>
                                
                                
                                <p>{(visibleFin === true && solicitation.status === 'finalizado' && solicitation.id === filtraId) ?
                                    <span>
                                        {solicitation.rated === 0 ?
                                            <li>
                                                <p>Parabéns! Seu serviço foi finalizado com sucesso!</p>
                                                <p>Pedimos que você avalie nosso profissional e a plataforma FacilitaPRO</p>
                                                <p>Seu boleto está disponível no E-mail de cadastro</p>
                                                <p> </p>
                                                
                                                <form onSubmit={handleAvaliar}>
                                                    
                                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                                        <Typography component="legend">Avaliação do Profissional</Typography>
                                                        <Rating
                                                        name="customized-icons"
                                                        defaultValue={null}
                                                        value={notaProf}
                                                        onChange={e => setNotaProf(e.target.value)}
                                                        getLabelText={(value) => customIcons[value].label}
                                                        IconContainerComponent={IconContainer}
                                                        
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
                                                    
                                                    <button style={{ marginLeft: 30 }} type="submit">Enviar Avaliações</button>
                                                </form>
                                            </li>
                                        :
                                        <li>
                                            <p>Serviço Avaliado com Sucesso!</p>
                                        </li>}
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