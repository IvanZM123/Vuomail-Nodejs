// Import module
import { User } from "./user.model";

// Import interface
import { IUser } from "./user.interface";

export class UserRepository {
    schema(user: IUser) {
        return new User(user);
    }

    async findById(_id: string) {
        return await User.findById(_id);
    }

    async findByEmail(email: string) {
        return await User.findOne({ email });
    }
};
