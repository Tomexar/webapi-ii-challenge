const Posts = require('./data/db.js')


const express = require('express');

const server = express();

server.listen(4000, () => {
    console.log('\n*** Server running on port 4000 ***\n')
})


server.get('/api/posts', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error ',
        });
    }
});


server.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error',
        });
    }
});


server.post('/api/posts', async (req, res) => {
    try {
        const post = await Posts.add(req.body);
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error Adding"
        });
    }
});

server.delete('/api/posts/:id', async (req, res) => {
    try {
      const count = await Posts.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'post deleted' });
      } else {
        res.status(404).json({ message: 'not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    }
  });


  server.put('/api/posts/:id', async (req, res) => {
    try {
      const post = await Posts.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error updating',
      });
    }
  });

  server.get('/api/posts/:id/comments', (req, res) =>{
    Posts.findPostComments(req.params.id)
      .then(comments =>{
        res.status(200).json(comments);
      })
      .catch(error =>{
        res.status(500).json(error);
      });
  });
