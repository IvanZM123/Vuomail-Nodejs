export interface IMail {
    from: string;
    to: string;
    subject: string;
    text: string;
    created_at?: Date;
};
