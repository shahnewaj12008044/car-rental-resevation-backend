import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const statusCode = 400;
   // Extract value within double quotes using regex
   const match = err.message.match(/"([^"]*)"/);


   // The extracted value will be in the first capturing group

   
 
  const errorSources: TErrorSources = [
    { path: '', message:`${match!.input}`  },
  ];
  return {
    statusCode,
    message: (match!.input) as string,
    errorSources,
  };
};
export default handleDuplicateError;
