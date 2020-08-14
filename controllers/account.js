const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('../model/accounts');
router.use(bodyParser.urlencoded({ extended: false }));
const bcrypt = require('bcrypt');
const saltRounds = 10;

ensureLogin = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('./login');
    }
    else {
        next();
    }
}

// REGISTER ROUTES
router.get('/register', (req, res) => {
    res.render('account/register', {
        title: 'Register',
        style: 'register.css'
    });
});

router.post('/register', async (req, res) => {
    const firstName = req.body.fn;
    const lastName = req.body.ln;
    const email = req.body.mail;
    const password = req.body.pass;


    if (firstName === "" || lastName === "" || email === "" || password === "") {
        res.render('account/register', {
            errorMsg: 'Missing Information',
            title: 'Register',
            style: 'register.css'
        });
    }
    if (firstName != "" && lastName != "" && email != "" && password != "") {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        try {
            const hashPass = await bcrypt.hash(password, 10);
            user.password = hashPass;
        }
        catch {
            console.log('Password Cannot Be Encrypted');
        }
        user.push(user);
        res.redirect("/");
    }
    else {
        res.render('account/register', {
            errorMsg: 'Missing Information',
            title: 'Register',
            style: 'register.css'
        });
    }
    /* const custAcc = new Account({
        firstName: req.body.fn,
        lastName: req.body.ln,
        email: req.body.mail,
        password: req.body.pass
    });
    custAcc.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err)); */
});

// LOGIN ROUTES
router.get('/login', (req, res) => {
    res.render('account/login', {
        title: 'Login',
        style: 'login.css'
    });
});

router.post('/login', async (req, res) => {
    const email = req.body.mail;
    const password = req.body.pass;

    if (email === "" || password === "") {
        res.render('account/login', {
            errorMsg: 'User Not Found',
            title: 'Login',
            style: 'login.css'
        });
    };
    if (email === user.email) {
        try {
            if (await bcrypt.compare(password, user.password)) {
                req.session.user = {
                    email: user.email,
                    password: user.password
                };
            }
            else {
                res.render('account/login', {
                    errorMsg: 'User Not Found',
                    title: 'login',
                    style: 'login.css'
                });
            }
        }
        catch {
                
            }
            res.redirect('./dashboard');
        }
    else {
            res.render('account/login', {
                errorMsg: "Invalid Email Or Password",
                title: 'Login',
                style: 'login.css'
            });
        };
    });

// DASHBOARD ROUTES
router.get('/dashboard', ensureLogin, (req, res) => {
    res.render('account/dashboard', {
        user: req.session.user,
        title: 'My Dashboard',
        style: 'dashboard.css',
        name: user.firstName + ' ' + user.lastName
    });
});

// LOGOUT ROUTES
router.get('/logout', (req, res) => {
    req.session.reset();
    res.redirect("./login");
});

module.exports = router;