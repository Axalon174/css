let title = "";
        function verifyLoggin(){
            const sesion = JSON.parse(localStorage.getItem("sesion"));
            console.log("" + sesion);
            if (!sesion?.Session) {
            // Si no hay sesión, lo regresamos al login
            window.location.replace("/practica_tres_final/index.html"); }}

           function logout() {
            localStorage.removeItem("sesion");
            window.location.replace("/practica_tres_final/index.html");
            verifyLoggin();
            }

const handleUpload = () => {
    const form = document.getElementById("upload-form");
                form.addEventListener("submit", function (e) {
                    e.preventDefault();
                    let form = e.target;
                    let formData = new FormData(form);
                    let file = document.getElementById("data").files[0];
                    if (!file) {
                        alert("Por favor, selecciona un archivo.");
                        return; }
                    for (let [key, value] of formData.entries()) {
                        alert(`${key}:`, value);}
                fetch("https://dev-academy.n8n.itelisoft.org/webhook/anacleto_vector_storage", {
                     method: "POST",
                     body: formData })
                     .then(response => {
                         if (!response.ok) {
                            throw new Error("Error en la solicitud: " + response.status);
                        }
                        return response.json(); })
                    .then(data => {
                        alert("Archivo enviado con éxito" /*+ JSON.stringify(data)*/);
                        title=JSON.stringify(data.title);
                    new bootstrap.Modal(document.getElementById('exampleModal')).show();
            })
            .catch(error => {
                console.error("Algo salió mal", error);
                alert("Error al subir el archivo.");
            });
         });
        }

// Puedes llamar a `handleUpload()` cuando quieras (por ejemplo, desde otro evento)

const ruta_documentos = "https://afuycqqqmqxgiqgxhxtv.supabase.co/storage/v1/object/public/anacleto.s3/RAG/";

const visualize = () => {
    window.open(ruta_documentos.concat(title).replace(/"/g, ''), '_blank');
};

const viewAll = () => {
    window.open("/practica_tres_final/viewAll.html");
};

/**************************
 *     INICIAR SESION     *
 * ************************/
 const login = () => {
    const btn = document.getElementById("login-btn");

    btn.addEventListener("click", async (e) => {
        e.preventDefault();

        const username = document.getElementById("user").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            return alert("Por favor, completa todos los campos.");
        }

        btn.disabled = true;
        btn.textContent = "Ingresando...";

        try {
            const res = await fetch("https://dev-academy.n8n.itelisoft.org/webhook/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) throw new Error("Error del servidor: " + res.status);

            const data = await res.json();

            if (data.Session === true) {
                localStorage.setItem("sesion", JSON.stringify({ Session: true }));
                window.location.replace("upload.html");
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("No se pudo iniciar sesión. Intenta más tarde.");
        } finally {
            btn.disabled = false;
            btn.textContent = "Iniciar sesión";
        }
    }, { once: true });
};
