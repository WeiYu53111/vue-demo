<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <label>
                name:
                <input type="text" v-model="name" required>
            </label>
            <label>
                Password:
                <input type="password" v-model="password" required>
            </label>
            <button type="submit">Login</button>
        </form>
    </div>
</template>
  
<script>
import { reactive, toRefs } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const state = reactive({
            name: '',
            password: '',
        });

        const login = async () => {
            try {
                const response = await axios.post('/api/login', {
                    name: state.name,
                    password: state.password,
                });
                // handle successful login
                this.$router.push('/about');
            } catch (error) {
                // handle login error
            }
        };

        return {
            ...toRefs(state),
            login,
        };
    },
};
</script>
  