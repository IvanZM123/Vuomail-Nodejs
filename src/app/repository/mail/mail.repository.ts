// Import model
import { Mail } from "./mail.model";

// Import interface
import { IMail } from "./mail.interface";

export class MailRepository {
    schema(mail: IMail) {
        return new Mail(mail);
    }

    async findById(_id: string) {
        return await Mail.findById(_id);
    }

    async findByOwner(email: string) {
        return await Mail
        .find({ from: email })
        .sort({ created_at: -1 });
    }
};
