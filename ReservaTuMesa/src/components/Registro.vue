<template>
  <div class="form">
    <table>
      <caption>Registrar nuevo usuario</caption>
      <tbody>
        <tr>
          <td>
            <form @submit.prevent="register">
            <input v-model="email" type="email" placeholder="Correo electrónico" required />
            <input v-model="password" type="password" placeholder="Contraseña" required />
            <select v-model="role" required>
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
            </select><br>
            <button type="submit" class="btnform">Registrar</button>
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
import { auth, db } from "../firebase/firebase"; // Ajusta la ruta de tu archivo de Firebase

export default {
  name: "RegisterView",
  setup() {
    const email = ref("");
    const password = ref("");
    const role = ref("cliente"); // Rol por defecto
    const error = ref("");

    // Función para registrar el usuario
    const register = async () => {
      try {
        // Crear el usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Guardar el rol en Firestore
        await setDoc(doc(db, "users", user.uid), {
          role: role.value, // Guardamos el rol del usuario
        });

        // Redirigir al login después de registrar el usuario
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        // Aquí podrías redirigir al login usando `router.push('/login')`

      } catch (err) {
        console.error("Error al registrar usuario:", err);
        error.value = "Hubo un error al registrar el usuario. Intenta nuevamente.";
      }
    };

    return { email, password, role, error, register };
  },
};
</script>

<style scoped>  .form{
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