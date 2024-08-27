import { TCar } from "./car.interface";
import { TUser } from "./user.interface";

export type TBooking = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string | null;
  user: TUser;
  car: TCar;
  totalCost: number;
  passport: string;
  license: string;
  address: string;
};
