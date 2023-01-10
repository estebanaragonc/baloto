import fetch from 'node-fetch';
import { load } from 'cheerio';


async function getLastResultId() {
  const response = await fetch('https://www.baloto.com/resultados-baloto');
  const html = await response.text();  
  const $ = load(html);
  let idClean;
  const dataResultId = [];
  const id = $('#banner-results > div.mt-5.text-uppercase.bg-opacity-black.white-color.gotham-black.text-center.p-2.center-90 > span').each((i, elem) => {
    idClean = parseInt($(elem).text().match(/\d+/)[0]);
    return;    
  });  
  return idClean;
}

const lastResultId =  getLastResultId();

async function getAllResults(n) {
  try {
    const allData = [];
    const urls = ['resultados-baloto/', 'resultados-revancha/']
    urls.forEach(async url => {
      for (let i = n; i = 2081; i--) {
        console.log(`URL is ${'https://www.baloto.com/' + url + i}`);
        const response = await fetch('https://www.baloto.com/' + url + i);        
        const html = await response.text();
        const $ = load(html);
        const data = [];
        // Extracting data
        $('.yellow-ball').each((i, elem) => {
          data.push(parseInt($(elem).text()));
        });
        $('.red-ball').each((i, elem) => {
          data.push(parseInt($(elem).text()));
        });    
        allData.push(data);
        console.log(`For ${url} results were ${data}`);
        n = n - 1;
      }      
    });
    console.log(allData);
  } catch (error) {
    console.error(error);
  }
}

getAllResults(await lastResultId);