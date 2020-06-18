import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.PNG';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import MaskedInput from 'react-text-mask';
import api from '../../services/api';
import PasswordMask from 'react-password-mask';
import Header from '../../Header';


export default function NewClient() {

    const history = useHistory();
    
    const[name, setName] = useState('');
    const[cpf, setCpf] = useState('');
    const[birth, setBirth] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[phone, setPhone] = useState('');
    const[recommendation, setRecommendation] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        const dados = {
            name,
            cpf,
            birth,
            email,
            password,
            phone,
            recommendation,
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


        if (name !== '' & cpf !== '' & birth !== '' & email !== '' & phone !== '' & recommendation !== '') {
        
            try {
            
                await api.post('/clients', dados);
                
                alert('Cadastro Realizado com Sucesso.');
                

                const responseLogin = await api.get('/login', {
                    // Axios looks for the `auth` option, and, if it is set, formats a
                    // basic auth header for you automatically.
                    auth: {
                      username: email,
                      password: password
                    }
                });

                localStorage.setItem('token', responseLogin.data.token);
                localStorage.setItem('cliNome', responseLogin.data.client.name);
                localStorage.setItem('client_id', responseLogin.data.client.id);

                history.push('/enderecos');


    
            } catch (err) {
                alert ('Por favor, tente novamente.')
            }
        } else {
            alert('Por favor preencher os campos corretamente.');
        }

    }


    return (
        <div>
            <Header />
        
            <div className="new-client-container">
                <div className="content">

                    <form onSubmit={handleRegister}>
                        <button className="buttonFk" style={{ marginTop: 0 }}type="submit">Realize seu Cadastro</button>
                        <button className="buttonFk2" type="submit">Dados Pessoais</button>
                        <input placeholder="Nome Completo" value={name} onChange={e => setName(e.target.value)} />
                        <MaskedInput style={{ width: "60%" }} placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)}
                            mask={[ /[0-9]/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, '.',  /\d/, /\d/, /\d/, '-',  /\d/, /\d/]} />
                        <MaskedInput style={{ width: "40%" }} placeholder="Data de Nasc." value={birth} onChange={e => setBirth(e.target.value)}
                            mask={[ /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/',  /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]} />
                        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <PasswordMask
                            value={password}
                            placeholder="Digite sua Senha"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <MaskedInput placeholder="WhatsApp" value={phone} onChange={e => setPhone(e.target.value)}
                            mask={['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
                                        

                        <button className="buttonFk2" type="submit">Como Conheceu o FacilitaPRO</button>
                        <select value={recommendation} onChange={e => setRecommendation(e.target.value)}>
                            <option disabled value="">Sua contribuição é muito importante para nós</option>
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="indicação">Indicação</option>
                            <option value="google">Google</option>
                            <option value="outro">Outro</option>
                        
                        </select>


                        <button className="button" type="submit">Cadastrar</button>
                        
                    </form>

                    <section>
                        <img src={logoImg} alt="FacilitaPRO" />
                        
                        <h1>Profissionais Verificados</h1>
                        <p>Rápido, Fácil e Confiável.</p>
                        <p>Atendendo em toda a cidade de Pelotas.</p>
                        <Link className="back-link" to='/'>
                            <FiArrowLeft size={16} color="E02041" />
                            Voltar para Home
                        </Link>
                        <Link className="back-link" to='/login'>
                            <FiArrowLeft size={16} color="E02041" />
                            Ir para Login
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
}