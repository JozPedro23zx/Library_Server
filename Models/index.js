(async () =>{
    try{
        const database = require('../database/db')
        const Book = require('./Books')
        const Library = require('./Libraries')
        const User = require('./Users')
        const Group = require('./Groups')
        const User_Book = require('./User_Book')
        const Book_Tag = require('./Book_Tags')
        
        User_Book.belongsTo(User)
        User_Book.belongsTo(Book)

        Book.belongsTo(Group)
        Book.belongsTo(Library)

        await database.sync();
    }
    catch(error){
        console.log(error)
    }
})();