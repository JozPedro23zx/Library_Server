const ManagerServices = require("../services/ManagerServices")

class ManagerController{
    async createBook(req, res){
        let title = req.body.title
        let group = req.body.group
        let sequence = req.body.sequence || 0
        let quantity = req.body.quantity || 0
        let libraryId = req.body.oneLibrary || 1
        let cover
        
        if(!title){
            console.log("Missing title")
            res.redirect(`${process.env.CLIENT_HOST}/`)
        }

        if(group != "none"){cover = group.toLowerCase().replace(/\s/g, '') + sequence}
        else{cover = title.toLowerCase().replace(/\s/g, '')}

        let result = await ManagerServices.createOnlyLibrary(title, req.body.author, req.body.sinopse, quantity , req.body.genres, cover, group, req.body.allLibrary, libraryId)
        console.log(result)
        res.redirect(`${process.env.CLIENT_HOST}/`)
    }

    async createLibrary(req, res){
        let result = await ManagerServices.createLibrary(req.body.name, req.body.street, req.body.city)
        res.redirect(`${process.env.CLIENT_HOST}/`)
    }

    async createGroup(req, res){
        let nameGroup = req.body.title
        let cover = nameGroup.toLowerCase().replace(/\s/g, '')

        await ManagerServices.createGroupOfBooks(nameGroup, cover)
        res.redirect(`${process.env.CLIENT_HOST}/`)
    }
}

module.exports = new ManagerController()