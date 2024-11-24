const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3005;

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
    if (!$) return [];

    const players = $('.latest-player-card');
    const playerData = [];

    players.each((index, element) => {
        if (index >= 15) return false; // Limita a 15 jogadores

        const playerName = $(element).find('.card-25-pack-name').text().trim();
        const playerRating = $(element).find('.card-25-pack-rating').text().trim();
        const playerPosition = $(element).find('.card-25-pack-position').text().trim();
        const playerPrice = $(element).find('.latest-player-info-price .price').text().trim();
        playerData.push({ name: playerName, over: playerRating, pos: playerPosition, price: playerPrice });
    });

    return playerData;
};

app.get('/jogadores', async (req, res) => {
    const { minprice, maxprice } = req.query;
    const url = `https://www.futwiz.com/en/fc25/players?page=0&minprice=${minprice}&maxprice=${maxprice}`;
    
    try {
        const $ = await fetchPage(url);
        const data = scrapeData($);
        const responseText = data.map(player => `*${player.name}*, de Over *${player.over}*, joga como ${player.pos} está custando *${player.price}*`).join(',\n');
        res.send(responseText);
    } catch (error) {
        res.status(500).send('Erro ao fazer o scraping');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});