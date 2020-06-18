import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.PNG';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function DetalhesProf() {

    const token = localStorage.getItem('token');
    const [professionalsDet, setProfessionalsDet] = useState([]);
    const [average, setAverage] = useState();
    const professionalsDetId = parseInt(localStorage.getItem('professionalId'));
    const history = useHistory();



    useEffect(() => {
        api.get(`/professionals/`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setProfessionalsDet(response.data)  
        })
    }, );

    useEffect(() => {
        api.get(`/avg/professional/${professionalsDetId}`, {
            headers: {
                'Authorization': `Bearer ` + token
                }
            })
            .then(response => {
                setAverage(response.data.average);  
        })
    }, );

    

    console.log(average);

    const avg = parseFloat(average);

    
    function handleGoBack() {
        history.go(-1);
    }



    return (
        <div className="detalhesprof-container">
            <div className="content">
                <section>

                    <img src={logoImg} alt="FacilitaPRO" />
                    
                    <h1>Profissionais Verificados</h1>
                    <p>Rápido, Fácil e Confiável.</p>
                    <p>Atendendo em toda a cidade de Pelotas.</p>


                    <Link className="back-link" onClick={handleGoBack}>
                        <FiLogIn size={16} color="E02041" style={{ marginRight: "3px" }} />
                        Retornar
                    </Link>
                </section>
                <section>


                    
                    <button className="buttonFk2">Detalhes do Profissional</button>

                    <ul>
                        {professionalsDet.filter(professionalsDet => professionalsDet.id === professionalsDetId).map(professionalsDet => (
                            <li key={professionalsDet.id}>
                                
                                <h2>{professionalsDet.name}</h2>
                                <h2>{professionalsDet.profession.name}</h2>
                                <h2>Orçamentos Enviados: {professionalsDet.budgets.length}</h2>
                                
                                <h2>{professionalsDet.description}</h2>
                            </li>
                        ))}
                        
                    </ul>


                    {(avg != null || avg !== undefined) ?

                    <span>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Avaliações</Typography>
                            <Rating name="read-only" value={avg} readOnly />
                        </Box>   
                    </span> : <p>Esse profissional não possui avaliações</p>}
                      
                </section>
            </div>
        </div>
        
    );
}