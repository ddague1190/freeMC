import hashPassword from '../../utils/auth';
import getMongoDb from '../../utils/db/mongodb';
import { FORM_ERROR } from 'final-form';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, email, password, password2 } = req.body.values;


        if (!email || !email.includes('@') || !password || password.trim().length < 7) {
            res.status(422).json({
                message: [
                    { password: 'Invalid input - password should also be at least 7 characters long.' }
                ]
            })
            return;
        }

        if (password !== password2) {
            res.status(422).json({
                message: [
                    { password: ' ' },
                    { password2: ' ' },
                    { [FORM_ERROR]: 'Passwords must match.'}
                ]
            })
        }

        const db = await getMongoDb();
        const existingUser = await db.collection('users').findOne({ 'email': email })
        console.log(existingUser)
        if (existingUser) {
            res.status(422).json({
                message: [
                    {[FORM_ERROR]: 'User already exists! Please sign in.'}
                ]
            });
            return;
        }
        const hashedPassword = await hashPassword(password)
        const result = await db.collection('users').insertOne({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: 'Created user' });

    }
}

