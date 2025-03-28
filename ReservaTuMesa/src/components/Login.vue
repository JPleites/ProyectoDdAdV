<template>
  <div class="form">
    <table>
      <caption>Iniciar Sesión</caption>
      <tbody>
        <tr>
          <td>
            <input v-model="email" type="email" placeholder="Correo" required /><br>
            <input v-model="password" type="password" placeholder="Contraseña" required /><br>
            <button @click.prevent="login" class="btnform">Ingresar</button>
            <p v-if="error">{{ error }}</p>
            <p v-if="loading">Cargando...</p> <!-- Mensaje de carga -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false); // Agregar estado de carga
    const router = useRouter();

    const login = async () => {
      // Validar si los campos no están vacíos
      if (!email.value || !password.value) {
        error.value = "Por favor, ingresa tu correo y contraseña";
        return;
      }

      loading.value = true; // Mostrar mensaje de carga

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          console.log("Usuario autenticado con rol:", role);

          // Redirigir según el rol del usuario
          if (role === "admin") {
            router.push("/admin");
          } else {
            router.push("/cliente");
          }
        } else {
          error.value = "No se encontró el perfil del usuario";
        }
      } catch (err) {
        error.value = "Error en el inicio de sesión";
        console.error(err);
      } finally {
        loading.value = false; // Ocultar mensaje de carga
      }
    };

    return { email, password, error, login, loading };
  },
};
</script>

<style scoped>
</style>

<style>
  .form{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    text-align: center;
    gap: 10px;
  }

  .form input{
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