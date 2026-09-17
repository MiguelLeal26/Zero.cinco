/* ==========================================================================
   ZERO.CINCO CREATIVE STUDIO - MINIMALIST 3-STEP BUDGET ESTIMATOR
   ========================================================================== */

const calcConfig = {
  events: {
    casamento: { name: "Casamento & Bodas", base: 1800 },
    debutante: { name: "15 Anos / Aniversário", base: 1400 },
    formatura: { name: "Formatura & Festa", base: 1300 },
    corporativo: { name: "Corporativo & Lojas", base: 1100 },
    socialmedia: { name: "Social Media (Mensal)", base: 1200 }
  },
  durations: {
    essencial: { name: "Cobertura Essencial (até 3h)", multiplier: 1.0 },
    meio: { name: "Meio Período (até 6h)", multiplier: 1.5 },
    completo: { name: "Dia Completo (até 10h)", multiplier: 2.1 }
  },
  addons: {
    drone: { name: "Imagens Aéreas com Drone 4K", price: 350 },
    sameDay: { name: "Reels / Teaser no Mesmo Dia", price: 300 },
    album: { name: "Álbum Impresso / Ensaio Extra", price: 450 }
  },
  whatsappNumber: "5585987398992"
};


function initMinimalCalculator() {
  const eventPills = document.querySelectorAll('.calc-pill-event');
  const durationPills = document.querySelectorAll('.calc-pill-duration');
  const addonChecks = document.querySelectorAll('.calc-addon-pill input');
  const summaryEvent = document.getElementById('calcSummaryEvent');
  const summaryDuration = document.getElementById('calcSummaryDuration');
  const summaryAddonsList = document.getElementById('calcSummaryAddons');
  const priceDisplay = document.getElementById('calcFinalPrice');
  const whatsappBtn = document.getElementById('calcSendWhatsApp');

  let selectedEvent = 'casamento';
  let selectedDuration = 'meio';

  function update() {
    const eventInfo = calcConfig.events[selectedEvent] || calcConfig.events.casamento;
    const durationInfo = calcConfig.durations[selectedDuration] || calcConfig.durations.meio;

    let total = Math.round(eventInfo.base * durationInfo.multiplier);
    const activeAddons = [];

    addonChecks.forEach(cb => {
      const parentLabel = cb.closest('.calc-addon-pill');
      if (cb.checked) {
        if (parentLabel) parentLabel.classList.add('selected');
        const key = cb.value;
        const add = calcConfig.addons[key];
        if (add) {
          total += add.price;
          activeAddons.push(add.name);
        }
      } else {
        if (parentLabel) parentLabel.classList.remove('selected');
      }
    });

    // Update Summary Texts
    if (summaryEvent) summaryEvent.textContent = eventInfo.name;
    if (summaryDuration) summaryDuration.textContent = durationInfo.name;

    if (summaryAddonsList) {
      if (activeAddons.length > 0) {
        summaryAddonsList.innerHTML = activeAddons.map(a => `<li>+ ${a}</li>`).join('');
      } else {
        summaryAddonsList.innerHTML = `<li style="color: var(--text-dim);">Nenhum opcional selecionado</li>`;
      }
    }

    if (priceDisplay) {
      priceDisplay.textContent = `R$ ${total.toLocaleString('pt-BR')}`;
    }

    // Build WhatsApp Link
    if (whatsappBtn) {
      const addonsText = activeAddons.length > 0
        ? `%0A*Opcionais:*%0A` + activeAddons.map(a => `• ${a}`).join('%0A')
      const msg = `Olá, equipe Zero.Cinco!%0AGostaria de solicitar uma proposta com base na estimativa do site:%0A%0A*Tipo de Evento:* ${eventInfo.name}%0A*Duração:* ${durationInfo.name}${addonsText}%0A%0A*Estimativa:* R$ ${total.toLocaleString('pt-BR')}%0A%0APodemos conversar sobre a data?`;

      whatsappBtn.href = `https://wa.me/${calcConfig.whatsappNumber}?text=${msg}`;
      whatsappBtn.target = "_blank";
    }
  }

  // Event Listeners for Step 1
  eventPills.forEach(pill => {
    pill.addEventListener('click', () => {
      eventPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedEvent = pill.getAttribute('data-event');
      update();
    });
  });

  // Event Listeners for Step 2
  durationPills.forEach(pill => {
    pill.addEventListener('click', () => {
      durationPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedDuration = pill.getAttribute('data-duration');
      update();
    });
  });

  // Event Listeners for Step 3
  addonChecks.forEach(cb => {
    cb.addEventListener('change', update);
  });

  update();
}

document.addEventListener('DOMContentLoaded', initMinimalCalculator);
