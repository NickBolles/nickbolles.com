import axios from "axios";
export class API {
    static emailEndpoint = `https://ds7bpvpyd2.execute-api.us-west-2.amazonaws.com/prod/emailme`;
    static sendEmail(email: string, message: string, name: string): Promise<any> {
        let data: any = { email, message, name };
        console.log(data)
        return axios.post(API.emailEndpoint, JSON.stringify(data));
    }
}