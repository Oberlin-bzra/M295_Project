import Datastore from "nedb-promises";

export interface User {
  email: string;
  password: string; // In einer echten App: string | undefined; und passwordHash: string;
  createdAt?: Date;
}

// Hier wird die Datei user.db erstellt
export const db = Datastore.create<User>({
  filename: "user.db",
  autoload: true
});