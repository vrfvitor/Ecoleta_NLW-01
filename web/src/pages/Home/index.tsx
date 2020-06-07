import React from 'react';
import logo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import './styles.css';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                <img src={logo} alt="Ecoleta"/>
                </header>
                <main>
                    <h1>Sua marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos as pessoas a encontrarem pontos de coleta de uma forma eficiente.</p>
                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadatre um ponto de coleta</strong>
                    </Link>        
                </main>
            </div>
        </div>
    );
}

export default Home;    