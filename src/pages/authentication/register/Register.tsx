import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonIcon, IonInput, IonItem, IonRouterLink } from "@ionic/react"
import { AuthCredentials } from "../../../interfaces/auth.interface";
import { useRegister } from "./useRegister";

export const Register: React.FC = () => {

    const initialForm: AuthCredentials = {
        username: '',
        password: ''
    }

    const {
        authForm,
        showPassword,
        handleChange,
        handleSubmit,
        handleShowPasswordChange
    } = useRegister(initialForm);

    return <div className='container'>
        <IonCard className='ion-card'>

            <IonCardHeader className='center'>
                <IonCardTitle>¡Create your account!</IonCardTitle>
            </IonCardHeader> <br />

            <form onSubmit={handleSubmit}>
                <IonCardContent>
                    <IonInput
                        label="username"
                        labelPlacement="floating"
                        fill="outline"
                        name='username'
                        type='text'
                        value={authForm.username}
                        onIonChange={handleChange}
                    /><br />

                    <IonInput
                        type={showPassword ? 'text' : 'password'}
                        label="Contraseña"
                        labelPlacement="floating"
                        fill="outline"
                        name='password'
                        value={authForm.password}
                        onIonChange={handleChange}
                    />

                    <IonItem>
                        <IonCheckbox
                            checked={showPassword}
                            onIonChange={handleShowPasswordChange}
                            slot="end">Mostrar contraseña</IonCheckbox>
                    </IonItem><br />

                    <IonButton expand="block" type='submit'>Registrar</IonButton> <br />
                </IonCardContent>
            </form>
            <br /><br /><br />
            <IonRouterLink className='center' routerLink="/authentication/login">
                Already have an account? <strong>LogIn</strong>
            </IonRouterLink>

        </IonCard>
    </div>
}