import { FormEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { AuthenticationService } from "../../../services/auth.service";

export type UseConfirmationCodeProps = {
    email: string
    username: string;
}


export const use2Factor = ({ email, username }: UseConfirmationCodeProps) => {
    const authenticationService = new AuthenticationService();
    // const [code, setCode] = useState<IConfirmationCode>(confirmationCode)
    // const navigate = useHistory();
    const [user, _] = useState<string>(username)
    const [authConfirmationInputs, setAuthConfirmationInputs] = useState([
        { id: 1, value: '', ref: useRef(null) },
        { id: 2, value: '', ref: useRef(null) },
        { id: 3, value: '', ref: useRef(null) },
        { id: 4, value: '', ref: useRef(null) },
        { id: 5, value: '', ref: useRef(null) },
        { id: 6, value: '', ref: useRef(null) },
    ]);


    const [inputState, setInputState] = useState<'fill' | 'clear'>('fill')

    useEffect(() => {
        setAuthConfirmationInputs(authConfirmationInputs)
    }, [inputState])



    const handleChange = (id: number, event: any) => {
        setAuthConfirmationInputs([...authConfirmationInputs.map(item => {
            if (item.id === id) {
                item.value = event.target.value
            }
            return item
        })])
    }

    const navigate = useHistory();
    const backNavigation = (): void => {
        navigate.push('/register')
    }

    useEffect(() => {
        const defaultInput: any = authConfirmationInputs.at(0)
        if (defaultInput) {
            setTimeout(() => {
                defaultInput.ref?.current.setFocus()
            }, 100)
        }
    }, [])

    const onAuthConfirmationInputChange = (input: any) => {
        if (inputState === 'fill') {
            const foundInput = authConfirmationInputs.find(item => item.id === input.id)
            const foundInputIndex = authConfirmationInputs.findIndex(item => item.id === input.id)
            if (foundInputIndex !== -1 && foundInput?.value) {
                // find the sibling of the found index
                const sibling: any = authConfirmationInputs[foundInputIndex + 1]
                if (sibling) {
                    sibling.ref?.current?.setFocus()
                }
            }
        }
    }

    const onAuthConfirmationInputClear = (event: any, input: any) => {
        if (event.keyCode === 8 && !input.value) {
            const foundInputIndex = authConfirmationInputs.findIndex(item => item.id === input.id)
            if (foundInputIndex !== -1) {
                // find the sibling of the found index
                const sibling: any = authConfirmationInputs[foundInputIndex - 1]
                if (sibling) {
                    setInputState('clear')
                    setTimeout(() => {
                        sibling.ref?.current?.setFocus()
                    }, 100)
                } else {
                    setInputState('fill')
                }
            }
        } else {
            setInputState('fill')
            onAuthConfirmationInputChange(input)
        }
    }


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const values = authConfirmationInputs.map((input) => input.value)
        const code = values.join('')

        try {
            const response = await authenticationService.verifyCode({
                username: user,
                code
            });
            if (!response) {
                throw new Error('No response from server');
            }

            //Navigte to next component
            navigate.push('/login', {
                email
            })

        } catch (error) {
            console.error("Error during login:", error);
        }
    }


    return {
        // code,
        // handleChange,
        authConfirmationInputs,
        handleSubmit,
        handleChange,
        onAuthConfirmationInputChange,
        onAuthConfirmationInputClear
    }

}