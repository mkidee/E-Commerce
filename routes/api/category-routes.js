const router = require('express').Router();
const { Category, Product } = require('../../models');

// reach out to brandon for help!
// The `/api/categories` endpoint

// the route with a simple '/' is our general endpoint. It is our most basic route
router.get('/', (req, res) => {
  // with a single '/' we are going to be finding all categories that have been created up to this point (as long as we using a GET route)
  // with this GET route we will be pulling back each categories attributes- a unique id, and its unique category name
  // it will also include an array of information per category, within this category will include each product that falls under this category
  //  and each product will include its unique id, name, price, stock and category_id number which will reference back to its category home
  // once our findAll() function has done this, it will respond with a 'json' response returning this 'dbCategoryData', this 'json' response
  // is returning this data in string form so we aren't stuck looking at an ugly array of information, but string information that is easy to read
  // once it has done this, (or in this case it fails), it will return which ever error(s) it catches. if everything returns and runs smoothly,
  // it will return an error of '500' which is basically a 'everything is running perfect' message.
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      },
    ],
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  });
});

// this route '/:id' is for findind a single category at a time 
router.get('/:id', (req, res) => {
  // once we have done a 'GET' using this route [where ':id' is filled with one specific categories' id],
  // our route will 'findOne' where it is looking for an 'id' as its required parameter
  // if it find that id, then the search will include all of the products within that category,
  // and within each product it will show their respective id, product name, price, stock and the 
  // the number of the category that it falls under
  // if no category is found with that id, we will return a '404' error and relay the message to the user:
  // 'No category found using this id'.
  // our categorydata response at that point will be empty.
  // if it catches any other internal error, it will return that error in the console for the user to see.
  // if not we will return a '500' error which means all went smoothly!
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      },
    ],
  })
  .then((dbCategoryData) => {
    if(!dbCategoryData) {
      res.status(404).json({ message: 'No category found using this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// for this next route we will be using a 'POST' in order to create a new category
router.post('/', (req, res) => {
  // in our code we see that our endpoint is still one forward slash, but now we are using a 'POST'
  // once posted, our route is telling the system to create a new route
  // we must make sure on our end that we first give Insomnia (or whichever program) the data that it
  // needs to create the category. In this case we see that it only requires the 'category_name'
  // and our computer will pull that request from a certain body area where we input data.
  // once we do that (and if done correctly), our code will send that category_name and get a response
  // in the form of json which is basically a text response. Confirming that our code works we will be
  // able to see the name of our new category created
  // if it does not work, our system will catch any errors and post them in the console for the user to see
  // if does work, we will return a '500' code which is our green light that all is well. 
  Category.create({
    category_name: req.body.category_name,
  })
  .then((dbProductdata) => res.json(dbProductdata))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
  .then((dbProductdata) => res.json(dbProductdata))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found using this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found using this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
