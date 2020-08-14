const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const meals = require('../model/meals')

router.get('/', (req, res) => {
    res.render('general/home', {
        title: 'Home Page',
        style: 'home.css'
    });
});

router.get('/mealpackages', (req, res) => {
    res.render('general/plans', {
        title: 'Meal Package Plans',
        style: 'plans.css'
    });
});

// MEALS ROUTES
router.get('/buildorder/1', (req, res) => {
    res.render('meals/weightloss', {
        title: 'Build Your Order: Weight Loss',
        style: 'build.css'
    });
});

router.post('/buildorder/1', (req, res) => {
    meals.name = 'Weight Loss Package';
    meals.price = '145.00';
    meals.push(meals);
    console.log(meals);
    res.redirect('/cart');
});

router.get('/buildorder/2', (req, res) => {
    res.render('meals/musclegain', {
        title: 'Build Your Order: Muscle Gain',
        style: 'build.css'
    });
});

router.get('/buildorder/3', (req, res) => {
    res.render('meals/keto', {
        title: 'Build Your Order: Keto',
        style: 'build.css'
    });
});

router.get('/buildorder/4', (req, res) => {
    res.render('meals/fatburner', {
        title: 'Build Your Order: Fat Burner',
        style: 'build.css'
    });
});

router.get('/buildorder/5', (req, res) => {
    res.render('meals/vegan', {
        title: 'Build Your Order: Vegan',
        style: 'build.css'
    });
});

router.get('/buildorder/6', (req, res) => {
    res.render('meals/veggie', {
        title: 'Build Your Order: Veggie',
        style: 'build.css'
    });
});

router.get('/buildorder/7', (req, res) => {
    res.render('meals/glutenfree', {
        title: 'Build Your Order: Gluten Free',
        style: 'build.css'
    });
});

router.get('/buildorder/8', (req, res) => {
    res.render('meals/prebioticsoup', {
        title: 'Build Your Order: Prebiotic Soup',
        style: 'build.css'
    });
});

router.get('/buildorder/9', (req, res) => {
    res.render('meals/vegansoup', {
        title: 'Build Your Order: Vegan Soup Cleanse',
        style: 'build.css'
    });
});

router.get('/buildorder/10', (req, res) => {
    res.render('meals/ketosoup', {
        title: 'Build Your Order: Keto Soup Cleanse',
        style: 'build.css'
    });
});

router.get('/buildorder/11', (req, res) => {
    res.render('meals/organicjuice', {
        title: 'Build Your Order: Organic Juice Cleanse',
        style: 'build.css'
    });
});

router.get('/buildorder/12', (req, res) => {
    res.render('meals/value', {
        title: 'Build Your Order: Value',
        style: 'build.css'
    });
});

// SHOPPING CARTS ROUTES
router.get('/cart', (req, res) => {
    res.render('general/cart', {
        title: 'Shopping Cart',
        style: 'cart.css'
    })
})

router.post('/cart', (req, res) => {
    res.redirect('/review');
});

router.get('/review', (req, res) => {
    res.render('general/review', {
        title: "Review Shopping Cart",
        style: 'review.css'
    });
});

router.post('/review', (req, res) => {
    res.redirect('/');
    alert('Order Has Been Placed');
})

module.exports = router;