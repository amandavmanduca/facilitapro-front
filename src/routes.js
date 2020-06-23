import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Pages/Login';
import LoginAdmin from './Pages/LoginAdmin';
import NovoPedido from './Pages/NovoPedido';
import AdminPedidos from './Pages/AdminPedidos';
import NovoCliente from './Pages/CadastroCli';
import CadastroAdmin from './Pages/CadastroAdmin';
import NovoProfissional from './Pages/CadastroProfissional';
import ListagemProfissional from './Pages/ListagemProfissional';
import ListagemClientes from './Pages/ListagemClientes';
import ListagemServicos from './Pages/ListagemServicos';
import NovaProfissao from './Pages/CadastroProfissao';
import Main from './Pages/MeusPedidos';
import Fechados from './Pages/PedidosFechados';
import Expirados from './Pages/PedidosExpirados';
import Cancelados from './Pages/PedidosCancelados';
import Andamento from './Pages/MeusPedidosAndamento';
import Home from './Pages/Inicio';
import DetalhesProf from './Pages/DetalhesProf';
import { isAuthenticated } from './auth';
import { adminIsAuthenticated } from './authAdmin';
import CadastroEnderecos from './Pages/CadastroEnderecos';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => 
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => 
            adminIsAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/adminlogin", state: { from: props.location } }} />
            )
        }
    />
);


export default function Routes() {
    return (
        

        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/adminlogin" exact component={LoginAdmin} />
                <Route path="/" exact component={Home} />
                <PrivateRoute path="/pedido" exact component={NovoPedido} />
                <Route path="/register" exact component={NovoCliente} />
                <PrivateRouteAdmin path="/cadastroprofissional" exact component={NovoProfissional} />
                <PrivateRouteAdmin path="/cadastroservicos" exact component={NovaProfissao} />
                <PrivateRouteAdmin path="/cadastroadmin" exact component={CadastroAdmin} />
                <PrivateRouteAdmin path="/pedidosadmin" exact component={AdminPedidos} />
                <PrivateRouteAdmin path="/listagemprofissional" exact component={ListagemProfissional} />
                <PrivateRouteAdmin path="/listagemclientes" exact component={ListagemClientes} />
                <PrivateRouteAdmin path="/listagemservicos" exact component={ListagemServicos} />
                <PrivateRoute path="/main" exact component={Main} />
                <PrivateRoute path="/fechados" exact component={Fechados} />
                <PrivateRoute path="/andamento" exact component={Andamento} />
                <PrivateRoute path="/expirados" exact component={Expirados} />
                <PrivateRoute path="/cancelados" exact component={Cancelados} />
                <PrivateRoute path="/detalhesprof" exact component={DetalhesProf} />
                <PrivateRoute path="/enderecos" exact component={CadastroEnderecos} />

            </Switch>
        </BrowserRouter>
    );
}