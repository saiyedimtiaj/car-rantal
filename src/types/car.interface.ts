export interface TCar {
  _id: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status?: "available" | "unavailable" | "return";
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  image: string;
  location: string;
  category: string;
  doors: number;
  passenger: number;
  luggage: number;
}
