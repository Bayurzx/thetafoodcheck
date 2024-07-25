import clientPromise from '@/db/mongodb'
import { MongoClient, Db, WithId, Document, Filter, UpdateFilter, Collection, OptionalUnlessRequiredId, InsertOneResult } from 'mongodb'

interface HealthData {
    userId: string,
    // Add other fields as per your health data schema
}

interface GetHealthDataResponse {
    healthData: HealthData | null
    error: string | null
}

export const getHealthData = async (userId: string): Promise<GetHealthDataResponse> => {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db("health_data_db");
        const healthDataDoc: WithId<HealthData> | null = await db.collection<HealthData>("health_data").findOne({ userId });
        // If a document is found, remove the _id field before returning
        const healthData = healthDataDoc ? { ...healthDataDoc, _id: undefined } : null;
        return { healthData, error: null };
    } catch (error) {
        console.error("Error fetching health data:", error);
        return { healthData: null, error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
}

// Generic database operations
async function getCollection<T extends Document>(collectionName: string): Promise<Collection<T>> {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("health_data_db");
    return db.collection<T>(collectionName);
}

export async function findOne<T extends Document>(collectionName: string, filter: Filter<T>): Promise<T | null> {
    const collection = await getCollection<T>(collectionName);
    const result = await collection.findOne(filter);
    return result ? (result as T) : null;
}

export async function updateOne<T extends Document>(collectionName: string, filter: Filter<T>, update: UpdateFilter<T>): Promise<boolean> {
    const collection = await getCollection<T>(collectionName);
    const result = await collection.updateOne(filter, update);
    return result.modifiedCount > 0;
}

// Helper function to structure Partial<T> into UpdateFilter<T>
export async function updateOneWithPartial<T extends Document>(collectionName: string, filter: Filter<T>, update: Partial<T>): Promise<boolean> {
    const collection = await getCollection<T>(collectionName);
    const result = await collection.updateOne(filter, { $set: update } as UpdateFilter<T>);
    return result.modifiedCount > 0;
}

export async function find<T extends Document>(collectionName: string, filter: Filter<T>): Promise<T[]> {
    const collection = await getCollection<T>(collectionName);
    const results = await collection.find(filter).toArray();
    return results as T[];
}

export async function insertMany<T extends Document>(collectionName: string, documents: OptionalUnlessRequiredId<T>[]): Promise<string[]> {
    const collection = await getCollection<T>(collectionName);
    const result = await collection.insertMany(documents);
    return Object.values(result.insertedIds).map(id => id.toString());
}

export async function findAll<T extends Document>(collectionName: string): Promise<T[]> {
    const collection = await getCollection<T>(collectionName);
    const results = await collection.find({}).toArray();
    return results as T[];
}


export async function insertOne<T extends Document>(collectionName: string, document: OptionalUnlessRequiredId<T>): Promise<string> {
    const collection = await getCollection<T>(collectionName);
    const result: InsertOneResult<T> = await collection.insertOne(document);
    return result.insertedId.toString();
}
