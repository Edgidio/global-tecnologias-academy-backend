import app from "./app.js"


// Iniciar el servidor y escuchar en el puerto especificado
app.listen(app.get("PORT"), () => {
    console.log(`Servidor Express escuchando en el puerto ${app.get("PORT")}`);
});