import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.PNG';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import MaskedInput from 'react-text-mask';
import api from '../../services/api';
import PasswordMask from 'react-password-mask';
import HeaderAdmin from '../../HeaderAdmin';


export default function NewAdmin() {

    const history = useHistory();
    const token = localStorage.getItem('admin_token');
    const[name, setName] = useState('');
    const[cpf, setCpf] = useState('');
    const[birth, setBirth] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[phone, setPhone] = useState('');


    async function handleRegister(e) {
        e.preventDefault();

        const dados = {
            name,
            birth,
            cpf,
            phone,
            email,
            password
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


        if (name !== '' & cpf !== '' & birth !== '' & email !== '' & phone !== '') {
        
            try {
            
                await api.post('/admins', dados, {
                    headers: {
                        'Authorization': `Bearer ` + token
                    }
                });
                
                alert('Cadastro Realizado com Sucesso.');
                

                history.push('/cadastroadmin')
    
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
        
            <div className="new-client-container">
                <div className="content">

                    <form onSubmit={handleRegister}>
                        <div className="buttonFk" style={{ marginTop: 0 }} >Cadastro de Administrador</div>
                        <div className="buttonFk2">Dados Pessoais</div>
                        <input placeholder="Nome Completo" value={name} onChange={e => setName(e.target.value)} />
                        <MaskedInput style={{ width: "60%" }} placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)}
                            mask={[ /[0-9]/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, '.',  /\d/, /\d/, /\d/, '-',  /\d/, /\d/]} />
                        <MaskedInput style={{ width: "40%" }} placeholder="Data de Nasc." value={birth} onChange={e => setBirth(e.target.value)}
                            mask={[ /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/',  /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]} />
                        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <PasswordMask
                            value={password}
                            placeholder="Senha"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <MaskedInput placeholder="WhatsApp" value={phone} onChange={e => setPhone(e.target.value)}
                            mask={['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
                                        



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