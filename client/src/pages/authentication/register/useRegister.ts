import { useState, FormEvent } from "react";
import { AuthCredentials } from "../../../interfaces/auth.interface";
import { LocalStorageService } from "../../../services/localStorage.service";
import { AuthenticationService } from "../../../services/auth.service";

export const useRegister = (registerInitialForm:AuthCredentials) =>{
       //classes instances
        const authenticationService = new AuthenticationService();
        const localStorageService = new LocalStorageService();
    
        //States
        const [authForm, setAuthForm] = useState<AuthCredentials>(registerInitialForm)
        const [showPassword, setShowPassword] = useState<boolean>(false)
    
        //setting checkbox to true to show password
        const handleShowPasswordChange = (event: CustomEvent) => {
            setShowPassword(event.detail.checked)
        }
    
        const handleChange = (event: CustomEvent) => {
            const target = event.target as HTMLInputElement;
            const { name, value } = target;
            setAuthForm(prevState => ({
                ...prevState,
                [name]: value
            }));
        };


        const handleSubmit = async (event: FormEvent) =>{
            event.preventDefault();
            try {
                const response = await authenticationService.createUser(authForm);
    
                if (!response) {
                    throw new Error('No response from server');
                }
    
                localStorageService.logIn(response.message)
    
            } catch (error) {
                console.error("Error during verifying admin: ", error);
                throw new Error('Error while creating new user');
            }
        }


    return {
        authForm,
        showPassword,
        handleChange,
        handleSubmit,
        handleShowPasswordChange
    }
}
