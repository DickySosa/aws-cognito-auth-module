import { IVerificationCode } from "../interfaces/verificationCode.interface";

export class verificationCodeService {
    constructor (){}

    async verifyCode(verifyCodeArgs: IVerificationCode){
        try {
            const response = await fetch("https://api.example.com/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(verifyCodeArgs),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
              }
          
              return await response.json();
        } catch (error) {
            console.log('Error Login Service >>>> ', error)
            throw new Error('Error while verifying confirmation code')
        }
    }
}