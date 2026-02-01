var apiKey = "f279de2a002e091c197e43a676ba1e2e"



async function displayAlbum(album, tagName) {

    document.getElementById('album-name').textContent = album.name
    if (album.image[3]['#text'] != null) {
        document.getElementById('album-cover').src = album.image[3]['#text']
    }else{

    }
    document.getElementById('artist-name').textContent = album.artist.name + " - " + tagName
    document.getElementById('artist-link').href = album.artist.url
    document.getElementById('album-link').href = album.url
}

function getRandomTag() {
    getTopTags()
        .then(data => {
            var random = Math.floor(Math.random() * data.toptags.tag.length)
            var nameGenre = data.toptags.tag[random].name
            return getAlbumFromTag(nameGenre)
        })
}

function getAlbumFromTag(tagName) {

    var search = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${tagName}&api_key=${apiKey}&format=json`

    return fetch(search)
        .then(response => response.json())
        .then(data => {
            var total = data.albums['@attr'].total
            var perPage = data.albums['@attr'].perPage
            var num = Math.floor(Math.random() * total)
            var page = Math.floor(num / perPage)
            var inPage = num % perPage
            return getAlbumPage(tagName, page, inPage)
        })
        .catch(error => console.log(error))


}

function getAlbumPage(tagName, page, inPage) {

    var search = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${tagName}&api_key=${apiKey}&format=json&page=${page}&limit=50`

    return fetch(search)
        .then(response => response.json())
        .then(data => {

            var album = data.albums.album[inPage]
            console.log(album)
            displayAlbum(album, tagName)
            return album

        })
        .catch(error => console.log(error))
}


function getTopTags() {
    var searchTag = `http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=${apiKey}&format=json`
    var toReturn;
    return fetch(searchTag)
        .then(response => response.json())
        .catch(error => console.log(error))


}


function getInfoTag(genre) {
    var searchTag = `http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=${genre}&api_key=${apiKey}&format=json`
    fetch(searchTag)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

}

function getTopAlbumsTag(genre) {
    var searchTag = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${genre}&api_key=${apiKey}&format=json`
    fetch(searchTag)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
}


function getAlbumJson(name, limit) {
    var searchByName = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${name}&api_key=${apiKey}&format=json&limit=${limit}&page=5`

    // data -> results -> albummatches -> album (find album by name pathing)

    fetch(searchByName)
        .then(response => response.json())
        .then(data => console.log(data.results.albummatches))
        .catch(error => console.log(error))
}

