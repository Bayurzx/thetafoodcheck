import clientPromise from '@/db/mongodb'
import { MongoClient, Db, Collection, ObjectId, WithId, Document, Filter, UpdateFilter, OptionalUnlessRequiredId, InsertOneResult } from 'mongodb'

export interface User {
  _id: ObjectId
  name: string
  email: string
  image: string
  emailVerified: Date | null
  authProvider: 'google' | 'github'
}
const collectionName = 'users'

// Helper function to get the user collection
async function getUserCollection(): Promise<Collection<User>> {
  const client: MongoClient = await clientPromise
  const db: Db = client.db('users_db')
  return db.collection<User>(collectionName)
}

// Insert a new user
export async function insertUser(user: Omit<User, '_id'>): Promise<string> {
  const userCollection = await getUserCollection()
  const result = await userCollection.insertOne({
    ...user,
    _id: new ObjectId()
  })
  return result.insertedId.toHexString()
}

// Find a user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const userCollection = await getUserCollection()
  return await userCollection.findOne({ email })
}

// Update the email verification status of a user
export async function updateUserEmailVerified(userId: string, verified: boolean): Promise<boolean> {
  const userCollection = await getUserCollection()
  const result = await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { emailVerified: verified ? new Date() : null } }
  )
  return result.modifiedCount > 0
}

// Generic database operations
async function getCollection<T extends Document>(collectionName: string): Promise<Collection<T>> {
  const client: MongoClient = await clientPromise
  const db: Db = client.db('users_db')
  return db.collection<T>(collectionName)
}


export async function findOne<T extends Document>(collectionName: string, filter: Filter<T>): Promise<T | null> {
  const collection = await getCollection<T>(collectionName)
  const result = await collection.findOne(filter)
  return result ? (result as T) : null
}

export async function updateOne<T extends Document>(collectionName: string, filter: Filter<T>, update: UpdateFilter<T>): Promise<boolean> {
  const collection = await getCollection<T>(collectionName)
  const result = await collection.updateOne(filter, update)
  return result.modifiedCount > 0
}

// Helper function to structure Partial<T> into UpdateFilter<T>
export async function updateOneWithPartial<T extends Document>(collectionName: string, filter: Filter<T>, update: Partial<T>): Promise<boolean> {
  const collection = await getCollection<T>(collectionName)
  const result = await collection.updateOne(filter, { $set: update } as UpdateFilter<T>)
  return result.modifiedCount > 0
}

export async function find<T extends Document>(collectionName: string, filter: Filter<T>): Promise<T[]> {
  const collection = await getCollection<T>(collectionName)
  const results = await collection.find(filter).toArray()
  return results as T[]
}

export async function insertMany<T extends Document>(collectionName: string, documents: OptionalUnlessRequiredId<T>[]): Promise<string[]> {
  const collection = await getCollection<T>(collectionName)
  const result = await collection.insertMany(documents)
  return Object.values(result.insertedIds).map(id => id.toString())
}

export async function findAll<T extends Document>(collectionName: string): Promise<T[]> {
  const collection = await getCollection<T>(collectionName)
  const results = await collection.find({}).toArray()
  return results as T[]
}

export async function insertOne<T extends Document>(collectionName: string, document: OptionalUnlessRequiredId<T>): Promise<string> {
  const collection = await getCollection<T>(collectionName);
  const result: InsertOneResult<T> = await collection.insertOne(document);
  return result.insertedId.toString();
}

export async function findOneIsFormFilled(providerId: string): Promise<User | null> {
  const userCollection = await getUserCollection()
  return await userCollection.findOne({ providerId })
}


export const updateUserData = (id: string, userData: any) => {
  return
}

export const getUserData = (id: string) => {
  return
  
}