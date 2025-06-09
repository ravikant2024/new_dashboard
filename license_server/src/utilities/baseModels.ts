import { Model } from 'mongoose';


export default class MongooseBaseModel<T> {
    mongooseModel: Model<T>;

    constructor(mongoModel: Model<T>) {
        this.mongooseModel = mongoModel;
    }

    async insert(value: any) {
        try {
            const insertVal = new this.mongooseModel(value);
            await insertVal.save();
            return {
                success:true
            };
        } catch (e: any) {
            console.log(e);
            return {
                success:false,
                error:e
            };
        }
    }
    async find(query: any) {
        try {
            //console.log(query);
            const val = await this.mongooseModel.find(query);
            //console.log(val);
            return val;
        } catch (e: any) {
            console.log(e);
            return e;
        }
    }
    async find_by_id(query: any) {
        try {
            //console.log(query);
            const val = await this.mongooseModel.findById(query);
            //console.log(val);
            return val;
        } catch (e: any) {
            console.log(e);
            return e;
        }
    }
    async find_and_update(find:any,update:any) {
        try {
            console.log(find);
            console.log(update);
            const val = await this.mongooseModel.findOneAndUpdate(find,update);
            console.log(val);
            return val;
        } catch (e: any) {
            console.log(e);
            return e;
        }
    }
    async find_by_id_and_update(find:any,update:any) {
        try {
            console.log(find);
            console.log(update);
            const val = await this.mongooseModel.findByIdAndUpdate(find,update);
            console.log(val);
            return val;
        } catch (e: any) {
            console.log(e);
            return e;
        }
    }


    async delete(find:any) {
        try {
            console.log(find);
            const val = await this.mongooseModel.deleteOne(find);
            console.log(val);
            return val;
        } catch (e: any) {
            console.log(e);
            return e;
        }
    }
}