const UserServices = require('../services/UserServices')
const fetch = require('node-fetch')

class UserController{

    async loginVerification(req, res){
        let emailUser = req.params.email ? req.params.email.replace(':', '') : "empty"
        let passwordUser = req.params.password ? req.params.password.replace(':', '') : "empty"
        
        let data = await UserServices.login(emailUser, passwordUser)
        res.status(200).send({data})
    }


    async perfilSearch(req, res){
        try{
            let response = await UserServices.perfilInfo(req.params.id)
            res.status(200).send({user: response})
        }catch(error){
            console.log(error)
        }
    }

    async change(req, res){
        const verifyPassword = await UserServices.comparePassword(req.body.checkPassword, req.params.id)
        
        if(verifyPassword == false){
            res.redirect(`http://localhost:5000/perfil/${req.params.id}?q=error`)
        }else if(verifyPassword == true){
            await UserServices.updateDataUser(req.params.id, req.params.nameUser, req.params.email, req.params.password, req.params.location)
            res.redirect("http://localhost:5000/")
        }

    }

    async register(req, res){

        let name = req.body.nameUser
        let email = req.body.email
        let password = req.body.password
        let passwordRepeat = req.body.passwordRepeat
        let city = req.body.city

        let atualDay = new Date()
        
        let textDate = req.body.birthday
        let dateSplit = textDate.split("-")
        let birthDay = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2])

        let diff = Math.abs(atualDay.getTime() - birthDay.getTime())

        let age = Math.ceil(diff / (1000 * 60 * 60 * 24 * 365)) - 1


        let emailExist = await UserServices.compareEmail(email)
        let mistake

        if(!name || !email || !password || !passwordRepeat || !age || city == "Default"){
            mistake = "Preencha todos os campos"
        }
        else if(emailExist){
            mistake = "Email já existe"
        }
        else if(password != passwordRepeat){
            mistake = "Senhas não são iguais"
        }else if(age < 14){
            mistake = "Você não tem idade suficiente"
        }

        if(mistake){
            res.redirect(`http://localhost:5000/mistakeInput/register?mistake=${mistake}`)
        }
        else{
            password.toString()
    
            try{
                await UserServices.registerUser(name, email, password, age, city)
                res.redirect("http://localhost:5000/login")
            }
            catch(error){
                console.log(error)
            }
        }

    }


}

module.exports = new UserController()