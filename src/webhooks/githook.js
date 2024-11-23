const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/githook', (req, res) => {
    const payload = req.body;
    if (payload.ref === 'refs/heads/main') { // Substitua 'main' pela branch desejada
        console.log('Novo commit detectado. Fazendo pull...');
        exec('git -C /home/felpsgk/Documents/react/felps-app pull', (err, stdout, stderr) => {
            if (err) {
                console.error(`Erro ao executar git pull: ${stderr}`);
                return res.status(500).send('Erro ao fazer pull.');
            }
            console.log(`Pull realizado: ${stdout}`);
            res.status(200).send('Pull realizado com sucesso.');
        });
    } else {
        res.status(200).send('Nenhuma ação necessária.');
    }
});

app.listen(3002, () => console.log('Servidor ouvindo na porta 3002'));
