const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs)
    },


    async store(req, res) {
        console.log(req.body);
    
        const { github_username, techs, latitude, longitude } = req.body;
    
    
        let dev = await Dev.findOne({github_username});

        if(!dev) {

            const github_api = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = github_api.data;
        
            const techsArray = parseStringAsArray(techs)
        
            //lat e long abaixo
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        
        
        
            console.log(name, bio, avatar_url, github_username);
         
        } 

    
        return res.json(dev)
    }
}