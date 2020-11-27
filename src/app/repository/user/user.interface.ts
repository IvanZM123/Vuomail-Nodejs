export interface IUser {
    oauthid: string;
    name: string;
    email: string;
    picture?: string;
    provider: string;
    access_token: string;
    created_at?: number;
    updated_at?: number;
};
