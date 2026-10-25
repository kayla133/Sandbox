<script>
    let email = $state("");
    let password = $state("");
    let error = $state("");

    function loginHandler(event) {
        event.preventDefault();
        if (!email.includes("@")) {
            error = "Please enter a valid email address";
            return;
        }

        if (password.length < 6) {
            error = "Password must be at least 6 characters long";
            return;
        }

        error = "";
        console.log("Login button clicked");
    }
</script>

<form onsubmit={loginHandler}>
    <label for="email">Email</label>
    <input type="email" id="email" bind:value={email} />

    <label for="password">Password</label>
    <input type="password" id="password" bind:value={password} />

    <button type="submit">Log In</button>
</form>

{#if error}
    <p class="error">{error}</p>
{/if}

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 300px;
    }

    button {
        padding: 0.5rem;
    }

    .error {
        color: red;
    }
</style>
