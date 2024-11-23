import React, { useState } from 'react';
import logo from '../logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function QRCodeDisplay() {
    const [qrData, setQrData] = useState(null);
    const [status, setStatus] = useState('loading');
    const [intervalDuration, setIntervalDuration] = useState(15000); // Duração padrão do intervalo

    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                const response = await fetch('http://192.168.3.57:3001/qrcode');
                const data = await response.json();
                setStatus(data.status);
                setQrData(data.qrCode);
                
                // Ajustar o intervalo de atualização para 60 segundos se o status for 'ready'
                if (data.status === 'ready') {
                    setIntervalDuration(60000); // 60 segundos
                }
            } catch (error) {
                console.error('Erro ao buscar o QR Code:', error);
                setStatus('error');
            }
        };

        // Inicializa a busca do QR Code
        fetchQRCode();
        
        // Configurar o intervalo de busca do QR Code
        const interval = setInterval(fetchQRCode, intervalDuration);
        
        // Limpar o intervalo quando o componente for desmontado ou quando intervalDuration mudar
        return () => clearInterval(interval);
    }, [intervalDuration]); // Dependência para reiniciar o useEffect quando intervalDuration mudar

    if (status === 'loading') {
        return <h1>Carregando sistema...</h1>;
    }
    if (status === 'ready') {
        return <h1>Bot já funcional!</h1>;
    }
    if (status === 'error') {
        return <h1>Erro ao carregar o QR Code.</h1>;
    }

    return (
        <div>
            <h1>Escaneie o QR Code com seu celular</h1>
            {qrData && <img src={qrData} alt="QR Code" />}
        </div>
    );
}


function App() {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div className="App">
            <header className="App-header">
                <nav>
                    <button
                        className={`tab-button ${activeTab === 'home' ? 'active' : ''}`}
                        onClick={() => setActiveTab('home')}
                    >
                        Home
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'qrcode' ? 'active' : ''}`}
                        onClick={() => setActiveTab('qrcode')}
                    >
                        QR Code
                    </button>
                </nav>
                {activeTab === 'home' && (
                    <div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            teste - uhu teste commit o <code>codigo</code> na máquina.
                        </p>
                        <p>e subindo com commit.</p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                    </div>
                )}
                {activeTab === 'qrcode' && <QRCodeDisplay />}
            </header>
        </div>
    );
}

export default App;
