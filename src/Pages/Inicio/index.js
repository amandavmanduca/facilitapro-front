import React, { useState, useEffect } from 'react';
import './styles.css';
import logoSenac from '../../assets/senac_logo.png';
import logoCiemsul from '../../assets/ciemsul.png';
import logoVertical from '../../assets/logovertical.png';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import MaskedInput from 'react-text-mask';
import { FiPower } from 'react-icons/fi';
import { FcApproval } from "react-icons/fc";
import { FcSearch } from "react-icons/fc";
import { FcKindle } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Header from '../../Header';
import Footer from '../../Footer';
import ReactPlayer from 'react-player'



export default function Home() {

    const history = useHistory();
    const token = localStorage.getItem('token');
    




    return (
        

        <div className="home-container">
            <Header />
            <div style={{ float: "right", marginRight: 10}}>
                <a href="/pedidosadmin">Área Restrita</a>
            </div>
            <div className="content">
                <header>


                </header>
                
                <body>
                    <main>
                        <h1>FacilitaPRO</h1>
                        <h2>Plataforma para Contratação de Profissionais da Construção</h2>
                        <h2> </h2>
                        <p>Atendemos toda a Região de Pelotas/RS</p>
                    </main>
                    
                    <div>
                        <Link className="button" to="/login">Login</Link>   
                        <Link className="button" to="/register">Cadastre-se Já!</Link>
                        <a className="button" href="https://docs.google.com/forms/d/e/1FAIpQLSf5Dzbb-AzBMu5An7UAPg2AXO-jXu775XYtfvDMwblAvN25DQ/viewform">Aplicação como Profissional</a>
                    </div>
                </body>
                <body>
                    <title>
                        <FcEditImage size={50} />
                        <h1>1. Descreva o Serviço</h1>
                        <h2>Informe aos Profissionais o que você necessita e descreva o serviço a ser realizado</h2>
                        
                    </title>
                    <title>
                        <FcKindle size={50} />
                        <h1>2. Receba Orçamentos</h1>
                        <h2>Receba os Orçamentos de nossos profissionais selecionados e verificados</h2>
                    </title>
                    <title>
                        <FcSearch size={50} />
                        <FcApproval size={50} />
                        <h1>3. Compare e Escolha</h1>
                        <h2>Veja as avaliações do profissional, analise os orçamentos e contrate!</h2>
                    </title>
                </body>
                <section>
                    <section>
                        <h1>Os melhores profissionais estão <br /> aqui na FacilitaPRO!</h1>
                        <Link className="button" to="/register">Realize seu Pedido!</Link>
                    </section>
                    <section>
                        <ReactPlayer url="https://www.youtube.com/watch?v=9nqYCvi6-Zw" controls={true} />
                    </section>
                </section>

                
            </div>
            <Footer />
        </div>
        
    );
}