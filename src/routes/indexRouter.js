import express from 'express';
import layout from '../middlewares/resLayout';
import authCheck from '../middlewares/authCheck';

const route = express.Router();
route.use(layout);

route.get('/', async (req, res) => {
  try {
    const initState = { path: req.originalUrl, userSession: req.session.userSession };
    res.layout(initState);
  } catch (err) {
    console.error(err);
  }
});

route.get('/auth', async (req, res) => {
  try {
    const initState = { path: req.originalUrl, userSession: req.session.userSession };
    res.layout(initState);
  } catch (err) {
    console.error(err);
  }
});

route.get('/registration', async (req, res) => {
  try {
    const initState = { path: req.originalUrl, userSession: req.session.userSession };
    res.layout(initState);
  } catch (err) {
    console.error(err);
  }
});

route.get('/notauth', async (req, res) => {
  try {
    const initState = { path: req.originalUrl, userSession: req.session.userSession };
    res.layout(initState);
  } catch (err) {
    console.error(err);
  }
});

route.get('/search', async (req, res) => {
  try {
    const initState = { path: req.originalUrl, userSession: req.session.userSession };
    res.layout(initState);
  } catch (err) {
    console.error(err);
  }
});

export default route;
