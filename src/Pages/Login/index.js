import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.PNG';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import PasswordMask from 'react-password-mask';
import Header from '../../Header';

export default function Logon() {


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
                // Axios looks for the `auth` option, and, if it is set, formats a
                // basic auth header for you automatically.
                auth: {
                  username: email,
                  password: password
                }
            });

            /**
             * client:
                birth: null
                cpf: "222.222.222-22"
                createdAt: "2020-05-06T16:58:09.000Z"
                deletedAt: null
                email: "jose@gmail.com"
                id: "e05d1d88-abe7-4c43-878f-9cd244537ff7"
                name: "jose da silva"
                passwordHash: "$2a$08$REgT76KZWyBxCnPzZMCTi.7SRFAZUDEA2GCMGLHqVs7pgEahf0QhC"
                phone: "(22) 22222-2222"
                slug: "jose-da-silva"
                updatedAt: "2020-05-06T16:58:09.000Z"
                __proto__: Object
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwNWQxZDg4LWFiZTctNGM0My04NzhmLTljZDI0NDUzN2ZmNyIsImlhdCI6MTU4ODc4NDkzM30.PYmB_5Vp8YfkS-xC7jxYxTmdBanCBf20sVVJbXWQZjo"
             */
            
            console.log(response.data);        
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('cliNome', response.data.client.name);
            localStorage.setItem('client_id', response.data.client.id);


            console.log(dados);
            
            alert('Login Realizado com Sucesso.')
            history.push('/main');

        } catch (err) {
            alert('Dados Incorretos.')
        }
    }




    return (
        <div>
            <Header /> 
            <div className="logon-container">
                
                <div className="content">
                    <section>
                        <img src={logoImg} alt="FacilitaPRO" />
                        
                        <h1>Profissionais Verificados</h1>
                        <p>Rápido, Fácil e Confiável.</p>
                        <p>Atendendo em toda a cidade de Pelotas.</p>

                    </section>
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

                        <Link className="back-link" to='/register'>
                            <FiLogIn size={16} color="E02041" style={{ marginRight: "3px" }} />
                            Não tenho cadastro
                        </Link>
                    </form>
                </div>
            </div>
        </div>
        
    );
}