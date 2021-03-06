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
    const [statusBusca, setStatusBusca] = useState('finalizado');
    const [service, setService] = useState([]);
    const [value, setValue] = useState();
    const [tax, setTax] = useState(20);
    const [total, setTotal] = useState(0);
    const [statusBudget, setStatusBudget] = useState('finalizado')


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




    async function handleCancelarBudget(idB, valueB, taxB) {
        
        const alteraStatusB = {
            status: "cancelado",
            value: valueB,
            tax: taxB
        }

        await api.put(`/budgets/${idB}`, alteraStatusB, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            }
        );

        alert('Orçamento Cancelado com Sucesso.')
                
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
                    <Link className="buttonMenu" to="/andamentoprofissional">Serviços em Andamento</Link>
                    <Link style={{backgroundColor: " rgb(255, 238, 0)"}} className="buttonMenu" to="/fechadosprofissional">Serviços Finalizados</Link>
                </div>
                
                <h1>Listagem de Pedidos</h1>
                
                

                {(budgets.filter(budget => budget.status === statusBudget).length > 0) ?
                    <span>     

                        <ul>
                            {budgets.filter(budget => budget.status === statusBudget).map(budget => (
                                <span key={budget.id}>

                                {solicitation
                                .filter(solicitation => solicitation.id === budget.solicitation_id)
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
                                        <strong>Endereço: {solicitation.address.street}</strong>
                                        <br />
                                        
                                        <p style={{ margin: 0 }}>Período Para Orçamentos: {handleData(solicitation.initialDate)} à {handleData(solicitation.finallyDate)}</p>
                                        <strong>DESCRIÇÃO:</strong>
                                        <h3>{solicitation.description}</h3>
                                        


                                        {(solicitation.budgets.filter(budget => budget.professional_id === Number(idProf)).length) > 0 ?
                                            <button style={{ marginRight: 0 }} onClick={() => handleToggle(solicitation.id)} >Ver Orçamento</button>
                                            : null }
                                        

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
                                                            <p style={{color: "red" }}>SERVIÇO {budget.status}</p>
                                                            : <p>SERVIÇO {budget.status}</p>}
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

                                                            {(budget.status === 'enviado') ?
                                                            <button type="button" style={{ backgroundColor: "transparent", marginTop: 0 }} title="Cancelar" onClick={ () => { if (window.confirm('Você deseja cancelar o orçamento ' + budget.id + ' ?\nVocê não poderá enviar outro orçamento.')) handleCancelarBudget(budget.id, budget.value, budget.tax)} } >
                                                                <FiTrash2 size={18} color="#E02041" />  
                                                            </button>
                                                            : null }
                                                        </li>
                                                    ))}</h3>

                                                </span> : 
                                                <span>
                                                    <span>{solicitation.id === filtraId ? 
                                                    <h3>
                                                        <h3>Enviar Orçamento
                                                            <p>Valor do Serviço:</p>
                                                            <p>R$: 
                                                                <input style={{ textAlign: "center", direction: "rtl", width: "10%"}} type="text" value={value} onChange={e => setValue(e.target.value)}/>
                                                            </p>
                                                            {total > 0 ?
                                                                <span>
                                                                    <h3 style={{display: "block", backgroundColor: "#b3ffcc"}}>Total: R$ {total}</h3>
                                                                    <h3>

                                                                    </h3>
                                                                </span>
                                                            : null}
                                                        </h3>
                                                        
                                                    </h3>
                                                    : null}</span>
                                                </span>}

                                            </span>  : null }</p>
                                    </li>
                                ))} 


                                
                                </span>
                            ))}


      
                        </ul>
                    </span>
                        :   <span>
                                <h2 style={{color: 'grey'}}>Não há serviços finalizados</h2>
                            </span>
                        }
            </div>
        </div>
    );
}