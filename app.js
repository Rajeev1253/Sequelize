const express = require("express")
const {sequelize,User,Post} = require("./models")

const app = express();
app.use(express.json())
app.post('/users',async(req,res)=>{
    const {name,email,role}=req.body

    try{
         const user = await User.create({name,email,role})
         return res.json(user)
    }
    catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})

app.delete('/users/:uuid',async(req,res)=>{
    const uuid = req.params.uuid
    try{
        const user = await User.findOne({where:{uuid}})

        await user.destroy();
        return res.json({message:"User deleted sucessfully"})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:'Something went wrong'})

    }
})

app.get("/users", async(req, res, next)=>{
    const response = await User.findAndCountAll();
    return res.status(200).send(response);
})

app.get("/users/:uuid", async(req, res, next)=>{
    
    const uuid = req.params.uuid
    try{
        const users = await User.findOne({
            where:{uuid},
            include:'posts'
        })
        return res.json(users)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'})
    }
})
app.put("/users/:uuid",async(req,res)=>{
    const uuid = req.params.uuid
    const {name,email,role}=req.body
    try{
        const user = await User.findOne({
            where:{uuid},
        })
        user.name = name,
        user.email=email,
        user.role=role

        await user.save()
        
        return res.json(user)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'})
    }
})
app.post('/posts', async (req, res) => {
    const { userUuid, body } = req.body
  
    try {
      const user = await User.findOne({ where: { uuid: userUuid } })
  
      const post = await Post.create({ body, userId: user.id })
  
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  app.get("/posts", async(req, res, next)=>{
    const response = await Post.findAndCountAll({include:'user'});
    return res.status(200).send(response);
})

app.get("/posts/:uuid", async(req, res, next)=>{
    
    const uuid = req.params.uuid
    try{
        const users = await Post.findOne({
            where:{uuid}
        })
        return res.json(users)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'})
    }
})

app.listen({port:8000},async()=>{
    console.log("server is running on port 5000")
    await sequelize.authenticate()
    console.log('Database Connected')
})