import express from 'express'
import cors from 'cors'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4cxUpS54adoq7FJycfNeQMZXbOWph714",
    authDomain: "hagmr-proyecto-backfront.firebaseapp.com",
    projectId: "hagmr-proyecto-backfront",
    storageBucket: "hagmr-proyecto-backfront.appspot.com",
    messagingSenderId: "1007517767506",
    appId: "1:1007517767506:web:5732a730e0f3aa0dc34c8b"
};

const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)

// Settings de la aplicacion
const app = express()
app.use(express.json())
app.use(cors())

// Creacion de rutas
app.get('/', async (req, res) => {
    try {
        const Users = await collection(db, 'Users')
        const listUsers = await getDocs(Users)
        const aux = []
        listUsers.forEach((doc) => {
            const obj = {
                id: doc.id,
                ...doc.data()
            }
            aux.push(obj)
        })
        res.send({
            'msg': 'success',
            'data': aux
        })
    } catch (error) {
        res.send({
            'msg': 'error',
            'data': error
        })
    }

})

app.post('/create', async (req, res) => {
    try {
        const body = req.body
        const Users = await collection(db, 'Users')
        await addDoc(Users, body)
        res.send({
            'msg': 'success'
        })
    } catch (error) {
        res.send({
            'msg': 'error',
            'data': error
        })
    }
})

app.get('/delete/:id', async (req, res) => {
    
})

// Prendemos el servidor
app.listen(9000, () => {
    console.log('Servidor trabajando')
})