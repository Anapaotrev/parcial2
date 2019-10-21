const express = require('express')
const met = require('./met.js')

const app = express()

const port = process.env.PORT || 3000

app.get('/students/:id', function(req, res) {
    if (!req.params.id) {
        return res.send({
            error: 'Debes enviar una matrícula'
        })
    } 
    const id = req.params.id

    if (id != 'A01176521') {
        return res.send({
            error: 'Matrícula incorrecta'
        })
    }

    return res.send({
        id: id,
        fullname: 'Ana Paola Treviño Mánica',
        nickname: 'Ana Pao',
        age: 22
    })
})

app.get('/met', function(req, res) {
    if (!req.query.search) {
        res.send({
            error: 'Debes enviar una ¿?'
        })
    } else {
        const q = req.query.search

        met.searchMet(q, function(error, objectID) {
            if (error) {
                res.send({
                    error: error
                })
            } else {
                met.getObject(objectID, function(error, object) {
                    if (error) {
                        res.send({
                            error: error
                        })
                    } else {
                        res.send({
                            searchTerm: q,
                            artist: object.artist,
                            title: object.title,
                            year: object.year,
                            technique: object.technique,
                            metUrl: object.metUrl
                        })
                    }
                })
            }
        })
    }
})

app.get('*', function(req, res) {
    res.send({
        error: 'Oops! Ruta no valida'
    })
})

app.listen(port, function() {
    console.log('Up and running!')
})