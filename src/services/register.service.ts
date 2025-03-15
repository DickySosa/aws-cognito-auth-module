import { AuthCredentials } from "../interfaces/auth.interface";

export class registerService {
    constructor() { }

    async createUser(authCredentials: AuthCredentials) {
        try {
            const response = await fetch("https://api.example.com/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(authCredentials),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
              }
          
              return await response.json();
        } catch (error) {
            console.log('Error Login Service >>>> ', error)
            throw new Error('Error while creating new user')
        }
    }
}