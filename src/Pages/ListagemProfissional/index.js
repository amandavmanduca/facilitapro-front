import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.PNG';
import { FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api'
import ReactToExcel from 'react-html-table-to-excel';
import HeaderAdmin from '../../HeaderAdmin'
import { PieChart } from 'react-minimal-pie-chart';
import { FiSkipForward } from 'react-icons/fi';
import { FiSkipBack } from 'react-icons/fi';





export default function Profile() {


    const token = localStorage.getItem('admin_token');
    const Nome = localStorage.getItem('adminNome');




    const [solicitation, setSolicitation] = useState([]);
    const [clients, setClients] = useState([]);
    const [budget, setBudget] = useState([]);
    const [professional, setProfessional] = useState([]);
    const [visible, setVisible] = useState(true);
    const [professionalPage, setProfessionalsPage] = useState([]);
    const [professionalFull, setProfessionalsFull] = useState([]);

    
    
    const history = useHistory();




    localStorage.removeItem('professionalId');

    const[statusS, setStatusS] = useState();
    localStorage.setItem('statusS', statusS);

    const[page, setPage] = useState(0);




    


    
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
        api.get(`/professionals/paginate?page=${page}&limit=10`, {
            headers: {
                'Authorization': `Bearer ` + token
                //'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE1OTI0ODM5NTMsImV4cCI6MTU5MjU3MDM1M30.IcnsraME-ith9kXDWgaFh-soyGZE03CLERXPInx_TKM`
                }
            })
            .then(response => {
                setProfessional(response.data.professionals.rows)
        })
    },[page, token] );


    useEffect(() => {
        api.get(`/professionals/paginate?page=${page}&limit=10`, {
            headers: {
                'Authorization': `Bearer ` + token
                //'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE1OTI0ODM5NTMsImV4cCI6MTU5MjU3MDM1M30.IcnsraME-ith9kXDWgaFh-soyGZE03CLERXPInx_TKM`
                }
            })
            .then(response => {
                setProfessionalsPage(response.data.professionals.rows)
        })
    },[page, token] );


    useEffect(() => {
        api.get(`/professionals`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setProfessionalsFull(response.data)
        })
    });



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
        Number([professionalFull.filter(profession => profession.profession.name === "Encanador").length]),
        Number([professionalFull.filter(profession => profession.profession.name === "Pintor").length]),
        Number([professionalFull.filter(profession => profession.profession.name === "Pedreiro").length]),
        Number([professionalFull.filter(profession => profession.profession.name === "Eletricista").length]),
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

    
    function handleRetornar() {
        if (page !== 0) {
            setPage(page-1);
            return
        }
    }

    function handleAvancar() {
        if (page !== 10) {
            setPage(page+1)
            return
        }
    }

    function handleListagem() {
        if (visible) {
            setVisible(false)
            setProfessional(professionalFull)
        } else {
            setVisible(true)
            setPage(page)
            setProfessional(professionalPage)
        }

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
                        <li>{professionalFull.length} Profissionais</li>
                        <li style={{ backgroundColor: "#DCDCDC"}}>{professionalFull.filter(profession => profession.profession.name === "Encanador").length} Encanador</li>
                        <li style={{ backgroundColor: "#FAF0E6"}}>{professionalFull.filter(profession => profession.profession.name === "Pintor").length} Pintor</li>
                        <li style={{ backgroundColor: "#FFDAB9"}}>{professionalFull.filter(profession => profession.profession.name === "Pedreiro").length} Pedreiro</li>
                        <li style={{ backgroundColor: "#E6E6FA"}}>{professionalFull.filter(profession => profession.profession.name === "Eletricista").length} Eletricista</li>
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
                
                {visible ? <span>
                    { page !== 0 ?
                        <button onClick={() => handleRetornar()} style={{ marginRight: 15, backgroundColor: "transparent", border: "none"}}>
                            {page} <FiSkipBack size={16} color="E02041" style={{ marginRight: "3px" }} />
                        </button>
                    : null}
                    Página {page+1}
                    { page !== 10 ?
                        <button onClick={() => handleAvancar()} style={{ marginLeft: 15, backgroundColor: "transparent", border: "none"}}>
                            <FiSkipForward size={16} color="E02041" style={{ marginRight: "3px" }} /> {page+2}
                        </button>
                    : null}
                </span> : null }





                <div style={{ float: "right", marginRight: 50, marginBottom: 10, color: "transparent" }}>
                    {visible ?
                        <button style={{ fontSize: 13, marginRight: 5 }} onClick={() => handleListagem()}>
                            Listagem Completa
                        </button>
                        :
                        <button style={{ fontSize: 13, marginRight: 5 }} onClick={() => handleListagem()}>
                            Mostrar Páginas
                        </button>}
                    <ReactToExcel 
                        className="btn"
                        table="table-to-xls"
                        filename='FacilitaPRO_listagem_professionals'
                        sheet='sheet 1'
                        buttonText='Exportar Excel'
                    />
                </div>


                <table style={{ marginTop: 10, marginLeft: -50 }} id="table-to-xls">
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