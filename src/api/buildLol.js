const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const port = 3006;

// Função para buscar a página
const fetchPage = async (url) => {
  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch (error) {
    console.error("Erro ao buscar a página:", error);
    return null;
  }
};

// Função para extrair dados
const scrapeData = ($) => {
  if (!$) return { startItems: [], coreItems: [], boots: [], endItems: [] };

  const startItems = [];
  $(".medium-11 .iconsRow .championSpell img").each((index, element) => {
    const itemName = $(element).attr("alt").trim();
    startItems.push(itemName);
  });

  const coreItems = [];
  $(".medium-13 .iconsRow .championSpell img").each((index, element) => {
    const itemName = $(element).attr("alt").trim();
    coreItems.push(itemName);
  });

  const boots = [];
  const lastBootElement = $(".medium-11 .iconsRow .championSpell img").last();
  const lastBootName = lastBootElement.attr("alt").trim();
  boots.push(lastBootName);

  const endItems = [];
  $(".medium-13 .iconsRow .championSpell img").each((index, element) => {
    const itemName = $(element).attr("alt").trim();
    endItems.push(itemName);
  });

  return { startItems, coreItems, boots, endItems };
};

app.get("/build/:championName", async (req, res) => {
  const { championName } = req.params;
  const url = `https://www.leagueofgraphs.com/pt/champions/builds/${championName}`;

  try {
    const $ = await fetchPage(url);
    const data = scrapeData($);
    const responseText = `
            *Itens Iniciais* para ${championName}: \n*-*${data.startItems.join(
      "\n*-*"
    )}
            \n\n*Itens Core:* \n*-*${data.coreItems.join("\n*-*")}
            \n\n*Botas:* \n*-*${data.boots.join("\n*-*")}
            \n\n*Itens Finais:* \n*-*${data.endItems.join("\n*-*")}
        `;
    res.send(responseText.trim());
  } catch (error) {
    res.status(500).send("Erro ao fazer o scraping");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
