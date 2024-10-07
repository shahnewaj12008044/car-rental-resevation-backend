import { TUser } from "./user.interface";
import { User } from "./user.model";

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
    const result = await User.findByIdAndUpdate(id, payload, { new: true });
    return result;
  };
  const deleteUserFromDB = async (id: string) => {
    const result = await User.findByIdAndDelete(id);
    return result;
  };
  
  const updateProfileFromDB = async (id: string, payload: Partial<TUser>) => {
    const result = await User.findByIdAndUpdate( id , payload, {new:true});
    return result;
  };
  
  const getMyProfileFromDB = async (id: string) => {
    const result = await User.findById( id );
    return result;
  };

export const userServices = { 
    getAllUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    updateProfileFromDB,
    getMyProfileFromDB,
};
