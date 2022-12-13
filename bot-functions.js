const fs = require('fs')

// Reusable functions found here

module.exports = {
    initFiles() {
        const file = './data/coords.json'
        try {
            fs.readFileSync(file, 'utf-8')
        } catch (err) {
            fs.writeFileSync(file, JSON.stringify({data: []}), 'utf-8')
        }
    },
    duplicateLocation(location) {
        const file = './data/coords.json'
        const coords = JSON.parse(fs.readFileSync(file, 'utf-8')).data
        for (let coord of coords) {
            if (coord.location.toLowerCase() === location.toLowerCase()) {
                return true
            }
        }
        return false
    },
    compareLocName(a, b) {
        return a.location.localeCompare(b.location)
    },
    getCoordByLocation(location) {
        const file = './data/coords.json'
        const coords = JSON.parse(fs.readFileSync(file, 'utf-8')).data
        for (let coord of coords) {
            if (coord.location.toLowerCase() === location.toLowerCase()) {
                coords.splice(coords.indexOf(coord))
                return coord
            }
        }
        return null
    },
    deleteCoord(location) {
        const file = './data/coords.json'
        const coords = JSON.parse(fs.readFileSync(file, 'utf-8')).data
        for (let coord of coords) {
            if (coord.location.toLowerCase() === location.toLowerCase()) {
                coords.splice(coords.indexOf(coord), 1)
                fs.writeFileSync(file, JSON.stringify({data: coords}), 'utf-8')
                return true
            }
        }
        return false
    },
    compareRegion(a, b) {
        //sorts by region, then alphabetically
        const key = {
            'overworld': 1,
            'nether': 2,
            'end': 3
        }
        return key[a.region] - key[b.region] || a.location.localeCompare(b.location)
    },
    getItemByName(name){
        function guess(name) {
            //really gross way of removing whitespace, convert to lowercase, and searching
            //for items with plural endings: ends with 's' or 'es'
            //Example: query for 'TOrcH' will match with 'Torches'
            let letters = name.toLowerCase().split('').filter(char => /\w/.test(char))
            letters = letters[letters.length - 1] === 's' ?
                letters.slice(letters.length - 2, letters.length).join('') === 'es' ?
                    letters.slice(0, letters.length - 2) : letters.slice(0, letters.length - 1)
            : letters 
            return letters.join('')
        }
        const file = './data/items.json'
        const items = JSON.parse(fs.readFileSync(file, 'utf-8')).items
        for (let item of items) {
            if (guess(item.name) === guess(name)) {
                return item
            }
        }
        return null
    }
}