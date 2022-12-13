const fs = require('fs')
const puppeteer = require('puppeteer')

async function scrapeData(url) {
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    const items = await page.evaluate(() => {
        const rows = Object.values(document.getElementsByTagName('tr')).filter((row) => row.children[0].innerText !== 'Name' && row.children.length === 4)
        let items = []
        for (let row of rows) {
            let item = {
                name: row.children[0].innerText,
                ingredients: row.children[1].innerText,
                description: row.children[3].innerText,
                img_src: row.children[2].firstChild.currentSrc
            }
            items.push(item)
        }
        return items
    })
    await browser.close()
    let data = {
        items: items
    }

    return data
}

async function fetchItems() {
    const url = 'https://www.minecraftcrafting.info/'
    const data = await scrapeData(url)

    fs.writeFileSync('./data/items.json', JSON.stringify(data), 'utf-8')
    return data.items.length
}

async function main() {
    console.log(`${await fetchItems()} items successfully stored\n`)
}

main()