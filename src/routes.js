router = require('express').Router()

const BookController = require('./controllers/BookController')
const UserController = require('./controllers/UserController')
const ManagerController = require('./controllers/ManagerController')
const LibraryController = require('./controllers/LibraryController')
const SendBookController = require('./controllers/SendBookController')


router.get('/:library/listBook', SendBookController.bookList)
router.get('/popularBooks', SendBookController.popularBookList)
router.get('/:library/getBook/:bookID', SendBookController.bookInfo)
router.get('/:library/listBook/:dataSearch', SendBookController.searchBook)
router.get('/:library/:groupId/listBookForGroup', SendBookController.groupList)



router.get('/getHistoricBook/:id', BookController.booksOfUser)
router.get('/registerHistoric/:method/:user/:book', BookController.registerBookHistoric)



router.post('/register', UserController.register)
router.get('/getPerfil/:id', UserController.perfilSearch)
router.get('/login/:email/:password', UserController.loginVerification)
router.post('/edit/:id/:nameUser/:email/:password/:location', UserController.change)


router.get('/getAllLibraries', LibraryController.allLibraries)
router.get('/getLibrary/:location', LibraryController.getLibraries)



router.post('/createBook', ManagerController.createBook)
router.post('/createGroup', ManagerController.createGroup)
router.post('/createLibrary', ManagerController.createLibrary)


module.exports = router