export interface TCar {
  _id: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status?: "available" | "unavailable"; // 'status' can be one of these values
  isDeleted?: boolean; // 'isDeleted' is optional since it has a default value
  createdAt?: Date; // 'createdAt' is generated automatically by Mongoose
  updatedAt?: Date; // 'updatedAt' is generated automatically by Mongoose
}
