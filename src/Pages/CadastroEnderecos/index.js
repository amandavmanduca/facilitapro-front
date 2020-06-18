import React, { useState, useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.PNG';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import MaskedInput from 'react-text-mask';
import api from '../../services/api';
import Header from '../../Header';


export default function NewClient() {

    const history = useHistory();
    const token = localStorage.getItem('token');
    const client_id = localStorage.getItem('client_id');
    
    const[address, setAddress] = useState([]);
    const[street, setStreet] = useState('');
    const[number, setNumber] = useState('');
    const[complement, setComplement] = useState('');
    const[neighborhood, setNeighborhood] = useState('');
    const [city] = useState('Pelotas');
    const[zipcode, setZipcode] = useState('');


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

    

    async function handleRegister(e) {
        e.preventDefault();

        const dados = {     
            client_id,   
            street,
            number,
            complement,
            neighborhood,
            city,
            zipcode,   
        }

        

        if(street.indexOf(' ') === -1) {
            alert('Inserir Endereço completo');
            setStreet('');
            return
        }
        if(number === ''){
            alert('Preencher o Número corretamente');
            setNumber('');
            return
        }
        if(neighborhood === ''){
            alert('Você deve preencher o Bairro.');
            setNeighborhood('');
            return
        }
        if(zipcode === ''){
            alert('Inserir o CEP corretamente');
            setZipcode('');
            return
        }
        if(zipcode.substr(8,1) === '_'){
            alert('Inserir o CEP corretamente');
            setZipcode('');
            return
        }

        
        if (street !== '' & number !== '' & neighborhood !== '' & zipcode !== '') {
        
            try {
                await api.post(`/addresses`, dados, {
                    headers: {
                        'Authorization': `Bearer ` + token
                        }
                    }
                );

                alert('Endereço Cadastrado com Sucesso.')

                setStreet('');
                setNumber('');
                setComplement('');
                setNeighborhood('');
                setZipcode('');
    
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

                    <section>
                        <img src={logoImg} alt="FacilitaPRO" />
                        
                        <h1>Profissionais Verificados</h1>
                        <p>Rápido, Fácil e Confiável.</p>
                        <p>Atendendo em toda a cidade de Pelotas.</p>
                        <Link className="back-link" to='/'>
                            <FiArrowLeft size={16} color="E02041" />
                            Voltar para Home
                        </Link>
                        <Link className="back-link" to='/main'>
                            <FiArrowLeft size={16} color="E02041" />
                            Ir para Meus Pedidos
                        </Link>

                    </section>

                    <form onSubmit={handleRegister}>
                        <button className="buttonFk" style={{ marginTop: 0 }}type="submit">Cadastro de Endereços</button>

                        <button className="buttonFk2" type="submit">Endereços Cadastrados no FacilitaPRO</button>
                        <select type="number" name={address}>
                            {address.map(adr =>
                            <option key={adr.id} 
                            //placeholder="Serviço a ser Realizado"
                            value={adr.id}>{adr.street} [ nº {adr.number} {adr.complement} ]</option>
                            )}
                        </select>

                        <button className="buttonFk2" type="submit">Cadastre um Novo Endereço</button>
                        <input type="text" placeholder="Avenida/Rua" value={street} onChange={e => setStreet(e.target.value)} />
                        <div>
                            <input type="number" style={{ width: "20%" }} placeholder="Nº" value={number} onChange={e => setNumber(e.target.value)} />
                            <input type="text" style={{ width: "80%" }} placeholder="Complemento" value={complement} onChange={e => setComplement(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="Bairro" value={neighborhood} onChange={e => setNeighborhood(e.target.value)} />
                            <MaskedInput type="text" style={{ width: "100%" }} placeholder="CEP" value={zipcode} onChange={e => setZipcode(e.target.value)}
                            mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} />
                        </div>


                        <button className="button" type="submit">Cadastrar Endereço</button>

                        {(address.length > 0) ?

                        <span>
                            <button className="buttonFk3" onClick={() => history.push('/pedido')}>Solicitar Orçamento</button>     
                        </span> : null}
                                    
                    </form>


                </div>
            </div>
        </div>
    );
}