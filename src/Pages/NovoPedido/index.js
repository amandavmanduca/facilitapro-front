import React, { useState, useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.PNG';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import MaskedInput from 'react-text-mask';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Header from '../../Header';

export default function NewIncident() {

    const client_id = localStorage.getItem('client_id');
    const token = localStorage.getItem('token');

    
    const[service, setService] = useState([]);
    const[service_id, setService_id] = useState();
    const[description, setDescription] = useState();
    const[initialDate, setInitialDate] = useState();
    const[finallyDate, setFinallyDate] = useState();
    const[address_id, setAddress_id] = useState();
    const[status] = useState('aberto');
    const[address, setAddress] = useState([]);
    const history = useHistory([]);
    //const cliNome = localStorage.getItem('cliNome');
    
    
    useEffect(() => {
        api.get(`/clients/${client_id}`, {
            headers: {
                'Authorization': `Bearer ` + token
            },
            body: {
                nome: address,
            }
        }).then(response => {
            setAddress(response.data.addresses);
        })
    }, [address, client_id, token]);




    useEffect(() => {
        api.get('/services', {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4ODY2ZGFjLTRhMDktNGQ2ZS04YTcxLTExMjM4MTY3Y2I0NSIsImlhdCI6MTU4ODc5NTAwOX0.ufpowwr4wnrHtLWPVG3mr6HYxoWkwly_5jXvINAn0-Q`
              },
            body: {
                nome: service,
            }
        }).then(response => {
            setService(response.data);
        })
    }, [service]);

    



    async function handlePedido(e) {
        e.preventDefault();

        const data = {
            client_id,
            service_id,
            address_id,
            description,
            initialDate,
            finallyDate,
            status,
        }

        console.log(service_id);

        console.log(data);
        console.log(token);


        if (service_id !== undefined && description !== undefined & initialDate !== undefined & finallyDate !== undefined & address_id !== undefined) {

            try {
                await api.post(`/solicitations`, data, {
                    headers: {
                        'Authorization': `Bearer ` + token
                        }
                    }
                );
                
                console.log(data);

                alert('Serviço Cadastrado!\nAguarde seus Orçamentos!\nVocê receberá atualizações por e-mail.')
                history.push('/main');

                
                //const response = await api.post('/pedidos', data);
                
                //alert(`Código do seu pedido: response.data.id`);

            } catch (err) {
                alert('Erro.')
            }

        } else {
            alert('Preencher dados corretamente.')
        }
    }

    return (
        <div className="new-incident-container">
            <Header />
            <div className="content">
                <section>
                    <img src={logoImg} alt="FacilitaPRO" />
                    
                    <h1>Profissionais Verificados</h1>
                    <p>Rápido, Fácil e Confiável.</p>
                    <p>Atendendo em toda a cidade de Pelotas.</p>
                    <Link className="back-link" to='/main'>
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para Meus Pedidos
                    </Link>
                    <Link className="back-link" to='/enderecos'>
                        <FiArrowLeft size={16} color="E02041" />
                        Cadastrar Novo Endereço
                    </Link>
                </section>
                <form onSubmit={handlePedido}>
                    <div className="buttonFk" style={{ marginTop: 0 }} type="submit">Realize seu Pedido</div>
                    
                    <FormControl style={{ marginTop: 10 }} variant="outlined" className="formControl">
                        <InputLabel htmlFor="outlined-age-native-simple">Serviço a ser Realizado</InputLabel>
                        <Select
                            native
                            value={service_id} onChange={e => setService_id(e.target.value)}
                            label="Serviço a ser Realizado">
                            <option aria-label="None" value="" />
                            {service.map(serv =>
                            <option key={serv.id} 
                            value={serv.id}>{serv.name}</option>
                            )}
                        </Select>
                    </FormControl>

                    <div className="buttonFk2" type="submit">Descrição</div>
                    <textarea placeholder="Descrição detalhada do serviço." value={description} onChange={e => setDescription(e.target.value)} />
                    
                    <div className="buttonFk2" type="submit">Período que Necessita o Orçamento</div>
                    
                    <p>Data</p>
                    
                    <div>
                        <input type="date" style={{ width: "50%" }} value={initialDate} onChange={e => setInitialDate(e.target.value)} />
                        <input type="date" style={{ width: "50%" }} value={finallyDate} onChange={e => setFinallyDate(e.target.value)} />
                    </div>
                    <div className="buttonFk2" type="submit">Local do Serviço</div>
                    
                    <FormControl style={{ marginTop: 10 }} variant="outlined" className="formControl">
                        <InputLabel htmlFor="outlined-age-native-simple">Endereço</InputLabel>
                        <Select
                            native
                            value={address_id} onChange={e => setAddress_id(e.target.value)}
                            label="Endereço">
                            <option aria-label="None" value="" />
                            {address.map(adr =>
                            <option key={adr.id} 
                            //placeholder="Serviço a ser Realizado"
                            value={adr.id}>{adr.street} [ nº {adr.number} {adr.complement} ]</option>
                            )}
                        </Select>
                    </FormControl>
                                       
                    <button className="button" type="submit">Solicitar Orçamento</button>
                </form>
            </div>
        </div>
    );
}