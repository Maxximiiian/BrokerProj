import express from 'express';
import bcrypt from 'bcrypt';
import {
  User, Company, Search,
} from '../../db/models';
// import authCheck from '../middlewares/authCheck';

const route = express.Router();

route.post('/registration', async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const currUser = await User.findOne({ where: { email } });
    if (!currUser) {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, name, password: hashPassword });
      req.session.userSession = { userId: newUser.id, name: newUser.name };
      return res.json({ userId: newUser.id, name: newUser.name });
    }
    res.status(400).json({ message: 'That name already exists' });
  } catch (err) {
    console.error(err);
  }
});

route.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  try {
    const currUser = await User.findOne({ where: { email } });
    if (currUser) {
      const comparePassword = await bcrypt.compare(password, currUser.password);
      if (comparePassword) {
        req.session.userSession = { userId: currUser.id, name: currUser.name };
        return res.json({ userId: currUser.id, name: currUser.name });
      }
    }
    res.status(400).json({ message: 'name or password uncorrected' });
  } catch (err) {
    console.error(err);
  }
});

route.get('/logout', async (req, res) => {
  res.clearCookie('user_sid'); // Удалить куку
  req.session.destroy(); // Завершить сессию
  res.sendStatus(200);
});

route.route('/users')
  .get(async (req, res) => {
    const users = await User.findAll();
    res.json(users);
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
