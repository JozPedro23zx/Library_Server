const Book = require('../../Models/Books')
const User_Books = require('../../Models/User_Book')


class BookServices{
    async register(user, book){
        const verify = await User_Books.findOne({where:{userId: user, isUsing: true}})
        if(verify){
            return "Você já está com um livro da biblioteca. Devolva-o antes de pegar outro"
        }else{
           
            let quantityBook = await Book.findOne({where: {id: book}})
            if(quantityBook.quantity > 0){
                quantityBook.quantity -= 1
                quantityBook.save()

                await User_Books.create({
                    userId: user,
                    bookId: book,
                    isUsing: true
                })
                return "Você acaba de pegar este livro. Lembre-se de devolver"
        
            }else{
                return "Não há livros para pegar"
            }
        }

    }



    async deliver(user, book){

        const deliverBook = await User_Books.findOne({where: {userId: user, bookId: book, isUsing: true}})
        let addBook = await Book.findOne({where: {id: book}})
        if(deliverBook){
            if(addBook.quantity && addBook.quantity > 0){
                addBook.quantity += 1
                addBook.newAdd = new Date()
                deliverBook.isUsing = false
                
                await deliverBook.save()
                await addBook.save()

                return "Devolvido com sucesso"
            }
        }else{
            return "Você não está em posse deste livro"
        }
    }


    
    async booksInfo(id){
        const booksIds = await User_Books.findAll({where:{userId: id}})
        if(!booksIds){
            return null
        }

        var booksList = []
        for(let i = 0; i < booksIds.length; i++){
            let index = booksIds[i].bookId
            let book = await Book.findOne({where: {id: index}})

            let day = booksIds[i].createdAt
            let pickUpDay = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`

            let bookHistoric = [book.id, book.cover, pickUpDay]
            booksList.push(bookHistoric)
        }
        if(!booksList){
            return "Não há livros disponíveis"
        }
        else{
            return booksList
        }
    }


    async atualBook(id){
        const idBook = await User_Books.findOne( {where: {userId: id, isUsing: true}})

        if(!idBook){
            return null
        }
        const bookData = await Book.findOne({where: {id: idBook.bookId}})
        
        let day = idBook.createdAt
        let pickUpDay = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}` 

        day.setDate(day.getDate() + 7)
        let giveBackDay = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}` 
        
        var book = [bookData.id, bookData.title, bookData.cover, pickUpDay, giveBackDay]


        if(!book){
            return "Não está em posse de nenhum livro"
        }
        else{
            return book
        }
    }
}

module.exports = new BookServices()
