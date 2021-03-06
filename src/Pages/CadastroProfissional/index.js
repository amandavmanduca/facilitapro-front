import React, { useState, useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.PNG';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import MaskedInput from 'react-text-mask';
import api from '../../services/api';
import PasswordMask from 'react-password-mask';
import HeaderAdmin from '../../HeaderAdmin';
import Dropzone from '../../components/DropzoneProf';


export default function NewProfessional() {

    const history = useHistory();
    
    const token = localStorage.getItem('admin_token')
    const[name, setName] = useState('');
    const[cpf, setCpf] = useState('');
    const[birth, setBirth] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[phone, setPhone] = useState('');
    const[profession_id, setProfession_id] = useState('');
    const[description, setDescription] = useState('');
    const[professions, setprofessions] = useState([]);
    const[selectedFile, setSelectedFile] = useState();
    const[formData, setFormData] = useState({
        profession_id: profession_id,
        name: name,
        birth: birth,
        cpf: cpf,
        phone: phone,
        email: email,
        password: password,
        description: description
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value })
    }


            
    useEffect(() => {
        api.get('/professions', {
            body: {
                nome: professions,
            }
        }).then(response => {
            setprofessions(response.data);
        })
    });



    async function handleRegister(e) {
        e.preventDefault();

        const { profession_id, name, birth, cpf, phone, email, password, description } = formData;


        const data = new FormData();

        data.append('profession_id', profession_id);
        data.append('name', name);
        data.append('birth', birth);
        data.append('cpf', cpf);
        data.append('phone', phone);
        data.append('email', email);
        data.append('password', password);
        data.append('description', description);

        if(selectedFile) {
            data.append('file', selectedFile);
        }


        if(name.indexOf(' ') === -1) {
            alert('Inserir nome completo');
            setName('');
            return
        }
        if(cpf.substr(13, 1) === '_'){
            alert('Inserir o CPF corretamente');
            setCpf('');
            return
        }
        if(birth.substr(9, 1) === '_'){
            alert('Inserir a data de nascimento corretamente');
            setBirth('');
            return
        }
        if(email.indexOf('@') === -1) {
            alert('Inserir um email válido');
            setEmail('');
            return
        }
        if(phone.substr(14, 1) === '_'){
            alert('Inserir o whatsapp corretamente');
            setPhone('');
            return
        }


        if (name !== '' & cpf !== '' & birth !== '' & email !== '' & phone !== '' & password !== '' & profession_id !== '0') {
        
            try {

                const config = {     
                    headers: { 'Authorization': `Bearer ` + token, 'content-type': 'multipart/form-data' }
                }
            
                await api.post('/professionals', data , config);
                
                alert('Cadastro Realizado com Sucesso.');

                history.push('/cadastroprofissional')
                
    
            } catch (err) {
                alert ('Por favor, tente novamente.')
            }
        } else {
            alert('Por favor preencher os campos corretamente.');
        }

    }




    return (
        <div>
            <HeaderAdmin />
        
            <div className="new-professional-container">
                <div className="content">
                    <form onSubmit={handleRegister}>
                        <button className="buttonFk" style={{ marginTop: 0 }}type="submit">Cadastro de Profissional Verificado</button>
                        <button className="buttonFk2" type="submit">Profissão</button>
                        <select type="number" name="profession_id" onChange={handleInputChange}>
                            <option value="0">Selecionar Profissão</option>
                            {professions.map(profession =>
                            <option key={profession.id} 
                            //placeholder="Serviço a ser Realizado"
                            value={profession.id}>{profession.name}</option>
                            )}
                        </select>                      

                        <button className="buttonFk2" type="submit">Dados Pessoais</button>

                        <Dropzone onFileUploaded={setSelectedFile} />


                        <input placeholder="Nome Completo" name="name" onChange={handleInputChange} />
                        <MaskedInput style={{ width: "60%" }} placeholder="CPF" name="cpf" onChange={handleInputChange}
                            mask={[ /[0-9]/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, '.',  /\d/, /\d/, /\d/, '-',  /\d/, /\d/]} />
                        <MaskedInput style={{ width: "40%" }} placeholder="Data de Nasc." name="birth" onChange={handleInputChange}
                            mask={[ /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/',  /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]} />
                        <input placeholder="Email" name="email" onChange={handleInputChange} />
                        <PasswordMask
                            name="password"
                            placeholder="Senha"
                            onChange={handleInputChange}
                        />
                        <MaskedInput placeholder="WhatsApp" name="phone" onChange={handleInputChange}
                            mask={['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
                  

                        
                        <textarea placeholder="Descrição" cols="30" rows="10" name="description" onChange={handleInputChange}></textarea>    
                                                     





                        <button className="button" type="submit">Cadastrar</button>
                        
                    </form>

                    <section>
                        <img src={logoImg} alt="FacilitaPRO" />
                        
                        <h1>Profissionais Verificados</h1>
                        <p>Área Restrita.</p>
                        

                    </section>
                </div>
            </div>
        </div>
    );
}