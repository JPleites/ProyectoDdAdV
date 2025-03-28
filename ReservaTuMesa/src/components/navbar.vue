<template>
    <nav class="navbar">
      <h1>Mia Casa</h1>
      <button @click="$emit('toggleMapa')" class="botonMostrar">
        {{ mostrarMapa ? "Ocultar Mapa" : "Mostrar Mapa" }}
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
  export default {
    props: {
      mostrarMapa: Boolean
    }
  };
  </script>
  
  <style>
  .navbar {
    background-color: #577399;
    color: white;
    display: flex;
    justify-content: center;
    height: 50px;
  }
  
  .botonMostrar {
    background-color: white;
    color: rgb(12, 12, 110);
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    padding: 5px 10px;
  }
  
  .botonMostrar:hover {
    background-color: #FE5F55;
    color: white;
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
  
  /* Botón de cierre */
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