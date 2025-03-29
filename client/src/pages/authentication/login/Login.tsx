import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonCheckbox, IonButton, IonRouterLink } from "@ionic/react"
import { AuthCredentials } from "../../../interfaces/auth.interface";
import { useLogin } from "./useLogin";
import { useLocation } from "react-router";
import '../auth css/auth.css'

export const Login: React.FC = () => {

    const location = useLocation()
    const state: {
        email: string
    } = location.state as any

    const initialForm: (defaultUsername: string) => AuthCredentials = (defaultUsername = "") => {
        return {
            username: defaultUsername,
            password: ''
        }
    };

    const {
        authForm,
        showPassword,
        handleChange,
        handleSubmit,
        handleShowPasswordChange
    } = useLogin(initialForm(state?.email));

    return <div className='container'>
        <IonCard className='ion-card'>

            <IonCardHeader className='center'>
                <IonCardTitle>¡Welcome back!</IonCardTitle>
            </IonCardHeader> <br />

            <IonCardContent>
                <form onSubmit={handleSubmit}>
                    < IonInput
                        label="Usuario"
                        labelPlacement="floating"
                        fill="outline"
                        name='username'
                        type='text'
                        value={authForm.username}
                        onIonChange={handleChange}
                    /> <br />

                    <IonInput
                        label="Contraseña"
                        labelPlacement="floating"
                        fill="outline"
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        value={authForm.password}
                        onIonChange={handleChange}
                    />

                    <IonItem>
                        <IonCheckbox
                            checked={showPassword}
                            onIonChange={handleShowPasswordChange}
                            justify="end">Mostrar contraseña</IonCheckbox>
                    </IonItem><br />

                    <IonButton expand="block" type='submit' >Ingresar</IonButton> <br />

                </form>
                <br /><br /><br />
                <IonRouterLink className='center' routerLink="/authentication/register">
                Does not have an account? <strong>Sign up</strong>
                </IonRouterLink>
            </IonCardContent>

        </IonCard>
    </div>

}