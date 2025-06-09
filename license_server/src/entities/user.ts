import { Model, model, Schema } from 'mongoose';
import MongooseBaseModel from '../utilities/baseModels';

const CollectionName = 'User';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
    _id: string,
    phoneNumber: string,
    name: string,
    password: string
    email: string
}

interface IUserModel extends Model<IUser> { }

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser, IUserModel>({
    _id: { type: String, require: true },
    phoneNumber: { type: String, required: true },
    name: { type: String, required: true },
    password: {},
    email: { type: String, required: true }
});

const BaseUserModel = model<IUser, IUserModel>(CollectionName, userSchema);
const UserModel = new MongooseBaseModel(BaseUserModel);

export class UsersCollection {
    static async createUser(userInfo: IUser) {
        try {
            console.log(userInfo);
            let res = await UserModel.insert(userInfo);
            if (res.success) {
                return {
                    success: true,

                }
            } else {
                return {
                    success: false,
                    error: res.error
                }
            }
        } catch (err) {
            console.log(err)
            console.log("__________");
            return {
                success: false,
                error: err
            }
        }
    }

    static async findUser(query: any) {
        try {
            console.log(query);
            let val = await UserModel.find(query);
            return {
                success: true,
                res: val
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                error: err
            }
        }
    }
    static async findUserById(query: any) {
        try {
            console.log(query);
            let val = await UserModel.find_by_id(query);
            return {
                success: true,
                res: val
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                error: err
            }
        }
    }
    static async findIdandUpdate(find: any, update: any) {
        try {
            console.log(find, update);
            let val = await UserModel.find_by_id_and_update(find, update);
            return {
                success: true,
                res: val
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                error: err
            }
        }
    }
    static async deleteUser(find: any) {
        try {
            console.log(find);
            let val = await UserModel.delete(find);
            return {
                success: true,
                res: val
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                error: err
            }
        }
    }
}