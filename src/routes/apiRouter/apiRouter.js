import express from 'express';

import authRouter from './authRouter';
// import authCheck from '../middlewares/authCheck';
import {
  User, Company, Search,
} from '../../db/models';

const path = require('path');
const fs = require('fs').promises;

const route = express.Router();

route.use('/', authRouter);

route.route('/search')
  .post(async (req, res) => {
    const { body, authState } = req.body;
    try {
      const companies = await Company.findAll();
      const matchCompany = companies.filter((x) => (x.dataValues.name.toLowerCase())
        .includes(body.toLowerCase()));
      // if (matchCompany.length !== 0) {
      res.json(JSON.parse(JSON.stringify(matchCompany)));
      // }
    } catch (err) {
      console.error(err);
    }
  });

route.route('/companydata')
  .post(async (req, res) => {
    const { symbol } = req.body;
    try {
      if (symbol === 'IVV') {
        const data = (
          await fs.readFile(path.join(__dirname, '../../db/seeders/indexdata.txt'), 'utf-8')
        );
        res.json(JSON.parse(JSON.stringify(data)));
      }
      // if (matchCompany.length !== 0) {
      // res.json(JSON.parse(JSON.stringify(matchCompany)));
      // }
    } catch (err) {
      console.error(err);
    }
  });
// route.route('/posts')
//   .get(async (req, res) => {
//     const posts = await Post.findAll();
//     res.json(posts);
//   })
//   .post(async (req, res) => {
//     const { body, imageURL, userId } = req.body;
//     try {
//       const newPost = await Post.create({
//         body, imageURL, userId, likes: 0,
//       });
//       const allPosts = await Post.findAll();
//       res.json(allPosts);
//     } catch (err) {
//       console.error(err);
//     }
//   });

// route.route('/posts/:id')
//   .delete(async (req, res) => {
//     try {
//       const { id } = req.params;
//       await Post.destroy({ where: { id } });
//       const currPosts = await Post.findAll();
//       res.json(currPosts);
//     } catch (err) {
//       console.error(err);
//     }
//   })
//   .get(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const onePost = await Post.findOne({ where: { id } });
//       res.json(onePost);
//     } catch (err) {
//       console.error(err);
//     }
//   })
//   .put(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { body, imageURL } = req.body;
//       const onePost = await Post.update(
//         {
//           body, imageURL,
//         },
//         {
//           where: { id },
//         },
//       );
//       if (onePost) {
//         res.sendStatus(200);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   });

// route.route('/posts/like/:id')
//   .put(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const user = User.findOne({ where: { id } });
//       user.increment('likes');
//       // const onePost = await Post.update(
//       //   {
//       //     likes
//       //   },
//       //   {
//       //     where: { id },
//       //   },
//       // );
//       // if (onePost) {
//       //   res.sendStatus(200);
//       // }
//     } catch (err) {
//       console.error(err);
//     }
//   });

export default route;
