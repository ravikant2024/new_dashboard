import {Date, Model,model,Schema} from 'mongoose';
import MongooseBaseModel from '../utilities/baseModels';

const CollectionName='Keys';


interface IKeys {
    _id:string,
    macId:string,
    issuedate:number,
    expiredate:number,
    userId:string
}
interface IKeysModel extends Model<IKeys> { }

// 2. Create a Schema corresponding to the document interface.
const KeysSchema = new Schema<IKeys, IKeysModel>({
    _id: { type: String, require: true },
    macId:{ type: String, require: true },
    issuedate:{ type: Number, require: true },
    expiredate:{ type: Number, require: true },
    userId:{ type: String, require: true }
});

const BaseKeysModel = model<IKeys, IKeysModel>(CollectionName, KeysSchema);
const KeysModel = new MongooseBaseModel(BaseKeysModel);

export class KeysCollection {
    static async createKey(keyInfo: IKeys) {
        try {
            console.log(keyInfo);
            let res = await KeysModel.insert(keyInfo);
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

    static async findKeys(query: any) {
        try {
            console.log(query);
            let val = await KeysModel.find(query);
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

    static async findKeysById(query: any) {
        try {
           // console.log(query);
            let val = await KeysModel.find_by_id(query);
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
            let val = await KeysModel.find_by_id_and_update(find, update);
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
    static async findAndUpdate(find: any, update: any) {
        try {
            console.log(find, update);
            let val = await KeysModel.find_and_update(find, update);
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


    static async delete(find:any) {
        try {
            console.log(find);
            let val=await KeysModel.delete(find);
            return {
                success:true,
                res:val
            }
        }catch (err) {
            console.log(err)
            return {
                success:false,
                error:err
            }
        }
    }
}