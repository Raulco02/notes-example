import { Mongo } from 'meteor/mongo';

// Definir la colección de usuarios
export const Note = new Mongo.Collection('notes');