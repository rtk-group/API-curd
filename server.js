const express = require('express');
const app  = express();
require('./db.js')
require('dotenv').config();
const user = require('./models/userschema.js');

const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.get('/', (req,res)=>{
//     res.send('hello rohit kumar');
// })


app.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newuser = new user(data);
        const response = await newuser.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log('server code error', err);
        res.status(500).json({ error: 'this is server error' });
    };
});


app.get('/', async (req, res) => {
    try {
        const data = await user.find();
        console.log("data fetch");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'this is server error' });
    }
});



app.put('/:id', async(req, res)=>{
    try{
        const userid = req.params.id;
    const updateuser = req.body;
    const response = await user.findByIdAndUpdate(userid, updateuser,{new: true,runValidators: true});
    if(!response){
        return res.status(404).json({error: "user not found"});
    }
    console.log("person data updated");
    res.status(200).json(response);
    }
    catch(err){
        res.status(500).json('update server error', err);
    }
});



app.delete('/:id', async (req, res)=>{
    try{
        const userid = req.params.id;
        const response = await user.findByIdAndDelete(userid);
        if(!response){
            return res.status(404).json(response);
        }
        console.log("user data is deleted");
        res.status(200).json({"data": "deleted successfully"});

    }catch(err){
        res.status(500).json('update server error', err);
    };
})


app.listen(PORT, ()=>{
    console.log(`server is running at port no. ${PORT}`);
})