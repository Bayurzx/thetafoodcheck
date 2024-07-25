import clientPromise from '@/db/mongodb'
import { MongoClient, Db, Collection, ObjectId, WithId, Document, Filter, UpdateFilter, OptionalUnlessRequiredId, InsertOneResult } from 'mongodb'


// Generic database operations
async function getCollection<T extends Document>(dbName: string, collectionName: string): Promise<Collection<T>> {
  const client: MongoClient = await clientPromise
  const db: Db = client.db(dbName)
  return db.collection<T>(collectionName)
}

export async function findOne<T extends Document>(dbName: string, collectionName: string, filter: Filter<T>): Promise<T | null> {
  const collection = await getCollection<T>(dbName, collectionName)
  const result = await collection.findOne(filter)
  return result ? (result as T) : null
}

export async function updateOne<T extends Document>(dbName: string, collectionName: string, filter: Filter<T>, update: UpdateFilter<T>): Promise<boolean> {
  const collection = await getCollection<T>(dbName, collectionName)
  const result = await collection.updateOne(filter, update)
  return result.modifiedCount > 0
}

// Helper function to structure Partial<T> into UpdateFilter<T>
export async function updateOneWithPartial<T extends Document>(dbName: string, collectionName: string, filter: Filter<T>, update: Partial<T>): Promise<boolean> {
  const collection = await getCollection<T>(dbName, collectionName)
  const result = await collection.updateOne(filter, { $set: update } as UpdateFilter<T>)
  return result.modifiedCount > 0
}

export async function find<T extends Document>(dbName: string, collectionName: string, filter: Filter<T>): Promise<T[]> {
  const collection = await getCollection<T>(dbName, collectionName)
  const results = await collection.find(filter).toArray()
  return results as T[]
}

export async function insertMany<T extends Document>(dbName: string, collectionName: string, documents: OptionalUnlessRequiredId<T>[]): Promise<string[]> {
  const collection = await getCollection<T>(dbName, collectionName)
  const result = await collection.insertMany(documents)
  return Object.values(result.insertedIds).map(id => id.toString())
}

export async function findAll<T extends Document>(dbName: string, collectionName: string): Promise<T[]> {
  const collection = await getCollection<T>(dbName, collectionName)
  const results = await collection.find({}).toArray()
  return results as T[]
}

export async function insertOne<T extends Document>(dbName: string, collectionName: string, document: OptionalUnlessRequiredId<T>): Promise<string> {
  const collection = await getCollection<T>(dbName, collectionName);
  const result: InsertOneResult<T> = await collection.insertOne(document);
  return result.insertedId.toString();
}