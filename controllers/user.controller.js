// const fs = require('fs');
const db = require('../dataBase/user');
const dbJson = require('../dataBase/users.json');

module.exports = {

    getUsers: (req, res) => {
        res.json(dbJson);
    },

    getUserById: (req, res) => {
        const {user_id} = req.params;

        const user = dbJson[user_id - 1];
        res.json({user});
    },


    // getUserByIdJson: (req, res) => {
    //     fs.readFile(dbJson,  )
    // },

    createUser: (req, res) => {
        console.log(req.body);
        db.push({...req.body, id: db.length + 1});
        res.json(db);
    },

    updateUser: (req, res) => {
        res.json('UPDATE USER');
    }

    // deleteUser: (req, res) => {
    //     res.json('UPDATE USER')

    // let id = req
    // let arr = req.json
    // arr = arr.filter(item => item !== id)
    // }

};
