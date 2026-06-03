function mostrarArquivo() {
  const arquivo = document.getElementById("arquivo-input").files[0];
  document.getElementById("arquivo-nome").textContent = arquivo ? "Arquivo: " + arquivo.name : "";
}

async function enviarCertificado() {
  const nome = document.getElementById("nome").value;
  const categoria = document.getElementById("categoria").value;
  const horas = document.getElementById("horas").value;
  const descricao = document.getElementById("descricao").value;
  const arquivo = document.getElementById("arquivo-input").files[0];
  const msg = document.getElementById("msg");

  if (!nome || !categoria || !horas || !arquivo) {
    msg.style.color = "#e05c5c";
    msg.textContent = "Preencha todos os campos obrigatórios.";
    return;
  }

  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("categoria", categoria);
  formData.append("horas", horas);
  formData.append("descricao", descricao);
  formData.append("arquivo", arquivo);

  const token = localStorage.getItem("token");

  msg.style.color = "#7a7f99";
  msg.textContent = "Enviando...";

  try {
    const resposta = await fetch("http://localhost:3000/certificados", {
      method: "POST",
      headers: { "Authorization": "Bearer " + token },
      body: formData
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      msg.style.color = "#4caf7d";
      msg.textContent = "Certificado enviado com sucesso!";
    } else {
      msg.style.color = "#e05c5c";
      msg.textContent = dados.erro || "Erro ao enviar certificado.";
    }
  } catch (erro) {
    msg.style.color = "#e05c5c";
    msg.textContent = "Não foi possível conectar ao servidor.";
  }
}
