
import {
    BASE_PROCESSING_FEE,
    BASE_PRIVATE_STATUTORY_FILING_FEE,
    BASE_PUBLIC_STATUTORY_FILING_FEE,
    BASE_ULTD_STATUTORY_FILING_FEE, 
} from 'react-native-dotenv';

export async function calculateFinalCharge(shareCapital, companyRegType, companyType) {
    shareCapital = parseInt(shareCapital);
    const stampDuty = ((0.75 / 100) * shareCapital);
    var sharePercentage = ((0.5 / 100) * shareCapital);
    var proccessingFee = (parseInt(BASE_PROCESSING_FEE) >= sharePercentage) ? parseInt(BASE_PROCESSING_FEE) : sharePercentage;
    var statutoryFilingFee = 0;

    if (companyRegType === 'unlimited') {
        statutoryFilingFee = parseInt(BASE_ULTD_STATUTORY_FILING_FEE)
    } else if (companyRegType === 'limited') {

        if (companyType && companyType === 'private') {
            statutoryFilingFee = calculateAddOn(shareCapital);
        }

        if (companyType && companyType === 'public') {
            if (shareCapital < 1000000) {
                statutoryFilingFee = parseInt(BASE_PUBLIC_STATUTORY_FILING_FEE);
            } else {
                let addOn = Math.floor((shareCapital - 1000000) / 1000000)
                let addOnAmount = 10000 * addOn
                statutoryFilingFee = parseInt(BASE_PUBLIC_STATUTORY_FILING_FEE) + addOnAmount;
            }
        }

    }

    let total = proccessingFee + statutoryFilingFee + stampDuty;
    return total;
}


function calculateAddOn(amount) {
    let addOn = 0;
    let addOnAmount = 0;
    // check trillion 
    if (Math.floor(amount / 1000000000000) === 0) {
        // check 500 billion 
        if (Math.floor(amount / 500000000000) === 0) {
            // check 1 billion 
            if (Math.floor(amount / 1000000000) === 0) {
                // check 500 million 
                if (Math.floor(amount / 500000000) === 0) {
                    // check one million 
                    if (Math.floor(amount / 1000000) === 0) {
                        // less than 1 million 
                        return parseInt(BASE_PRIVATE_STATUTORY_FILING_FEE)
                    } else {
                        // between 1 million and 500 million 
                        addOn = Math.floor((amount - 1000000) / 1000000);
                        addOnAmount = 5000 * addOn
                        return addOnAmount + 10000;
                    }
                } else {
                    // between 500 million and 1 billion 
                    addOn = Math.floor((amount - 500000000) / 1000000);
                    addOnAmount = 10000 * addOn
                    return addOnAmount + 2510000;
                }
            } else {
                // between 1 billion and 500 billion 
                addOn = Math.floor((amount - 1000000000) / 1000000);
                addOnAmount = 15000 * addOn
                return addOnAmount + 7505000;
            }
        } else {
            // between 1 trillion and 500 billion
            addOn = Math.floor((amount - 500000000000) / 1000000);
            addOnAmount = 20000 * addOn
            return addOnAmount + 14995000;
        }
    } else {
        // above 1 trillion
        addOn = Math.floor((amount - 1000000000000) / 1000000);
        addOnAmount = 25000 * addOn
        return addOnAmount + 24980000;
    }
}
