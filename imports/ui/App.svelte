<script>
  import Login from "./Login.svelte";
  import Register from "./Register.svelte";
  import Note from "./Note.svelte"

  let mostrarLogin = false;
  let mostrarRegistro = false;

  let userEmail = "";
  let name = ""; // user name. Si está vacío, significa que no hay usuario con la sesion iniciada

  //Se la pasaremos al hijo Login para que cuando un usuario inicie sesión, se muestre su nombre
  function setName(value) {
    name = value;
  }

  function setEmail(value) {
    userEmail = value;
  }

  //Para indicar si se muestra la ventana de login o register
  function mostrarComponente(componente) {
    if (componente === "login") {
      mostrarLogin = true;
      mostrarRegistro = false;
    } else if (componente === "register") {
      mostrarLogin = false;
      mostrarRegistro = true;
    }
  }

  //Cerrar sesión
  function logOut () {
    name = "";
    userEmail = "";
  }

</script>

<main>
  <h1>Hello {name}!</h1>

  {#if name == ""}
    <div>
      <button on:click={() => mostrarComponente("login")}>Log in</button>
      <button on:click={() => mostrarComponente("register")}>Register</button>
    </div>
  {/if}

  {#if mostrarLogin && name == ""}
    <Login {setName} {setEmail} />
  {/if}

  {#if mostrarRegistro && name == ""}
    <Register />
  {/if}


  {#if name != ""}
    <Note {userEmail} />
  {/if}

  {#if name !=""}
  <button on:click={logOut}>Log out</button>
  {/if}



</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  button {
    padding: .5rem;
    font-size: 1.2rem;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
