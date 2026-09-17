document.addEventListener("DOMContentLoaded", function () {
  // Configurações de Preços e Valores
  const config = {
    whatsappNumber: "5585987398992",
    events: {
      "casamento": { name: "Casamento & Pré-Wedding", price: 2000 },
      "debutante": { name: "15 Anos / Aniversário", price: 1500 },
      "formatura": { name: "Formatura & Festa", price: 1800 },
      "corporativo": { name: "Corporativo & Lojas", price: 1200 },
      "socialmedia": { name: "Social Media (Mensal)", price: 2500 }
    },
    durations: {
      "3h": { name: "Cobertura Essencial (até 3h)", price: 400 },
      "6h": { name: "Meio Período (até 6h)", price: 700 },
      "10h": { name: "Dia Completo (até 10h)", price: 1200 }
    }
  };

  // Função principal de recálculo
  function updateCalculator() {
    // 1. Pega evento ativo
    const activeEvent = document.querySelector('.calc-pill-event.active');
    const eventKey = activeEvent ? activeEvent.getAttribute('data-event') : 'casamento';
    const eventData = config.events[eventKey] || config.events['casamento'];

    // 2. Pega duração ativa
    const activeDuration = document.querySelector('.calc-pill-duration.active');
    const durationKey = activeDuration ? activeDuration.getAttribute('data-duration') : '6h';
    const durationData = config.durations[durationKey] || config.durations['6h'];

    // 3. Soma Base
    let total = eventData.price + durationData.price;
    let selectedAddons = [];

    // 4. Soma Adicionais
    document.querySelectorAll('.calc-addon-pill input[type="checkbox"]:checked, .calc-addon-card input[type="checkbox"]:checked').forEach(chk => {
      const price = parseFloat(chk.getAttribute('data-price') || 0);
      const labelText = chk.closest('label') ? chk.closest('label').innerText.split('(+')[0].trim() : 'Adicional';
      total += price;
      selectedAddons.push(labelText);
    });

    // 5. Atualiza Interface (Procura pelos elementos por ID ou Classe)
    const summaryEvent = document.getElementById('calcSummaryEvent') || document.getElementById('summary-event');
    const summaryDuration = document.getElementById('calcSummaryDuration') || document.getElementById('summary-duration');
    const summaryAddons = document.getElementById('calcSummaryAddons') || document.getElementById('summary-addons');
    const summaryPrice = document.getElementById('calcSummaryPrice') || document.getElementById('summary-price');
    const btnWhatsapp = document.getElementById('calcSendWhatsapp') || document.getElementById('btn-whatsapp') || document.querySelector('.calc-summary-card a');

    if (summaryEvent) summaryEvent.innerText = eventData.name;
    if (summaryDuration) summaryDuration.innerText = durationData.name;

    if (summaryPrice) {
      summaryPrice.innerText = `R$ ${total.toLocaleString("pt-BR")}`;
    }

    if (summaryAddons) {
      if (selectedAddons.length > 0) {
        summaryAddons.innerHTML = selectedAddons.map(item => `<li>+ ${item}</li>`).join('');
      } else {
        summaryAddons.innerHTML = '<li style="color:#aaa; font-style:italic;">Nenhum opcional selecionado</li>';
      }
    }

    // 6. Atualiza Link do WhatsApp
    if (btnWhatsapp) {
      const addonsText = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'Nenhum';
      const message = encodeURIComponent(
        `Olá! Gostaria de um orçamento feito pelo site:\n\n` +
        `• *Evento/Serviço:* ${eventData.name}\n` +
        `• *Duração:* ${durationData.name}\n` +
        `• *Opcionais:* ${addonsText}\n` +
        `• *Estimativa:* R$ ${total.toLocaleString("pt-BR")}`
      );
      btnWhatsapp.href = `https://wa.me/${config.whatsappNumber}?text=${message}`;
      btnWhatsapp.target = "_blank";
    }
  }

  // --- EVENT LISTENERS (Captura de Cliques) ---

  // Cliques no Tipo de Evento
  document.querySelectorAll('.calc-pill-event').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.calc-pill-event').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      updateCalculator();
    });
  });

  // Cliques na Duração da Cobertura
  document.querySelectorAll('.calc-pill-duration').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.calc-pill-duration').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      updateCalculator();
    });
  });

  // Checkboxes dos Opcionais
  document.querySelectorAll('.calc-addon-pill input, .calc-addon-card input').forEach(chk => {
    chk.addEventListener('change', function () {
      updateCalculator();
    });
  });

  // Executa ao carregar para calcular estado inicial
  updateCalculator();
});
