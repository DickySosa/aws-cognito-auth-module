import { useState } from "react";
import { AuthCredentials } from "../../../interfaces/auth.interface"
import { FormEvent } from "react";
import { AuthenticationService } from "../../../services/auth.service";
import { LocalStorageService } from "../../../services/localStorage.service";

export const useLogin = (loginInitialForm:AuthCredentials) =>{
    //classes instances
    const authenticationService = new AuthenticationService();
    const localStorageService = new LocalStorageService();

    //States
    const [authForm, setAuthForm] = useState<AuthCredentials>(loginInitialForm)
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
            const response = await authenticationService.verifyUser(authForm);

            if (!response) {
                throw new Error('No response from server');
            }

            localStorageService.logIn(response.message)

        } catch (error) {
            console.error("Error during verifying admin: ", error);
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
