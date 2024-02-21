import { Meteor } from 'meteor/meteor';
import { User } from '../imports/api/user.js'
import { Note } from '../imports/api/note.js'

Meteor.methods({
  'users.insert'(email, name, password) {
    if (!User.findOne({ email: email })) {

      const userData = {
        email,
        name,
        password
      };

      User.insert(userData);
      console.log('Registro correcto:', email);
    } else {
      console.log('Email en uso:', email);
    }
  },

  'users.login'(email, password) {
    const user = User.findOne({ email, password });
    if (user) {
      console.log('Inicio de sesión exitoso:', user.name);
      return user.name; // Retorna el nombre si el inicio de sesión es exitoso
    } else {
      console.log('Inicio de sesión fallido:', email);
      return null; // Retorna false si el inicio de sesión falla
    }
  },

  'users.printAll'() {
    const users = User.find().fetch();
    users.forEach(user => {
      console.log('Usuario:', user.email, 'Contraseña:', user.password);
    });
  },

  'notes.insert'(email, noteName, noteContent) {

    const user = User.findOne({ email });
    if (!user) {
      console.log('Usuario no existe:', email);
      return false;
    }

    // Verificar si el nombre de la nota ya está en uso para este usuario
    const existingNote = Note.findOne({ userId: user._id, name: noteName });
    if (existingNote) {
      console.log('La nota ya existe:', email);
      return false;
    }
    Note.insert({ userId: user._id, name: noteName, content: noteContent });
    console.log('Nota añadida correctamente');
  },

  'notes.printAll'(email) {

    const user = User.findOne({ email });

    if (!user) {
      console.log('Usuario no existe:', email);
      return false;
    }

    const userNotes = Note.find({ userId: user._id }).fetch();
    console.log('Notas obtenidas correctamente');
    return userNotes;
  }

});

Meteor.startup(() => {

})