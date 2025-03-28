<template>
    <nav class="navbar">
      <h1>Mia Casa</h1>
      <router-link to="/register"><button class="botonRegistrar">
        Registrar nuevo usuario
      </button></router-link>
      <button @click="logout" class="btn-logout">
        Cerrar sesión
      </button>
    </nav>
  </template>
  
  <script>
  import { getAuth, signOut } from "firebase/auth";

  export default {
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
    font-weight: bold;
  }

  .navbar h1{
    color: #F7F7FF;
  }
  
  .botonRegistrar {
    background-color: #BDD5EA;
    color: #577399;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 300px;
    height: 100%;
  }
  
  .botonRegistrar:hover {
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