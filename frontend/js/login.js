async function fazerLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const msg = document.getElementById("msg");

  msg.style.color = "#7a7f99";
  msg.textContent = "Entrando...";

  try {
    const resposta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem("token", dados.token);
      msg.style.color = "#4caf7d";
      msg.textContent = "Login realizado! Redirecionando...";
      setTimeout(() => window.location.href = "certificados.html", 1000);
    } else {
      msg.style.color = "#e05c5c";
      msg.textContent = dados.erro || "E-mail ou senha inválidos.";
    }
  } catch (erro) {
    msg.style.color = "#e05c5c";
    msg.textContent = "Não foi possível conectar ao servidor.";
  }
}
