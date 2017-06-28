const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const cmdTitle = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const cmdBody = {
    describe: "Body of note",
    demand: true,
    alias: 'b'
}

const argv = yargs
.command('add', 'Add a new note', {
  title: cmdTitle,
  body: cmdBody
}).command('list', 'Printing all notes')
.command('remove', 'Removing note', {
  title: cmdTitle
}).command('read','Printing selected note',{
  title: cmdTitle
})
.help()
.argv;
const command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  }else{
    console.log("Sorry that title already exists. Please use a unique title");

  }
} else if (command === 'list') {

    const allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'remove') {
    let noteRemoved = notes.removeNote(argv.title);
    const message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else if (command === 'read') {
    var note = notes.getNote(argv.title);

    if(note){
      console.log('Note Found');
      notes.logNote(note);

    }else{
      console.log("Sorry that note doesn't exist");

    }

} else{
  console.log('Command not recognized')
}
