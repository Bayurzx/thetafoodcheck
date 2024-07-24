import { ReactNode } from 'react'

export type PersonData = {
    name?: string;
    gender?: string;
    jobTitle?: string;
    birthDate?: string;
    height?: string;
    weight?: string;
    image?: string;
    allergiesAndSensitivities?: {
        foodAllergies?: string[];
        foodIntolerances?: string[];
    };
    medicalConditions?: string[];
    medications?: {
        prescriptionDrugs?: string[];
        overTheCounterMeds?: string[];
        dietarySupplements?: string[];
    };
    anthropometricData?: {
        height?: string;
        weight?: string;
        bodyMassIndex?: string;
    };
    dietaryRestrictions?: {
        religiousOrCultural?: string[];
        ethicalPreferences?: string[];
    };
    laboratoryTestResults?: {
        bloodGlucoseLevels?: string;
        cholesterolLevels?: string;
        kidneyFunctionTests?: string;
        liverFunctionTests?: string;
    };
    nutritionalStatus?: {
        dietaryIntake?: string;
        nutrientDeficiencies?: string[];
        nutritionalRiskFactors?: string[];
    };
    lifestyleFactors?: {
        physicalActivityLevels?: string;
        smokingStatus?: string;
        alcoholConsumption?: string;
    };
    personalPreferences?: {
        foodPreferences?: string[];
        cookingSkillsAndResources?: string;
        culturalFoodPractices?: string[];
    };
    pastMedicalHistory?: {
        previousSurgeriesOrHospitalizations?: string[];
        familyHistoryOfChronicDiseases?: string[];
    };
};

export type Person = {
    record: null; // Record
    data: PersonData;
    id: string;
};

export type Web5ContextType = {
    web5: null; // Web5
    persons: Person[];
    did: string;
    addUserData: () => void;
    deleteUserData: () => void;
    updateUserData: () => void;
    setPersonData: React.Dispatch<React.SetStateAction<PersonData>>
    personData: PersonData;
};

export type Web5ProviderProps = {
    children: ReactNode;
};

// ************************************************************************

// types.ts

export interface UserHealthData {
    name: string;
    gender: string;
    birthdate: string; // or Date if you prefer
    height: number;
    heightUnit: string;
    weight: number;
    weightUnit: string;
    photo: string; // URL or base64 encoded string
    allergiesAndSensitivities: string[];
    medications: string[];
    medicalConditions: string[];
    nutrientDeficiencies: string[];
    previousSurgeriesOrHospitalizations: string[];
    familyHistoryOfChronicDiseases: string[];
  }
  