const LibraryServices = require('../services/LibraryServices')

class LibraryController{
    async getLibraries(req, res){
        let str = req.params.location.toString()
        let city = str.replace(':', '')
        try{
            const libraryLocation = await LibraryServices.getLocationLibraries(city)
            res.status(200).send({library: libraryLocation})
        }catch(error){
            console.log(error)
        }
    }

    async allLibraries(req, res){
        try{
            const libraries = await LibraryServices.getAllLibrariesInfo()
            res.status(200).send(libraries)
        }catch(error){
            console.log(error)
        }
    }
}



module.exports = new LibraryController()