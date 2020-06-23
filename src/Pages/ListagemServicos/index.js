import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.PNG';

import { FiTrash2 } from 'react-icons/fi';
//import { FiTrash22 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api'

import HeaderAdmin from '../../HeaderAdmin'
import { PieChart } from 'react-minimal-pie-chart';





export default function Servicos() {

    const cliId = parseInt(localStorage.getItem('client_id'));
    const token = localStorage.getItem('admin_token');
    const Nome = localStorage.getItem('adminNome');
    const [link, setLink] = useState();
    const [name, setName] = useState('');



    const [solicitation, setSolicitation] = useState([]);
    const [clients, setClients] = useState([]);
    const [budget, setBudget] = useState([]);
    const [professional, setProfessional] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [services, setServices] = useState([]);

    
    
    const history = useHistory();




    localStorage.removeItem('professionalId');

    const[statusS, setStatusS] = useState();
    localStorage.setItem('statusS', statusS);
    






    


    
    useEffect(() => {
        api.get(`/solicitations`, {
            headers: {
                'Authorization': `Bearer ` + token
                //'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE1OTI0ODM5NTMsImV4cCI6MTU5MjU3MDM1M30.IcnsraME-ith9kXDWgaFh-soyGZE03CLERXPInx_TKM`
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
                //'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE1OTI0ODM5NTMsImV4cCI6MTU5MjU3MDM1M30.IcnsraME-ith9kXDWgaFh-soyGZE03CLERXPInx_TKM`
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
                //'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE1OTI0ODM5NTMsImV4cCI6MTU5MjU3MDM1M30.IcnsraME-ith9kXDWgaFh-soyGZE03CLERXPInx_TKM`
                }
            })
            .then(response => {
                setProfessional(response.data)
        })
    });

    useEffect(() => {
        api.get(`/professions`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setProfessions(response.data)
        })
    }, );

    useEffect(() => {
        api.get(`/services`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setServices(response.data)
        })
    }, );


    

    async function handleExcluirProfissao(id) {
        
        if(professional.map(professinals => professinals.profession.id === id)) {
            alert('Há profissionais cadastrados com essa profissão')
  
        } else {

            try {
                await api.delete(`/professions/${id}`, {
                    headers: {
                        'Authorization': `Bearer ` + token
                        }
                });
    
                alert('Profissão Excluída com Sucesso.')
            } catch {
                alert('Erro ao Excluir Profissão.')
            }
        }

    }

    
    async function handleExcluirServico(id) {
        
        if(solicitation.map(solicitation => solicitation.service_id === id)) {
            alert('Há Pedidos cadastrados com esse serviço')
        
        } else {

            try {
                await api.delete(`/services/${id}`, {
                    headers: {
                        'Authorization': `Bearer ` + token
                        }
                });
    
                alert('Serviço Excluído com Sucesso.')
            } catch {
                alert('Erro ao Excluir Serviço.')
            }

        }
        
    }

    const pieDadosProfessional = [
        Number([professional.filter(profession => profession.profession.name === "Encanador").length]),
        Number([professional.filter(profession => profession.profession.name === "Pintor").length]),
        Number([professional.filter(profession => profession.profession.name === "Pedreiro").length]),
        Number([professional.filter(profession => profession.profession.name === "Eletricista").length]),
    ]



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

                </section>

                <section>

                </section>
            </body>



                <h1 style={{ marginTop: 15 }}>Listagem de Profissões e Serviços</h1>
                <table style={{ marginTop: 10, marginLeft: -50 }}>
                    <tr>
                        <td>ID</td>
                        <td style={{minWidth: 150 }}>Profissão</td>
                        <td>Ações</td>
                    </tr>

                    
                    {professions
                        .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
                        .map(profession => (
                        <tr key={profession.id}>
                            <td>{profession.id}</td>
                            <td><h2 style={{color: "black", textDecoration: "underline"}}>{profession.name}</h2>
                            
                            <p style={{fontWeight: "normal", color: "black"}}> [Cadastrados: {professional.filter(professinals => professinals.profession.id === profession.id).length}]</p>
                            <br />
                            
                            <div style={{marginTop: 5}}>
                                <h3>{services
                                    .filter(services => services.profession_id === profession.id)
                                    .map(services => (
                                        <span style={{height: 50}}>
                                            <strong>#{services.id} </strong>
                                            <strong>{services.name}   </strong>
                                            <button style={{ border: "none", backgroundColor: "transparent" }} title="Deletar Serviço" onClick={ () => { if (window.confirm('Você deseja excluir o serviço ' + services.name + ' ?')) handleExcluirServico(services.id)} }>
                                                <FiTrash2 size={18} />  
                                            </button>
                                            <p style={{fontWeight: "normal", color: "black"}}> [Pedidos: {solicitation.filter(solicitations => solicitations.service_id === services.id).length}]</p>
                                            <p style={{fontWeight: "normal", color: "black"}}> [Finalizados: {solicitation.filter(solicitations => solicitations.service_id === services.id)
                                                        .filter(solicitations => solicitations.status === 'finalizado').length}]</p>
                                            <br />
                                        </span>
                                ))}</h3>
                            </div>
                            </td>
                            <td>
                                <button style={{ borderBlockColor: "transparent" }} title="Deletar Profissão" onClick={ () => { if (window.confirm('Você deseja excluir a profissão ' + profession.name + ' ?')) handleExcluirProfissao(profession.id)} }>
                                    <FiTrash2 size={18} color="#E02041" />  
                                </button>
                                <br />
                                <br />
                                <br />
                            </td>
                        </tr>
                    ))}
                </table>
            
            


            </div>
        </div>
    );
}