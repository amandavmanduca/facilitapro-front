import React from 'react';
import { useHistory } from 'react-router-dom';



export default function Header() {

    const history = useHistory();

    function handleLogout() {
                    
        localStorage.clear();
        history.push('/');
    }



    return (
        <div>
            
            <nav style={{ backgroundColor: "#B0C4DE", color: "blue" }} class="header-navbar">
            
                <div class="container-fluid">
                    
                    <div class="navbar-header">
                    
                    
                    </div>
                    <ul class="nav navbar-nav">
                        <li><a class="navbar-brand" href="/">Início</a></li>
                        <li class="active"><a href="/adminlogin">Admin Login</a></li>
                        <li><a href="/pedidosadmin">Pedidos</a></li>
                        <li><a href="/listagemprofissional">Profissionais</a></li>
                        <li><a href="/listagemclientes">Clientes</a></li>
                        <li><a href="/listagemservicos">Serviços</a></li>
                        <li><a href="/cadastroadmin">Cadastro Admin</a></li>
                        <li><a href="/cadastroservicos">Cadastro Serviços</a></li>
                        <li><a href="/cadastroprofissional">Cadastro Profissional</a></li>
                        <li><a href="/main" onClick={handleLogout}>Sair</a></li>
                    </ul>
                </div>
                
            </nav>
        </div>
    );
}

