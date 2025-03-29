<template>
    <nav class="navbar">
      <h1>Notre Maison</h1>
      <button @click="$emit('toggleMapa')" class="botonMostrar">
        {{ mostrarMapa ? "Ocultar Mapa" : "Mostrar Mapa" }}
      </button>
      <button @click="logout" class="btn-logout">
        Cerrar sesión
      </button>
    </nav>
  
    <div v-if="mostrarMapa" class="mapa-overlay">
      <div class="mapa-container">
        <button @click="$emit('toggleMapa')" class="cerrar-mapa">X</button>
        <img src="../assets/maparestaurante.jpg" alt="Mapa del Restaurante" class="mapa-imagen">
      </div>
    </div>
  </template>
  
  <script>
  import { getAuth, signOut } from "firebase/auth";

  export default {
    props: {
      mostrarMapa: Boolean
    },
    methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          window.location.replace("/login");
        })
        .catch((error) => {
          console.error("Error al cerrar sesión: ", error);
        });
    }
  }};
  </script>
  
  <style>
  .navbar {
    background-color: #577399;
    color: white;
    display: flex;
    justify-content: space-between;
    height: 60px;
    padding: 0 0;
    width: 100%;
  }

  .navbar h1{
    color: #F7F7FF;
  }
  
  .botonMostrar {
    background-color: white;
    color: rgb(12, 12, 110);
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 150px;
  }
  
  .botonMostrar:hover {
    background-color: #FE5F55;
    color: white;
  }

  .btn-logout{
    background-color: #FE5F55;
    color: white;
    width: 120px;
  }

  .btn-logout:hover{
    background-color: #FF8C00;
    color: white;
    cursor: pointer;
  }
  
  .mapa-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .mapa-container {
    position: relative;
    background: #F7F7FF;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  
  .mapa-imagen {
    max-width: 55%;
    height: auto;
    border: 2px solid #ccc;
    border-radius: 10px;
  }
  
  .cerrar-mapa {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #FE5F55;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 18px;
    cursor: pointer;
  }
  
  .cerrar-mapa:hover {
    background: darkred;
  }
  </style>