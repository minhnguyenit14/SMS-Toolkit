declare module "react-native-android-sms-listener" {

    export interface CancellableSubscription {
        remove(): void;
    }

    export interface ReceivedSmsMessage {
        originatingAddress: string,
        body: string
    }

    export interface AndroidSmsListenerStatic{
        addListener(
            listener?: (message: ReceivedSmsMessage) => void
        ): CancellableSubscription
    }

    const SmsListener: AndroidSmsListenerStatic;

    export default SmsListener;
}