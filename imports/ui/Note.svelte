<script>
  import { onMount } from 'svelte';
  let notas = [];
  let noteName = "";
  let noteContent = "";
  let editingNote = false;

  export let userEmail;
  //Guardar nota
  async function saveNote() {
    try {
      await Meteor.call(
        "notes.insert",
        userEmail,
        noteName,
        noteContent,
        (error, result) => {},
      );

      await getNotes();

    } catch (error) {
      console.error("Error adding note:", error);
    }

  }

  //Mostrar notas de un usuario
  async function getNotes() {
    try {
      await Meteor.call(
        "notes.printAll",
        userEmail,
        (error, result) => {
          if (result)
            notas=result;
        },
      );
    } catch (error) {
      console.error("Error printing notes:", error);
    }
  }

  onMount(async () => {
    await getNotes();
  });

  //Eliminar nota de un usuario
  async function deleteNote(notaId) {
    const message = await deleteNote("pedro@gmail.com", notaId);
    console.log(message);
    cargarNotas();
  }

  //Editar nota de un usuario
  async function editNote(nota) {
    const newName = prompt("Ingrese el nuevo nombre de la nota", nota.name);
    const newContent = prompt(
      "Ingrese el nuevo contenido de la nota",
      nota.content,
    );
    if (newName !== null && newContent !== null) {
      const message = await editNote(
        "pedro@gmail.com",
        nota._id,
        newName,
        newContent,
      );
      console.log(message);
      cargarNotas();
    }
  }

  //Mostrar formulario para crear nota
  function mostrarFormularioAgregarNota() {
    editingNote = true;
  }

  function cancelNote() {
    editingNote = false;
  }
</script>

{#if editingNote}
  <!-- Formulario para agregar una nueva nota -->
  <div>
    <div>
      <label for="noteTitle">Note title:</label>
      <input type="text" bind:value={noteName} />
    </div>

    <div>
      <label for="noteContent">Note content:</label>
      <input type="text" bind:value={noteContent} />
    </div>

    <button on:click={saveNote}>Save</button>
    <button on:click={cancelNote}>Cancel</button>
  </div>
{/if}

{#if !editingNote}
  <button class="b-add-note" on:click={mostrarFormularioAgregarNota}
    >Add note</button
  >
{/if}


<div class="notes-container">
  <div class="note-list">
    <h2>User notes:</h2>
    <div class="ul-container">
      <ul>
        {#each notas as nota}
          <li>
            <strong>{nota.name}</strong>: {nota.content}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>


<style>
  ul {
    width: 40%;
    list-style-type: none;
  }

  .ul-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .notes-container {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .note-list{
    padding: 1rem;
    margin: 1rem;
    background-color: #cdcdcd;
    width: 500px;
    border-radius: 10px;
  }

</style>
