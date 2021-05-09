//TA03 PLACEHOLDER
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const arrayOfData = JSON.parse(fs.readFileSync( path.join(__dirname, '../items.json')));
let filters = [];
let filterUser = "";

router.get('/',(req, res, next) => {
    console.log(arrayOfData);
    let dataToRender = [];

    if ((filters.length > 0) && (filterUser == ""))
    {
        dataToRender = arrayOfData;
    }
    else
    {
        for (obj of arrayOfData)
        {
            if ((obj.name.search(filterUser) != -1) || (obj.name == filterUser))
            {
                dataToRender.push(obj);
            }
            else
            {
                for (tag of obj.tags)
                {
                    if (filters.includes(tag))
                    {
                        dataToRender.push(obj);
                        break;
                    }
                }
            }
        }
    }

    res.render('pages/ta03', { 
        title: 'Team Activity 03: Items', 
        path: '/ta03', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        objs: dataToRender
    });
});



router.post('/search',(req, res, next) => {
    const incomingData = [];
    req.on('data', (data) => {
        incomingData.push(data);
    });

    req.on('end', () => {
        data = Buffer.concat(incomingData).toString();
        data = data.split('=')[1].replace('+', ' ').trim();

        if (data != "")
        {
            filterUser = data;
            filters = data.split(' ');
        }
        else
        {
            filterUser = "";
            filters = [];
        }

        res.redirect('/ta03');
    });
});


module.exports = router;