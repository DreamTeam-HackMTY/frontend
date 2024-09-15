<template>
    <div class="login">
        <div class="image-container">
            <img :src="'/epidemia.png'" alt="Descripción de la imagen" class="login-image" />
        </div>
        <div class="form-container">
            <h1 class="title">Login in the page</h1>
            <form action class="form">
                <label class="form-label" for="#email">Email:</label>
                <input class="form-input" type="email" id="email" required placeholder="Email" />
                <label class="form-label" for="#password">Password:</label>
                <input class="form-input" type="password" id="password" placeholder="Password" />
                <input class="form-submit" type="submit" value="Login" />
            </form>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    padding: 2rem;
}

.image-container,
.form-container {
    flex: 1;
}

.login-image {
    width: 100%;
    height: auto;
}

.title {
    text-align: center;
}

.form {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    background: rgba(37, 146, 209, 1);
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}

.form-label {
    margin-top: 2rem;
    color: rgb(255, 255, 255);
    margin-bottom: 0.5rem;

    &:first-of-type {
        margin-top: 0rem;
    }
}

.form-input {
    padding: 10px 15px;
    background: white;
    background-image: none;
    border: 1px solid white;
    color: black;

    &:focus {
        outline: 0;
        border-color: #202020;
    }
}

.form-submit {
    background: #000000;
    border: none;
    color: white;
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #202020;
    }
}
</style>