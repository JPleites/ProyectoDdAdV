<template>
    <Navbar :mostrarMapa="mostrarMapa" @toggleMapa="toggleMapa" />
  
    <div>
      <h1>¡Bienvenido a Notre Maison!</h1>
    </div>

    <div>
      <MesasList />
    </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";
import MesasList from "../components/MesasList.vue";

const mostrarMapa = ref(false);

const toggleMapa = () => {
  mostrarMapa.value = !mostrarMapa.value;
};
</script>