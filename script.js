((d) => {
    const $form = d.querySelector(".contact-form"),
          $loader = d.querySelector(".contact-form-loader"),
          $response = d.querySelector(".contact-form-response");
  
    if (!$form) {
      console.error("Formulario no encontrado");
      return;
    }
  
    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      $loader.classList.remove("none");
      
      fetch("https://formsubmit.co/ajax/358b20d4d79761469e25c13f387fba7c", {
        method: "POST",
        body: new FormData(e.target),
      })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        location.hash = "#gracias";
        $form.reset();
      })
      .catch((error) => {
        console.error("Error en el envío del formulario:", error);
        $response.innerHTML = `<p>Ocurrió un error al enviar el formulario. Inténtalo de nuevo más tarde.</p>`;
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });
    });
  })(document);
  