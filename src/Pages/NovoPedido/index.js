import React, { useState, useEffect, FormEvent } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.PNG';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Header from '../../Header';
import Dropzone from '../../components/Dropzone';
import moment from 'moment';



export default function NewIncident() {

    const client_id = localStorage.getItem('client_id');
    const token = localStorage.getItem('token');

    
    const[service, setService] = useState([]);
    //const[service_id, setService_id] = useState();
    //const[description, setDescription] = useState();
    //const[initialDate, setInitialDate] = useState();
    //const[finallyDate, setFinallyDate] = useState();
    //const[address_id, setAddress_id] = useState();
    const[status] = useState('aberto');
    const[rated] = useState(0);
    const[address, setAddress] = useState([]);
    const history = useHistory([]);
    //const cliNome = localStorage.getItem('cliNome');
    const[selectedFile, setSelectedFile] = useState();
    const[formData, setFormData] = useState({
        client_id: client_id,
        service_id: '',
        address_id: '',
        initialDate: '',
        description: '',
        finallyDate: '',
        status: status,
        rated: rated,
    });


    
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value })
    }


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
                'Authorization': `Bearer ` + token
            },
            body: {
                nome: service,
            }
        }).then(response => {
            setService(response.data);
        })
    });




    async function handlePedido(e) {
        e.preventDefault()


        const { client_id, service_id, address_id, description,  } = formData;
        const initialDate = moment().format("YYYY/MM/DD")
        const finallyDate = moment().format("YYYY/MM/DD")

        const data = new FormData();

        data.append('client_id', client_id);
        data.append('service_id', service_id);
        data.append('address_id', address_id);
        data.append('description', description);
        data.append('initialDate', initialDate);
        data.append('finallyDate', finallyDate);
        data.append('status', status);
        data.append('rated', rated);

        if(selectedFile) {
            data.append('file', selectedFile);
        }

        if (service_id !== '' && description !== '' & initialDate !== '' & finallyDate !== '' & address_id !== '') {


            try {

                const config = {     
                    headers: { 'Authorization': `Bearer ` + token, 'content-type': 'multipart/form-data' }
                }

                await api.post(`/solicitations`, data, config).then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });


                alert('Serviço Cadastrado!\nAguarde seus Orçamentos!\nVocê receberá atualizações por e-mail.')
                history.push('/main');


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
                    
                    <div className="buttonFk" style={{ marginTop: 0 }}>Realize seu Pedido</div>
                    
                    <FormControl style={{ marginTop: 10 }} variant="outlined" className="formControl">
                        <InputLabel htmlFor="outlined-age-native-simple">Serviço a ser Realizado</InputLabel>
                        <Select
                            native
                            name="service_id" onChange={handleInputChange}
                            label="Serviço a ser Realizado">
                            <option aria-label="None" value="" />
                            {service.map(serv =>
                            <option key={serv.id} 
                            value={serv.id}>{serv.name}</option>
                            )}
                        </Select>
                    </FormControl>

                    <div className="buttonFk2">Descrição</div>
                    <textarea placeholder="Descrição detalhada do serviço." name="description" onChange={handleInputChange} />
                    
                    <Dropzone onFileUploaded={setSelectedFile} />

                    <div className="buttonFk2">Período que Necessita o Orçamento</div>
                    
                    
                    <div>
                        <input type="date" style={{ width: "50%" }} name="initialDate" onChange={handleInputChange} />
                        <input type="date" style={{ width: "50%" }} name="finallyDate" onChange={handleInputChange} />
                    </div>
                    <div className="buttonFk2">Local do Serviço</div>
                    
                    <FormControl style={{ marginTop: 10 }} variant="outlined" className="formControl">
                        <InputLabel htmlFor="outlined-age-native-simple">Endereço</InputLabel>
                        <Select
                            native
                            name="address_id" onChange={handleInputChange}
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