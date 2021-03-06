import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

declare global {
    namespace NodeJS {
        interface Global {
            signin(id?: string): string[]
        }
    }
}

jest.mock('../nats-wrapper')

process.env.STRIPE_KEY = 'sk_test_51IfnD4DP5JHOD14Z7NyQ10wpiY1W380kFLHe3U5zpNvoOgEmRbtKdldztU2241c7cWpmv0jiTlsnnM78fb0hzoUB009IUOmIma'

let mongo: any

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf'
    mongo = new MongoMemoryServer()
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

beforeEach(async () => {
    jest.clearAllMocks()

    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})

global.signin = (id?: string) => {
    // Build a JWT payload. {id, email}
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }
    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!)

    // Build Session Object. {jwt: MY_JWT}
    const session = { jwt: token }

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session)

    // Take JSON and encode it as Base64
    const base64 = Buffer.from(sessionJSON).toString('base64')

    //return a string thats the cookie with the encoded data
    return [`express:sess=${base64}`]
}