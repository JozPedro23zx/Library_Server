const User = require('../../Models/Users')
const bcrypt = require('bcrypt')

class UserServices{


    async login(userEmail, userPassword){
        let userResult = await User.findOne({where: {email: userEmail}})

        if(userResult){
            let password = userResult.password || 'no-password'
            let match = await bcrypt.compare(userPassword, password)
    
            if(match) return userResult 
            return false
        }
        else{
            return false
        }
    }

    async registerUser(userName, userEmail, userPassword, userAge, userLocation){
        const newUser = new User({
                name: userName,
                email: userEmail,
                password: userPassword,
                age: userAge,
                location: userLocation,
                isAdmin: false
            })
            
            bcrypt.genSalt(10, function(err,salt){
                bcrypt.hash(userPassword, salt, function(err, hash){
                if(err){
                    console.log(err)
                }else{
                    newUser.password = hash
                    newUser.save()
                }
            })
        })
    }



    async comparePassword(userPassword, id){
                            
        let theUser = await User.findByPk(id)
        let passwordHashed = theUser.password

        let match = await bcrypt.compare(userPassword, passwordHashed)

        if(match) return true 
        return false
    }



    async compareEmail(userEmail){
        const isEmail = await User.findOne({where: {email: userEmail}})
        if(isEmail != null){
            return "Email not expect"
        }else{
            return null
        }
    }



    async perfilInfo(id){
        const perfil = await User.findByPk(id)
        if(!perfil){
            console.log("Profile not found")
        }
        else{
            return perfil
        }
    }

    
    async updateDataUser(id, name, email, password, city){
        const userUpdated = await User.findByPk(id)

        name == 'empty' ? userUpdated.name = userUpdated.name : userUpdated.name = name;
        email == 'empty' ? userUpdated.email = userUpdated.email : userUpdated.email = email;
        userUpdated.location = city

        if(password == 'empty'){
            userUpdated.password = userUpdated.password
        }else{
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            userUpdated.password = hash  
        }

        await userUpdated.save()
    }
}

module.exports = new UserServices()
