const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3006;

// Função para buscar a página
const fetchPage = async (url) => {
    try {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    } catch (error) {
        console.error('Erro ao buscar a página:', error);
        return null;
    }
};

// Função para extrair dados
const scrapeData = ($) => {
    if (!$) return { startItems: [], coreItems: [], boots: [], endItems: [] };

    const startItems = [];
    $('.medium-11 .iconsRow .championSpell img').each((index, element) => {
        const itemName = $(element).attr('alt').trim();
        startItems.push(itemName);
    });

    const coreItems = [];
    $('.medium-13 .iconsRow .championSpell img').each((index, element) => {
        const itemName = $(element).attr('alt').trim();
        coreItems.push(itemName);
    });

    const boots = [];
    $('.medium-11 .iconsRow .championSpell img').each((index, element) => {
        const itemName = $(element).attr('alt').trim();
        boots.push(itemName);
    });

    const endItems = [];
    $('.medium-13 .iconsRow .championSpell img').each((index, element) => {
        const itemName = $(element).attr('alt').trim();
        endItems.push(itemName);
    });

    return { startItems, coreItems, boots, endItems };
};

app.get('/build/:championName', async (req, res) => {
    const { championName } = req.params;
    const url = `https://www.leagueofgraphs.com/pt/champions/builds/${championName}`;
    
    try {
        const $ = await fetchPage(url);
        const data = scrapeData($);
        const responseText = `
            Itens Iniciais para ${championName}: ${data.startItems.join(', ')}
            \n\nItens Core: ${data.coreItems.join(', ')}
            \n\nBotas: ${data.boots.join(', ')}
            \n\nItens Finais: ${data.endItems.join(', ')}
        `;
        res.send(responseText.trim());
    } catch (error) {
        res.status(500).send('Erro ao fazer o scraping');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});