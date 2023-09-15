import express from 'express'
import cors from 'cors'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

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

// Settings de la aplicación
const app = express()
app.use(express.json())
app.use(cors())

// Creación de Rutas
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
    //console.log('@@@ param => ', req.params.id)
    const id = req.params.id
    try {
        await deleteDoc(doc(db, 'Users', id))
        res.send({
            'msg': 'user deleted'
        })
    } catch (error) {
        res.send({
            'msg': 'error',
            'data': error
        })
    }

})

app.get('/get-update/:id', async (req, res) => {
    const id = req.params.id

    const userRef = doc(db, 'Users', id)
    const user = await getDoc(userRef)

    if (user.exists()) {
        res.send({
            'msg': 'success',
            'data': user.data()
        })
    } else {
        res.send({
            'msg': 'user doesnt exist'
        })
    }

})

app.post('/update', async (req, res) => {
    const { id, firstname, lastname, address, city, phone, cp } = req.body
    const newData = {
        firstname,
        lastname,
        address,
        city,
        phone,
        cp
    }
    await updateDoc(doc(db, 'Users', id), newData)
    res.send({
        'msg': 'success'
    })
})

// Prendemos el servidor
app.listen(9000, () => {
    console.log('Servidor Trabajando')
})