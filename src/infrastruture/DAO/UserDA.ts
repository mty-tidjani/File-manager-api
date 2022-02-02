import { model, Schema } from 'mongoose';
import { IUser, User } from '../../Domain/User/User';

const userSchema = new Schema({
    name: { type: String },
    surname: { type: String },
    email: { type: String },
    telphone: { type: String },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const UserModel = model<IUser>('User', userSchema)

const UserDA = {
    findById: (id: any) => {
        return UserModel.findById(id)
    },
    
    createUser: async (data: IUser) => {

        const user = new UserModel(new User(data))

        return await user.save()
    }
}

export default UserDA;
