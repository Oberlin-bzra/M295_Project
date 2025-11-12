import { z } from 'zod';

export const GarageSchema = z.object({
  savedTeams: z.array(z.string()).default([]),
  savedDrivers: z.array(z.string()).default([]),
  savedVehicles: z.array(z.string()).default([]),
}).default({});
export type GarageType = z.infer<typeof GarageSchema>;

export const UserSchema = z.object({
  _id: z.string().optional(),
  username: z.string().min(3),
  passwordHash: z.string().min(60).max(100),
  role: z.enum(["user", "admin"]),
  email: z.string().email().transform((e) => e.toLowerCase()),
  name: z.string().optional(),
  garage: GarageSchema,
  createdAt: z.date().default(() => new Date()),
});
export type UserType = z.infer<typeof UserSchema>;

export const DriverSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1),
  nationality: z.string().min(1),
  age: z.number().int().min(16).max(60),
  championships: z.number().int().min(0).default(0),
  teamId: z.string().min(1),
  wins: z.number().int().min(0).default(0),
  podiums: z.number().int().min(0).default(0),
  driverPoints: z.number().int().min(0).default(0),
  driverPlace: z.number().int().min(1).default(20),
});
export type DriverType = z.infer<typeof DriverSchema>;

export const TeamSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1),
  country: z.string().min(1),
  drivers: z.array(z.string()).default([]),
  teamPrincipal: z.string().min(1),
  championships: z.number().int().min(0).default(0),
  constructorPoints: z.number().int().min(0).default(0),
  constructorPlace: z.number().int().min(1).default(10),
});
export type TeamType = z.infer<typeof TeamSchema>;

export const VehicleSchema = z.object({
  _id: z.string().optional(),
  model: z.string().min(1),
  engine: z.string().min(1),
  teamId: z.string().min(1),
  driverId: z.string().optional(),
  horsepower: z.number().int().min(100).optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
});
export type VehicleType = z.infer<typeof VehicleSchema>;
