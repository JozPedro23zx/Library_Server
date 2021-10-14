const BookServices = require("../services/BookServices");

class BookController {

    async booksOfUser(req, res){
        try{
            let allBooks = await BookServices.booksInfo(req.params.id)
            let oneBook = await BookServices.atualBook(req.params.id)
            res.status(200).send({allBooks, oneBook})
        }catch(error){
            console.log(error)
        }
    }

    async registerBookHistoric(req, res){
        try{
            if(req.params.method == "give"){
                let response = await BookServices.register(req.params.user, req.params.book)
                res.redirect(`${process.env.CLIENT_HOST}/mistakeGetBook/${req.params.book}?mistake=${response}`)
            }else if(req.params.method == "giveBack"){
                let response = await BookServices.deliver(req.params.user, req.params.book)
                res.redirect(`${process.env.CLIENT_HOST}/mistakeGetBook/${req.params.book}?mistake=${response}`)
            }else{
                console.log("Error for get or give back the book")
            }
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = new BookController()