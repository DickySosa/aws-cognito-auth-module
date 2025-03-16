import { AuthCredentials } from "../interfaces/auth.interface";
import { IVerificationCode } from "../interfaces/verificationCode.interface";

export class AuthenticationService {
    constructor() { }

    async verifyUser (authCredentials: AuthCredentials){
            console.log('Login Credentials ---> ',authCredentials)
            const response = await fetch("pito", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(authCredentials),
            });
            
            if (!response.ok) {
                throw new Error('No response from server');
            }
            
            return await response.json();
    }
    
    async createUser(authCredentials: AuthCredentials) {
        console.log("Register Credentials ---> ", authCredentials);
    
        const response = await fetch("https://api.example.com/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authCredentials),
        });
    
        if (!response.ok) {
            throw new Error(`No response from server`);
        }
    
        return response.json();
    }

    async verifyCode (verificationCodeArgs: IVerificationCode){
        console.log("Verification Code ---> ", verificationCodeArgs);
    
        const response = await fetch("https://api.example.com/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(verificationCodeArgs),
        });
    
        if (!response.ok) {
            throw new Error(`No response from server`);
        }
    
        return response.json();
    }

}