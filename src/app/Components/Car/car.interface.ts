import { Model } from "mongoose";

export interface TCar {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: "available" | "unavailable";
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
  carType: string;
  image: string;
  location: string;

}

export interface CarModel extends Model<TCar> {
  isCarDeletedOrAvailable(id: string): Promise<boolean>;
}
