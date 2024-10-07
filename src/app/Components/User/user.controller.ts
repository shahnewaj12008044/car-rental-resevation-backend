import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';


const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserFromDB();
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'User are retrived successfully',
    data: result,
  });
});
const getUpdateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.updateUserIntoDB(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'User Update successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.deleteUserFromDB(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Delete User successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.updateProfileFromDB(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'User Profile Update successfully',
    data: result,
  });
});
const getMyProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getMyProfileFromDB(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'user profile are retrive successfully',
    data: result,
  });
});

export const UserControllers = {
  getAllUser,
  getUpdateUser,
  deleteUser,
  updateProfile,
  getMyProfile,
};
