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
            
            <nav class="header-navbar">
            
                <div class="container-fluid">
                    
                    <div class="navbar-header">
                    
                    
                    </div>
                    <ul class="nav navbar-nav">
                        <li><a class="navbar-brand" href="/">Início</a></li>
                        <li class="active"><a href="/login">Login</a></li>
                        <li><a href="/register">Realizar Cadastro</a></li>
                        <li><a href="/main">Minha Conta</a></li>
                        <li><a href="/main" onClick={handleLogout}>Sair</a></li>
                    </ul>
                </div>

                
            </nav>

        </div>
    );
}

