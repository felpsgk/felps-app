import React, { useState } from 'react';
import logo from '../logo.svg';
import './App.css';

function QRCodeDisplay() {
    const [qrData, setQrData] = useState(null);
    const [status, setStatus] = useState('loading');

    React.useEffect(() => {
        const fetchQRCode = async () => {
            try {
                const response = await fetch('http://192.168.3.57:3001/qrcode');
                const data = await response.json();
                setStatus(data.status);
                setQrData(data.qrCode);
            } catch (error) {
                console.error('Erro ao buscar o QR Code:', error);
                setStatus('error');
            }
        };

        // Buscar o QR Code a cada 3 segundos
        const interval = setInterval(fetchQRCode, 3000);
        return () => clearInterval(interval);
    }, []);

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
