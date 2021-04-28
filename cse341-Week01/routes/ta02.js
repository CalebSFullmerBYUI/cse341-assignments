//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!

let usernamesArray = ["tester1", "tester2"];

const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02', 
        path: 'ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        usernames: usernamesArray
    });
});

router.post('/addUser',(req, res, next) => {
    const incomingData = [];
    req.on('data', (data) => {
        incomingData.push(data);
    });

    req.on('end', () => {
        data = Buffer.concat(incomingData).toString();
        data = data.split('=')[1].replace('+', ' ');
        usernamesArray.push(data);

        res.redirect('/ta02');
    });
});


router.post('/removeUser',(req, res, next) => {
    const incomingData = [];
    req.on('data', (data) => {
        incomingData.push(data);
    });

    req.on('end', () => {
        data = Buffer.concat(incomingData).toString();
        data = data.split('=')[1].replace('+', ' ');
        for (user of usernamesArray) {
            console.log(data);
            console.log(user);
            console.log(user == data);
            console.log(user === data);
            if (user == data)
            {
                usernamesArray.splice(usernamesArray.indexOf(user), 1);
            }
        }

        res.redirect('/ta02');
    });
});

module.exports = router;