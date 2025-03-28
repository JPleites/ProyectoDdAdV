<template>
    <Navbar :mostrarMapa="mostrarMapa" @toggleMapa="toggleMapa" />
  
    <div>
      <h1>Bienvenido al Mia Casa</h1>
    </div>

    <div>
      <MesasList />
    </div>
</template>

<script setup>
import { ref } from "vue";
import MesasList from "../components/MesasList.vue";
import Navbar from "../components/Navbar.vue";

const mostrarMapa = ref(false);

const toggleMapa = () => {
  mostrarMapa.value = !mostrarMapa.value;
};
</script>