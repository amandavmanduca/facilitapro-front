import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.PNG';
import { FiLogIn } from 'react-icons/fi';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import PasswordMask from 'react-password-mask';
import HeaderAdmin from '../../HeaderAdmin';
import { FiSearch } from 'react-icons/fi';

export default function LogonAdmin() {

    
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const history = useHistory();


    async function handleLogin(e) {
        e.preventDefault();


        const dados = {
            email,
            password,
        }

        try {

            

            const response = await api.get('/login', {

                auth: {
                  username: email,
                  password: password
                }
            });

                
            
            localStorage.setItem('admin_token', response.data.token);
            localStorage.setItem('adminNome', response.data.admin.name);
            localStorage.setItem('admin_id', response.data.admin.id);


            
            alert('Login Realizado com Sucesso.')
            history.push('/pedidosadmin');

        } catch (err) {
            alert('Dados Incorretos.')
        }
    }

    async function handlePassword() {


        if (email === '') {
            alert('Preencher o email corretamente.')
            return
        }
        if(email.indexOf('@') === -1) {
            alert('Inserir um email válido');
            setEmail('');
            return
        }

        const enviaemail = {
            email
        }

        try {
            
            await api.post('/recover', enviaemail)

            alert('Sua nova senha foi enviada por e-mail.')

        } catch {
            alert('Não foi possível recuperar a senha para seu e-mail.')
        }
    }




    return (
        <div>
            <div className="logon-admin-container">
                
                <div className="content">
                    <section>
                        <img src={logoImg} alt="FacilitaPRO" />
                        
                        <h1>Profissionais Verificados</h1>
                        <p>Área Restrita</p>
                        

                    </section>
                    <form>
                        <form onSubmit={handleLogin}>
                            <h1>Faça seu Login</h1>

                            <input
                                placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}
                            />
                            <PasswordMask
                                value={password}
                                placeholder="Senha"
                                onChange={e => setPassword(e.target.value)}
                            />

                            <button className="button" type="submit">Entrar</button>

                            <Link className="back-link" to='/'>
                                <FiArrowLeft size={16} color="E02041" />
                                Voltar para Home
                            </Link>

                        </form>
                        <span>
                            <button style={{border: "none", marginTop: 8, fontWeight: 500, fontStyle: "roboto", color: "#41414d", backgroundColor: "transparent"}}
                                onClick={ () => { if (window.confirm('Você deseja recuperar a senha do seu email?')) handlePassword()} }
                                type="submit">
                                <FiSearch size={16} color="E02041" style={{ marginRight: "3px" }} />
                                Recuperar Senha
                            </button>
                        </span>

                    </form>

                </div>
            </div>
        </div>
        
    );
}