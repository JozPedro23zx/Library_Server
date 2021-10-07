const Book = require("../../Models/Books")
const Group = require("../../Models/Groups")
const Book_Tags = require("../../Models/Book_Tags")
const Library = require("../../Models/Libraries")

class ManagerServices{
    async createOnlyLibrary(title, author, sinopse, quantity, genres, cover, groupName, allLibrary, libraryId){
        let bookExist = await Book.findOne({where: {title: title}})
        if(bookExist) {return "Este livro já existe"}

        let group = await Group.findOne({where: {name: groupName}})
        if(group) {var groupId = group.id}

        let library = await Library.findAll()
        let newAdd = new Date()
        
        if(genres){
            let genresSplit = genres.split("/")
            await this.addGender(title, genresSplit)
        }

        if(allLibrary == "check"){
            for(let i = 0; i < library.length; i++){
                await Book.create({
                    title: title,
                    author: author,
                    sinopse: sinopse,
                    quantity: quantity,
                    cover: cover,
                    newAdd: newAdd,
                    groupId: groupId,   
                    libraryId: library[i].id
                })
            }

        }else{
            await Book.create({
                title: title,
                author: author,
                sinopse: sinopse,
                quantity: quantity,
                cover: cover,
                newAdd: newAdd,
                groupId: groupId,   
                libraryId: libraryId
            })
        }

        return "Livro registrado com sucesso"
    }

    async addGender(title, genres){
        for(let i = 0; i < genres.length; i++){
            await Book_Tags.create({
                book: title,
                genre: genres[i]
            })
        }
    }

    async createLibrary(name, street, city){
        await Library.create({
            name: name,
            street: street,
            location: city
        })

        return "Biblioteca registrada com sucesso"
    }

    async createGroupOfBooks(nameGroup, cover){
        await Group.create({
            name: nameGroup,
            cover: cover
        })
    }
}

module.exports = new ManagerServices()