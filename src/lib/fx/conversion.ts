// lengthConversion.ts

export function inchesToCm(inches: number): number {
    // Conversion factor: 1 inch = 2.54 centimeters
    const cm = inches * 2.54;
    return cm;
  }
  

export function feetInchesToCm(feetAndInches: string): number {
    const parts: string[] = feetAndInches.split("'");
  
    if (parts.length !== 2) {
        throw new Error("Invalid input format. Please use 'feet' and 'inches' notation (e.g., 6'4'')");
    }
  
    const feet: number = parseFloat(parts[0]);
    const inches: number = parseFloat(parts[1]);
  
    if (isNaN(feet) || isNaN(inches)) {
        throw new Error("Invalid input. Please enter valid numbers for feet and inches.");
    }
  
    const totalInches: number = feet * 12 + inches;
  
    const cm: number = totalInches * 2.54;
  
    return cm;
}

export function cmToFeetInches(cmString: string): string {
    const cm: number = parseFloat(cmString);

    if (isNaN(cm)) {
        throw new Error("Invalid input. Please enter a valid number for centimeters.");
    }

    if (cm < 0) {
        throw new Error("Invalid input. Centimeters cannot be negative.");
    }

    const inches: number = cm / 2.54;
    
    const feet: number = Math.floor(inches / 12);
    
    const remainingInches: number = inches % 12;
    
    return `${feet}'${Math.round(remainingInches)}"`;
}

export function calculateBMI_Imp(weightStr: string, heightStr: string): number {
    if (!weightStr.trim() || !heightStr.trim()) {
        throw new Error('Please provide both weight and height values.');
    }

    const weightInLbs = parseFloat(weightStr);
    const heightInInches = parseFloat(heightStr);

    if (isNaN(weightInLbs) || isNaN(heightInInches)) {
        throw new Error('Invalid input. Please enter numbers for weight (lbs) and height (inches).');
    }

    // Additional input validation
    if (weightInLbs <= 0 || weightInLbs > 1400) { // 1400 lbs is approximately the highest recorded human weight
        throw new Error('Invalid weight. Please enter a weight between 0 and 1400 lbs.');
    }

    if (heightInInches <= 0 || heightInInches > 107) { // 107 inches is approximately the height of the tallest person recorded
        throw new Error('Invalid height. Please enter a height between 0 and 107 inches.');
    }

    // BMI formula for imperial units: (weight in pounds * 703) / (height in inches * height in inches)
    const bmi = (weightInLbs * 703) / (heightInInches * heightInInches);
    return Number(bmi.toFixed(2)); // Round to 2 decimal places
}

export function calculateBMI(weightStr: string, heightStr: string): number {
    if (!weightStr.trim() || !heightStr.trim()) {
        throw new Error('Please provide both weight and height values.');
    }

    const weightInKg = parseFloat(weightStr);
    const heightInCm = parseFloat(heightStr);

    if (isNaN(weightInKg) || isNaN(heightInCm)) {
        throw new Error('Invalid input. Please enter numbers for weight (kg) and height (cm).');
    }

    // Convert height from cm to meters
    const heightInMeters = heightInCm / 100;

    // Additional input validation
    if (weightInKg <= 0 || weightInKg > 635) { // 635 kg is the highest recorded human weight
        throw new Error('Invalid weight. Please enter a weight between 0 and 635 kg.');
    }

    if (heightInCm <= 0 || heightInCm > 272) { // 272 cm is the height of the tallest person recorded
        throw new Error('Invalid height. Please enter a height between 0 and 272 cm.');
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    return Number(bmi.toFixed(2)); // Round to 2 decimal places
}

// // Example usage
// function testBMI(weight: string, height: string) {
//     try {
//         const bmi = calculateBMI(weight, height);
//         console.log(`BMI for weight ${weight} kg and height ${height} cm is: ${bmi}`);
//     } catch (error) {
//         console.error('Error:', (error as Error).message);
//     }
// }

// // Test cases
// testBMI('70', '170');    // Normal case
// testBMI('100', '180');   // Overweight case
// testBMI('50', '160');    // Underweight case
// testBMI('', '170');      // Missing weight
// testBMI('70', '');       // Missing height
// testBMI('abc', '170');   // Invalid weight
// testBMI('70', 'abc');    // Invalid height
// testBMI('0', '170');     // Zero weight
// testBMI('70', '0');      // Zero height
// testBMI('1000', '170');  // Excessive weight
// testBMI('70', '300');    // Excessive height
  

export function calculateBodyFatNavy(gender: string, heightStr: string, waistStr: string, neckStr: string, hipStr?: string): number {
    // Trim inputs
    gender = gender.trim().toLowerCase();
    heightStr = heightStr.trim();
    waistStr = waistStr.trim();
    neckStr = neckStr.trim();
    hipStr = hipStr?.trim();

    // Input validation
    if (!gender || !heightStr || !waistStr || !neckStr) {
        throw new Error('Please provide gender, height, waist, and neck measurements. For females, also provide hip measurement.');
    }

    if (gender !== 'male' && gender !== 'female') {
        throw new Error('Invalid gender. Please specify "male" or "female".');
    }

    const height = parseFloat(heightStr);
    const waist = parseFloat(waistStr);
    const neck = parseFloat(neckStr);
    const hip = hipStr ? parseFloat(hipStr) : 0;

    if (isNaN(height) || isNaN(waist) || isNaN(neck) || (gender === 'female' && isNaN(hip))) {
        throw new Error('Invalid input. Please enter numbers for all measurements.');
    }

    if (height <= 0 || height > 272) { // 272 cm is the height of the tallest person recorded
        throw new Error('Invalid height. Please enter a height between 0 and 272 cm.');
    }

    if (waist <= 0 || waist > 300) { // Arbitrary upper limit, adjust if needed
        throw new Error('Invalid waist measurement. Please check your input.');
    }

    if (neck <= 0 || neck > 100) { // Arbitrary upper limit, adjust if needed
        throw new Error('Invalid neck measurement. Please check your input.');
    }

    if (gender === 'female' && (hip <= 0 || hip > 300)) { // Arbitrary upper limit, adjust if needed
        throw new Error('Invalid hip measurement. Please check your input.');
    }

    // Body fat calculation
    let bodyFat: number;
    if (gender === 'male') {
        bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
        if (!hip) {
            throw new Error('Hip measurement is required for female body fat calculation.');
        }
        bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }

    // Ensure result is within reasonable bounds
    bodyFat = Math.max(0, Math.min(bodyFat, 60));

    return Number(bodyFat.toFixed(2)); // Round to 2 decimal places
}

// // Example usage
// function testBodyFat(gender: string, height: string, waist: string, neck: string, hip?: string) {
//     try {
//         const bodyFat = calculateBodyFatNavy(gender, height, waist, neck, hip);
//         console.log(`Estimated body fat percentage: ${bodyFat}%`);
//     } catch (error) {
//         console.error('Error:', (error as Error).message);
//     }
// }

// // Test cases
// testBodyFat('male', '180', '90', '40');
// testBodyFat('female', '165', '80', '35', '100');
// testBodyFat('male', '175', '95', '38');
// testBodyFat('female', '160', '75', '33', '95');
// testBodyFat('other', '170', '85', '37'); // Invalid gender
// testBodyFat('male', '0', '90', '40'); // Invalid height
// testBodyFat('female', '165', '0', '35', '100'); // Invalid waist
// testBodyFat('male', '180', '90', '0'); // Invalid neck
// testBodyFat('female', '165', '80', '35', '0'); // Invalid hip
// testBodyFat('female', '165', '80', '35'); // Missing hip for female


/**
 * Truncates a string to a maximum of 256 characters.
 * If the string is longer than 256 characters, it will be cut off and an ellipsis (...) will be added.
 * 
 * @param str - The input string to be truncated
 * @returns The truncated string
 */
export function truncateTo256(str: any): string {
    const maxLength = 256;
  
    // Convert non-string input to string
    if (typeof str !== 'string') {
      str = JSON.stringify(str);
    }
  
    if (str.length <= maxLength) {
      return str;
    }
  
    return str.slice(0, maxLength - 3) + '...';
  }
  










// Example usage
// try {
//     const feetAndInches: string = "6'4\"";
//     const cmValue: number = feetInchesToCm(feetAndInches);
//     console.log(`${feetAndInches} is equal to ${cmValue.toFixed(2)} cm`);

//     const cmString: string = cmValue.toFixed(2);
//     const backToFeetInches: string = cmToFeetInches(cmString);
//     console.log(`${cmString} cm is approximately ${backToFeetInches}`);

//     // Additional test cases
//     console.log(cmToFeetInches("180"));
//     console.log(cmToFeetInches("72.5"));
// } catch (error) {
//     console.error("Error:", (error as Error).message);
// }