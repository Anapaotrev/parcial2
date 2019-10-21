const request = require('request')

const searchMet = function(q, callback) {
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + q

    request({ url, json: true }, function(error, response) {
        if (error) {
            callback(error, undefined)
        } else {
            const ids = response.body.objectIDs

            if (ids.length == 0) {
                callback('Not Found', undefined)
            } else {
                callback(undefined, ids[0])
            }
        }
    })
}

const getObject = function(objectId, callback) {
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectId

    request({ url, json: true }, function(error, response) {
        if (error) {
            callback(error, undefined)
        } else {
            if (response.message) {
                callback(response.message, undefined)
            } else {
                const data = response.body

                const object = {
                    artist: data.constituents[0].name,
                    title: data.title,
                    year: data.objectEndDate,
                    technique: data.medium,
                    metUrl: url
                }
                callback(undefined, object)
            }
        }
    })
}

module.exports = {
    searchMet: searchMet,
    getObject: getObject
}