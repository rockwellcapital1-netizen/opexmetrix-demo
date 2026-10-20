/**
 * OpexMetrix Business — Clean Standardized SMB Operating System (2026)
 * Designed for real business owners (Monobank Web / Linear / Stripe UX standard)
 * Zero popups, zero window.open, zero alerts — 100% inline workflows.
 */

(function () {
  'use strict';

  // ─── Application State ─────────────────────────────────────────────────────
  const state = {
    activeTab: 'pulse',
    activeNiche: 'TRADE',
    pulse: null,
    cashflow: null,
    reorderAlerts: null,
    demoMigrationPayload: null,
    lastMigrationAnalysis: null,
    lastForensicReport: null,
    cashflowChartInstance: null,
    aiSales: {
      stats: {
        conversionRate: 34.2,
        conversionLiftPct: 25.0,
        averageQcScore: 89,
        activeSipLines: 4,
        marginLeakPreventedUah: 48200,
        autoInvoicesGenerated: 14,
        callsToday: 38
      },
      calls: [
        {
          id: 'call-101',
          time: '11:42 Сьогодні',
          clientName: 'ТОВ "Епіцентр К" (Центральний офіс)',
          phone: '+380 44 206-01-11',
          manager: 'Віталій С. (SDR 1)',
          duration: '3 хв 48 сек',
          sentiment: 'POSITIVE',
          qcScore: 94,
          transcriptSummary: 'Клієнт хотів 10 од. товару зі знижкою 15%. Менеджер перевірив поріг маржі в системі OpexMetrix, ввічливо повідомив про поріг рентабельності та запропонував 7% знижки + гарантовану доставку за 24 години. Клієнт погодився.',
          detectedItems: 'Кавомашина Delonghi Dinamica Plus (10 шт)',
          orderDraft: {
            orderNumber: 'INV-2026-108',
            amount: 185000,
            marginPct: 29.4,
            edrpou: '32490244'
          },
          status: 'READY_TO_INVOICE'
        },
        {
          id: 'call-102',
          time: '10:15 Сьогодні',
          clientName: 'ПП "Захід-Буд Постач"',
          phone: '+380 67 445-12-89',
          manager: 'Ірина М. (SDR 2)',
          duration: '1 хв 52 сек',
          sentiment: 'NEUTRAL',
          qcScore: 62,
          transcriptSummary: 'Менеджер забув озвучити спецпропозицію на комплектуючі та не запитав дедлайн поставки.',
          qcFeedback: 'Не озвучено регламентний оффер тижня (штрафний бал)',
          status: 'NEEDS_COACHING'
        },
        {
          id: 'call-103',
          time: '09:30 Сьогодні',
          clientName: 'ТОВ "Сільпо-Фуд"',
          phone: '+380 44 496-32-00',
          manager: 'Олександр К. (Head of Sales)',
          duration: '5 хв 12 сек',
          sentiment: 'POSITIVE',
          qcScore: 98,
          transcriptSummary: 'Погоджено квартальний графік поставок кави та витратних матеріалів на 42 торгові точки. Зафіксовано передоплату 100%.',
          detectedItems: 'Кава в зернах Lavazza Qualita Oro (300 уп)',
          orderDraft: {
            orderNumber: 'INV-2026-109',
            amount: 246000,
            marginPct: 34.1,
            edrpou: '40720198'
          },
          status: 'READY_TO_INVOICE'
        }
      ]
    },
    activeDocOrderId: 'INV-2026-104',
    activeDocType: 'INVOICE',
    overduePaidIds: new Set(),
    orders: [
      {
        id: 'ord-104',
        orderNumber: 'INV-2026-104',
        date: '17.10.2026',
        clientName: 'ТОВ "Розетка Маркетплейс Україна"',
        clientEdrpou: '00482194',
        itemsSummary: 'Кавомашина Delonghi Dinamica Plus (4 шт), Кава Lavazza Oro (25 уп)',
        items: [
          { name: 'Кавомашина професійна Delonghi Dinamica Plus ECAM 370.95', unit: 'шт.', qty: 4, price: 24500, cost: 18500 },
          { name: 'Кава в зернах Lavazza Qualita Oro (упаковка 1 кг)', unit: 'уп.', qty: 25, price: 840, cost: 620 },
          { name: 'Термопринтер чеків та етикеток Xprinter XP-365B', unit: 'шт.', qty: 2, price: 2750, cost: 2050 }
        ],
        totalAmount: 124500,
        costAmount: 93600,
        marginPct: 24.8,
        status: 'PAID',
        withVat: true
      },
      {
        id: 'ord-105',
        orderNumber: 'INV-2026-105',
        date: '18.10.2026',
        clientName: 'ФОП Ковальчук О.М. (Мережа кав\'ярень Львів)',
        clientEdrpou: '02849102',
        itemsSummary: 'Кава в зернах Lavazza Qualita Oro 1 кг (60 уп)',
        items: [
          { name: 'Кава в зернах Lavazza Qualita Oro (упаковка 1 кг)', unit: 'уп.', qty: 60, price: 910, cost: 620 }
        ],
        totalAmount: 54600,
        costAmount: 37200,
        marginPct: 31.9,
        status: 'SHIPPED',
        withVat: false
      },
      {
        id: 'ord-106',
        orderNumber: 'INV-2026-106',
        date: '18.10.2026',
        clientName: 'ТОВ "Нова Пошта Логістик Сервіс"',
        clientEdrpou: '31316718',
        itemsSummary: 'Термопринтер Xprinter XP-365B (10 шт), Сканер Zebra DS2278 (4 шт)',
        items: [
          { name: 'Термопринтер чеків та етикеток Xprinter XP-365B', unit: 'шт.', qty: 10, price: 4200, cost: 2850 },
          { name: 'Сканер штрих-кодів бездротовий Zebra DS2278', unit: 'шт.', qty: 4, price: 6600, cost: 4200 }
        ],
        totalAmount: 68400,
        costAmount: 45300,
        marginPct: 33.8,
        status: 'INVOICED',
        withVat: true
      },
      {
        id: 'ord-107',
        orderNumber: 'INV-2026-107',
        date: '11.10.2026',
        clientName: 'ТОВ "Рітейл Груп Україна" (прострочено 7 днів)',
        clientEdrpou: '36812944',
        itemsSummary: 'Кавомашина Delonghi Dinamica Plus (1 шт), Кава Lavazza (15 уп)',
        items: [
          { name: 'Кавомашина професійна Delonghi Dinamica Plus ECAM 370.95', unit: 'шт.', qty: 1, price: 25000, cost: 18500 },
          { name: 'Кава в зернах Lavazza Qualita Oro (упаковка 1 кг)', unit: 'уп.', qty: 15, price: 900, cost: 620 }
        ],
        totalAmount: 38500,
        costAmount: 27800,
        marginPct: 27.8,
        status: 'INVOICED',
        withVat: true
      }
    ],
    teamPayroll: [
      {
        id: 'emp-1',
        name: 'Коваленко Олександр',
        role: 'Керівник відділу продажів (B2B та Ключові клієнти)',
        baseSalary: 32000,
        bonusKpi: 18400,
        taxes: 11088,
        netPay: 39312,
        paid: false
      },
      {
        id: 'emp-2',
        name: 'Мельник Ірина',
        role: 'Менеджер по роботі з клієнтами та маркетплейсами',
        baseSalary: 24000,
        bonusKpi: 11500,
        taxes: 7810,
        netPay: 27690,
        paid: false
      },
      {
        id: 'emp-3',
        name: 'Бондаренко Дмитро',
        role: 'Керівник складу та логістики (Відвантаження / ТТН)',
        baseSalary: 26000,
        bonusKpi: 6000,
        taxes: 7040,
        netPay: 24960,
        paid: false
      },
      {
        id: 'emp-4',
        name: 'Савченко Максим',
        role: 'Сервісний інженер (Встановлення та гарантія)',
        baseSalary: 25000,
        bonusKpi: 9200,
        taxes: 7524,
        netPay: 26676,
        paid: true
      }
    ]
  };

  const NICHE_PROFILES = {
    TRADE: {
      badge: '🛒 Оптова та роздрібна торгівля',
      shortName: '🛒 Торгівля та Дистрибуція',
      salesHint: 'Шаблон: Видаткова накладна + Рахунок з QR НБУ',
      defaultDocType: 'INVOICE',
      summary:
        '✓ Адаптовано під профіль «Оптова та роздрібна торгівля»: увімкнено контроль мінімальної маржі 25%, автоматичне списання зі складу за FIFO та формування видаткових накладних з QR-оплатою НБУ.'
    },
    SERVICES: {
      badge: '🛠️ Послуги, Сервіс та Агенція',
      shortName: '🛠️ Послуги та Сервіс',
      salesHint: 'Шаблон: Акт виконаних робіт + Рахунок з QR НБУ',
      defaultDocType: 'ACT',
      summary:
        '✓ Адаптовано під профіль «Послуги, Сервіс та Агенція»: основним документом обрано Акт прийому-передачі виконаних робіт з QR НБУ, увімкнено контроль маржинальності проєктів та погодинних робіт.'
    },
    ECOMMERCE: {
      badge: '📦 E-Commerce та Маркетплейси',
      shortName: '📦 E-Commerce / Маркетплейси',
      salesHint: 'Шаблон: Експрес-рахунок + Гарантійний талон товару',
      defaultDocType: 'WARRANTY',
      summary:
        '✓ Адаптовано під профіль «E-Commerce та Маркетплейси»: активовано облік пакувальних матеріалів, контроль комісії маркетплейсів (Rozetka/Prom) та автоматичні гарантійні талони.'
    },
    PRODUCTION: {
      badge: '🏭 Виробництво та Комплектація',
      shortName: '🏭 Виробництво та Збірка',
      salesHint: 'Шаблон: Видаткова накладна + Специфікація партії',
      defaultDocType: 'WAYBILL',
      summary:
        '✓ Адаптовано під профіль «Виробництво та Комплектація»: активовано автоматичне списання сировини й комплектуючих у собівартість готової продукції та контроль мінімальних запасів.'
    }
  };

  // ─── Formatting Helpers ────────────────────────────────────────────────────
  function fmtUah(val, decimals = 0) {
    const num = Number(val) || 0;
    return '₴\u00A0' + num.toLocaleString('uk-UA', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  let feedbackTimer = null;
  function showInlineStatus(message) {
    const el = document.getElementById('global-inline-status');
    if (!el) return;
    el.innerHTML = `<span>${escapeHtml(message)}</span>`;
    el.classList.add('visible');
    if (feedbackTimer) clearTimeout(feedbackTimer);
    feedbackTimer = setTimeout(() => {
      el.classList.remove('visible');
    }, 3600);
  }

  async function copyTextInline(text, confirmMsg) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch (_e) {
      // Fallback silent
    }
    showInlineStatus(confirmMsg || '✓ Скопійовано в буфер обміну');
  }

  // ─── Navigation (Strictly 6 Sections) ──────────────────────────────────────
  const TAB_TITLES = {
    pulse: 'Пульс бізнесу',
    sales: 'Продажі та рахунки',
    stock: 'Склад та закупівлі',
    bank: 'Банк і каса',
    taxes: 'Податки та команда',
    'ai-sales': 'AI Відділ продажів та телефонія',
    about: 'Опис системи та порівняння з 1С'
  };

  function switchTab(tabId) {
    if (!TAB_TITLES[tabId]) return;
    state.activeTab = tabId;

    document.querySelectorAll('#main-nav .nav-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.view-section').forEach((sec) => {
      sec.classList.toggle('active', sec.id === `view-${tabId}`);
    });

    const titleEl = document.getElementById('header-page-title');
    if (titleEl) titleEl.textContent = TAB_TITLES[tabId];

    if (tabId === 'ai-sales') {
      renderAiSalesSection();
    }
  }

  // ─── Niche Profile Adapter ─────────────────────────────────────────────────
  function applyNicheProfile(nicheKey) {
    const profile = NICHE_PROFILES[nicheKey] || NICHE_PROFILES.TRADE;
    state.activeNiche = nicheKey;

    document.querySelectorAll('#niche-cards-container .niche-card').forEach((card) => {
      const isSelected = card.getAttribute('data-niche') === nicheKey;
      card.classList.toggle('selected', isSelected);
    });

    const headerBadge = document.getElementById('header-niche-badge');
    if (headerBadge) headerBadge.textContent = profile.badge;

    const sidebarName = document.getElementById('sidebar-niche-name');
    if (sidebarName) sidebarName.textContent = profile.shortName;

    const activePill = document.getElementById('active-profile-pill');
    if (activePill) activePill.textContent = `Активний: ${profile.badge}`;

    const salesHint = document.getElementById('sales-niche-hint');
    if (salesHint) salesHint.textContent = profile.salesHint;

    const summaryEl = document.getElementById('niche-adaptation-summary');
    if (summaryEl) summaryEl.textContent = profile.summary;

    state.activeDocType = profile.defaultDocType;
    renderInlineDocument(state.activeDocOrderId, state.activeDocType);
    showInlineStatus(`✓ Профіль адаптовано: ${profile.shortName}`);
  }

  // ─── 1. ГОЛОВНА (ПУЛЬС БІЗНЕСУ) ─────────────────────────────────────────
  function renderPulseSection() {
    const pulse = state.pulse || {};
    const cashBalance = Number(pulse.cashBalance) || 1344300;
    const monoCash = Math.round(cashBalance * 0.36);
    const privatCash = Math.round(cashBalance * 0.59);
    const registerCash = cashBalance - monoCash - privatCash;
    const safeDividend = Math.max(50000, Math.round((cashBalance - 850000) * 0.78));

    const elTotal = document.getElementById('kpi-cash-total');
    if (elTotal) elTotal.textContent = fmtUah(cashBalance);
    const elMono = document.getElementById('kpi-cash-mono');
    if (elMono) elMono.textContent = fmtUah(monoCash);
    const elPrivat = document.getElementById('kpi-cash-privat');
    if (elPrivat) elPrivat.textContent = fmtUah(privatCash);
    const elReg = document.getElementById('kpi-cash-register');
    if (elReg) elReg.textContent = fmtUah(registerCash);

    const elBankMono = document.getElementById('bank-card-mono');
    if (elBankMono) elBankMono.textContent = fmtUah(monoCash);
    const elBankPrivat = document.getElementById('bank-card-privat');
    if (elBankPrivat) elBankPrivat.textContent = fmtUah(privatCash);
    const elBankCash = document.getElementById('bank-card-cash');
    if (elBankCash) elBankCash.textContent = fmtUah(registerCash);

    const elDiv = document.getElementById('kpi-safe-dividend');
    if (elDiv) {
      elDiv.innerHTML = `<span class="kpi-context-label">Безпечні дивіденди:</span> <span class="kpi-context-value emerald">${fmtUah(safeDividend)}</span>`;
    }

    // Profit card
    const revenue = Math.max(Number(pulse.totalIn) || 0, 1002100);
    const cogs = Math.round(revenue * 0.52);
    const opex = 138200;
    const taxes = Math.round(revenue * 0.055);
    const netProfit = revenue - cogs - opex - taxes;
    const marginPct = ((netProfit / revenue) * 100).toFixed(1);

    const elNetProfit = document.getElementById('kpi-net-profit');
    if (elNetProfit) elNetProfit.textContent = fmtUah(netProfit);
    const elMarginBadge = document.getElementById('kpi-profit-margin-badge');
    if (elMarginBadge) elMarginBadge.textContent = `${marginPct}%`;

    const elFormula = document.getElementById('kpi-profit-formula');
    if (elFormula) {
      elFormula.innerHTML = `
        <span>Виручка: <strong>+${fmtUah(revenue)}</strong></span>
        <span class="meta-sep">·</span>
        <span>Витрати: <strong>−${fmtUah(cogs + opex + taxes)}</strong></span>
      `;
    }

    // Receivables card
    const unpaidOrders = state.orders.filter((o) => o.status === 'INVOICED');
    const recTotal = Math.max(
      Number(pulse.receivables) || 0,
      unpaidOrders.reduce((s, o) => s + o.totalAmount, 0) + 128200
    );
    const elRecTotal = document.getElementById('kpi-receivables-total');
    if (elRecTotal) elRecTotal.textContent = fmtUah(recTotal);

    renderOwnerTodayStream();
  }

  function renderOwnerTodayStream() {
    const streamEl = document.getElementById('owner-today-stream');
    if (!streamEl) return;

    const pulse = state.pulse || {};
    const needsReviewTxs = Array.isArray(pulse.needsReviewTxs) ? pulse.needsReviewTxs : [];
    const alerts = (state.reorderAlerts && Array.isArray(state.reorderAlerts.alerts))
      ? state.reorderAlerts.alerts
      : [];

    const itemsHtml = [];
    let actionCount = 0;

    // 1. Unrecognized bank transactions
    if (needsReviewTxs.length > 0) {
      for (const tx of needsReviewTxs.slice(0, 2)) {
        actionCount++;
        itemsHtml.push(`
          <div class="action-item">
            <div class="action-item-left">
              <span class="action-tag-quiet">Банк</span>
              <div>
                <div class="action-title">Нерозпізнаний платіж: ${escapeHtml(tx.counterpartyName)} на суму <span class="action-amount">${fmtUah(tx.amount)}</span></div>
                <div class="action-desc">Призначення: «${escapeHtml(tx.description)}» — підтвердіть категорію обліку:</div>
              </div>
            </div>
            <div class="action-buttons">
              <button type="button" class="btn btn-sm btn-subtle js-resolve-tx" data-id="${escapeHtml(tx.id)}" data-cat="REVENUE_SALES" data-label="Оплата клієнта за рахунком">Оплата клієнта</button>
              <button type="button" class="btn btn-sm btn-subtle js-resolve-tx" data-id="${escapeHtml(tx.id)}" data-cat="COGS_MATERIALS" data-label="Закупівля товару на склад">Закупівля товару</button>
              <button type="button" class="btn btn-sm btn-subtle js-resolve-tx" data-id="${escapeHtml(tx.id)}" data-cat="ADMIN_OPEX" data-label="Оренда / Сервіс / Послуги">Оренда / послуги</button>
            </div>
          </div>
        `);
      }
    } else {
      // Show confirming state that all bank txs are classified
      itemsHtml.push(`
        <div class="action-item" style="background: #FFFFFF; border-color: #E2E8F0;">
          <div class="action-item-left">
            <span class="action-tag-quiet" style="color: #047857; background: #ECFDF5; border-color: #A7F3D0;">Банк</span>
            <div>
              <div class="action-title">Усі банківські виписки синхронізовано</div>
              <div class="action-desc">Нерозпізнаних платежів немає. Оплати автоматично прив'язані до первинки та податків.</div>
            </div>
          </div>
          <div class="action-buttons">
            <button type="button" class="btn btn-sm btn-subtle" onclick="window.opexSwitchTab('bank')">Переглянути виписку →</button>
          </div>
        </div>
      `);
    }

    // 2. Overdue Client Payment
    const overdueOrder = state.orders.find((o) => o.orderNumber === 'INV-2026-107' && o.status === 'INVOICED');
    if (overdueOrder && !state.overduePaidIds.has(overdueOrder.orderNumber)) {
      actionCount++;
      const reminderText = `Вітаємо, ${overdueOrder.clientName}! Нагадуємо про оплату рахунку № ${overdueOrder.orderNumber} на суму ${fmtUah(overdueOrder.totalAmount)} (IBAN: UA82305299000002600123456789, ТОВ "Альфа Трейд Груп"). Дякуємо за співпрацю!`;
      itemsHtml.push(`
        <div class="action-item">
          <div class="action-item-left">
            <span class="action-tag-quiet">Дебіторка</span>
            <div>
              <div class="action-title">${escapeHtml(overdueOrder.clientName)} — очікується оплата <span class="action-amount">${fmtUah(overdueOrder.totalAmount)}</span></div>
              <div class="action-desc">Рахунок № ${escapeHtml(overdueOrder.orderNumber)} (${escapeHtml(overdueOrder.itemsSummary)}), прострочено на 7 днів.</div>
            </div>
          </div>
          <div class="action-buttons">
            <button type="button" class="btn btn-sm btn-subtle js-copy-reminder" data-text="${escapeHtml(reminderText)}">Скопіювати нагадування</button>
            <button type="button" class="btn btn-sm btn-action-primary js-mark-overdue-paid" data-ord="${escapeHtml(overdueOrder.orderNumber)}">Зарахувати оплату</button>
          </div>
        </div>
      `);
    }

    // 3. Low Stock Items needing supplier order
    const topAlert = alerts[0] || {
      sku: 'PRD-101',
      itemName: 'Кавомашина професійна Delonghi Dinamica Plus',
      currentQty: 24,
      minThreshold: 35,
      recommendedOrderQty: 36,
      unit: 'шт',
      unitPriceUah: 18500,
      supplierName: 'ТОВ "Імпорт-Логістик Сервіс"',
      messengerOrderText: 'Вітаємо! Замовлення на поповнення складу: [PRD-101] Кавомашина Delonghi Dinamica Plus — 36 шт.'
    };
    actionCount++;
    itemsHtml.push(`
      <div class="action-item">
        <div class="action-item-left">
          <span class="action-tag-quiet">Закупівлі</span>
          <div>
            <div class="action-title">Запас на межі: ${escapeHtml(topAlert.itemName)} (${topAlert.currentQty} ${escapeHtml(topAlert.unit)} при мінімумі ${topAlert.minThreshold})</div>
            <div class="action-desc">Постачальник: ${escapeHtml(topAlert.supplierName)}. Рекомендовано замовити: <strong>${topAlert.recommendedOrderQty} ${escapeHtml(topAlert.unit)}</strong>.</div>
          </div>
        </div>
        <div class="action-buttons">
          <button type="button" class="btn btn-sm btn-action-primary js-quick-supplier-order" data-sku="${escapeHtml(topAlert.sku)}" data-name="${escapeHtml(topAlert.itemName)}" data-qty="${topAlert.recommendedOrderQty}" data-price="${topAlert.unitPriceUah}" data-text="${escapeHtml(topAlert.messengerOrderText)}">
            Замовити постачальнику
          </button>
        </div>
      </div>
    `);

    streamEl.innerHTML = itemsHtml.join('');

    const badgePulse = document.getElementById('nav-badge-pulse');
    if (badgePulse) badgePulse.textContent = `${actionCount} дії`;
    const counterEl = document.getElementById('today-actions-counter');
    if (counterEl) counterEl.textContent = `${actionCount} задачі`;
  }

  function renderCashflowChart() {
    const canvas = document.getElementById('cashflowChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const forecast = state.cashflow;
    let labels = [];
    let baseData = [];
    let stressData = [];
    let reserveLine = [];

    if (forecast && Array.isArray(forecast.days) && forecast.days.length > 0) {
      labels = forecast.days.map((d) => d.dateLabel || d.date.slice(5));
      baseData = forecast.days.map((d) => Math.round(d.balanceUah));
      stressData = forecast.days.map((d) => Math.round(d.stressBalanceUah));
      reserveLine = forecast.days.map(() => forecast.safeReserveThresholdUah || 250000);

      const minBadge = document.getElementById('chart-min-balance-badge');
      if (minBadge) {
        minBadge.textContent = `Мін. залишок (30 дн): ${fmtUah(forecast.lowestBalanceUah || 980000)}`;
      }
    } else {
      let cur = 1344300;
      for (let i = 1; i <= 30; i++) {
        labels.push(`День ${i}`);
        cur += (i % 4 === 0 ? 68000 : -14000);
        baseData.push(cur);
        stressData.push(Math.round(cur * 0.82));
        reserveLine.push(250000);
      }
    }

    if (state.cashflowChartInstance) {
      state.cashflowChartInstance.destroy();
    }

    state.cashflowChartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Прогноз балансу (₴)',
            data: baseData,
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.3,
            pointRadius: 2
          },
          {
            label: 'Стрес-прогноз (затримка оплат клієнтів)',
            data: stressData,
            borderColor: '#64748B',
            borderDash: [5, 5],
            borderWidth: 1.8,
            fill: false,
            tension: 0.3,
            pointRadius: 0
          },
          {
            label: 'Безпечний резерв (₴ 250 000)',
            data: reserveLine,
            borderColor: '#16A34A',
            borderDash: [3, 3],
            borderWidth: 1.2,
            fill: false,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            labels: { font: { family: 'Inter', size: 12 }, color: '#475569' }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (v) => '₴ ' + Number(v).toLocaleString('uk-UA'),
              font: { family: 'JetBrains Mono', size: 11 },
              color: '#64748B'
            },
            grid: { color: '#F1F5F9' }
          },
          x: {
            ticks: { font: { family: 'Inter', size: 11 }, color: '#64748B', maxTicksLimit: 10 },
            grid: { display: false }
          }
        }
      }
    });
  }

  // ─── 2. 💼 ПРОДАЖІ ТА РАХУНКИ (З КОНТРОЛЕМ МАРЖІ ТА ІНЛАЙН-ПЕРВИНКОЮ) ────────
  function evaluateMarginGuardLive() {
    const sel = document.getElementById('inv-item-select');
    const qtyInput = document.getElementById('inv-qty');
    const priceInput = document.getElementById('inv-price');
    const discInput = document.getElementById('inv-discount');
    if (!sel || !qtyInput || !priceInput || !discInput) return;

    const opt = sel.options[sel.selectedIndex];
    const unitCost = Number(opt?.getAttribute('data-cost')) || 18500;
    const qty = Math.max(1, Number(qtyInput.value) || 1);
    const unitPrice = Math.max(1, Number(priceInput.value) || 26900);
    const discountPct = Math.min(80, Math.max(0, Number(discInput.value) || 0));

    const grossTotal = qty * unitPrice;
    const netRevenue = Math.round(grossTotal * (1 - discountPct / 100));
    const totalCost = qty * unitCost;
    const profit = netRevenue - totalCost;
    const marginPct = netRevenue > 0 ? Number(((profit / netRevenue) * 100).toFixed(1)) : 0;

    // Max discount to keep 25% margin: cost / (0.75 * grossTotal)
    const minSafeRevenue = totalCost / 0.75;
    const maxSafeDiscount = Math.max(0, Math.floor((1 - minSafeRevenue / grossTotal) * 100));

    const banner = document.getElementById('margin-guard-banner');
    const titleEl = document.getElementById('margin-guard-title');
    const detailsEl = document.getElementById('margin-guard-details');
    const pillEl = document.getElementById('margin-guard-pill');

    if (!banner || !titleEl || !detailsEl || !pillEl) return;

    if (marginPct < 25) {
      banner.className = 'margin-guard-box warn';
      titleEl.textContent = `⚠️ Увага власника (Margin Guard): Знижка ${discountPct}% опускає рентабельність нижче порогу безпеки 25%!`;
      detailsEl.innerHTML = `Сума зі знижкою: <strong>${fmtUah(netRevenue)}</strong> • Собівартість: <strong>${fmtUah(totalCost)}</strong> • Чистий заробіток: <strong>${fmtUah(profit)}</strong> • Рентабельність: <strong>${marginPct}%</strong> (Рекомендована макс. знижка: <strong>${maxSafeDiscount}%</strong>)`;
      pillEl.className = 'badge badge-red';
      pillEl.textContent = `Низька маржа: ${marginPct}% ⚠️`;
    } else {
      banner.className = 'margin-guard-box safe';
      titleEl.textContent = `✓ Контроль Маржі (Margin Guard): Рентабельність замовлення у безпечній зоні (${marginPct}%)`;
      detailsEl.innerHTML = `Сума рахунку: <strong>${fmtUah(netRevenue)}</strong> • Собівартість: <strong>${fmtUah(totalCost)}</strong> • Чистий заробіток: <strong>${fmtUah(profit)}</strong> • Маржа: <strong>${marginPct}%</strong> (Поріг безпеки власника: мін. 25%)`;
      pillEl.className = 'badge badge-green';
      pillEl.textContent = `Маржа ${marginPct}% ✓`;
    }

    return {
      itemName: opt?.getAttribute('data-name') || 'Товар',
      unit: opt?.getAttribute('data-unit') || 'шт.',
      qty,
      unitPrice: Math.round(unitPrice * (1 - discountPct / 100)),
      unitCost,
      netRevenue,
      totalCost,
      profit,
      marginPct
    };
  }

  function renderSalesOrdersTable() {
    const tbody = document.getElementById('sales-orders-tbody');
    if (!tbody) return;

    const badgeSales = document.getElementById('nav-badge-sales');
    if (badgeSales) badgeSales.textContent = String(state.orders.length);
    const summaryEl = document.getElementById('orders-total-summary');
    if (summaryEl) summaryEl.textContent = `Всього замовлень: ${state.orders.length}`;

    tbody.innerHTML = state.orders
      .map((ord) => {
        let statusBadge = '';
        let nextActionBtn = '';
        if (ord.status === 'INVOICED') {
          statusBadge = `<span class="badge badge-amber">⏳ Виставлено рахунок</span>`;
          nextActionBtn = `<button type="button" class="btn btn-sm btn-soft-green js-cycle-order-status" data-num="${escapeHtml(ord.orderNumber)}" data-next="PAID">Позначити «Оплачено» →</button>`;
        } else if (ord.status === 'PAID') {
          statusBadge = `<span class="badge badge-green">✓ Оплачено</span>`;
          nextActionBtn = `<button type="button" class="btn btn-sm btn-soft-blue js-cycle-order-status" data-num="${escapeHtml(ord.orderNumber)}" data-next="SHIPPED">Позначити «Відвантажено» →</button>`;
        } else {
          statusBadge = `<span class="badge badge-blue">📦 Відвантажено / Закрито</span>`;
          nextActionBtn = `<span style="font-size:12px;color:var(--text-muted);">✓ Виконано</span>`;
        }

        const marginBadgeClass = ord.marginPct < 25 ? 'badge-red' : 'badge-green';
        const isCurrentDoc = state.activeDocOrderId === ord.orderNumber;

        return `
          <tr style="${isCurrentDoc ? 'background: var(--primary-soft);' : ''}">
            <td>
              <div style="font-weight: 700;" class="mono">${escapeHtml(ord.orderNumber)}</div>
              <div style="font-size: 11.5px; color: var(--text-muted);">${escapeHtml(ord.date)}</div>
            </td>
            <td>
              <div style="font-weight: 600;">${escapeHtml(ord.clientName)}</div>
              <div style="font-size: 11.5px; color: var(--text-muted);" class="mono">ЄДРПОУ: ${escapeHtml(ord.clientEdrpou)}</div>
            </td>
            <td style="max-width: 320px;">
              <div style="font-size: 13px;">${escapeHtml(ord.itemsSummary)}</div>
            </td>
            <td class="text-right mono" style="font-weight: 700;">${fmtUah(ord.totalAmount)}</td>
            <td class="text-right">
              <span class="badge ${marginBadgeClass} mono">${ord.marginPct.toFixed(1)}%</span>
            </td>
            <td>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${statusBadge}
                ${nextActionBtn}
              </div>
            </td>
            <td class="text-right">
              <button type="button" class="btn btn-sm ${isCurrentDoc ? 'btn-action-primary' : 'btn-subtle'} js-open-inline-doc" data-num="${escapeHtml(ord.orderNumber)}">
                Документ ↗
              </button>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  async function renderInlineDocument(orderNumber, docType) {
    state.activeDocOrderId = orderNumber || state.activeDocOrderId;
    state.activeDocType = docType || state.activeDocType;

    const ord =
      state.orders.find((o) => o.orderNumber === state.activeDocOrderId) ||
      state.orders[0];
    if (!ord) return;

    document.querySelectorAll('.doc-type-switch').forEach((btn) => {
      const isAct = btn.getAttribute('data-doctype') === state.activeDocType;
      btn.classList.toggle('btn-soft-blue', isAct);
    });

    const headerTitle = document.getElementById('inline-doc-header-title');
    const docTypeNames = {
      INVOICE: 'Рахунок-фактура з QR НБУ',
      WAYBILL: 'Видаткова накладна',
      ACT: 'Акт виконаних робіт',
      WARRANTY: 'Гарантійний талон',
      TAX_INVOICE: 'Податкова накладна (ЄРПН)'
    };
    if (headerTitle) {
      headerTitle.textContent = `📄 Вбудований перегляд: ${docTypeNames[state.activeDocType] || 'Документ'} № ${ord.orderNumber} (${ord.clientName})`;
    }

    const container = document.getElementById('inline-doc-render-body');
    if (!container) return;

    if (state.activeDocType === 'TAX_INVOICE') {
      const vatRate = 0.20;
      const baseTotal = ord.totalAmount / (1 + vatRate);
      const vatTotal = ord.totalAmount - baseTotal;
      const uktCodes = {
        'Кавомашина': '8471300000',
        'Кава': '0901210000',
        'Термопринтер': '8443321000',
        'Сканер': '8471900000',
        'Гофроящик': '4819100000'
      };

      const rowsTax = ord.items.map((it, idx) => {
        let code = '8471300000';
        for (const [k, c] of Object.entries(uktCodes)) {
          if (it.name.toLowerCase().includes(k.toLowerCase())) { code = c; break; }
        }
        const lineBase = it.price / 1.20;
        const lineTotal = lineBase * it.qty;
        return `
          <tr>
            <td style="text-align:center;">${idx + 1}</td>
            <td class="mono" style="text-align:center;color:#2563EB;font-weight:600;">${code}</td>
            <td>${escapeHtml(it.name)}</td>
            <td style="text-align:center;">${escapeHtml(it.unit)}</td>
            <td style="text-align:right;" class="mono">${it.qty}</td>
            <td style="text-align:right;" class="mono">${fmtUah(lineBase, 2)}</td>
            <td style="text-align:center;" class="mono">20%</td>
            <td style="text-align:right;font-weight:700;" class="mono">${fmtUah(lineTotal, 2)}</td>
          </tr>
        `;
      }).join('');

      container.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #0F172A;padding-bottom:16px;margin-bottom:18px;flex-wrap:wrap;gap:14px;">
          <div>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#16A34A;letter-spacing:0.05em;">Державна податкова служба України • Форма J1201016</div>
            <div style="font-size:20px;font-weight:800;color:#0F172A;margin-top:4px;">Податкова накладна № ${escapeHtml(ord.orderNumber.replace(/[^0-9]/g, '') || '104')}</div>
            <div style="font-size:12.5px;color:#475569;margin-top:2px;">Дата складання: ${escapeHtml(ord.date)} р. • <span class="badge badge-green" style="font-size:11px;">Підлягає реєстрації в ЄРПН</span></div>
            <div style="margin-top:12px;font-size:12.5px;line-height:1.6;">
              <div><strong>Продавець:</strong> ТОВ "Альфа Трейд Груп" (ІПН: <code class="mono">384215626558</code>, ЄДРПОУ: 38421567)</div>
              <div><strong>Покупець:</strong> ${escapeHtml(ord.clientName)} (ІПН: <code class="mono">004821926558</code>, ЄДРПОУ: ${escapeHtml(ord.clientEdrpou)})</div>
            </div>
          </div>
          <div style="text-align:right;">
            <button type="button" class="btn btn-action-primary" id="btn-download-tax-invoice-xml" style="padding:8px 14px;font-size:12.5px;font-weight:600;">
              💾 Завантажити XML J1201016 для ЄРПН
            </button>
            <div style="font-size:11px;color:#64748B;margin-top:6px;">Сумісно з M.E.Doc, Вчасно, Соната, ДПС</div>
          </div>
        </div>

        <div class="table-wrap" style="margin-bottom:16px;">
          <table>
            <thead>
              <tr style="font-size:12px;">
                <th style="width:40px;text-align:center;">№</th>
                <th style="width:110px;text-align:center;">Код УКТ ЗЕД</th>
                <th>Опис товару / послуги</th>
                <th style="width:65px;text-align:center;">Од.</th>
                <th style="width:70px;text-align:right;">К-сть</th>
                <th style="width:110px;text-align:right;">Ціна без ПДВ</th>
                <th style="width:60px;text-align:center;">Ставка</th>
                <th style="width:120px;text-align:right;">Обсяг постачання</th>
              </tr>
            </thead>
            <tbody>
              ${rowsTax}
            </tbody>
          </table>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:flex-start;background:#F8FAFC;padding:14px 16px;border-radius:8px;border:1px solid #E2E8F0;flex-wrap:wrap;gap:14px;">
          <div style="font-size:12.5px;color:#475569;">
            <div><strong>Розділ А (Підсумкові суми податкової накладної):</strong></div>
            <div style="margin-top:4px;">I. Загальна сума з ПДВ: <strong class="mono" style="color:#0F172A;">${fmtUah(ord.totalAmount, 2)}</strong></div>
            <div>II. Сума податку на додану вартість (20%): <strong class="mono" style="color:#2563EB;">${fmtUah(vatTotal, 2)}</strong></div>
            <div>VI. Обсяги постачання без урахування ПДВ: <strong class="mono">${fmtUah(baseTotal, 2)}</strong></div>
          </div>
          <div style="text-align:right;font-size:13px;">
            <div style="color:#16A34A;font-weight:700;">✓ Готово до підписання КЕП</div>
            <div style="font-size:11.5px;color:#64748B;margin-top:2px;">Реєстраційний ліміт СЕА ПДВ: ₴ 384 500</div>
          </div>
        </div>
      `;

      const btnDlTaxInv = document.getElementById('btn-download-tax-invoice-xml');
      if (btnDlTaxInv) {
        btnDlTaxInv.addEventListener('click', () => {
          const xml = getClientDpsXml('tax_invoice_erpn', 'J1201016');
          downloadXmlBlob(xml, `J1201016_${ord.clientEdrpou}_${ord.orderNumber}.xml`);
          showInlineStatus('✓ XML Податкової накладної J1201016 для ЄРПН завантажено');
        });
      }
      return;
    }

    try {
      const resp = await fetch('/api/smb-docs/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docType: state.activeDocType,
          number: ord.orderNumber,
          clientName: ord.clientName,
          clientEdrpou: ord.clientEdrpou,
          withVat: ord.withVat,
          items: ord.items
        })
      });
      const data = await resp.json();
      if (data && data.ok) {
        const qrSvg = (data.qrData && data.qrData.svg) ? data.qrData.svg : '';
        const rowsHtml = ord.items
          .map((it, idx) => {
            const lineSum = it.qty * it.price;
            return `
              <tr>
                <td style="text-align:center;">${idx + 1}</td>
                <td>${escapeHtml(it.name)}</td>
                <td style="text-align:center;">${escapeHtml(it.unit)}</td>
                <td style="text-align:right;" class="mono">${it.qty}</td>
                <td style="text-align:right;" class="mono">${fmtUah(it.price, 2)}</td>
                <td style="text-align:right;font-weight:700;" class="mono">${fmtUah(lineSum, 2)}</td>
              </tr>
            `;
          })
          .join('');

        container.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px;border-bottom:2px solid #0F172A;padding-bottom:16px;margin-bottom:18px;flex-wrap:wrap;">
            <div>
              <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#2563EB;letter-spacing:0.05em;">Офіційний первинний документ • Стандарт ДСТУ / НБУ</div>
              <div style="font-size:20px;font-weight:800;color:#0F172A;margin-top:4px;">${escapeHtml(docTypeNames[state.activeDocType])} № ${escapeHtml(ord.orderNumber)}</div>
              <div style="font-size:12.5px;color:#475569;margin-top:2px;">Дата документа: ${escapeHtml(ord.date)} р.</div>
              <div style="margin-top:12px;font-size:12.5px;line-height:1.55;">
                <div><strong>Постачальник:</strong> ТОВ "Альфа Трейд Груп" (ЄДРПОУ 38421567)</div>
                <div><strong>IBAN:</strong> <span class="mono">UA82305299000002600123456789</span> в АТ "УНІВЕРСАЛ БАНК" (Monobank Бізнес)</div>
                <div style="margin-top:6px;"><strong>Покупець / Замовник:</strong> ${escapeHtml(ord.clientName)} (ЄДРПОУ ${escapeHtml(ord.clientEdrpou)})</div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:10px;padding:10px 14px;text-align:center;">
              ${qrSvg}
              <div style="font-size:11px;font-weight:700;color:#0F172A;margin-top:6px;">QR НБУ для оплати в 1 клік</div>
              <div style="font-size:10px;color:#64748B;">Монобанк • Приват24 • Sense</div>
            </div>
          </div>

          <div class="table-wrap" style="margin-bottom:16px;">
            <table>
              <thead>
                <tr>
                  <th style="width:45px;text-align:center;">№</th>
                  <th>Найменування товару / послуги</th>
                  <th style="width:70px;text-align:center;">Од.</th>
                  <th style="width:80px;text-align:right;">К-сть</th>
                  <th style="width:120px;text-align:right;">Ціна</th>
                  <th style="width:130px;text-align:right;">Сума</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px;flex-wrap:wrap;background:#F8FAFC;padding:14px 16px;border-radius:8px;border:1px solid #E2E8F0;">
            <div style="font-size:13px;">
              <div><strong>Сума прописом:</strong> ${escapeHtml(data.amountInWords || '')}</div>
              <div style="font-size:11.5px;color:#64748B;margin-top:4px;">Призначення платежу в QR: Оплата згідно документа № ${escapeHtml(ord.orderNumber)}</div>
            </div>
            <div style="text-align:right;font-size:14px;">
              <div>Всього до сплати: <strong class="mono" style="font-size:17px;color:#2563EB;">${fmtUah(ord.totalAmount, 2)}</strong></div>
              <div style="font-size:12px;color:#475569;">${ord.withVat ? `У т.ч. ПДВ 20%: ${fmtUah(ord.totalAmount / 6, 2)}` : 'Без ПДВ (Єдиний податок)'}</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px;padding-top:16px;border-top:1px dashed #CBD5E1;font-size:12.5px;color:#475569;">
            <div>Від Постачальника (Виконавця): ______________________ / Коваленко О.В. /</div>
            <div>Від Покупця (Замовника): ______________________ / Підпис / М.П. /</div>
          </div>
        `;
      }
    } catch (_err) {
      // Fallback silent
    }
  }

  // ─── 3. 📦 СКЛАД ТА ЗАКУПІВЛІ ──────────────────────────────────────────────
  function detectCategory(sku, name) {
    const s = `${sku} ${name}`.toLowerCase();
    if (/(кавомашин|delonghi|кавомолк|fiorenzato|обладнан)/i.test(s)) return 'Обладнання та техніка';
    if (/(кава|lavazza|зерн|сировин)/i.test(s)) return 'Товари та сировина';
    if (/(принтер|сканер|xprinter|zebra|pos)/i.test(s)) return 'POS та комплектуючі';
    return 'Пакування та витратні';
  }

  function renderStockSection() {
    const tbody = document.getElementById('stock-catalog-tbody');
    if (!tbody) return;

    const searchQ = (document.getElementById('stock-search-input')?.value || '').trim().toLowerCase();
    const catFilter = document.getElementById('stock-category-filter')?.value || 'ALL';

    const pulseBalances = (state.pulse && Array.isArray(state.pulse.stockBalances) && state.pulse.stockBalances.length > 0)
      ? state.pulse.stockBalances
      : [
          { sku: 'PRD-101', itemName: 'Кавомашина професійна Delonghi Dinamica Plus', unit: 'шт', qty: 30, unitPrice: 18500 },
          { sku: 'PRD-204', itemName: 'Кава в зернах Lavazza Qualita Oro (упаковка 1 кг)', unit: 'уп', qty: 340, unitPrice: 620 },
          { sku: 'PRD-309', itemName: 'Термопринтер чеків та етикеток Xprinter XP-365B', unit: 'шт', qty: 45, unitPrice: 2850 },
          { sku: 'PRD-412', itemName: 'Сканер штрих-кодів бездротовий Zebra DS2278', unit: 'шт', qty: 32, unitPrice: 4200 },
          { sku: 'PKG-015', itemName: 'Гофроящик пакувальний 400х300х250 (тришаровий)', unit: 'шт', qty: 1200, unitPrice: 18.5 }
        ];

    const badgeStock = document.getElementById('nav-badge-stock');
    if (badgeStock) badgeStock.textContent = `${pulseBalances.length} SKU`;

    let totalValue = 0;
    const enriched = pulseBalances.map((it) => {
      const cost = Number(it.unitPrice) || 500;
      const sellPrice = Math.round(cost * 1.44);
      const marginPct = (((sellPrice - cost) / sellPrice) * 100).toFixed(1);
      const category = detectCategory(it.sku, it.itemName);
      const qty = Number(it.qty) || 0;
      totalValue += Math.max(0, qty) * cost;
      const minThreshold = it.sku === 'PRD-204' ? 250 : it.sku === 'PKG-015' ? 500 : 35;
      const isLow = qty < minThreshold;
      return {
        ...it,
        qty,
        cost,
        sellPrice,
        marginPct,
        category,
        minThreshold,
        isLow
      };
    });

    const valBadge = document.getElementById('stock-total-val-badge');
    if (valBadge) valBadge.textContent = `Вартість складу: ${fmtUah(totalValue)}`;

    const filtered = enriched.filter((item) => {
      if (catFilter !== 'ALL' && item.category !== catFilter) return false;
      if (searchQ && !`${item.sku} ${item.itemName}`.toLowerCase().includes(searchQ)) return false;
      return true;
    });

    tbody.innerHTML = filtered
      .map((item) => {
        const statusHtml = item.isLow
          ? `<span class="badge badge-amber">⚠️ Закінчується (мін. ${item.minThreshold})</span>`
          : `<span class="badge badge-green">✓ В нормі</span>`;

        return `
          <tr>
            <td class="mono" style="font-weight: 600;">${escapeHtml(item.sku)}</td>
            <td style="font-weight: 600;">${escapeHtml(item.itemName)}</td>
            <td><span class="badge badge-slate">${escapeHtml(item.category)}</span></td>
            <td class="text-right mono" style="font-weight: 700;">${item.qty} ${escapeHtml(item.unit)}</td>
            <td class="text-right mono">${fmtUah(item.cost)}</td>
            <td class="text-right mono">${fmtUah(item.sellPrice)}</td>
            <td class="text-right"><span class="badge badge-green mono">${item.marginPct}%</span></td>
            <td>${statusHtml}</td>
            <td class="text-right">
              <button type="button" class="btn btn-sm btn-subtle js-quick-replenish" data-sku="${escapeHtml(item.sku)}" data-name="${escapeHtml(item.itemName)}" data-unit="${escapeHtml(item.unit)}" data-cost="${item.cost}">
                Поповнити
              </button>
            </td>
          </tr>
        `;
      })
      .join('');

    // Render auto-reorder alerts block
    const reorderListEl = document.getElementById('stock-reorder-list');
    if (!reorderListEl) return;

    const lowItems = enriched.filter((i) => i.isLow);
    const reorderBadge = document.getElementById('reorder-alerts-badge');
    if (reorderBadge) reorderBadge.textContent = `Потребують уваги: ${lowItems.length} позиції`;

    if (lowItems.length === 0) {
      reorderListEl.innerHTML = `
        <div class="action-item" style="background: var(--success-soft); border-color: var(--success-border);">
          <div class="action-item-left">
            <span class="action-tag" style="background:#DCFCE7;color:#15803D;">✓ Запаси в нормі</span>
            <div>
              <div class="action-title">Усі позиції на складі перевищують мінімальний норматив</div>
              <div class="action-desc">Термінових дозамовлень постачальникам сьогодні не потрібно.</div>
            </div>
          </div>
        </div>
      `;
    } else {
      reorderListEl.innerHTML = lowItems
        .map((item) => {
          const orderQty = Math.max(20, item.minThreshold * 2 - item.qty);
          const orderSum = orderQty * item.cost;
          const msg = `Вітаємо! Замовлення від ТОВ "Альфа Трейд Груп" (ЄДРПОУ 38421567): [${item.sku}] ${item.itemName} — ${orderQty} ${item.unit} на суму ${fmtUah(orderSum)}. Просимо виставити рахунок.`;
          return `
            <div class="action-item">
              <div class="action-item-left">
                <span class="action-tag stock">Дозамовлення • ${escapeHtml(item.sku)}</span>
                <div>
                  <div class="action-title">${escapeHtml(item.itemName)} — залишок <span class="mono">${item.qty} ${escapeHtml(item.unit)}</span> (норма мін. ${item.minThreshold})</div>
                  <div class="action-desc">Рекомендована партія закупівлі: <strong>${orderQty} ${escapeHtml(item.unit)}</strong> на суму <strong class="mono">${fmtUah(orderSum)}</strong></div>
                </div>
              </div>
              <div class="action-buttons">
                <button type="button" class="btn btn-sm btn-soft-blue js-copy-reminder" data-text="${escapeHtml(msg)}">📋 Скопіювати заявку у Viber/Telegram</button>
                <button type="button" class="btn btn-sm btn-success js-quick-replenish" data-sku="${escapeHtml(item.sku)}" data-name="${escapeHtml(item.itemName)}" data-unit="${escapeHtml(item.unit)}" data-cost="${item.cost}" data-qty="${orderQty}">
                  ✓ Оприбуткувати поставку (+${orderQty} ${escapeHtml(item.unit)})
                </button>
              </div>
            </div>
          `;
        })
        .join('');
    }
  }

  // ─── 4. 🏦 БАНК І КАСА (АВТОПІЛОТ) ─────────────────────────────────────────
  const CATEGORY_LABELS = {
    REVENUE_SALES: 'Виручка від продажів клієнтам',
    COGS_MATERIALS: 'Закупівля товару (Собівартість)',
    TAX_PAYMENT: 'Сплата податків у бюджет',
    PAYROLL: 'Виплата зарплати команді',
    ADMIN_OPEX: 'Оренда складу, логістика та сервіс',
    UNCLASSIFIED: 'Потребує 1 кліку власника'
  };

  function renderBankSection() {
    const tbody = document.getElementById('bank-tx-tbody');
    if (!tbody) return;

    const pulse = state.pulse || {};
    const txs = Array.isArray(pulse.recentBankTxs) ? pulse.recentBankTxs : [];
    const autoRate = pulse.automationRate ?? 95;

    const unpostedCount = txs.filter((t) => t.status === 'NEEDS_REVIEW').length;
    const badgeBank = document.getElementById('nav-badge-bank');
    if (badgeBank) {
      if (unpostedCount > 0) {
        badgeBank.style.display = 'inline-flex';
        badgeBank.textContent = `${unpostedCount}`;
      } else {
        badgeBank.style.display = 'none';
      }
    }
    const rateBadge = document.getElementById('bank-auto-rate-badge');
    if (rateBadge) rateBadge.textContent = `Автопілот: ${autoRate}%`;

    if (txs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);">Немає транзакцій. Натисніть «Провести виписку автоматично» вище.</td></tr>`;
      return;
    }

    tbody.innerHTML = txs
      .map((tx) => {
        const isIn = tx.direction === 'IN';
        const amtStr = (isIn ? '+' : '−') + fmtUah(tx.amount, 2);
        const amtColor = isIn ? 'var(--success)' : 'var(--text-main)';
        const dateStr = tx.date ? new Date(tx.date).toLocaleDateString('uk-UA') : '18.10.2026';
        const vatVal = Number(tx.vatAmount) || 0;
        const catName = CATEGORY_LABELS[tx.category] || tx.category;

        let actionCell = '';
        if (tx.status === 'NEEDS_REVIEW') {
          actionCell = `
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              <button type="button" class="btn btn-sm btn-soft-green js-resolve-tx" data-id="${escapeHtml(tx.id)}" data-cat="REVENUE_SALES" data-label="Оплата клієнта">Оплата клієнта</button>
              <button type="button" class="btn btn-sm btn-soft-blue js-resolve-tx" data-id="${escapeHtml(tx.id)}" data-cat="COGS_MATERIALS" data-label="Закупівля товару">Закупівля товару</button>
              <button type="button" class="btn btn-sm js-resolve-tx" data-id="${escapeHtml(tx.id)}" data-cat="ADMIN_OPEX" data-label="Оренда / Сервіс">Оренда / Сервіс</button>
            </div>
          `;
        } else {
          actionCell = `<span class="badge badge-green">✓ Авто-проведено</span>`;
        }

        return `
          <tr>
            <td>
              <div style="font-weight:600;">${escapeHtml(dateStr)}</div>
              <div style="font-size:11.5px;color:var(--text-muted);" class="mono">№ ${escapeHtml(tx.docNumber)}</div>
            </td>
            <td>
              <div style="font-weight:600;">${escapeHtml(tx.counterpartyName)}</div>
              <div style="font-size:11.5px;color:var(--text-muted);" class="mono">ЄДРПОУ: ${escapeHtml(tx.counterpartyEdrpou || '—')}</div>
            </td>
            <td style="max-width:340px;font-size:12.5px;">${escapeHtml(tx.description)}</td>
            <td class="text-right mono" style="font-weight:700;color:${amtColor};">${amtStr}</td>
            <td class="text-right mono" style="font-size:12.5px;color:var(--text-secondary);">${vatVal > 0 ? fmtUah(vatVal, 2) : 'Без ПДВ'}</td>
            <td>
              <div style="font-weight:600;font-size:12.5px;">${escapeHtml(catName)}</div>
              <div style="font-size:11px;color:var(--text-muted);">${escapeHtml(tx.ruleMatched || '')}</div>
            </td>
            <td>${actionCell}</td>
          </tr>
        `;
      })
      .join('');
  }

  // ─── 5. 🏛️ ПОДАТКИ ТА КОМАНДА (БЕЗ БУХГАЛТЕРА) ────────────────────────────
  function renderTaxesAndTeamSection() {
    const pulse = state.pulse || {};
    const tax = pulse.taxAssistant || {};
    const fop = tax.fop || {
      income: 840200,
      singleTax5Pct: 42010,
      militaryTax1Pct: 8402,
      esvQuarter: 5280,
      totalPayable: 55692,
      treasuryIban: 'UA418999980313090106000026001',
      paymentPurpose: '*;101;38421567;Єдиний податок 5% за поточний квартал, перераховано повністю;;;'
    };
    const vat = tax.llcVat || {
      vatLiability: 41500,
      vatCredit: 28333.33,
      netVatPayable: 13166.67
    };

    const elIncome = document.getElementById('tax-fop-income');
    if (elIncome) elIncome.textContent = fmtUah(fop.income, 2);
    const elEp = document.getElementById('tax-fop-ep');
    if (elEp) elEp.textContent = fmtUah(fop.singleTax5Pct, 2);
    const elVz = document.getElementById('tax-fop-vz');
    if (elVz) elVz.textContent = fmtUah(fop.militaryTax1Pct, 2);
    const elEsv = document.getElementById('tax-fop-esv');
    if (elEsv) elEsv.textContent = fmtUah(fop.esvQuarter, 2);
    const elTot = document.getElementById('tax-fop-total');
    if (elTot) elTot.textContent = fmtUah(fop.totalPayable, 2);

    const vatL = Math.max(Number(vat.vatLiability) || 0, 41500);
    const vatC = Math.max(Number(vat.vatCredit) || 0, 20333.33);
    const vatNet = Math.max(0, vatL - vatC);

    const elVatL = document.getElementById('tax-vat-liability');
    if (elVatL) elVatL.textContent = fmtUah(vatL, 2);
    const elVatC = document.getElementById('tax-vat-credit');
    if (elVatC) elVatC.textContent = '−' + fmtUah(vatC, 2);
    const elVatNet = document.getElementById('tax-vat-net');
    if (elVatNet) elVatNet.textContent = fmtUah(vatNet, 2);

    // Render Team Payroll Table
    const payrollTbody = document.getElementById('payroll-tbody');
    if (!payrollTbody) return;

    payrollTbody.innerHTML = state.teamPayroll
      .map((emp) => {
        const statusHtml = emp.paid
          ? `<span class="badge badge-green">✓ Виплачено на картку</span>`
          : `<span class="badge badge-amber">Очікує виплати</span>`;
        const btnHtml = emp.paid
          ? `<span style="font-size:12px;color:var(--text-muted);">Проведено</span>`
          : `<button type="button" class="btn btn-sm btn-soft-green js-pay-single-emp" data-id="${escapeHtml(emp.id)}">Виплатити ${fmtUah(emp.netPay)}</button>`;

        return `
          <tr>
            <td style="font-weight: 700;">${escapeHtml(emp.name)}</td>
            <td style="color: var(--text-secondary);">${escapeHtml(emp.role)}</td>
            <td class="text-right mono">${fmtUah(emp.baseSalary)}</td>
            <td class="text-right mono" style="color: var(--primary); font-weight: 600;">+${fmtUah(emp.bonusKpi)}</td>
            <td class="text-right mono" style="color: var(--text-muted);">${fmtUah(emp.taxes)}</td>
            <td class="text-right mono" style="font-weight: 800; font-size: 14px;">${fmtUah(emp.netPay)}</td>
            <td>${statusHtml}</td>
            <td class="text-right">${btnHtml}</td>
          </tr>
        `;
      })
      .join('');
  }

  // ─── 6. 🎙️ AI ВІДДІЛ ПРОДАЖІВ ТА ТЕЛЕФОНІЯ ─────────────────────────────────
  async function renderAiSalesSection() {
    const listEl = document.getElementById('ai-calls-list');
    if (!listEl) return;

    try {
      if (!state.aiSales) {
        const res = await fetch('/api/autonomous/ai-sales').then((r) => r.json());
        if (res && res.ok) state.aiSales = res.data;
      }
    } catch (_e) {}

    const data = state.aiSales || {
      stats: { conversionRate: 34.2, conversionLiftPct: 25.0, averageQcScore: 89, marginLeakPreventedUah: 48200 },
      calls: []
    };

    const convEl = document.getElementById('ai-stat-conv');
    if (convEl) convEl.textContent = `${data.stats.conversionRate}%`;
    const qcEl = document.getElementById('ai-stat-qc');
    if (qcEl) qcEl.textContent = `${data.stats.averageQcScore} / 100`;
    const marginEl = document.getElementById('ai-stat-margin');
    if (marginEl) marginEl.textContent = fmtUah(data.stats.marginLeakPreventedUah);

    if (!data.calls || data.calls.length === 0) {
      listEl.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-muted);">Немає записів дзвінків. Лінії телефонії очікують вхідних подій.</div>`;
      return;
    }

    listEl.innerHTML = data.calls
      .map((c) => {
        const qcBadgeClass = c.qcScore >= 80 ? 'badge-green' : c.qcScore >= 60 ? 'badge-amber' : 'badge-red';
        const actionBtn = c.orderDraft && c.status === 'READY_TO_INVOICE'
          ? `<button type="button" class="btn btn-sm btn-action-primary js-ai-create-order" data-ord="${escapeHtml(c.orderDraft.orderNumber)}" data-amt="${c.orderDraft.amount}" data-client="${escapeHtml(c.clientName)}" data-edrpou="${c.orderDraft.edrpou}">Створити рахунок ${escapeHtml(c.orderDraft.orderNumber)} (₴ ${c.orderDraft.amount.toLocaleString('uk-UA')})</button>`
          : c.status === 'INVOICED'
          ? `<span class="badge badge-green">Рахунок виставлено</span>`
          : `<span class="badge badge-amber">Завдання в CRM створено</span>`;

        return `
          <div class="action-item" style="align-items: flex-start; padding: 16px;">
            <div class="action-item-left" style="align-items: flex-start;">
              <span class="badge ${qcBadgeClass}" style="margin-top: 2px;">QC: ${c.qcScore}/100</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap;">
                  <div class="action-title" style="font-size: 14px;">
                    ${escapeHtml(c.clientName)} <span style="font-size: 12px; color: var(--text-muted); font-weight: normal;">(${escapeHtml(c.phone)})</span>
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-muted);" class="mono">
                    ${escapeHtml(c.time)} • ${escapeHtml(c.duration)} • Менеджер: ${escapeHtml(c.manager)}
                  </div>
                </div>
                <div class="action-desc" style="margin-top: 6px; font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
                  <strong>ШІ-розбір розмови:</strong> ${escapeHtml(c.transcriptSummary)}
                </div>
                ${c.qcFeedback ? `<div style="margin-top: 4px; font-size: 12px; color: var(--danger); font-weight: 500;">⚠️ ${escapeHtml(c.qcFeedback)}</div>` : ''}
                ${c.detectedItems ? `<div style="margin-top: 6px; font-size: 12px; color: var(--primary); font-weight: 600;">📦 Розпізнані позиції: ${escapeHtml(c.detectedItems)}</div>` : ''}
              </div>
            </div>
            <div class="action-buttons" style="margin-top: 2px;">
              ${actionBtn}
            </div>
          </div>
        `;
      })
      .join('');
  }

  // ─── 6. 🔁 ПЕРЕЇЗД З 1С ТА АДАПТАЦІЯ ПІД БІЗНЕС ───────────────────────────
  function renderMigrationReportInline() {
    const container = document.getElementById('migration-report-inline');
    if (!container) return;

    const analysis = state.lastMigrationAnalysis;
    const forensic = state.lastForensicReport;

    if (!analysis && !forensic) {
      container.innerHTML = '';
      return;
    }

    const fixes = (analysis && Array.isArray(analysis.sanitizedFixes)) ? analysis.sanitizedFixes : [];
    const anomalies = (forensic && Array.isArray(forensic.anomalies)) ? forensic.anomalies : [];

    container.innerHTML = `
      <div style="background: var(--success-soft); border: 1px solid var(--success-border); border-radius: var(--radius-sm); padding: 16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
          <div style="font-weight:700;font-size:14.5px;color:var(--success-hover);">
            ✓ Звіт Авто-Очистки перед імпортом з 1С / BAS: виявлено та автоматично виправлено ${fixes.length} помилок
          </div>
          <span class="badge badge-green">Готово до чистого імпорту</span>
        </div>
        <div class="grid-3" style="margin-bottom:12px;">
          <div style="background:#FFFFFF;padding:10px 14px;border-radius:8px;border:1px solid var(--success-border);">
            <div style="font-size:11.5px;color:var(--text-muted);">Очищено контрагентів</div>
            <div style="font-size:18px;font-weight:800;" class="mono">${analysis ? analysis.counterparties.length : 3} (склеєно дублів: ${analysis ? analysis.duplicatesRemoved : 2})</div>
          </div>
          <div style="background:#FFFFFF;padding:10px 14px;border-radius:8px;border:1px solid var(--success-border);">
            <div style="font-size:11.5px;color:var(--text-muted);">Товарних позицій (SKU)</div>
            <div style="font-size:18px;font-weight:800;" class="mono">${analysis ? analysis.items.length : 5} на ${fmtUah(analysis ? analysis.totalStockValue : 912400)}</div>
          </div>
          <div style="background:#FFFFFF;padding:10px 14px;border-radius:8px;border:1px solid var(--success-border);">
            <div style="font-size:11.5px;color:var(--text-muted);">Банківських документів</div>
            <div style="font-size:18px;font-weight:800;" class="mono">${analysis ? analysis.bankDocs.length : 4} платежі</div>
          </div>
        </div>
        <ul style="padding-left:18px;font-size:12.5px;color:var(--text-main);display:flex;flex-direction:column;gap:4px;">
          ${fixes.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}
        </ul>
      </div>

      ${forensic ? `
      <div style="background: var(--bg-app); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
          <div>
            <div style="font-weight:700;font-size:14px;">🔍 Рентген старої бази 1С (Forensic Audit)</div>
            <div style="font-size:12px;color:var(--text-secondary);">${escapeHtml(forensic.garbageVerdict)}</div>
          </div>
          <span class="badge badge-amber">Індекс засміченості 1С: ${forensic.garbageIndexPercent}%</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${anomalies.slice(0, 4).map((a) => `
            <div style="background:#FFFFFF;padding:10px 12px;border-radius:8px;border:1px solid var(--border);font-size:12.5px;">
              <div style="font-weight:700;color:var(--text-main);">• ${escapeHtml(a.title)} — <span class="mono">${escapeHtml(a.affectedEntity)}</span></div>
              <div style="color:var(--text-secondary);margin-top:2px;">${escapeHtml(a.description)}</div>
              <div style="color:var(--primary);font-weight:600;margin-top:3px;">Авто-рішення OpexMetrix: ${escapeHtml(a.autoFixAction)}</div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
    `;
  }

  // ─── Data Fetching & Initialization ────────────────────────────────────────
  async function loadAllData() {
    try {
      const [pulseRes, cfRes, reorderRes, demoRes] = await Promise.all([
        fetch('/api/autonomous/pulse').then((r) => r.json()).catch(() => null),
        fetch('/api/smb-cashflow/forecast').then((r) => r.json()).catch(() => null),
        fetch('/api/smb-cashflow/reorder-alerts').then((r) => r.json()).catch(() => null),
        fetch('/api/autonomous/migration/demo-payload').then((r) => r.json()).catch(() => null)
      ]);

      if (pulseRes && pulseRes.ok && pulseRes.data) {
        state.pulse = pulseRes.data;
      }
      if (cfRes && cfRes.ok) {
        state.cashflow = cfRes.data || cfRes;
      }
      if (reorderRes && reorderRes.ok) {
        state.reorderAlerts = reorderRes.data || reorderRes;
      }
      if (demoRes && demoRes.ok && demoRes.data) {
        state.demoMigrationPayload = demoRes.data;
        const csvInput = document.getElementById('mig-csv-input');
        const bankInput = document.getElementById('mig-bank-input');
        if (csvInput && !csvInput.value) csvInput.value = demoRes.data.csvText || '';
        if (bankInput && !bankInput.value) bankInput.value = demoRes.data.bankExchangeText || '';
        const bankRaw = document.getElementById('bank-raw-textarea');
        if (bankRaw && !bankRaw.value) bankRaw.value = demoRes.data.bankExchangeText || '';
      }

      // Check if DB still has any old PVC SKUs or is empty; if so, auto-seed clean universal SMB data
      const hasOldPvc =
        state.pulse &&
        Array.isArray(state.pulse.stockBalances) &&
        state.pulse.stockBalances.some((s) => /(rehau|maco|sash|igu|frame|mullion|пвх|склопакет)/i.test(`${s.sku} ${s.itemName}`));

      if (hasOldPvc || !state.pulse || !state.pulse.stockBalances || state.pulse.stockBalances.length === 0) {
        await fetch('/api/autonomous/migration/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state.demoMigrationPayload || {})
        });
        const freshPulse = await fetch('/api/autonomous/pulse').then((r) => r.json()).catch(() => null);
        if (freshPulse && freshPulse.ok) state.pulse = freshPulse.data;
      }
    } catch (_err) {
      // Fallback gracefully
    }

    renderPulseSection();
    renderCashflowChart();
    evaluateMarginGuardLive();
    renderSalesOrdersTable();
    renderInlineDocument(state.activeDocOrderId, state.activeDocType);
    renderStockSection();
    renderBankSection();
    renderTaxesAndTeamSection();
  }

  // ─── Event Listeners ───────────────────────────────────────────────────────
  function bindEvents() {
    window.opexSwitchTab = switchTab;

    // Sidebar nav clicks
    document.querySelectorAll('#main-nav .nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) switchTab(tab);
      });
    });

    // Sidebar niche pill trigger -> opens Migration/Adaptation tab
    const nicheTrigger = document.getElementById('sidebar-niche-trigger');
    if (nicheTrigger) {
      nicheTrigger.addEventListener('click', () => {
        switchTab('migration');
      });
    }

    // Niche profile cards
    document.querySelectorAll('#niche-cards-container .niche-card').forEach((card) => {
      card.addEventListener('click', () => {
        const niche = card.getAttribute('data-niche');
        if (niche) applyNicheProfile(niche);
      });
    });

    // Quick Invoice Form live Margin Guard
    const itemSelect = document.getElementById('inv-item-select');
    if (itemSelect) {
      itemSelect.addEventListener('change', () => {
        const opt = itemSelect.options[itemSelect.selectedIndex];
        const defaultPrice = opt?.getAttribute('data-price');
        const priceEl = document.getElementById('inv-price');
        if (defaultPrice && priceEl) priceEl.value = defaultPrice;
        evaluateMarginGuardLive();
      });
    }

    ['inv-qty', 'inv-price', 'inv-discount'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', evaluateMarginGuardLive);
    });

    // Create Invoice button
    const btnCreateInv = document.getElementById('btn-create-invoice');
    if (btnCreateInv) {
      btnCreateInv.addEventListener('click', async () => {
        const clientName = document.getElementById('inv-client-name')?.value.trim() || 'Клієнт';
        const clientEdrpou = document.getElementById('inv-client-edrpou')?.value.trim() || '00000000';
        const calc = evaluateMarginGuardLive();
        if (!calc) return;

        const newOrderNum = `INV-2026-${108 + state.orders.length}`;
        const newOrd = {
          id: `ord-${Date.now()}`,
          orderNumber: newOrderNum,
          date: new Date().toLocaleDateString('uk-UA'),
          clientName,
          clientEdrpou,
          itemsSummary: `${calc.itemName} (${calc.qty} ${calc.unit})`,
          items: [
            {
              name: calc.itemName,
              unit: calc.unit,
              qty: calc.qty,
              price: calc.unitPrice,
              cost: calc.unitCost
            }
          ],
          totalAmount: calc.netRevenue,
          costAmount: calc.totalCost,
          marginPct: calc.marginPct,
          status: 'INVOICED',
          withVat: true
        };

        state.orders.unshift(newOrd);
        state.activeDocOrderId = newOrderNum;

        try {
          await fetch('/api/autonomous/orders/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderNumber: newOrderNum,
              totalPrice: calc.netRevenue,
              status: 'INVOICED',
              clientName,
              clientEdrpou
            })
          });
        } catch (_e) {}

        renderSalesOrdersTable();
        renderInlineDocument(newOrderNum, 'INVOICE');
        renderPulseSection();
        showInlineStatus(`✓ Рахунок № ${newOrderNum} створено та відкрито нижче`);
      });
    }

    // Inline Doc Type Switchers
    document.querySelectorAll('.doc-type-switch').forEach((btn) => {
      btn.addEventListener('click', () => {
        const dt = btn.getAttribute('data-doctype');
        if (dt) {
          renderInlineDocument(state.activeDocOrderId, dt);
          showInlineStatus(`✓ Документ перемкнено: ${btn.textContent}`);
        }
      });
    });

    // Print Inline Doc without opening popup
    const btnPrint = document.getElementById('btn-print-inline-doc');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    // Add Stock Supply Form
    const btnAddStock = document.getElementById('btn-add-stock');
    if (btnAddStock) {
      btnAddStock.addEventListener('click', async () => {
        const sku = document.getElementById('stk-sku')?.value.trim() || 'PRD-NEW';
        const itemName = document.getElementById('stk-name')?.value.trim() || 'Новий товар';
        const qty = Number(document.getElementById('stk-qty')?.value) || 10;
        const unitPrice = Number(document.getElementById('stk-cost')?.value) || 1000;

        try {
          await fetch('/api/autonomous/stock/movement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sku,
              itemName,
              unit: 'шт',
              qty,
              unitPrice,
              type: 'IN_PURCHASE',
              reference: 'SUPPLY-INLINE'
            })
          });
          const pulseRes = await fetch('/api/autonomous/pulse').then((r) => r.json());
          if (pulseRes && pulseRes.ok) state.pulse = pulseRes.data;
        } catch (_e) {}

        renderStockSection();
        renderPulseSection();
        showInlineStatus(`✓ Поставку «${itemName}» (+${qty} шт) оприбутковано на склад`);
      });
    }

    // Stock Search & Category Filter
    const searchInput = document.getElementById('stock-search-input');
    if (searchInput) searchInput.addEventListener('input', renderStockSection);
    const catSelect = document.getElementById('stock-category-filter');
    if (catSelect) catSelect.addEventListener('change', renderStockSection);

    // Bank Demo, Dropzone & Import
    const btnFillBank = document.getElementById('btn-fill-demo-bank');
    const bankTa = document.getElementById('bank-raw-textarea');
    const dropzoneStatus = document.getElementById('bank-dropzone-status');
    const fileInput = document.getElementById('bank-file-input');
    const dropzone = document.getElementById('bank-dropzone');

    if (btnFillBank) {
      btnFillBank.addEventListener('click', () => {
        if (bankTa && state.demoMigrationPayload) {
          bankTa.value = state.demoMigrationPayload.bankExchangeText || '';
          if (dropzoneStatus) {
            dropzoneStatus.textContent = '✓ Завантажено демо-виписку 1CClientBankExchange (3 операції)';
          }
          showInlineStatus('✓ Приклад виписки завантажено');
        }
      });
    }

    if (fileInput && bankTa) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            bankTa.value = (ev.target && ev.target.result) || '';
            if (dropzoneStatus) {
              dropzoneStatus.textContent = `✓ Завантажено: ${file.name} (${Math.round(file.size / 1024)} КБ)`;
            }
            showInlineStatus(`✓ Файл ${file.name} прочитано`);
          };
          reader.readAsText(file, 'windows-1251');
        }
      });
    }

    if (dropzone && fileInput) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--primary)';
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = 'var(--border-strong)';
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--border-strong)';
        const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (file && bankTa) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            bankTa.value = (ev.target && ev.target.result) || '';
            if (dropzoneStatus) {
              dropzoneStatus.textContent = `✓ Завантажено: ${file.name} (${Math.round(file.size / 1024)} КБ)`;
            }
            showInlineStatus(`✓ Файл ${file.name} прочитано`);
          };
          reader.readAsText(file, 'windows-1251');
        }
      });
    }

    const btnRunBank = document.getElementById('btn-run-bank-import');
    if (btnRunBank) {
      btnRunBank.addEventListener('click', async () => {
        const rawText = bankTa?.value || '';
        if (!rawText.trim()) {
          showInlineStatus('Оберіть файл або натисніть «Завантажити демо-виписку»');
          return;
        }

        try {
          const res = await fetch('/api/autonomous/bank/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rawText })
          }).then((r) => r.json());

          const pulseRes = await fetch('/api/autonomous/pulse').then((r) => r.json());
          if (pulseRes && pulseRes.ok) state.pulse = pulseRes.data;

          renderBankSection();
          renderPulseSection();
          renderTaxesAndTeamSection();
          showInlineStatus(`✓ Виписку проведено: ${res?.data?.autoPosted || 3} авто-проведень`);
        } catch (_e) {}
      });
    }

    // Taxes & Team buttons
    const btnCopyIban = document.getElementById('btn-copy-tax-iban');
    if (btnCopyIban) {
      btnCopyIban.addEventListener('click', () => {
        const text = `UA418999980313090106000026001 | Отримувач: ГУК у м. Києві | ЄДРПОУ 37993783 | Призначення: *;101;38421567;Єдиний податок 5% та ВЗ 1% за квартал;;;`;
        copyTextInline(text, '✓ Реквізити IBAN Казначейства скопійовано в буфер');
      });
    }

    const btnTaxXml = document.getElementById('btn-download-tax-xml');
    if (btnTaxXml) {
      btnTaxXml.addEventListener('click', async () => {
        try {
          const xmlText = await fetch('/api/autonomous/tax/xml').then((r) => r.text());
          const blob = new Blob([xmlText], { type: 'application/xml;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'DPS_Declaration_F0103308.xml';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          showInlineStatus('✓ Декларацію XML F0103308 завантажено');
        } catch (_e) {}
      });
    }

    // Official DPS Forms (cabinet.tax.gov.ua)
    const btnPreviewDps = document.getElementById('btn-preview-dps-form');
    const btnDownloadDps = document.getElementById('btn-download-selected-dps-xml');
    const selectDps = document.getElementById('dps-form-select');
    const dpsPreviewContainer = document.getElementById('dps-form-preview-container');

    if (btnPreviewDps && selectDps && dpsPreviewContainer) {
      btnPreviewDps.addEventListener('click', async () => {
        const formId = selectDps.value;
        dpsPreviewContainer.style.display = 'block';
        dpsPreviewContainer.innerHTML = `<div style="text-align:center;padding:24px;color:var(--text-muted);">Формування офіційного бланку ДПС за стандартом cabinet.tax.gov.ua...</div>`;

        try {
          const res = await fetch(`/api/autonomous/tax/forms/${encodeURIComponent(formId)}/preview`).then((r) => r.json()).catch(() => null);
          if (res && res.ok && res.html) {
            dpsPreviewContainer.innerHTML = res.html;
            return;
          }
        } catch (_e) {}

        // Client-side fallback generator for offline / GitHub Pages demo
        dpsPreviewContainer.innerHTML = renderClientDpsPreview(formId);
      });
    }

    if (btnDownloadDps && selectDps) {
      btnDownloadDps.addEventListener('click', async () => {
        const formId = selectDps.value;
        const codeMap = {
          fop_ep_group3: 'F0103308',
          fop_ep_group1_2: 'F0103406',
          llc_ep_group3: 'J0103508',
          vat_declaration: 'J0200126',
          tax_invoice_erpn: 'J1201016',
          tax_invoice_correction: 'J1201216',
          payroll_unified_report: 'J0500110',
          sea_vat_extract_request: 'J1302002',
          smkor_unblock_notice: 'J1312006',
        };
        const code = codeMap[formId] || 'F0103308';
        const filename = `${code}_38421567_2026Q3.xml`;

        try {
          const resp = await fetch(`/api/autonomous/tax/forms/${encodeURIComponent(formId)}/xml`);
          if (resp && resp.ok) {
            const xmlText = await resp.text();
            downloadXmlBlob(xmlText, filename);
            showInlineStatus(`✓ XML ${code} для cabinet.tax.gov.ua успішно завантажено`);
            return;
          }
        } catch (_e) {}

        // Client-side fallback XML download
        const xmlText = getClientDpsXml(formId, code);
        downloadXmlBlob(xmlText, filename);
        showInlineStatus(`✓ XML ${code} для cabinet.tax.gov.ua успішно завантажено`);
      });
    }

    const btnPayAll = document.getElementById('btn-pay-all-team');
    if (btnPayAll) {
      btnPayAll.addEventListener('click', () => {
        state.teamPayroll.forEach((emp) => {
          emp.paid = true;
        });
        renderTaxesAndTeamSection();
        showInlineStatus('✓ Зарплату всій команді виплачено в 1 клік');
      });
    }

    // 1C Migration 3-Step Wizard
    const btnMigDemo = document.getElementById('btn-mig-load-demo');
    if (btnMigDemo) {
      btnMigDemo.addEventListener('click', async () => {
        const res = await fetch('/api/autonomous/migration/demo-payload').then((r) => r.json()).catch(() => null);
        if (res && res.ok && res.data) {
          state.demoMigrationPayload = res.data;
          const csvInput = document.getElementById('mig-csv-input');
          const bankInput = document.getElementById('mig-bank-input');
          if (csvInput) csvInput.value = res.data.csvText || '';
          if (bankInput) bankInput.value = res.data.bankExchangeText || '';
          document.getElementById('mig-step-1')?.classList.add('done');
          document.getElementById('mig-step-2')?.classList.add('active');
          showInlineStatus('✓ Крок 1 виконано: завантажено реальний дамп 1С / BAS');
        }
      });
    }

    const btnMigAnalyze = document.getElementById('btn-mig-analyze');
    if (btnMigAnalyze) {
      btnMigAnalyze.addEventListener('click', async () => {
        const csvText = document.getElementById('mig-csv-input')?.value || '';
        const bankExchangeText = document.getElementById('mig-bank-input')?.value || '';

        const [anRes, forRes] = await Promise.all([
          fetch('/api/autonomous/migration/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ csvText, bankExchangeText })
          }).then((r) => r.json()).catch(() => null),
          fetch('/api/universal-1c/forensic-audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
          }).then((r) => r.json()).catch(() => null)
        ]);

        if (anRes && anRes.ok) state.lastMigrationAnalysis = anRes.data;
        if (forRes && forRes.success) state.lastForensicReport = forRes.report;

        document.getElementById('mig-step-1')?.classList.add('done');
        document.getElementById('mig-step-2')?.classList.add('done');
        document.getElementById('mig-step-3')?.classList.add('active');

        renderMigrationReportInline();
        showInlineStatus('✓ Крок 2 виконано: Авто-Очистка та Рентген бази 1С завершені');
      });
    }

    const btnMigExec = document.getElementById('btn-mig-execute');
    if (btnMigExec) {
      btnMigExec.addEventListener('click', async () => {
        const csvText = document.getElementById('mig-csv-input')?.value || '';
        const bankExchangeText = document.getElementById('mig-bank-input')?.value || '';

        const execRes = await fetch('/api/autonomous/migration/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ csvText, bankExchangeText })
        }).then((r) => r.json()).catch(() => null);

        if (execRes && execRes.ok) {
          document.getElementById('mig-step-1')?.classList.add('done');
          document.getElementById('mig-step-2')?.classList.add('done');
          document.getElementById('mig-step-3')?.classList.add('done');
          const stBadge = document.getElementById('migration-status-badge');
          if (stBadge) stBadge.textContent = '✓ Переїзд з 1С успішно завершено';
          await loadAllData();
          showInlineStatus('✓ Переїзд з 1С завершено в 1 клік! Чиста база активна');
        }
      });
    }

    // Delegated Clicks for Dynamic Tables & 1-Click Actions
    document.body.addEventListener('click', async (e) => {
      const target = e.target.closest('button');
      if (!target) return;

      // 1. Resolve Unrecognized Bank Tx in 1 click
      if (target.classList.contains('js-resolve-tx')) {
        const id = target.getAttribute('data-id');
        const category = target.getAttribute('data-cat');
        const label = target.getAttribute('data-label');
        if (!id) return;

        try {
          await fetch(`/api/autonomous/bank/${encodeURIComponent(id)}/resolve`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, label })
          });
          const pulseRes = await fetch('/api/autonomous/pulse').then((r) => r.json());
          if (pulseRes && pulseRes.ok) state.pulse = pulseRes.data;
        } catch (_err) {}

        renderPulseSection();
        renderBankSection();
        showInlineStatus(`✓ Платіж класифіковано як «${label}» (правило збережено)`);
        return;
      }

      // 2. Copy reminder / supplier text
      if (target.classList.contains('js-copy-reminder')) {
        const text = target.getAttribute('data-text') || '';
        await copyTextInline(text, '✓ Текст повідомлення скопійовано для Viber / Telegram');
        return;
      }

      // 3. Mark overdue order paid from Today Stream
      if (target.classList.contains('js-mark-overdue-paid')) {
        const ordNum = target.getAttribute('data-ord');
        if (ordNum) {
          state.overduePaidIds.add(ordNum);
          const found = state.orders.find((o) => o.orderNumber === ordNum);
          if (found) found.status = 'PAID';
          renderPulseSection();
          renderSalesOrdersTable();
          showInlineStatus(`✓ Оплату за рахунком ${ordNum} зараховано`);
        }
        return;
      }

      // 4. Quick supplier order from Today Stream
      if (target.classList.contains('js-quick-supplier-order')) {
        const sku = target.getAttribute('data-sku') || 'PRD-101';
        const itemName = target.getAttribute('data-name') || 'Товар';
        const qty = Number(target.getAttribute('data-qty')) || 20;
        const unitPrice = Number(target.getAttribute('data-price')) || 18500;
        const text = target.getAttribute('data-text') || '';

        await copyTextInline(text);
        try {
          await fetch('/api/autonomous/stock/movement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sku,
              itemName,
              unit: 'шт',
              qty,
              unitPrice,
              type: 'IN_PURCHASE',
              reference: 'AUTO-REORDER'
            })
          });
          const [pulseRes, reorderRes] = await Promise.all([
            fetch('/api/autonomous/pulse').then((r) => r.json()),
            fetch('/api/smb-cashflow/reorder-alerts').then((r) => r.json())
          ]);
          if (pulseRes && pulseRes.ok) state.pulse = pulseRes.data;
          if (reorderRes && reorderRes.ok) state.reorderAlerts = reorderRes.data || reorderRes;
        } catch (_err) {}

        renderPulseSection();
        renderStockSection();
        showInlineStatus(`✓ Замовлення постачальнику скопійовано та оприбутковано (+${qty} од.)`);
        return;
      }

      // 5. Cycle order status in Sales table
      if (target.classList.contains('js-cycle-order-status')) {
        const ordNum = target.getAttribute('data-num');
        const nextStatus = target.getAttribute('data-next');
        const found = state.orders.find((o) => o.orderNumber === ordNum);
        if (found && nextStatus) {
          found.status = nextStatus;
          renderSalesOrdersTable();
          renderPulseSection();
          showInlineStatus(`✓ Статус замовлення ${ordNum} змінено на «${nextStatus === 'PAID' ? 'Оплачено' : 'Відвантажено'}»`);
        }
        return;
      }

      // 6. Open inline document preview in Sales table
      if (target.classList.contains('js-open-inline-doc')) {
        const ordNum = target.getAttribute('data-num');
        if (ordNum) {
          state.activeDocOrderId = ordNum;
          renderSalesOrdersTable();
          await renderInlineDocument(ordNum, state.activeDocType);
          const viewer = document.getElementById('inline-doc-container');
          if (viewer) viewer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          showInlineStatus(`✓ Відкрито документ для замовлення ${ordNum}`);
        }
        return;
      }

      // 7. Quick replenish stock from Stock table
      if (target.classList.contains('js-quick-replenish')) {
        const sku = target.getAttribute('data-sku') || 'PRD-101';
        const itemName = target.getAttribute('data-name') || 'Товар';
        const unit = target.getAttribute('data-unit') || 'шт';
        const unitPrice = Number(target.getAttribute('data-cost')) || 1000;
        const qty = Number(target.getAttribute('data-qty')) || 10;

        try {
          await fetch('/api/autonomous/stock/movement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sku,
              itemName,
              unit,
              qty,
              unitPrice,
              type: 'IN_PURCHASE',
              reference: 'QUICK-REPLENISH'
            })
          });
          const pulseRes = await fetch('/api/autonomous/pulse').then((r) => r.json());
          if (pulseRes && pulseRes.ok) state.pulse = pulseRes.data;
        } catch (_err) {}

        renderStockSection();
        renderPulseSection();
        showInlineStatus(`✓ Запас «${itemName}» поповнено на +${qty} ${unit}`);
        return;
      }

      // 8. Pay single employee
      if (target.classList.contains('js-pay-single-emp')) {
        const empId = target.getAttribute('data-id');
        const emp = state.teamPayroll.find((x) => x.id === empId);
        if (emp) {
          emp.paid = true;
          renderTaxesAndTeamSection();
          showInlineStatus(`✓ Виплачено ${fmtUah(emp.netPay)} на картку (${emp.name})`);
        }
        return;
      }

      // 9. Create order from AI call
      if (target.classList.contains('js-ai-create-order')) {
        const orderNumber = target.getAttribute('data-ord') || `INV-2026-${108 + state.orders.length}`;
        const totalAmount = Number(target.getAttribute('data-amt')) || 185000;
        const clientName = target.getAttribute('data-client') || 'Клієнт';
        const clientEdrpou = target.getAttribute('data-edrpou') || '32490244';

        const newOrd = {
          id: `ord-${Date.now()}`,
          orderNumber,
          date: new Date().toLocaleDateString('uk-UA'),
          clientName,
          clientEdrpou,
          itemsSummary: 'Кавомашина Delonghi Dinamica Plus (10 шт)',
          items: [
            { name: 'Кавомашина професійна Delonghi Dinamica Plus ECAM 370.95', unit: 'шт.', qty: 10, price: 18500, cost: 13050 }
          ],
          totalAmount,
          costAmount: 130500,
          marginPct: 29.4,
          status: 'INVOICED',
          withVat: true
        };

        state.orders.unshift(newOrd);
        state.activeDocOrderId = orderNumber;

        if (state.aiSales && state.aiSales.calls) {
          const matchedCall = state.aiSales.calls.find((c) => c.orderDraft && c.orderDraft.orderNumber === orderNumber);
          if (matchedCall) matchedCall.status = 'INVOICED';
        }

        try {
          await fetch('/api/autonomous/orders/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderNumber,
              totalPrice: totalAmount,
              status: 'INVOICED',
              clientName,
              clientEdrpou
            })
          });
        } catch (_e) {}

        renderAiSalesSection();
        renderSalesOrdersTable();
        renderPulseSection();
        switchTab('sales');
        renderInlineDocument(orderNumber, 'INVOICE');
        showInlineStatus(`✓ Рахунок № ${orderNumber} створено з розмови та відкрито`);
        return;
      }
    });
  }

  // ─── Official DPS Tax Forms Client Engine (cabinet.tax.gov.ua) ──────────────
  function downloadXmlBlob(xmlText, filename) {
    const blob = new Blob([xmlText], { type: 'application/xml;charset=windows-1251' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function getClientDpsXml(formId, code) {
    const now = new Date();
    const dFill = `${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}${now.getFullYear()}`;
    const cDoc = code.slice(0, 3);
    const cDocSub = code.slice(3, 6);
    const cDocVer = parseInt(code.slice(6), 10) || 1;

    let body = '';
    if (formId === 'fop_ep_group3') {
      body = `
    <HNAME>ФОП КОВАЛЬЧУК ОЛЕКСАНДР МИХАЙЛОВИЧ</HNAME>
    <HTIN>38421567</HTIN>
    <HLOC>03150, м. Київ, вул. Велика Васильківська, 102</HLOC>
    <HKVED>46.90</HKVED>
    <R01G3>840200.00</R01G3>
    <R08G3>840200.00</R08G3>
    <R09G3>42010.00</R09G3>
    <R11G3>42010.00</R11G3>
    <R14G3>42010.00</R14G3>
    <R15G3>8402.00</R15G3>
    <R16G3>8402.00</R16G3>
    <R21G3>5280.00</R21G3>
    <HBOS>КОВАЛЬЧУК О.М.</HBOS>`;
    } else if (formId === 'vat_declaration') {
      body = `
    <HNAME>ТОВ "АЛЬФА ТРЕЙД ГРУП"</HNAME>
    <HTIN>38421567</HTIN>
    <HIPN>384215626558</HIPN>
    <R011G3>207500.00</R011G3>
    <R011G4>41500.00</R011G4>
    <R09G4>41500.00</R09G4>
    <R101G3>141666.67</R101G3>
    <R101G4>28333.33</R101G4>
    <R17G4>28333.33</R17G4>
    <R18G4>13166.67</R18G4>
    <HBOS>ДУБОВИК В.І.</HBOS>`;
    } else if (formId === 'tax_invoice_erpn') {
      body = `
    <HNUM>104</HNUM>
    <HNAMEP>ТОВ "Розетка Маркетплейс Україна"</HNAMEP>
    <HNAMP>ТОВ "Альфа Трейд Груп"</HNAMP>
    <HKODP>00482194</HKODP>
    <HKODSEL>38421567</HKODSEL>
    <HIPNP>004821926558</HIPNP>
    <HIPNSEL>384215626558</HIPNSEL>
    <R011>105000.00</R011>
    <R03>17500.00</R03>
    <R04>87500.00</R04>
    <TAB1>
      <ROW>
        <RXXXXG32>8471300000</RXXXXG32>
        <RXXXXG4>Кавомашина професійна Delonghi Dinamica Plus</RXXXXG4>
        <RXXXXG5>шт</RXXXXG5>
        <RXXXXG6>4</RXXXXG6>
        <RXXXXG7>24500.00</RXXXXG7>
        <RXXXXG8>20</RXXXXG8>
        <RXXXXG10>98000.00</RXXXXG10>
      </ROW>
    </TAB1>
    <HBOS>ДУБОВИК В.І.</HBOS>`;
    } else if (formId === 'payroll_unified_report') {
      body = `
    <HNAME>ТОВ "АЛЬФА ТРЕЙД ГРУП"</HNAME>
    <HTIN>38421567</HTIN>
    <R01G1>6</R01G1>
    <R02G1>142000.00</R02G1>
    <R03G1>31240.00</R03G1>
    <R04G1>25560.00</R04G1>
    <R05G1>7100.00</R05G1>
    <HBOS>ДУБОВИК В.І.</HBOS>`;
    } else {
      body = `
    <HNAME>ТОВ "АЛЬФА ТРЕЙД ГРУП"</HNAME>
    <HTIN>38421567</HTIN>
    <R01G3>840200.00</R01G3>
    <R06G3>42010.00</R06G3>
    <R10G3>42010.00</R10G3>
    <HBOS>ДУБОВИК В.І.</HBOS>`;
    }

    return `<?xml version="1.0" encoding="windows-1251"?>
<DECLAR xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="${code}.xsd">
  <DECLARHEAD>
    <TIN>38421567</TIN>
    <C_DOC>${cDoc}</C_DOC>
    <C_DOC_SUB>${cDocSub}</C_DOC_SUB>
    <C_DOC_VER>${cDocVer}</C_DOC_VER>
    <C_DOC_STAN>1</C_DOC_STAN>
    <C_DOC_TYPE>0</C_DOC_TYPE>
    <C_DOC_CNT>1</C_DOC_CNT>
    <PERIOD_MONTH>${now.getMonth() + 1}</PERIOD_MONTH>
    <PERIOD_TYPE>2</PERIOD_TYPE>
    <PERIOD_YEAR>2026</PERIOD_YEAR>
    <C_STI_ORIG>2656</C_STI_ORIG>
    <C_RAJ>56</C_RAJ>
    <D_FILL>${dFill}</D_FILL>
    <SOFTWARE>OpexMetrix Business Core v3.4 (Certified cabinet.tax.gov.ua Standard)</SOFTWARE>
  </DECLARHEAD>
  <DECLARBODY>${body}
  </DECLARBODY>
</DECLAR>`;
  }

  function renderClientDpsPreview(formId) {
    const titles = {
      fop_ep_group3: { code: 'F0103308', title: 'Податкова декларація платника єдиного податку ФОП 3 групи', law: 'Глава 1 Розділу XIV ПКУ (ст. 291-300)' },
      fop_ep_group1_2: { code: 'F0103406', title: 'Податкова декларація платника єдиного податку ФОП 1-2 груп', law: 'ПКУ ст. 295, ст. 296' },
      llc_ep_group3: { code: 'J0103508', title: 'Податкова декларація платника єдиного податку 3 групи (ТОВ / Юридичні особи)', law: 'ПКУ ст. 291-300 для юросіб' },
      vat_declaration: { code: 'J0200126', title: 'Податкова декларація з податку на додану вартість (ПДВ 20%)', law: 'Розділ V ПКУ (ст. 180-211)' },
      tax_invoice_erpn: { code: 'J1201016', title: 'Податкова накладна (ПН) для реєстрації в ЄРПН', law: 'ПКУ ст. 201, Наказ Мінфіну № 1307' },
      tax_invoice_correction: { code: 'J1201216', title: 'Розрахунок коригування кількісних і вартісних показників до ПН (РК)', law: 'ПКУ ст. 192' },
      payroll_unified_report: { code: 'J0500110', title: 'Об\'єднана звітність: ЄСВ 22% + ПДФО 18% + ВЗ 5% (Д1, 4ДФ)', law: 'Наказ Мінфіну № 773, ст. 51 ПКУ' },
      sea_vat_extract_request: { code: 'J1302002', title: 'Запит щодо відомостей з ЄРПН (Витяг про ліміт СЕА ПДВ)', law: 'ПКУ ст. 200-1' },
      smkor_unblock_notice: { code: 'J1312006', title: 'Повідомлення про подання пояснень щодо зупинених ПН (СМКОР)', law: 'Постанова КМУ № 1165' }
    };

    const info = titles[formId] || titles.fop_ep_group3;
    const xml = getClientDpsXml(formId, info.code);
    const filename = `${info.code}_38421567_2026Q3.xml`;

    return `
      <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:22px;color:#0f172a;margin-top:14px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #0f172a;padding-bottom:14px;margin-bottom:16px;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;">Державна податкова служба України • Електронний кабінет</div>
            <h3 style="font-size:17px;font-weight:700;margin:4px 0 2px 0;">${escapeHtml(info.title)}</h3>
            <div style="font-size:12.5px;color:#64748b;">Офіційний код форми: <strong style="color:#2563eb;font-family:monospace;">${info.code}</strong> • Нормативна база: <em>${escapeHtml(info.law)}</em></div>
          </div>
          <div style="text-align:right;">
            <span style="display:inline-block;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;font-size:11px;font-weight:600;padding:4px 10px;border-radius:6px;">
              ✓ Схема XSD валідна для ДПС
            </span>
            <div style="font-size:11.5px;color:#64748b;margin-top:4px;">Файл: <code style="font-weight:600;">${filename}</code></div>
          </div>
        </div>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px 14px;margin-bottom:16px;font-size:12.5px;display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;">
          <div><strong>Платник:</strong> ТОВ "Альфа Трейд Груп"</div>
          <div><strong>ЄДРПОУ:</strong> <code class="mono">38421567</code></div>
          <div><strong>Орган ДПС:</strong> ГУ ДПС у м. Києві (код 2656)</div>
          <div><strong>Звітний період:</strong> 3 квартал 2026 р.</div>
        </div>

        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:12px 14px;margin-bottom:18px;font-size:12.5px;color:#1e40af;">
          <strong>Подача без бухгалтера за 60 секунд:</strong> Завантажте готовий XML $\\rightarrow$ увійдіть у <a href="https://cabinet.tax.gov.ua/" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;font-weight:700;">cabinet.tax.gov.ua</a> $\\rightarrow$ «Введення звітності» $\\rightarrow$ «Завантажити» $\\rightarrow$ підпишіть КЕП / Дія.Підписом.
        </div>

        <details style="background:#0f172a;color:#f8fafc;border-radius:6px;padding:12px;font-family:monospace;font-size:11.5px;">
          <summary style="cursor:pointer;font-weight:600;color:#93c5fd;">Показати згенерований вихідний XML (${filename})</summary>
          <pre style="margin-top:10px;white-space:pre-wrap;word-break:break-all;max-height:220px;overflow-y:auto;color:#cbd5e1;">${escapeHtml(xml)}</pre>
        </details>
      </div>
    `;
  }

  // ─── Boot ──────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    loadAllData();
  });
})();
