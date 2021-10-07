const SendBookServices = require("../services/SendBookServices");

class SendBookController{
    async bookInfo(req, res) {
        try{
            let book = await SendBookServices.bookView(req.params.bookID, req.params.library)
            let tags = await SendBookServices.tagsView(book.title)
            let recommendation = await SendBookServices.randomRecommend(tags, req.params.library)
            res.status(200).send({book, tags, recommendation})
        }
        catch (error){
            console.log(error)
        }
    }

    async searchBook(req, res) {
        try{
            let book = await SendBookServices.bookSearch(req.params.dataSearch, req.params.library)
            res.status(200).send({book: book})
        }
        catch (error){
            console.log(error)
        }
    }

    async bookList(req, res){
        try{
            let book = await SendBookServices.bookShow(req.params.library)
            res.status(200).send({book: book})
        }
        catch(error){
            console.log(error)
        }
    }

    async popularBookList(req, res){
        try{
            let collection = await SendBookServices.popularBookShow()
            res.status(200).send({collection})
        }catch(error){
            console.log(error)
        }
    }

    async groupList(req, res){
        try{
            let collectionList = await SendBookServices.collectionShow(req.params.library, req.params.groupId) 
            res.status(200).send({collectionList})
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = new SendBookController()