<script>
  import { Meteor } from "meteor/meteor";

  export let setName;
  export let setEmail;

  let email = "";
  let password = "";
  let errorMessage = "";

  async function handleSubmit(event) {
    event.preventDefault();
    setEmail(email);
    
    try {
      await Meteor.call("users.login", email, password, (error, result) => {
        if (result !== null) {
          setName(result);
        }
      });
    } catch (error) {
      console.error("Error logging user:", error);
    }
  }
</script>

<div class="login-form">
  <h2>Login</h2>
  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}

  <form class="form-form" on:submit={handleSubmit}>
    <label>
      Email:
      <input type="email" bind:value={email} required />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} required />
    </label>

    <button class="b-login" type="submit">Login</button>
  </form>
</div>

<style>
  /* Add your component styles here */
  .login-form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .error-message {
    color: red;
    margin-top: 10px;
  }

  .form-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .b-login {
    margin-top: 1rem;
    width: 40%;
  }

  label {
    margin: .5rem;
  }
</style>
