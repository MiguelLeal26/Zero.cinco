document.addEventListener("DOMContentLoaded", function () {
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

  function updateCalculator() {
    // 1. Evento ativo
    const activeEvent = document.querySelector('.calc-pill-event.active');
    const eventKey = activeEvent ? activeEvent.getAttribute('data-event') : 'casamento';
    const eventData = config.events[eventKey] || config.events['casamento'];

    // 2. Duração ativa
    const activeDuration = document.querySelector('.calc-pill-duration.active');
    const durationKey = activeDuration ? activeDuration.getAttribute('data-duration') : '6h';
    const durationData = config.durations[durationKey] || config.durations['6h'];

    // 3. Soma inicial (Evento + Duração)
    let total = eventData.price + durationData.price;
    let selectedAddons = [];

    // 4. Captura TODOS os checkboxes marcados na seção da calculadora
    const calcSection = document.getElementById('calculator') || document;
    const checkedBoxes = calcSection.querySelectorAll('input[type="checkbox"]:checked');

    checkedBoxes.forEach(chk => {
      // Tenta obter o preço via data-price ou extrair do texto do card
      let price = parseFloat(chk.getAttribute('data-price') || chk.value || 0);

      // Se o atributo data-price não estiver definido no HTML, extrai do texto (+R$ XXX)
      const parentCard = chk.closest('label') || chk.closest('div');
      if (!price && parentCard) {
        const text = parentCard.innerText;
        const match = text.match(/\+\s*R\$\s*(\d+)/i);
        if (match) {
          price = parseFloat(match[1]);
        }
      }

      total += price;

      // Extrai o nome limpo do opcional
      if (parentCard) {
        const cleanName = parentCard.innerText.split('(+')[0].split('(+R$')[0].trim();
        selectedAddons.push(cleanName);
      }
    });

    // 5. Atualiza elementos visuais na tela
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

    // 6. Atualiza mensagem do WhatsApp
    if (btnWhatsapp) {
      const addonsText = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'Nenhum';
      const message = encodeURIComponent(
        `Olá! Gostaria de um orçamento pelo site:\n\n` +
        `• *Evento/Serviço:* ${eventData.name}\n` +
        `• *Duração:* ${durationData.name}\n` +
        `• *Opcionais:* ${addonsText}\n` +
        `• *Estimativa:* R$ ${total.toLocaleString("pt-BR")}`
      );
      btnWhatsapp.href = `https://wa.me/${config.whatsappNumber}?text=${message}`;
      btnWhatsapp.target = "_blank";
    }
  }

  // --- EVENT LISTENERS ---

  // Cliques em Eventos
  document.querySelectorAll('.calc-pill-event').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.calc-pill-event').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      updateCalculator();
    });
  });

  // Cliques em Duração
  document.querySelectorAll('.calc-pill-duration').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.calc-pill-duration').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      updateCalculator();
    });
  });

  // Mudança em qualquer Checkbox dentro da calculadora
  const calcSection = document.getElementById('calculator') || document;
  calcSection.addEventListener('change', function (e) {
    if (e.target && e.target.type === 'checkbox') {
      updateCalculator();
    }
  });

  // Execução inicial
  updateCalculator();
});
