import Organization from "../models/ORGANIZATION.js"

export const registerCompany = async (req, res) => {
    try {
        const result = await Organization.create({
            name: 'My First Company',
            description: 'This is a sample project'
        })
    } catch (error) {
        console.log(error);
        res.status().json()
    }
}

export const updateCompanyDetails = async (req, res) => {
    try {
        const result = await Organization.findOne();
    } catch (error) {
        console.log(error);
        res.status().json()
    }
}