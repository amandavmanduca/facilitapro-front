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
            await api.delete(`/professionals/${id}`, {
                headers: {
                    'Authorization': `Bearer ` + token
                    }
            });

            alert('Profissional Excluído com Sucesso.')
        } catch {
            alert('Erro ao Excluir Profissional.')
        }
        
    }

    const pieDadosProfessional = [
        Number([professional.filter(profession => profession.profession.name === "Encanador").length]),
        Number([professional.filter(profession => profession.profession.name === "Pintor").length]),
        Number([professional.filter(profession => profession.profession.name === "Pedreiro").length]),
        Number([professional.filter(profession => profession.profession.name === "Eletricista").length]),
    ]

    const pieDadosOrcamentos = [
        Number([budget.filter(budgets => budgets.status === 'enviado').length]),
        Number([budget.filter(budgets => budgets.status === 'aceito').length]),
        Number([budget.filter(budgets => budgets.status === 'finalizado').length]),
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
                        <h3>Principais Profissões</h3>
                        <li>{professional.length} Profissionais</li>
                        <li style={{ backgroundColor: "#DCDCDC"}}>{professional.filter(profession => profession.profession.name === "Encanador").length} Encanador</li>
                        <li style={{ backgroundColor: "#FAF0E6"}}>{professional.filter(profession => profession.profession.name === "Pintor").length} Pintor</li>
                        <li style={{ backgroundColor: "#FFDAB9"}}>{professional.filter(profession => profession.profession.name === "Pedreiro").length} Pedreiro</li>
                        <li style={{ backgroundColor: "#E6E6FA"}}>{professional.filter(profession => profession.profession.name === "Eletricista").length} Eletricista</li>
                    </div>

                </section>
                <section>
                    <h4 style={{ marginRight: 130, textAlign: "right" }}>Gráfico de Profissões</h4>
                    <PieChart style={{ marginTop: 20, height: 100, marginRight: 100 }}
                        data={[
                            { title: 'Encanador', value: pieDadosProfessional[0], color: '#DCDCDC' },
                            { title: 'Pintor', value: pieDadosProfessional[1], color: '#FAF0E6' },
                            { title: 'Pedreiro', value: pieDadosProfessional[2], color: '#FFDAB9' },
                            { title: 'Eletricista', value: pieDadosProfessional[3], color: '#E6E6FA' },
                        ]}
                    />
                </section>
                <section>
                    <div style={{ marginRight: 30, marginTop: 20 }}>
                        <h3>Orçamentos</h3>
                        <li>{solicitation.length} Orçamentos</li>
                        <li style={{ backgroundColor: "#E3CEF6"}}>{budget.filter(budgets => budgets.status === 'enviado').length} Enviado</li>
                        <li style={{ backgroundColor: "#A9F5BC"}}>{budget.filter(budgets => budgets.status === 'aceito').length} Aceito</li>
                        <li style={{ backgroundColor: "#F5D0A9"}}>{budget.filter(budgets => budgets.status === 'finalizado').length} Finalizado</li>
                    </div>
                </section>

                <section>
                <h4 style={{ marginRight: 80, textAlign: "right" }}>Gráfico de Orçamentos</h4>
                    <PieChart style={{ marginTop: 20, height: 100, marginRight: 0 }}
                        data={[
                            { title: 'Enviado', value: pieDadosOrcamentos[0], color: '#E3CEF6' },
                            { title: 'Aceito', value: pieDadosOrcamentos[1], color: '#A9F5BC' },
                            { title: 'Finalizado', value: pieDadosOrcamentos[2], color: '#F5D0A9' },
                        ]}
                    />
                </section>
            </body>



                <h1 style={{ marginTop: 15 }}>Listagem de Profissionais</h1>
                <table style={{ marginTop: 10, marginLeft: -50 }}>
                    <tr>
                        <td>ID</td>
                        <td style={{minWidth: 150 }}>Nome</td>
                        <td style={{minWidth: 150 }}>Profissão</td>
                        <td style={{minWidth: 150 }}>Telefone</td>
                        <td>Orçamentos</td>
                        <td>Servicos <br /> Em Andamento</td>
                        <td>Servicos <br /> Realizados</td>
                        <td style={{minWidth: 150 }}>CPF</td>
                        <td>Email</td>
                        <td>Ações</td>
                    </tr>

                    {professional
                        .sort(({ id: previousID }, { id: currentID }) => -previousID + currentID)
                        .map(professional => (
                        <tr key={professional.id}>
                            <td>{professional.id}</td>
                            <td>{professional.name}</td>
                            <td>{professional.profession.name}</td>
                            <td style={{minWidth: 150 }}>
                                <button className="new-Button" style={{backgroundColor: "transparent", color: "black", fontSize: 14 }} type="button" onClick={() => handleWhatsApp(professional.phone)}>{professional.phone}</button>
                            </td>
                            <td>{professional.budgets.length}</td>
                            <td>{professional.budgets.filter(assessments => assessments.status === "aceito").length}</td>
                            <td>{professional.budgets.filter(assessments => assessments.status === "finalizado").length}</td>
                            <td>{professional.cpf}</td>
                            <td>{professional.email}</td>
                            <td>
                                <button style={{ border: "none", backgroundColor: "transparent" }} title="Deletar" onClick={ () => { if (window.confirm('Você deseja excluir o profissional ' + professional.name + ' ?')) handleExcluir(professional.id)} }>
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