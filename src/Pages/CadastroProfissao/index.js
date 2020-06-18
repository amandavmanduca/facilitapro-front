import React, { useState, useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.PNG';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import HeaderAdmin from '../../HeaderAdmin';



export default function NewProfessional() {

    const history = useHistory();
    
    const token = localStorage.getItem('admin_token')
    const[service_name, setService_Name] = useState('');
    const[profession_name, setProfession_Name] = useState('');
    const[description, setDescription] = useState('');

    const[profession_id, setProfession_id] = useState('');
    const[professions, setprofessions] = useState([]);

            
    useEffect(() => {
        api.get('/professions', {
            body: {
                nome: professions,
            }
        }).then(response => {
            setprofessions(response.data);
        })
    }, [professions, profession_id]);


    async function registerProfession(e) {
        e.preventDefault();

        let name = profession_name

        const dados = {
            name
        }



        if (name !== '') {
        
            try {
            
                await api.post('/professions', dados , {
                    headers: {
                        'Authorization': `Bearer ` + token
                        }
                    }
                );
                
                alert('Cadastro Realizado com Sucesso.');
           
    
            } catch (err) {
                alert ('Por favor, tente novamente.')
            }
        } else {
            alert('Por favor preencher os campos corretamente.');
        }
        
        setProfession_Name('');
    }


    async function handleRegisterService(e) {
        e.preventDefault();

        let name = service_name

        const dados = {
            profession_id,
            name,
            description
        }


        if (name !== '' & description !== '' & profession_id !== "0") {
        
            try {
            
                await api.post('/services', dados , {
                    headers: {
                        'Authorization': `Bearer ` + token
                        }
                    }
                );
                
                alert('Cadastro Realizado com Sucesso.');

                
    
            } catch (err) {
                alert ('Por favor, tente novamente.')
            }
        } else {
            alert('Por favor preencher os campos corretamente.');
        }

        history.push('/cadastroservicos')
        setService_Name('')
        setDescription('')


    }




    return (
        <div>
            <HeaderAdmin />
        
            <div className="new-professional-container">
                <div className="content">


                <section>
                    <img src={logoImg} alt="FacilitaPRO" />

                    
                    
                    <h1>Profissionais Verificados</h1>
                    <p>Área Restrita.</p>
                        

                    <form>
                        <div className="buttonFk2" style={{ marginTop: 101.5 }} >Cadastro de Profissão</div>
                        <input placeholder="Nome da Profissão" value={profession_name} onChange={e => setProfession_Name(e.target.value)} />
                        <button style={{ backgroundColor: "black",
                                    marginTop: 5,
                                    float: "right" }} className="buttonFk" onClick={registerProfession}>Cadastrar Profissão</button>

                    </form>
                </section>


                <form>
                    <div className="buttonFk" style={{ marginTop: 0 }} >Cadastro de Serviços</div>
                    <div className="buttonFk2" >Listagem de Profissões</div>
                    
                    <select type="number" name={profession_id} onChange={e => setProfession_id(e.target.value)}>
                        <option value="0">Selecionar Profissão</option>
                        {professions.map(profession =>
                        <option key={profession.id} 
                        //placeholder="Serviço a ser Realizado"
                        value={profession.id}>{profession.name}</option>
                        )}
                    </select>  

                    
                    <div className="buttonFk2">Dados do Serviço</div>
                    <input placeholder="Nome do Serviço" value={service_name} onChange={e => setService_Name(e.target.value)} />
                    <textarea cols="30" rows="10" style={{ height: 150 }} placeholder="Descrição do Serviço" value={description} onChange={e => setDescription(e.target.value)} />

                    <button style={{ backgroundColor: "black",
                                marginTop: 5,
                                float: "right" }} className="buttonFk" onClick={handleRegisterService}>Cadastrar Serviço</button>
                
                </form>

                    
                </div>
            </div>
        </div>
    );
}