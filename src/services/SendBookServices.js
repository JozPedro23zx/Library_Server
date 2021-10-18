Sequelize = require('sequelize')
const Op = require('sequelize').Op
const Book = require('../../Models/Books')
const Group = require('../../Models/Groups')
const Book_Tags = require('../../Models/Book_Tags')

class SendBookServices{
    async bookView(itemID, library){
        let infoBook = await Book.findByPk(itemID, {where: {libraryId: library}})
        return infoBook
    }

    async tagsView(title){
        let tagsBook = await Book_Tags.findAll({where: {book: title}})
        return tagsBook
    }

    async randomRecommend(genresArray, atualLibrary){
        var recommend
        if(genresArray.length != 0){
            let allGenres = []
            genresArray.map(tag => allGenres.push(tag.genre)) // Colocar apenas os nomes dos GÊNERO em um array
            
            let allTitles = []
            let titlesArray = await Book_Tags.findAll({where: {genre: allGenres}})
            titlesArray.map(bookTitle => allTitles.push(bookTitle.book)) // Colocar apenas os nomes dos LIVROS em um array
            
            allTitles = Array.from(new Set(allTitles)) // Remove itens repetidos
            let index = allTitles.indexOf(genresArray[0].book)
            allTitles.splice(index, 1)
            
            recommend = await Book.findAll({where:{title: allTitles, libraryId: atualLibrary}, limit: 4, order: 'random()'})
            return recommend
        }
        recommend = await Book.findAll({where:{libraryId: atualLibrary}, limit: 4, order: Sequelize.literal('random()')})    
        return recommend
    
    }

    async bookSearch(data, library){
        data = data.replace(/[^a-zA-Z ]/g, "") 
        let infoBook = await Book.findAll({where:{
            [Op.or]: [
                {title: {[Op.like]: `%${data}%`}},
                {author: {[Op.like]: `%${data}%`}}
            ],
            libraryId: library
        }})

        if(infoBook != []){
            let allTags = await Book_Tags.findAll({where: {genre: data}})


            for(let i = 0; i < allTags.length; i++){
                let titleBook = allTags[i]
                let bookIndex = await Book.findOne({where:{title: titleBook.book}})
                infoBook.push(bookIndex)    
            }
        }
        return infoBook
    }

    async bookShow(library){
        let infoBook = await Book.findAll({where: {libraryId: library}})
        return infoBook
    }

    async popularBookShow(){
        let infoCollection = await Group.findAll()
        return infoCollection
    }

    async collectionShow(library, group){
        let collectionList = await Book.findAll({where: {libraryId: library, groupId: group}})
        return collectionList
    }
}

module.exports = new SendBookServices()