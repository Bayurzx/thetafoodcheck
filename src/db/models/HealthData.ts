import { ObjectId } from 'mongodb'

export interface HealthData {
    _id: ObjectId
    userId: ObjectId
    height: number
    weight: number
    dietaryRestrictions: string[]
    foodEntries: {
      date: Date
      foodName: string
      ingredients: string[]
    }[]
    progressData: {
      date: Date
      metrics: {
        [key: string]: number
      }
    }[]
  }
  
  