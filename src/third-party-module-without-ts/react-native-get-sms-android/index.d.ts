declare module "react-native-get-sms-android" {

    export interface Sms {
        _id: number,
        thread_id: number,
        address: number,
        person: number,
        date: number,
        date_sent: number,
        protocol: number,
        read: number,
        status: number,
        type: number,
        body: string,
        service_center: string,
        locked: number,
        error_code: number,
        sub_id: number,
        seen: number,
        deletable: number,
        sim_slot: number,
        hidden: number,
        app_id: number,
        msg_id: number,
        reserved: number,
        pri: number,
        teleservice_id: number,
        svc_cmd: number,
        roam_pending: number,
        spam_report: number,
        secret_mode: number,
        safe_message: number,
        favorite: number
    }

    export enum SmsFilterBox {
        'inbox',
        'sent',
        'draft',
        'outbox',
        'failed',
        'queued',
        '' // all
    }

    export interface SmsFilter {
        box?: SmsFilterBox, // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

        /**
         *  the next 3 filters can work together, they are AND-ed
         *  
         *  minDate, maxDate filters work like this:
         *    - If and only if you set a maxDate, it's like executing this SQL query:
         *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
         *    - Same for minDate but with "date >= minDate"
         */
        minDate?: number, // timestamp (in milliseconds since UNIX epoch)
        maxDate?: number, // timestamp (in milliseconds since UNIX epoch)
        bodyRegex?: string, // content regex to match

        /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
        read?: number, // 0 for unread SMS, 1 for SMS already read
        _id?: number, // specify the msg id
        thread_id?: number, // specify the conversation thread_id
        address?: string, // sender's phone number
        body?: string, // content to match
        /** the next 2 filters can be used for pagination **/
        indexFrom?: number, // start from index 0
        maxCount?: number, // count of SMS to return each time
    }

    export interface SmsAndroidStatic {
        list(
            filter: string,
            onFail?: (error: string) => void,
            onSuccess?: (count: number, smsList: string) => void,
        ): Promise<any>
    }

    const SmsAndroid: SmsAndroidStatic;

    export default SmsAndroid;
}