import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.PNG';
import { FiPower } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
//import { FiTrash22 } from 'react-icons/fi';
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
import HeaderAdmin from '../../HeaderAdmin'
import { PieChart } from 'react-minimal-pie-chart';




export default function Profile() {

    const cliId = parseInt(localStorage.getItem('client_id'));
    const token = localStorage.getItem('admin_token');
    const Nome = localStorage.getItem('adminNome');
    const [link, setLink] = useState();
    const [name, setName] = useState('');



    const [solicitation, setSolicitation] = useState([]);
    const [clients, setClients] = useState([]);
    const [budget, setBudget] = useState([]);
    const [professional, setProfessional] = useState([]);
    const [statusBusca, setStatusBusca] = useState('aberto');
    
    
    const history = useHistory();



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
    },[professional] );

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


    

    async function handleExcluir(id) {
        
        try {
            await api.delete(`/clients/${id}`, {
                headers: {
                    //'Authorization': `Bearer ` + token
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE1OTI0ODM5NTMsImV4cCI6MTU5MjU3MDM1M30.IcnsraME-ith9kXDWgaFh-soyGZE03CLERXPInx_TKM`
                }
            });

            alert('Cliente Excluído com Sucesso.')

        } catch {
            alert('Erro ao Excluir Cliente.')
        }
        
    }

    

    const pieDados = [
        Number([clients.filter(client => client.recommendation === 'facebook').length]),
        Number([clients.filter(client => client.recommendation === 'instagram').length]),
        Number([clients.filter(client => client.recommendation === 'indicação').length]),
        Number([clients.filter(client => client.recommendation === 'google').length]),
        Number([clients.filter(client => client.recommendation === 'outro').length]),
    ]


    const pieDadosPedidos = [
        Number([solicitation.filter(solicitation => solicitation.status === "aberto").length]),
        Number([solicitation.filter(solicitation => solicitation.status === "fechado").length]),
        Number([solicitation.filter(solicitation => solicitation.status === "finalizado").length]),
        Number([solicitation.filter(solicitation => solicitation.status === "cancelado").length]),
        Number([solicitation.filter(solicitation => solicitation.status === "expirado").length])
    ]

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
                <header style={{ marginBottom: 30 }}>
                    <img src={logoImg} alt="FacilitaPRO" />
                    <span>Bem vindo, {Nome}</span>


                </header>
                <body style={{display: "flex", justifyContent: "space-between"}}>
                <section>

                    <div style={{ marginRight: 30, marginTop: 20 }}>
                        <h3>Recomendações</h3>
                        <li>{clients.length} Clientes</li>
                        <li style={{ backgroundColor: "#DCDCDC"}}>{clients.filter(client => client.recommendation === 'facebook').length} Facebook</li>
                        <li style={{ backgroundColor: "#FAF0E6"}}>{clients.filter(client => client.recommendation === 'instagram').length} Instagram</li>
                        <li style={{ backgroundColor: "#FFDAB9"}}>{clients.filter(client => client.recommendation === 'indicação').length} Indicação</li>
                        <li style={{ backgroundColor: "#E6E6FA"}}>{clients.filter(client => client.recommendation === 'google').length} Google</li>
                        <li style={{ backgroundColor: "#FFE4E1"}}>{clients.filter(client => client.recommendation === 'outro').length} Outro</li>
                    </div>

                </section>
                <section>
                    <h4 style={{ marginRight: 110, textAlign: "right" }}>Gráfico de Recomendações</h4>
                    <PieChart style={{ marginTop: 20, height: 100, marginRight: 100 }}
                        data={[
                            { title: 'Facebook', value: pieDados[0], color: '#DCDCDC' },
                            { title: 'Instagram', value: pieDados[1], color: '#FAF0E6' },
                            { title: 'Indicação', value: pieDados[2], color: '#FFDAB9' },
                            { title: 'Google', value: pieDados[3], color: '#E6E6FA' },
                            { title: 'Outro', value: pieDados[4], color: '#FFE4E1' },
                        ]}
                    />
                </section>
                <section>
                    <div style={{ marginRight: 30, marginTop: 20 }}>
                        <h3>Pedidos</h3>
                        <li>{solicitation.length} Pedidos</li>
                        <li style={{ backgroundColor: "#EED5D2"}}>{solicitation.filter(solicitation => solicitation.status === "aberto").length} Aberto</li>
                        <li style={{ backgroundColor: "#f2ffcc"}}>{solicitation.filter(solicitation => solicitation.status === "fechado").length} Em Andamento</li>
                        <li style={{ backgroundColor: "#fff0b3"}}>{solicitation.filter(solicitation => solicitation.status === "finalizado").length} Finalizado</li>
                        <li style={{ backgroundColor: "#ccccb3"}}>{solicitation.filter(solicitation => solicitation.status === "cancelado").length} Cancelado</li>
                        <li style={{ backgroundColor: "#e0e0d1"}}>{solicitation.filter(solicitation => solicitation.status === "expirado").length} Expirado</li>
                    </div>
                </section>

                <section>
                <h4 style={{ marginRight: 90, textAlign: "right" }}>Gráfico de Pedidos</h4>
                    <PieChart style={{ marginTop: 20, height: 100, marginRight: 0 }}
                        data={[
                            { title: 'Aberto', value: pieDadosPedidos[0], color: '#EED5D2' },
                            { title: 'Em Andamento', value: pieDadosPedidos[1], color: '#f2ffcc' },
                            { title: 'Finalizado', value: pieDadosPedidos[2], color: '#fff0b3' },
                            { title: 'Cancelado', value: pieDadosPedidos[3], color: '#ccccb3' },
                            { title: 'Expirado', value: pieDadosPedidos[4], color: '#e0e0d1' },
                        ]}
                    />
                </section>
            </body>





                <h1 style={{ marginTop: 20 }}>Listagem de Clientes</h1>

                <table style={{ marginTop: 5, marginLeft: -50 }}>
                    <tr>
                        <td>ID</td>
                        <td style={{minWidth: 150 }}>Nome</td>
                        <td style={{minWidth: 150 }}>Telefone</td>
                        <td>Total de <br /> Pedidos</td>
                        <td>Pedidos <br /> Abertos</td>
                        <td>Servicos <br /> Em Andamento</td>
                        <td>Servicos <br /> Concluídos</td>
                        <td style={{minWidth: 150 }}>CPF</td>
                        <td>Email</td>
                        <td>Ações</td>
                    </tr>

                    {clients
                        .sort(({ id: previousID }, { id: currentID }) => -previousID + currentID)
                        .map(clients => (
                        <tr key={clients.id}>
                            <td>{clients.id}</td>
                            <td style={{minWidth: 150 }}>{clients.name}</td>
                            <td style={{minWidth: 150 }}>
                                <button className="new-Button" style={{backgroundColor: "transparent", color: "black", fontSize: 14 }} type="button" onClick={() => handleWhatsApp(clients.phone)}>{clients.phone}</button>
                            </td>
                            <td>{clients.solicitations.length}</td>
                            <td>{clients.solicitations.filter(solicitations => solicitations.status === "aberto").length}</td>
                            <td>{clients.solicitations.filter(solicitations => solicitations.status === "fechado").length}</td>
                            <td>{clients.solicitations.filter(solicitations => solicitations.status === "finalizado").length}</td>
                            <td style={{minWidth: 150 }}>{clients.cpf}</td>
                            <td>{clients.email}</td>
                            <td>
                                <button style={{ border: "none", backgroundColor: "transparent" }} title="Deletar" onClick={ () => { if (window.confirm('Você deseja excluir o(a) cliente ' + clients.name + ' ?')) handleExcluir(clients.id)} }>
                                    <FiTrash2 size={18} color="#E02041" />  
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            
            


            </div>
        </div>
    );
}