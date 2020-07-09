import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import logoImg from '../../assets/logo.PNG';
import { FiPower } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';

import { FiTrash2 } from 'react-icons/fi';


//import { FiTrash22 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api'








export default function Profile() {


    const token = localStorage.getItem('prof_token');
    const Nome = localStorage.getItem('profNome');
    const idProf = localStorage.getItem('professional_id')
    const foto = localStorage.getItem('prof_foto')



    const [solicitation, setSolicitation] = useState([]);
    const [clients, setClients] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [professional, setProfessional] = useState([]);
    const [statusBusca, setStatusBusca] = useState('fechado');
    const [service, setService] = useState([]);
    const [value, setValue] = useState();
    const [tax, setTax] = useState(20);
    const [total, setTotal] = useState(0);
    const [statusBudget, setStatusBudget] = useState('aceito')


    const [visible, setVisible] = useState();
    const [visibleFin, setVisibleFin] = useState();
    localStorage.removeItem('professionalId');

    const[filtraId, setFiltraId] = useState();
    const history = useHistory();


    function handleToggle(idFilter) {
        setVisible(!visible)
        setFiltraId(idFilter)
        setVisibleFin(false)
        localStorage.setItem('idFilter', idFilter);
    }

    function handleLogout() {
                     
        localStorage.clear();
        history.push('/');
    }

    function handleHome() {
                     
        history.push('/');
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
        setTotal(Number(Number(value)*(1+Number(tax/100))))
    }, [value, tax] );



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
        api.get(`/professionals/${idProf}`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setBudgets(response.data.budgets)
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




    function handleData(data) {
        const NewData = (data.substr(0,10).split('-'));
        return NewData[2] + '/' + NewData[1] + '/' + NewData[0];
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
        
        <div className="div profile-container">
            <header>
                <img src={logoImg} alt="FacilitaPRO" />
                {foto !== null ? 
                    <img style={{maxWidth: 50, marginLeft: 20}} src={foto} alt="Foto"/>
                : null}
                <span>Bem vindo, {Nome}</span>
                <Link to="/"></Link>
                <button title="Home" onClick={handleHome} type="button">
                    <AiFillHome size={28} color="#E02041" />  
                </button>
                <button title="Sair" onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

                <body style={{display: "flex", justifyContent: "space-between"}}>
                    <section>

                    </section>

                </body>

                <div className="div profile-container">
                    <Link className="buttonMenu" to="/pedidosprofissional">Pedidos</Link>
                    <Link style={{backgroundColor: " rgb(255, 238, 0)"}} className="buttonMenu" to="/andamentoprofissional">Serviços em Andamento</Link>
                    <Link className="buttonMenu" to="/fechadosprofissional">Serviços Finalizados</Link>
                </div>
                
                <h1>Listagem de Pedidos</h1>
                
                

                {(budgets.filter(budget => budget.status === statusBudget).length > 0) ?
                    <span>     

                        <ul>
                            {budgets.filter(budget => budget.status === statusBudget).map(budget => (
                                <span key={budget.id}>

                                {solicitation
                                .filter(solicitation => solicitation.id === budget.solicitation_id)
                                .sort(({ id: previousID }, { id: currentID }) => -previousID + currentID)
                                .filter(solicitation => solicitation.status === statusBusca)
                                .map(solicitation => (
                                    

                                    
                                    <li key={solicitation.id}>

                                        <strong>Pedido #{solicitation.id}</strong>

                                        
                                        <strong>Serviço: {service.filter(service => service.id === solicitation.service_id).map(service => (
                                            <span key={service.id}>
                                                <h3>{service.name}</h3>
                                            </span>
                                        ))}
                                        </strong>
                                        {solicitation.photoUrl !== null ? 
                                            <img style={{maxWidth: 200}} src={solicitation.photoUrl} alt="Foto"/>
                                        : null }
                                        
                                        <strong>Cliente #{solicitation.client_id}</strong>
                                        <strong>
                                            {clients.filter(client => client.id === solicitation.client_id).map(client => (
                                                <div>
                                                    <strong key={client.id}>{client.name} Contato: [ {client.phone}, {client.email} ]</strong>
                                                    <button className="new-Button" type="button" onClick={() => handleWhatsApp(client.phone)}>Enviar WhatsApp</button>
                                                </div>                                         
                                            ))}
                                        </strong>
                                        <strong>Endereço: {solicitation.address.street} nº{solicitation.address.number} [{solicitation.address.complement}] - Bairro [{solicitation.address.neighborhood}]</strong>
                                        <br />
                                        
                                        <p style={{ margin: 0 }}>Período Para Orçamentos: {handleData(solicitation.initialDate)} à {handleData(solicitation.finallyDate)}</p>
                                        <strong>DESCRIÇÃO:</strong>
                                        <h3>{solicitation.description}</h3>
                                        


                                        {(solicitation.budgets.filter(budget => budget.professional_id === Number(idProf)).length) > 0 ?
                                            <button style={{ marginRight: 0 }} onClick={() => handleToggle(solicitation.id)} >Ver Orçamento</button>
                                            : <button style={{ marginRight: 0 }} onClick={() => handleToggle(solicitation.id)} type="button">Enviar Orçamentos</button> }
                                        

                                        <p className="status">Status: {solicitation.status}</p>
                                        <p>{visible ?
                                            <span>
                                                {solicitation.budgets.filter(budget => budget.solicitation_id === filtraId).filter(budget => budget.professional_id === Number(idProf)).length > 0 ?
                                                <span>
                                                    <h3>{solicitation.budgets.filter(budget => budget.solicitation_id === filtraId).filter(budget => budget.professional_id === Number(idProf)).filter(budget => budget.status === statusBudget)
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
                                                
                                                                </li>
                                                            ))}
                                                            </h2>
                                                            
                                                            <p>Total R$ {budget.total}</p>
                                                            <p>Honorários Profissional R$ {budget.value}</p>

                                                        </li>
                                                    ))}</h3>

                                                </span> : null }

                                            </span>  : null }</p>
                                    </li>
                                ))} 


                                
                                </span>
                            ))}


      
                        </ul>
                    </span>
                        :   <span>
                                <h2 style={{color: 'grey'}}>Não há serviços em andamento</h2>
                            </span>
                        }
            </div>
        </div>
    );
}