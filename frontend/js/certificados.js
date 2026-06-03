async function carregarCertificados() {
  const token = localStorage.getItem("token");
  const lista = document.getElementById("lista");

  try {
    const resposta = await fetch("http://localhost:3000/certificados", {
      headers: { "Authorization": "Bearer " + token }
    });

    const certificados = await resposta.json();

    if (!resposta.ok) {
      lista.innerHTML = '<div class="vazio">Erro ao carregar certificados.</div>';
      return;
    }

    if (certificados.length === 0) {
      lista.innerHTML = '<div class="vazio">Nenhum certificado enviado ainda.</div>';
      return;
    }

    let totalHoras = 0;
    let totalAprovados = 0;
    let totalPendentes = 0;

    lista.innerHTML = "";

    certificados.forEach(function(cert) {
      totalHoras += cert.horas;
      if (cert.status === "aprovado") totalAprovados++;
      if (cert.status === "pendente") totalPendentes++;

      const item = document.createElement("div");
      item.className = "certificado-item";
      item.innerHTML = `
        <div class="cert-info">
          <div class="cert-nome">${cert.nome}</div>
          <div class="cert-detalhes">${cert.categoria} · Enviado em ${cert.data}</div>
          <span class="status ${cert.status}">${cert.status}</span>
        </div>
        <div class="cert-horas">
          ${cert.horas}
          <span>horas</span>
        </div>
      `;
      lista.appendChild(item);
    });

    document.getElementById("total-horas").textContent = totalHoras;
    document.getElementById("total-aprovados").textContent = totalAprovados;
    document.getElementById("total-pendentes").textContent = totalPendentes;

  } catch (erro) {
    lista.innerHTML = '<div class="vazio">Não foi possível conectar ao servidor.</div>';
  }
}

carregarCertificados();
