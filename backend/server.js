import express from 'express';
import cors from 'cors';
import fs, { read } from 'fs'
import { json } from 'stream/consumers';

const app = express()

app.use(cors({
    origin: "https://coach-management-app.vercel.app/"
}))
app.use(express.json())

const PORT = process.env.PORT || 5000;

const DB_File = './db.json'

const readDB = () => JSON.parse(fs.readFileSync(DB_File, "utf-8"))

app.get('/', (req, res) => {
  res.json({ message: "API Working ✅" });
});

app.get("/coaches",(req, res)=>{
    const data = readDB()
    res.status(200).json(data.coaches);
})

app.get("/coaches/:id",(req, res) => {
    const data = readDB();
    const coach = data.coaches.find(i =>i.id === parseInt(req.params.id));

    if(coach){
        res.status(200).json(coach)
    }
    else{
        res.status(404).json({error: "coach not found"})
    }
})


app.post("/coaches",(req, res)=>{
    const data = readDB();
    const newID = data.coaches.length > 0 ? Math.max(...data.coaches.map(i => i.id)) + 1 : 1;
    const newCoach = {
        id: newID,
        ...req.body,
        createdAt: new Date().toISOString()
    }
    data.coaches.push(newCoach)
    fs.writeFileSync(DB_File, JSON.stringify(data, null, 2))
    res.status(201).json(newCoach)
})

app.put("/coaches/:id", (req, res)=>{
    const data = readDB();
    const index = data.coaches.findIndex(i =>i.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).json({error: "coach not found"})
    }

    data.coaches[index] = {...data.coaches[index], ...req.body}
    fs.writeFileSync(DB_File, JSON.stringify(data, null, 2))
    return res.status(200).json(data.coaches[index])
})

app.patch("/coaches/:id", (req, res)=>{
    const data = readDB();
    const index = data.coaches.findIndex(i =>i.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).json({error: "coach not found"})
    }

    data.coaches[index] = {...data.coaches[index], ...req.body}
    fs.writeFileSync(DB_File, JSON.stringify(data, null, 2))
    return res.status(200).json(data.coaches[index])
})

app.delete("/coaches/:id",(req, res)=>{
    const data = readDB()
    data.coaches = data.coaches.filter( i=> i.id !== parseInt(req.params.id))
    fs.writeFileSync(DB_File, JSON.stringify(data, null ,2))
    res.status(204).json({message: "deleted successfully"})
})


app.listen(PORT, ()=> console.log(`server is running successfully on port:${PORT}`))