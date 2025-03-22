<script setup>
import { ref, onMounted } from "vue";
import { db } from "../firebase/firebase.js";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const mesas = ref([]);
const mesaSeleccionada = ref(null);
const mostrarFormulario = ref(false);
const reservadaPor = ref("");
const fecha = ref("");
const cantidadReservada = ref(1);

const seleccionarMesa = (mesa) => {
    mesaSeleccionada.value = mesa;
    liberarMesa();
};


const liberarMesa = async () => {
  if (!mesaSeleccionada.value) return;

  try {
    const mesaRef = doc(db, "mesas", mesaSeleccionada.value.id);
    await updateDoc(mesaRef, {
      estareservada: false,
      ReservadaPor: "No reservada",
      fecha: "",
      CantidadReservada: 0,
    });

    mostrarFormulario.value = false;
    
    cargarMesas(); // Actualizar lista de mesas
  } catch (error) {
    console.error("Error al liberar:", error);
  }
};

const cargarMesas = async () => {
  const querySnapshot = await getDocs(collection(db, "mesas"));
  mesas.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

onMounted(cargarMesas);
</script>

<template>
  <div class="mesas-list">
    <h2>Listado de Mesas</h2>
    <div class="mesas-cards">
      <div class="mesa-item" v-for="mesa in mesas" :key="mesa.id">
        <div class="mesa">
          <p><b>Mesa: </b>{{ mesa.id }}</p>
          <p :class="mesa.estareservada ? 'reservada' : 'disponible'"><b>Estado: </b> 
            {{ mesa.estareservada ? "Reservada" : "Disponible" }}
          </p>
          <p><b>Capacidad ocupada de la mesa: </b>{{ mesa.CantidadReservada }}</p> 
          <p><b>Capacidad total de la mesa: </b>{{ mesa.capacidad }}</p>
          <p><b>Reservada por: </b>{{ mesa.ReservadaPor }}</p>
          <p><b>Fecha de la reservación: </b>{{ mesa.fecha }}</p>
          
        </div>
        <div class="btn-reserva">
          <button 
          @click="seleccionarMesa(mesa)" 
          :disabled="!mesa.estareservada"
          class="botonReserva"
        >
          Liberar
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mesas-cards{
  display: flex;
  flex-wrap: wrap;
}

.mesas-list {
  padding: 20px;
  font-family: Arial, sans-serif;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mesa-item {
  flex: 33%;
  margin: 10px;
  border: #577399 4px solid;
  display: flex;
  flex-direction: column;
  background-color: #F7F7FF;
  border-radius: 15px;
}

.btn-reserva{
  background-color: #577399;
  padding: 5px;
}

.reservada {
  color: red;
  font-weight: bold;
}

.disponible {
  color: green;
  font-weight: bold;
}

p {
  color: black;
  font-size: 30px;
}

button:disabled {
  background-color: rgb(172, 0, 0);
  color: white;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: rgb(172, 0, 0);
  color: red;
}

.botonReserva {
  background-color: rgb(37, 222, 37);
  color: black;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  height: 40px;
  width: 100px;
}

.botonReserva:hover {
  background-color: rgb(6, 89, 6);
  color: white;
}

.Reservacion{
  display: block;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}

.Reservacion input{
  background-color: white;
  font-weight: normal;
}

.Reservacion table caption{
  font-size: 20px;
  background-color: #495867;
  color: white;
}

.Reservacion table{
  width: 50%;
  background-color: #F7F7FF;
}

.Reservacion table, td, tr, tbody{
  border: black 3px solid;
  padding: 15px;
}

.btnConfirmar{
  background-color: green;
  color: white;
  cursor: pointer;
  margin-left: 10px;
  width: 275px;
  border-radius: 10px;
}

.btnConfirmar:hover{
  background-color: rgb(2, 255, 2);
  color: black;
}

.btnCancelar{
  background-color: rgb(175, 32, 32);
  color: white;
  cursor: pointer;
  margin-left: 10px;
  width: 150px;
  border-radius: 10px;
}

.btnCancelar:hover{
  background-color: rgb(255, 4, 4);
  color: white;
}
</style>
