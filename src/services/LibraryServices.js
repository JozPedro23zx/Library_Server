const Library = require('../../Models/Libraries')

class LibraryServices{
    async getLocationLibraries(locationUser){
        const locationLibrary = await Library.findOne({where: {location: locationUser}})
        return locationLibrary
    }

    async getAllLibrariesInfo(){
        let libraries = await Library.findAll({attributes: {exclude: ["id", "name", "street", "createdAt", "updatedAt"]}})
        
        libraries = libraries.map(library => libraries = library.location)
        
        return libraries
    }
}

module.exports = new LibraryServices()