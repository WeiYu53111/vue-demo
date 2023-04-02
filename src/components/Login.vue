<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import myHttp from '@/utils/myHttp';
import { useRouter } from 'vue-router';
import {CODE_SUCCESS } from '@/constants/resultCode'

export default {
    setup() {
        const state = reactive({
            name: 'admin',
            password: '123456',
        });

        const router = useRouter();

        const login = async () => {
            try {
                const response = await myHttp.post('/api/login', {
                    name: state.name,
                    password: state.password,
                });

              // 根据服务器返回的数据判断登录是否成功
              if (response.data.status == CODE_SUCCESS) {
                // handle successful login
                router.push("/about");
              } else {
                // handle unsuccessful login
                console.error("Login failed");
              }
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


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: auto;
  background-color: #f0f2f5;
}

.login-form {
  width: 300px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

h2 {
  margin-bottom: 30px;
  text-align: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #1890ff;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #40a9ff;
}
</style>