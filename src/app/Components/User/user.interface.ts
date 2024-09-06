import { ROLE_OBJ } from "./user.constant";



export type TUser = {
    name: string;
    email:string;
    role: 'user' | 'admin';
    password: string;
    phone:string;
    address:string;
}

export type TRole = keyof typeof ROLE_OBJ;

