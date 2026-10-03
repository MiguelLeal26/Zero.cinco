document.addEventListener("DOMContentLoaded", function () {
    const config = {
        whatsappNumber: "5585999616570",
        events: {
            "casamento": { name: "Casamento & Pré-Wedding", price: 2000 },
            "debutante": { name: "15 Anos / Aniversário", price: 1500 },
            "formatura": { name: "Formatura & Festa", price: 1800 },
            "corporativo": { name: "Corporativo & Lojas", price: 1200 },
            "socialmedia": { name: "Social Media (Mensal)", price: 2500 }
        },
        durations: {
            "3h": { name: "Cobertura Essencial (até 3h)", percentage: 0.10 },
            "6h": { name: "Meio Período (até 6h)", percentage: 0.20 },
            "10h": { name: "Dia Completo (até 10h)", percentage: 0.30 }
        }
    };

    function toggleAddonVisualState(chk) {
        const parentLabel = chk.closest('label');
        if (parentLabel) {
            if (chk.checked) {
                parentLabel.classList.add('selected', 'active');
            } else {
                parentLabel.classList.remove('selected', 'active');
            }
        }
    }

    function updateCalculator() {
        // 1. Evento ativo
        const activeEvent = document.querySelector('.calc-pill-event.active') || document.querySelector('[data-event].active');
        let eventKey = 'casamento';
        if (activeEvent) {
            eventKey = activeEvent.getAttribute('data-event') || 'casamento';
            if (!config.events[eventKey]) {
                const txt = activeEvent.innerText.toLowerCase();
                if (txt.includes('15') || txt.includes('aniversário')) eventKey = 'debutante';
                else if (txt.includes('formatura')) eventKey = 'formatura';
                else if (txt.includes('corporativo')) eventKey = 'corporativo';
                else if (txt.includes('social')) eventKey = 'socialmedia';
                else eventKey = 'casamento';
            }
        }
        const eventData = config.events[eventKey] || config.events['casamento'];

        // 2. Duração ativa
        const activeDuration = document.querySelector('.calc-pill-duration.active') || document.querySelector('[data-duration].active');
        let durationKey = '6h';

        if (activeDuration) {
            const attr = activeDuration.getAttribute('data-duration') || '';
            const txt = activeDuration.innerText.toLowerCase();

            if (attr === 'essencial' || attr === '3h' || txt.includes('3h') || txt.includes('essencial')) {
                durationKey = '3h';
            } else if (attr === 'completo' || attr === '10h' || txt.includes('10h') || txt.includes('completo')) {
                durationKey = '10h';
            } else {
                durationKey = '6h';
            }
        }

        const durationData = config.durations[durationKey];

        // 3. Coleta dos Adicionais Opcionais
        let selectedAddons = [];

        const calcSection = document.getElementById('calculator') || document;
        const allAddonCheckboxes = calcSection.querySelectorAll('input[type="checkbox"]');

        allAddonCheckboxes.forEach(chk => {
            toggleAddonVisualState(chk);

            if (chk.checked) {
                const parentCard = chk.closest('label') || chk.closest('div');
                if (parentCard) {
                    const span = parentCard.querySelector('span');
                    const cleanName = span ? span.innerText.trim() : parentCard.innerText.trim();
                    selectedAddons.push(cleanName);
                }
            }
        });

        // 4. Atualiza o resumo visual sem exibição de valores em R$
        const summaryEvent = document.getElementById('calcSummaryEvent') || document.getElementById('summary-event');
        const summaryDuration = document.getElementById('calcSummaryDuration') || document.getElementById('summary-duration');
        const summaryAddons = document.getElementById('calcSummaryAddons') || document.getElementById('summary-addons');
        const btnWhatsapp = document.getElementById('calcSendWhatsapp') || document.getElementById('btn-whatsapp') || document.querySelector('.calc-summary-card a');

        if (summaryEvent) summaryEvent.textContent = eventData.name.trim();
        if (summaryDuration) summaryDuration.textContent = " " + durationData.name.trim();

        if (summaryAddons) {
            if (selectedAddons.length > 0) {
                summaryAddons.innerHTML = selectedAddons.map(item => `<li>+ ${item}</li>`).join('');
            } else {
                summaryAddons.innerHTML = '<li style="color:#aaa; font-style:italic;">Nenhum opcional selecionado</li>';
            }
        }

        // 5. Atualiza a mensagem do WhatsApp com as opções selecionadas
        if (btnWhatsapp) {
            const addonsText = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'Nenhum opcional selecionado';
            const message = encodeURIComponent(
                `Olá! Gostaria de solicitar um orçamento exclusivo pelo site:\n\n` +
                `• *Evento/Serviço:* ${eventData.name}\n` +
                `• *Duração da Cobertura:* ${durationData.name}\n` +
                `• *Opcionais:* ${addonsText}\n\n` +
                `Gostaria de verificar a disponibilidade na agenda e consultar os valores sob medida.`
            );
            btnWhatsapp.href = `https://wa.me/${config.whatsappNumber}?text=${message}`;
            btnWhatsapp.target = "_blank";
        }
    }

    // --- LISTENERS DE CLIQUE ---
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        if (btn.classList.contains('calc-pill-duration') || btn.hasAttribute('data-duration')) {
            e.preventDefault();
            const parentGroup = btn.closest('.calc-pills-row') || btn.parentElement;
            if (parentGroup) {
                parentGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            }
            btn.classList.add('active');
            updateCalculator();
        }

        if (btn.classList.contains('calc-pill-event') || btn.hasAttribute('data-event')) {
            e.preventDefault();
            const parentGroup = btn.closest('.calc-pills-row') || btn.parentElement;
            if (parentGroup) {
                parentGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            }
            btn.classList.add('active');
            updateCalculator();
        }
    });

    const calcSection = document.getElementById('calculator') || document;
    calcSection.addEventListener('change', function (e) {
        if (e.target && e.target.type === 'checkbox') {
            updateCalculator();
        }
    });

    updateCalculator();
});
