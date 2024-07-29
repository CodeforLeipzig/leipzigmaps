import fs from 'fs';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer';

const getData = async (url) => {
    const response = await fetch(url);
    return await response.json();
}

const downloadData = async () => {
    const url = 'https://www.meinkitaplatz-leipzig.de/api/einrichtung/liste?isBedarfsmeldungsprozess=false'
    const data = await getData(url);
    if (data && data.length > 0) {
        fs.writeFileSync('./public/data-raw/leipzig-kivan.json', data, 'utf-8');
    }    
}

const getDetailsData = async (id) => {
    const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://www.meinkitaplatz-leipzig.de/api/einrichtung/show/${id}`);
    console.log(url)
    return await getData(url);
}

const getDetailsHtml = async (id) => {
    const url = `https://www.meinkitaplatz-leipzig.de/app/de/einrichtung/show/${id}?processid=&index=0&returnurl=%2Fde%2Feinrichtung%3Freturnurl%3D`
    const response = await fetch(url);
    return await response.text();
}

const convertToCsv = (objArray) => {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var keys = Object.keys(array[0]);
    var headline = '';
    for (var key of keys) {
        if (headline != '') {
            headline += ';'
        }
        headline += key;
    }
    str += headline + '\n';
    for (var i=0; i<array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') {
                line += ';'
            }
            line += array[i][index];
        }
        str += line + '\n';
    }
    return str;
}

const readData = () => {
    const content = fs.readFileSync('./public/data-raw/leipzig-kivan.json', 'utf-8');
    const jsonData = JSON.parse(content);
    const newJsonData = [];
    jsonData.forEach((elem) => {
        const einrichtungsId = elem["einrichtungsId"];
        //const detailsData = getDetailsData(einrichtungsId)
        const detailsData = readJavascriptRendered(einrichtungsId);
    
        const einrichtung =  detailsData["einrichtung"];
        const einrichtungAdresse = einrichtung["adresse"];
        const einrichtungAnsprechpartner = einrichtung["ansprechpartner"];
    
        const traeger = detailsData["traeger"]
        const traegerAdresse = traeger["adresse"]
        const traegerAnsprechpartner = traeger["ansprechpartner"]
    
        const entry = {
            "einrichtungId": einrichtung["id"],
            "einrichtungName": einrichtung["name"],
            "einrichtungArt": einrichtung["einrichtungsart"],
            "einrichtungStrasse": einrichtungAdresse["strasse"],
            "einrichtungHausnummer": einrichtungAdresse["hausnummer"],
            "einrichtungPostleitzahl": einrichtungAdresse["postleitzahl"],
            "einrichtungOrt": einrichtungAdresse["ort"],
            "einrichtungOrtsteil": einrichtungAdresse["ortsteil"],
            "einrichtungUrl": einrichtung["url"],
            "einrichtungLatitude": einrichtung["latitude"],
            "einrichtungLongitude": einrichtung["longitude"],
            "einrichtungAnsprechpartnerVorname": einrichtungAnsprechpartner["vorname"],
            "einrichtungAnsprechpartnerNachname": einrichtungAnsprechpartner["nachname"],
            "einrichtungAnsprechpartnerAnrede": einrichtungAnsprechpartner["anrede"],
            "einrichtungAnsprechpartnerTelefonnummer": einrichtungAnsprechpartner["telefonnummer"],
            "einrichtungAnsprechpartnerFaxnummer": einrichtungAnsprechpartner["faxnummer"],
            "einrichtungAnsprechpartnerEmail": einrichtungAnsprechpartner["email"],
            "traegerName": traeger["name"],
            "traegerUrl": traeger["url"],
            "traegerAnsprechpartnerVorname": traegerAnsprechpartner["vorname"],
            "traegerAnsprechpartnerNachname": traegerAnsprechpartner["nachname"],
            "traegerAnsprechpartnerAnrede": traegerAnsprechpartner["anrede"],
            "traegerAnsprechpartnerTelefonnummer": traegerAnsprechpartner["telefonnummer"],
            "traegerAnsprechpartnerFaxnummer": traegerAnsprechpartner["faxnummer"],
            "traegerAnsprechpartnerEmail": traegerAnsprechpartner["email"],
            "traegerStrasse": traegerAdresse["strasse"],
            "traegerHausnummer": traegerAdresse["hausnummer"],
            "traegerPostleitzahl": traegerAdresse["postleitzahl"],
            "traegerOrt": traegerAdresse["ort"],
            "einrichtungOrtsteil": traegerAdresse["ortsteil"],
        }
        newJsonData.push(entry);
    });
    // const csv = convertToCsv(content)
    fs.writeFileSync('./public/data/leipzig-kivan.json', JSON.stringify(newJsonData, null, 2), 'utf-8');
}

const readDataRaw = () => {
    const content = fs.readFileSync('./public/data-raw/leipzig-kivan.json', 'utf-8');
    const jsonData = JSON.parse(content);
    const newJsonData = [];
    jsonData.forEach((elem) => {
        const einrichtungsId = elem["einrichtungsId"];
        const detailsData = readJavascriptRendered(einrichtungsId);
    
        const entry = {
            ...elem,
            ...detailsData,
        }
        newJsonData.push(entry);
    });
    // const csv = convertToCsv(content)
    fs.writeFileSync('./public/data/leipzig-kivan-raw.json', JSON.stringify(newJsonData, null, 2), 'utf-8');
}

const readJavascriptRendered = async (id) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://www.meinkitaplatz-leipzig.de/app/de/einrichtung/show/${id}?processid=&index=0&returnurl=%2Fde%2Feinrichtung%3Freturnurl%3D`
    await page.goto(url);
    try {
        await page.waitForSelector('#anpsrechpartner-view');
        const ansprechpartnerData = await page.evaluate(() => document.querySelector('#anpsrechpartner-view').innerText);
        fs.writeFileSync(`./public/data-raw/kivan/${id}-ansprechpartner.json`, ansprechpartnerData, 'utf-8');
    } catch(e) {
        console.log(e.message);
    }
    try {
        const traegerData = await page.evaluate(() => document.querySelector('#traeger-view').innerText);
        fs.writeFileSync(`./public/data-raw/kivan/${id}-traeger.json`, traegerData, 'utf-8');
    } catch(e) {
        console.log(e.message);
    }
    await browser.close();
}

const fillLiteral = ({ str, tokens, fields}) => {
    const literal = {};
    let part = str;
    for (let [index, token] of tokens.entries()) {
        var tokenIndex = part ? part.indexOf(token) : -1;
        if (tokenIndex < 0 && token == "Ansprechpartner") {
            tokenIndex = part ? part.indexOf("Tagespflegeperson") : -1;
        }
        if (tokenIndex >= 0) {
            var value = part.substring(tokenIndex + token.length).trim()
            literal[fields[index]] = value;
            part = part.substring(0, tokenIndex);
        }
    }
    return literal;
}

const parseAnsprechpartnerConfigured = ({str, prefix}) => {
    const tokens = [
        "Ansprechpartner",
        "Tel .:",
        "Fax : ",
        "E-Mail : "
    ].reverse();
    const ansprechpartnerPrefix = `${prefix}Ansprechpartner`
    const fields = [ "Email", "Faxnummer", "Telefonnummer", "Nachname" ].map(field => `${ansprechpartnerPrefix}${field}`)
    const ansprechpartner = fillLiteral({ str, tokens, fields});
    const nameParts = ansprechpartner[`${ansprechpartnerPrefix}Nachname`].split(" ");    
    ansprechpartner[`${ansprechpartnerPrefix}Anrede`] = nameParts.length > 0 ? nameParts[0].trim() : null
    ansprechpartner[`${ansprechpartnerPrefix}Vorname`] = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ").trim() : null
    ansprechpartner[`${ansprechpartnerPrefix}Nachname`] = nameParts.length > 0 ? nameParts[nameParts.length-1].trim() : null
    return ansprechpartner;
}

const parseTraeger = (str) => {
    const tokens = ["Ansprechpartner ", "Träger "];
    const fields = ["traegerAnsprechpartnerNachname", "traegerName"]
    const initialLiteral = fillLiteral({ str, tokens, fields});
    const traeger = {
        traegerName: initialLiteral.traegerName,
        ...parseAnsprechpartnerConfigured({str: "Ansprechpartner " + initialLiteral.traegerAnsprechpartnerNachname, prefix: "traeger"})
    };
    return traeger;
}

const readDetailsJson = async (einrichtungId) => {
    const browser = await puppeteer.launch({
        headless: 'new', args: [ '--disable-web-security' ],
    });
      
    const page = await browser.newPage();
      
    await page.setBypassCSP(true);

    const htmlUrl = `https://www.meinkitaplatz-leipzig.de/app/de/einrichtung/show/${einrichtungId}?processid=&index=0&returnurl=%2Fde%2Feinrichtung%3Freturnurl%3D`
    await page.goto(htmlUrl);
    await page.setViewport({width: 1080, height: 1024});
    const evaluateFun = async (ident) => {
        const response = await fetch(`https://www.meinkitaplatz-leipzig.de/api/einrichtung/show/${ident}`)
        return response;    
    }

    const data = await page.evaluate(evaluateFun, einrichtungId);
    await browser.close();
    fs.writeFileSync(`./public/data-raw/kivan/${einrichtungId}.json`, JSON.stringify(data, null, 2), 'utf-8');
    return data;
}

const downloadDetailsData = () => {
    const content = fs.readFileSync('./public/data-raw/leipzig-kivan.json', 'utf-8');
    const jsonData = JSON.parse(content);
    var c = 0;
    const filtered = jsonData.filter(
        elem => !fs.existsSync(`./public/data-raw/kivan/${elem.einrichtungsId}-ansprechpartner.json`) 
        || !fs.existsSync(`./public/data-raw/kivan/${elem.einrichtungsId}-traeger.json`)
    );
    var interval = setInterval(function() {
        const elem = filtered[c];
        const ident = elem.einrichtungsId; 
        console.log(ident);
        readJavascriptRendered(ident)
        c++; 
        if(c >= filtered.length) clearInterval(interval);
    }, 3000);        
}

const createJson = () => {
    const content = fs.readFileSync('./public/data-raw/leipzig-kivan.json', 'utf-8');
    const jsonData = JSON.parse(content);
    const newJsonData = [];
    jsonData.forEach((elem) => {
        const einrichtungsId = elem["einrichtungsId"];
        try {
            var einrichtungAnsprechpartner = {};
            try {
                const detailsAnsprechpartnerData = fs.readFileSync(`./public/data-raw/kivan/${einrichtungsId}-ansprechpartner.json`, 'utf-8');
                einrichtungAnsprechpartner = parseAnsprechpartnerConfigured({str: detailsAnsprechpartnerData, prefix: "einrichtung"});
            } catch(e) {
            }

            const detailsTraegerData = fs.readFileSync(`./public/data-raw/kivan/${einrichtungsId}-traeger.json`, 'utf-8');        
            const traeger = parseTraeger(detailsTraegerData)

            const traegerAdresseStr = traeger["traegerName"].replace(elem["traegerName"], "")
            const plzIndex = traegerAdresseStr.indexOf(" 0");
            const traegerAdresse = {};
            if (plzIndex > 1) {
                const plzCity = traegerAdresseStr.substring(plzIndex+1);
                const strasseHnr = traegerAdresseStr.substring(0, plzIndex);
                const plzIndex2 = plzCity.indexOf(" ")
                traegerAdresse["plz"] = plzCity.substring(0, plzIndex2);
                traegerAdresse["city"] = plzCity.substring(plzIndex2+1);
                const parts = strasseHnr.split(" ");
                traegerAdresse["hausNr"] = parts[parts.length-1];
                traegerAdresse["strasse"] = parts.splice(parts.length-2, 1).join(" ");
            }    
            
            const entry = {
                "einrichtungId": elem["einrichtungsId"],
                "einrichtungName": elem["einrichtungName"],
                "einrichtungArt": elem["einrichtungsart"],
                "einrichtungArtText": elem["einrichtungsartText"],
                "einrichtungStrasse": elem["einrichtungStrasse"],
                "einrichtungHausnummer": elem["einrichtungHausnummer"],
                "einrichtungPostleitzahl": elem["einrichtungPostleitzahl"],
                "einrichtungOrt": elem["einrichtungOrt"],
                "einrichtungUrl": elem["einrichtungUrl"],
                "einrichtungLatitude": elem["einrichtungLatitude"],
                "einrichtungLongitude": elem["einrichtungLongitude"],
                "einrichtungAnsprechpartnerAnrede": elem["ansprechpartnerAnrede"] || einrichtungAnsprechpartner["einrichtungAnsprechpartnerAnrede"],
                "einrichtungAnsprechpartnerVorname": elem["ansprechpartnerVorname"] || einrichtungAnsprechpartner["einrichtungAnsprechpartnerVorname"],
                "einrichtungAnsprechpartnerNachname": elem["ansprechpartnerNachname"] || einrichtungAnsprechpartner["einrichtungAnsprechpartnerNachname"],
                "einrichtungAnsprechpartnerTelefonnummer": elem["ansprechpartnerTelefonnummer"] || einrichtungAnsprechpartner["einrichtungAnsprechpartnerTelefonnummer"],
                "einrichtungAnsprechpartnerFaxnummer": elem["ansprechpartnerFaxnummer"] || einrichtungAnsprechpartner["einrichtungAnsprechpartnerFaxnummer"],
                "einrichtungAnsprechpartnerEmail": elem["ansprechpartnerEmail"] || einrichtungAnsprechpartner["einrichtungAnsprechpartnerEmail"],
                "traegerName": elem["traegerName"],
                "traegerAnsprechpartnerAnrede": traeger["traegerAnsprechpartnerAnrede"],
                "traegerAnsprechpartnerVorname": traeger["traegerAnsprechpartnerVorname"],
                "traegerAnsprechpartnerNachname": traeger["traegerAnsprechpartnerNachname"],
                "traegerAnsprechpartnerTelefonnummer": traeger["traegerAnsprechpartnerTelefonnummer"],
                "traegerAnsprechpartnerFaxnummer": traeger["traegerAnsprechpartnerFaxnummer"],
                "traegerAnsprechpartnerEmail": traeger["traegerAnsprechpartnerEmail"],
                "traegerStrasse": traegerAdresse["strasse"],
                "traegerHausnummer": traegerAdresse["hausNr"],
                "traegerPostleitzahl": traegerAdresse["plz"],
                "traegerOrt": traegerAdresse["city"],
            }
            newJsonData.push(entry);
        } catch(e) {
            console.log("error for " + einrichtungsId + ": " + e.message)
        }
    });
    const newContent = JSON.stringify(newJsonData, null, 2);
    //console.log(JSON.stringify(newJsonData, null, 2));
    fs.writeFileSync('./public/data/leipzig-kivan.json', newContent, 'utf-8');
    const csv = convertToCsv(newContent.replace(";", ", "))
    fs.writeFileSync('./public/data/leipzig-kivan.csv', csv, 'utf-8');
}

//readData();
//parseAnsprechpartner();
//readDetailsJson(1057);
//parseTraeger();
//readDataRaw();
//downloadDetailsData();
createJson()