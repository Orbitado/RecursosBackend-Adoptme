import { generateMockUser, generateMockPet } from '../utils/mocking.js';
import { usersService, petsService } from '../services/index.js';

const mockingUsers = async (req, res) => {
    try {
        const users = [];
        const amount = req.query.amount || 50;

        for (let i = 0; i < amount; i++) {
            const mockUser = await generateMockUser();
            users.push(mockUser);
        }

        res.send({ status: "success", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

const mockingPets = async (req, res) => {
    try {
        const pets = [];
        const amount = req.query.amount || 30;

        for (let i = 0; i < amount; i++) {
            const mockPet = generateMockPet();
            pets.push(mockPet);
        }

        res.send({ status: "success", payload: pets });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

const generateData = async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;
        
        if (!Number.isInteger(Number(users)) || !Number.isInteger(Number(pets))) {
            return res.status(400).send({ status: "error", error: "Users and pets parameters must be integers" });
        }
        
        const generatedUsers = [];
        for (let i = 0; i < users; i++) {
            const mockUser = await generateMockUser();
            const newUser = await usersService.create(mockUser);
            generatedUsers.push(newUser);
        }
        
        const generatedPets = [];
        for (let i = 0; i < pets; i++) {
            const mockPet = generateMockPet();
            const newPet = await petsService.create(mockPet);
            generatedPets.push(newPet);
        }
        
        res.send({ 
            status: "success", 
            message: `Generated and inserted in DB ${users} users and ${pets} pets`, 
            payload: { 
                users: generatedUsers, 
                pets: generatedPets 
            } 
        });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

export default {
    mockingUsers,
    mockingPets,
    generateData
}; 