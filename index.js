const {json, createError} = require('micro')
const fetch = require('node-fetch')
const fs = require('fs');

module.exports = async function (req, res) {
    const data = await json(req)
    if (!data.hasOwnProperty('token')) {
        throw createError(400, "Missing required parameter 'token'")
    }
    const response = await fetch('https://api.github.com/graphql', { 
        method: 'POST',
        body:    JSON.stringify({query: fs.readFileSync('query.txt', 'utf8')}),
        headers: { 'Authorization': 'Bearer ' + data.token },
    })
    return await response.json()
}