<script>
  import { Meteor } from "meteor/meteor";

  let name = "";
  let email = "";
  let password = "";
  let errorMessage = "";

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await Meteor.call("users.insert", email, name, password);
    } catch (error) {
      console.error("Error al insertar usuario:", error);
    }
  }
</script>

<div class="register-form">
  <h2>Register</h2>
  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}
  <form class="form-form" on:submit={handleSubmit}>
    <label>
      Name:
      <input bind:value={name} required />
    </label>
    <label>
      Email:
      <input type="email" bind:value={email} required />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} required />
    </label>
    <button class="b-register" type="submit">Register</button>
  </form>
</div>

<style>
  /* Add your component styles here */
  .register-form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .form-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  label {
    margin: .5rem;
  }

  .b-register {
    margin-top: 1rem;
    width: 40%;
  }

  .error-message {
    color: red;
    margin-top: 10px;
  }
</style>
