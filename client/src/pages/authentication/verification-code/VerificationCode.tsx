import { IonCard, IonButton, IonIcon, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonInput } from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import { arrowBackCircleOutline } from 'ionicons/icons';
import { use2Factor } from "./use2Factor";

export const VerificationCode: React.FC = () => {

    const location = useLocation()
    const state: {
        email: string
        username: string;
    } = location.state as any



    const navigate = useHistory();
    const backNavigation = (): void => {
        navigate.push('/authentication/register')
    }

    const {
        authConfirmationInputs,
        handleSubmit,
        handleChange,
        onAuthConfirmationInputChange,
        onAuthConfirmationInputClear
    } = use2Factor({
        email: state?.email,
        username: state?.username
    })

    return <div className='container'>
    <IonCard className='ion-card'>

        <IonButton fill="clear" color="danger" onClick={backNavigation} >
            <IonIcon slot="start" icon={arrowBackCircleOutline}></IonIcon>
            Cancel
        </IonButton><br />

        <IonCardHeader className='center'>
            <IonCardTitle>Two Factor Authentication</IonCardTitle>
        </IonCardHeader> <br />

        <IonCardContent>
            <form onSubmit={handleSubmit}>

                <IonGrid>
                    <IonRow>
                        {authConfirmationInputs.map((input, index) => {
                            return (
                                <IonCol key={input.id}>
                                    <IonInput
                                        ref={input.ref as any}
                                        value={input.value}
                                        className='ion-text-center parent'
                                        fill="outline"
                                        placeholder="-"
                                        maxlength={1}
                                        onKeyDown={(event) => {
                                            return onAuthConfirmationInputClear(event, input)
                                        }}
                                        onIonInput={(event) => {
                                            handleChange(input.id, event)
                                            return onAuthConfirmationInputChange(input)
                                        }}
                                    />
                                </IonCol>
                            )
                        })}
                    </IonRow>
                </IonGrid> <br />

                <IonButton expand="block" type='submit' >Confirm Code</IonButton> <br />
            </form>

        </IonCardContent>

    </IonCard>
</div>
}