import { Mongo } from 'meteor/mongo';

// Definir la colección de usuarios
export const User = new Mongo.Collection('users');