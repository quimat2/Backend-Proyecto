import express from 'express'
import cors from 'cors'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4cxUpS54adoq7FJycfNeQMZXbOWph714",
    authDomain: "hagmr-proyecto-backfront.firebaseapp.com",
    projectId: "hagmr-proyecto-backfront",
    storageBucket: "hagmr-proyecto-backfront.appspot.com",
    messagingSenderId: "1007517767506",
    appId: "1:1007517767506:web:5732a730e0f3aa0dc34c8b"
};

const firebase = initializeApp(firebaseConfig)
const db = getFirestore()

// Settings de la aplicacion
const app = express()
app.use(express.json())
app.use(cors())

// Creacion de rutas
app.get('/', async (req, res) => {
    const Users = await collection(db, 'Users')
    const listUsers = await getDocs(Users)
    const resUsers = Users.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) 
    res.send({
        'msg': 'success',
        'data': resUsers
    })
})

// Prendemos el servidor
app.listen(9000, () => {
    console.log('Servidor trabajando')
})