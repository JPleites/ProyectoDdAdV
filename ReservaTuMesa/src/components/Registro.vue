<template>
  <div class="form">
    <img src="../assets/icono.jpg">
    <table>
      <caption>Registrar nuevo usuario</caption>
      <tbody>
        <tr>
          <td>
            <form @submit.prevent="register">
            <input v-model="email" type="email" placeholder="Correo electrónico" required /><br><br>
            <input v-model="password" type="password" placeholder="Contraseña" required /><br><br>
            <select v-model="role" required>
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
            </select><br><br>
            <button type="submit" class="btnform">Registrar</button><br>
            <router-link to="/login" class="btnlogin">Iniciar Sesión</router-link>
          </form>
          <p v-if="error" class="error">{{ error }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export default {
  name: "RegisterView",
  setup() {
    const email = ref("");
    const password = ref("");
    const role = ref("cliente");
    const error = ref("");

    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          role: role.value,
        });

        alert("Registro exitoso. Ahora puedes iniciar sesión.");

      } catch (err) {
        console.error("Error al registrar usuario:", err);
        error.value = "Hubo un error al registrar el usuario. Intenta nuevamente.";
      }
    };

    return { email, password, role, error, register };
  },
};
</script>

<style scoped>  
.btnlogin{
  color:#495867;
  font-weight: bold;
}

.btnlogin:hover{
  color: #71a9e1;
}

.form img{
    width: 300px;
    object-fit: contain;
    border: #495867 5px solid;
    border-radius: 10px;
  }
  
.form{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  text-align: center;
  gap: 10px;
}

.form input, select{
background-color: white;
font-weight: normal;
width: 90%;
}

.form table caption{
font-size: 20px;
background-color: #495867;
color: white;
}

.form table{
width: 50%;
background-color: #F7F7FF;
}

.form table, td, tr, tbody{
border: black 3px solid;
padding: 15px;
}

.btnform{
background-color: #FE5F55;
color: white;
border: none;
padding: 10px 20px;
cursor: pointer;
}

.btnform:hover{
background-color: #b02f2f;
}
</style>