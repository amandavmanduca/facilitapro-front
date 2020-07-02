import React from 'react';
import logoSenac from '../src/assets/senac_logo.png';
import logoCiemsul from '../src/assets/ciemsul.png';
import logoVertical from '../src/assets/logovertical.png';



export default function Footer() {

    return (
        <div>
            <footer>
                <img src={logoSenac} alt="Senac" style={{ width: 150, height: 60, marginTop: 0 }} />
                <img src={logoVertical} alt="FacilitaPRO" style={{ width: 130, height: 130 }}/>
                <img src={logoCiemsul} alt="Ciemsul" style={{ width: 180, height: 130 }}/>
            </footer>
            <div className="text-footer">
                <p>Desenvolvedores</p>
                <p>Amanda Manduca | Maxwell Laner</p>
                <br />
                
            </div>
            
        </div>
    );
}

