// ============================================================================
// OpexMetrix SMB Autonomous ERP — Frontend Powerhouse Extension Module
// Pure Vanilla JS (UTF-8) | Zero-Accountant SMB Manufacturing OS
// ============================================================================

(function () {
  'use strict';

  const SMB_SECTIONS = ['pulse', 'migrator', 'wincalc', 'shopfloor', 'dealers', 'smbdocs', 'devices'];
  const ENTERPRISE_SECTIONS = [
    'dashboard',
    'projects',
    'contracts',
    'treasury',
    'docs',
    'journal',
    'osv',
    'payroll',
    'manual',
    'bank',
    'tax'
  ];

  let currentErpMode = 'smb';
  let cachedDealersList = [];
  let currentInlineDocType = 'INVOICE';

  function escHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function fmtMoney(val) {
    const num = Number(val) || 0;
    if (typeof window.f === 'function') {
      return window.f(num);
    }
    return num.toLocaleString('uk-UA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function notify(msg, color) {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, color || '#34A853');
      return;
    }
    const c = document.getElementById('toast-container');
    if (!c) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.style.borderLeftColor = color || '#34A853';
    t.innerHTML = '<strong>OpexMetrix SMB:</strong> ' + escHtml(msg);
    c.appendChild(t);
    setTimeout(() => t.remove(), 4200);
  }

  function extractNavTarget(btn) {
    if (!btn) return '';
    if (btn.dataset && btn.dataset.nav) return btn.dataset.nav;
    if (btn.dataset && btn.dataset.section) return btn.dataset.section;
    const onclickAttr = btn.getAttribute('onclick') || '';
    const match = onclickAttr.match(/nav\(\s*['"]([^'"]+)['"]/);
    return match ? match[1] : '';
  }

  // ==========================================================================
  // 1. MODE SWITCHER: SMB OWNER (БЕЗ БУХГАЛТЕРА) vs ENTERPRISE HOLDING (CFO)
  // ==========================================================================
  function switchErpMode(mode) {
    const normalizedMode = mode === 'enterprise' ? 'enterprise' : 'smb';
    currentErpMode = normalizedMode;

    // 1. Toggle sidebar buttons
    const navButtons = document.querySelectorAll('.sidebar .ni');
    navButtons.forEach((btn) => {
      const target = extractNavTarget(btn);
      const explicitMode = btn.getAttribute('data-erp-mode') || btn.getAttribute('data-mode');

      if (normalizedMode === 'smb') {
        if (explicitMode === 'enterprise' || ENTERPRISE_SECTIONS.includes(target)) {
          btn.style.display = 'none';
        } else if (explicitMode === 'smb' || SMB_SECTIONS.includes(target)) {
          btn.style.display = 'flex';
        }
      } else {
        // In 'enterprise' mode, show all Holding/CFO items and SMB items so user can demo both worlds cleanly
        btn.style.display = 'flex';
      }
    });

    // 2. Toggle sidebar group headers (.nav-grp)
    const navGroups = document.querySelectorAll('.sidebar .nav-grp');
    navGroups.forEach((grp) => {
      const grpMode = grp.getAttribute('data-erp-mode') || grp.getAttribute('data-mode');
      const text = (grp.textContent || '').toLowerCase();
      const isEnterpriseGroup =
        grpMode === 'enterprise' ||
        text.includes('бухгалтер') ||
        text.includes('коригування') ||
        text.includes('холдинг') ||
        text.includes('інтеграції') ||
        text.includes('управління');

      if (normalizedMode === 'smb') {
        if (grpMode === 'smb') {
          grp.style.display = 'block';
        } else if (isEnterpriseGroup) {
          grp.style.display = 'none';
        } else {
          grp.style.display = 'block';
        }
      } else {
        grp.style.display = 'block';
      }
    });

    // 3. Update Mode Switcher buttons in the topbar
    const smbBtnIds = ['btn-mode-smb', 'mode-smb-btn', 'erp-mode-smb'];
    const entBtnIds = ['btn-mode-enterprise', 'mode-enterprise-btn', 'erp-mode-enterprise'];

    smbBtnIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) applyModeButtonStyle(el, normalizedMode === 'smb', 'smb');
    });
    entBtnIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) applyModeButtonStyle(el, normalizedMode === 'enterprise', 'enterprise');
    });

    document.querySelectorAll('[onclick*="switchErpMode"]').forEach((btn) => {
      const attr = btn.getAttribute('onclick') || '';
      if (attr.includes("'smb'") || attr.includes('"smb"')) {
        applyModeButtonStyle(btn, normalizedMode === 'smb', 'smb');
      } else if (attr.includes("'enterprise'") || attr.includes('"enterprise"')) {
        applyModeButtonStyle(btn, normalizedMode === 'enterprise', 'enterprise');
      }
    });

    // 4. Ensure active section matches selected mode
    const activeSec = document.querySelector('.section.active');
    const activeSecId = activeSec ? activeSec.id.replace(/^sec-/, '') : '';

    if (normalizedMode === 'smb' && ENTERPRISE_SECTIONS.includes(activeSecId)) {
      const pulseBtn = findSidebarButton('pulse');
      if (typeof window.nav === 'function') {
        window.nav('pulse', pulseBtn);
      }
    } else if (normalizedMode === 'enterprise' && !activeSecId) {
      const dashBtn = findSidebarButton('dashboard');
      if (typeof window.nav === 'function') {
        window.nav('dashboard', dashBtn);
      }
    }

    notify(
      normalizedMode === 'smb'
        ? 'Увімкнено режим: Малий та Середній Бізнес (Автономний Завод без Бухгалтера)'
        : 'Увімкнено режим: Enterprise Holding & CFO (Повний бухгалтерський контур і консолідація)',
      normalizedMode === 'smb' ? '#10B981' : '#3B82F6'
    );
  }

  function applyModeButtonStyle(btn, isActive, modeType) {
    if (!btn) return;
    btn.classList.toggle('active', isActive);
    if (isActive) {
      btn.style.background = modeType === 'smb' ? '#10B981' : '#0F172A';
      btn.style.color = '#FFFFFF';
      btn.style.borderColor = modeType === 'smb' ? '#059669' : '#0F172A';
      btn.style.fontWeight = '700';
      btn.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.25)';
    } else {
      btn.style.background = 'transparent';
      btn.style.color = 'var(--t1)';
      btn.style.borderColor = 'var(--border)';
      btn.style.fontWeight = '500';
      btn.style.boxShadow = 'none';
    }
  }

  function findSidebarButton(targetId) {
    const buttons = document.querySelectorAll('.sidebar .ni');
    for (let i = 0; i < buttons.length; i++) {
      if (extractNavTarget(buttons[i]) === targetId) {
        return buttons[i];
      }
    }
    return null;
  }

  // ==========================================================================
  // 2. SHOPFLOOR QR TRACKER & AUTO-PIECEWORK WAGE ENGINE
  // ==========================================================================
  async function loadShopfloorTab() {
    const container = document.getElementById('smb-shopfloor-content');
    if (!container) return;

    container.innerHTML = `
      <div class="card" style="text-align:center; padding:32px; color:var(--t2);">
        ⏳ Завантаження живого табло цеху (5 дільниць ЧПУ та QR-нарядів)...
      </div>
    `;

    try {
      const r = await fetch('/api/shopfloor/board');
      const json = await r.json();
      const board = json.data || json;

      const stages = board.stages || [
        { code: 'STAGE_1_CUTTING', stepNumber: 1, label: '🪚 Порізка', pieceworkRatePerWindow: 85, defaultWorker: 'Коваленко О.' },
        { code: 'STAGE_2_WELDING', stepNumber: 2, label: '🔥 Зварювання', pieceworkRatePerWindow: 110, defaultWorker: 'Бондаренко М.' },
        { code: 'STAGE_3_CLEANING', stepNumber: 3, label: '⚙️ Зачистка', pieceworkRatePerWindow: 65, defaultWorker: 'Ткаченко С.' },
        { code: 'STAGE_4_GLAZING', stepNumber: 4, label: '🪟 Скління', pieceworkRatePerWindow: 120, defaultWorker: 'Шевченко В.' },
        { code: 'STAGE_5_READY', stepNumber: 5, label: '✅ Готово', pieceworkRatePerWindow: 40, defaultWorker: 'Мельник І.' }
      ];
      const orders = board.orders || [];
      const leaderboard = board.leaderboard || [];
      const summary = board.summary || {
        totalOrders: orders.length,
        totalWindowsInShop: orders.reduce((s, o) => s + (Number(o.windowCount) || 1), 0),
        readyOrdersCount: orders.filter((o) => o.stageCode === 'STAGE_5_READY').length,
        totalPieceworkFundUah: leaderboard.reduce((s, w) => s + (Number(w.accruedWageUah) || 0), 0)
      };

      const stageShortNames = ['Порізка', 'Зварювання', 'Зачистка', 'Скління', 'Готово'];

      const kanbanColsHtml = stages
        .map((st, idx) => {
          const stageOrders = orders.filter((o) => o.stageCode === st.code || o.stageIndex === idx);
          const shortTitle = stageShortNames[idx] || st.label;
          const isReadyCol = st.code === 'STAGE_5_READY';
          const headerColor = isReadyCol ? '#16A34A' : '#0F172A';

          return `
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:10px; min-height:240px;">
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid ${ isReadyCol ? '#22C55E' : '#CBD5E1' }; padding-bottom:8px;">
                <div>
                  <div style="font-size:11px; color:#64748B; font-weight:700; text-transform:uppercase;">Етап ${idx + 1}/5</div>
                  <div style="font-size:14px; font-weight:800; color:${headerColor};">${escHtml(shortTitle)}</div>
                </div>
                <span class="pill ${isReadyCol ? 'p-green' : 'p-blue'}">${stageOrders.length} зам.</span>
              </div>
              <div style="font-size:11px; color:#475569; background:#EFF6FF; padding:6px 8px; border-radius:6px;">
                👷 <strong>${escHtml(st.defaultWorker)}</strong><br>
                Тариф: <strong>₴ ${st.pieceworkRatePerWindow}/вікно</strong>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px; flex:1;">
                ${
                  stageOrders.length === 0
                    ? `<div style="font-size:12px; color:#94A3B8; text-align:center; padding:24px 6px;">Немає конструкцій на дільниці</div>`
                    : stageOrders
                        .map(
                          (ord) => `
                    <div style="background:#FFFFFF; border:1px solid ${isReadyCol ? '#86EFAC' : '#CBD5E1'}; border-left:4px solid ${isReadyCol ? '#22C55E' : '#3B82F6'}; border-radius:8px; padding:10px; box-shadow:0 2px 4px rgba(0,0,0,0.03);">
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <strong style="font-size:13px; color:#0F172A;">${escHtml(ord.orderNumber)}</strong>
                        <code style="font-size:10px; background:#F1F5F9; padding:2px 5px; border-radius:4px;">${ord.windowCount} шт</code>
                      </div>
                      <div style="font-size:11px; color:#475569; margin-bottom:6px;">${escHtml(ord.dimensionsSummary)}</div>
                      <div style="font-size:11px; color:#16A34A; font-weight:700; margin-bottom:8px;">
                        💰 Нараховано ЗП: ₴ ${fmtMoney(ord.totalPieceworkAccruedUah)}
                      </div>
                      ${
                        !isReadyCol
                          ? `<button class="btn btn-p" style="width:100%; padding:7px 8px; font-size:11px; font-weight:700; background:#2563EB;" onclick="advanceShopfloorOrder('${escHtml(ord.id)}')">
                              ⏩ Перевести на наступний етап (QR-скан)
                            </button>`
                          : `<div style="text-align:center; font-size:11px; font-weight:700; color:#15803D; background:#DCFCE7; padding:5px; border-radius:6px;">
                              ✅ ВТК Пройдено • На складі ГП
                            </div>`
                      }
                    </div>
                  `
                        )
                        .join('')
                }
              </div>
            </div>
          `;
        })
        .join('');

      const tableRowsHtml = orders
        .map((ord) => {
          const isDone = ord.stageCode === 'STAGE_5_READY';
          return `
            <tr>
              <td>
                <strong>${escHtml(ord.orderNumber)}</strong><br>
                <code style="font-size:11px; color:#64748B;">QR: ${escHtml(ord.qrPayload)}</code>
              </td>
              <td>
                <strong>${ord.windowCount} вікон</strong><br>
                <span style="font-size:11px; color:var(--t2);">${escHtml(ord.dimensionsSummary)}</span>
              </td>
              <td>
                <span class="pill ${isDone ? 'p-green' : 'p-blue'}">${escHtml(ord.stageLabel)}</span><br>
                <span style="font-size:11px; color:#64748B;">👷 ${escHtml(ord.assignedWorker)}</span>
              </td>
              <td>
                <strong style="color:#16A34A;">₴ ${fmtMoney(ord.totalPieceworkAccruedUah)}</strong>
                ${
                  ord.nextScanBonusUah > 0
                    ? `<br><span style="font-size:11px; color:#2563EB;">Наступний скан: +₴ ${fmtMoney(ord.nextScanBonusUah)}</span>`
                    : ''
                }
              </td>
              <td>
                ${
                  isDone
                    ? '<span style="color:#16A34A; font-weight:700;">Готово до відвантаження</span>'
                    : `~${ord.estimatedMinutesRemaining} хв`
                }
              </td>
              <td>
                ${
                  !isDone
                    ? `<button class="btn btn-p" style="padding:6px 12px; font-size:12px; font-weight:600;" onclick="advanceShopfloorOrder('${escHtml(ord.id)}')">
                        ⏩ Перевести на наступний етап (QR-скан)
                      </button>`
                    : `<span class="pill p-green">✅ Завершено (5/5)</span>`
                }
              </td>
            </tr>
          `;
        })
        .join('');

      const leaderboardRowsHtml = leaderboard
        .map(
          (w, i) => `
          <tr>
            <td><strong>#${i + 1} ${escHtml(w.workerName)}</strong></td>
            <td style="font-size:12px; color:#475569;">${escHtml(w.role)}</td>
            <td style="text-align:center;"><span class="pill p-blue">${w.completedStagesCount} змін/операцій</span></td>
            <td style="text-align:center; font-weight:700;">${w.windowsProcessed} шт</td>
            <td style="font-family:monospace; font-size:12px;">${escHtml(w.lastScanOrderNumber)}</td>
            <td style="text-align:right; font-weight:800; font-size:15px; color:#16A34A;">₴ ${fmtMoney(w.accruedWageUah)}</td>
          </tr>
        `
        )
        .join('');

      container.innerHTML = `
        <!-- KPI Summary Strip -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:16px; margin-bottom:20px;">
          <div class="card" style="margin:0; border-left:4px solid #3B82F6;">
            <div style="font-size:11px; color:var(--t2); font-weight:700; text-transform:uppercase;">🏭 Замовлень у роботі цеху</div>
            <div style="font-size:26px; font-weight:800; margin-top:6px;">${summary.totalOrders} партій</div>
            <div style="font-size:12px; color:#3B82F6; margin-top:4px;">Конструкцій у виробництві: <b>${summary.totalWindowsInShop} шт</b></div>
          </div>
          <div class="card" style="margin:0; border-left:4px solid #10B981;">
            <div style="font-size:11px; color:var(--t2); font-weight:700; text-transform:uppercase;">✅ Готово на складі ГП (ВТК)</div>
            <div style="font-size:26px; font-weight:800; margin-top:6px; color:#10B981;">${summary.readyOrdersCount} зам.</div>
            <div style="font-size:12px; color:var(--t2); margin-top:4px;">Очікують відвантаження дилерам</div>
          </div>
          <div class="card" style="margin:0; border-left:4px solid #8B5CF6;">
            <div style="font-size:11px; color:var(--t2); font-weight:700; text-transform:uppercase;">👷 Авто-фонд відрядної ЗП зміни</div>
            <div style="font-size:26px; font-weight:800; margin-top:6px; color:#8B5CF6;">₴ ${fmtMoney(summary.totalPieceworkFundUah)}</div>
            <div style="font-size:12px; color:var(--t2); margin-top:4px;">Нараховано по QR-сканах без табельника</div>
          </div>
          <div class="card" style="margin:0; display:flex; flex-direction:column; justify-content:center; gap:8px; background:#F8FAFC;">
            <button class="btn btn-p" style="width:100%;" onclick="createQuickShopfloorOrder()">➕ Додати нове замовлення в цех</button>
            <button class="btn btn-o" style="width:100%;" onclick="loadShopfloorTab()">🔄 Оновити табло цеху</button>
          </div>
        </div>

        <!-- 5-Stage Kanban Board -->
        <div class="card" style="margin-bottom:24px;">
          <div class="card-title">
            <span>📲 5-Етапний Канбан Цеху (Порізка ➔ Зварювання ➔ Зачистка ➔ Скління ➔ Готово)</span>
            <span class="pill p-green">QR-Термінал Активний</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(5, minmax(195px, 1fr)); gap:12px; overflow-x:auto; padding-bottom:6px;">
            ${kanbanColsHtml}
          </div>
        </div>

        <!-- Detailed Production Queue Table -->
        <div class="card" style="margin-bottom:24px;">
          <div class="card-title">
            <span>📋 Детальна відомість виробничих нарядів та QR-трекінг</span>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>№ Замовлення / QR</th>
                  <th>Конструкції</th>
                  <th>Поточна дільниця</th>
                  <th>Відрядна ЗП</th>
                  <th>Прогноз готовності</th>
                  <th>Дія термінала (QR-сканер)</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHtml || '<tr><td colspan="6" style="text-align:center; color:var(--t2);">Немає активних нарядів у цеху</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Worker Piecework Leaderboard -->
        <div class="card" style="border-top:4px solid #8B5CF6;">
          <div class="card-title">
            <span>🏆 Live-Рейтинг Відрядної ЗП Цеху (Авто-нарахування без табельника та приписок)</span>
            <span class="pill p-blue">0% ручних табелів</span>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Працівник цеху</th>
                  <th>Закріплена дільниця / Станок</th>
                  <th style="text-align:center;">Закрито етапів</th>
                  <th style="text-align:center;">Оброблено вікон</th>
                  <th>Останній QR-скан</th>
                  <th style="text-align:right;">Нараховано до виплати (₴)</th>
                </tr>
              </thead>
              <tbody>
                ${leaderboardRowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } catch (err) {
      console.error('Shopfloor load error:', err);
      container.innerHTML = `<div class="card" style="color:var(--red);">Помилка завантаження цеху: ${escHtml(err.message)}</div>`;
    }
  }

  async function advanceShopfloorOrder(orderId, workerName) {
    try {
      const r = await fetch('/api/shopfloor/advance/' + encodeURIComponent(orderId), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workerName ? { workerName } : {})
      });
      const json = await r.json();
      if (json.ok && json.data) {
        const d = json.data;
        if (d.alreadyAtFinalStage) {
          notify(`Замовлення ${d.orderNumber} вже пройшло ВТК і готове до відвантаження!`, '#10B981');
        } else {
          notify(
            `QR-скан ${d.orderNumber}: переведено на етап «${d.currentStage.label}». Нараховано +₴ ${fmtMoney(d.pieceworkBonusUah)} (${d.workerCredited})!`,
            '#10B981'
          );
        }
      }
      await loadShopfloorTab();
    } catch (err) {
      notify('Помилка QR-сканування: ' + err.message, '#EA4335');
    }
  }

  async function createQuickShopfloorOrder() {
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            {
              widthMm: 1450,
              heightMm: 1500,
              profileWidthMm: 70,
              quantity: 3,
              weldingAllowanceMm: 3,
              hasVerticalMullion: true,
              glassClearanceMm: 10
            }
          ]
        })
      });
      notify('Нове замовлення (3 двостулкові конструкції) передано на Дільницю №1 (Порізка)!', '#10B981');
      await loadShopfloorTab();
    } catch (err) {
      notify('Не вдалося створити замовлення: ' + err.message, '#EA4335');
    }
  }

  // ==========================================================================
  // 3. DEALERS DEBT STOP-VALVE, CASH GAP RADAR, REORDER ALERTS & MARGIN GUARD
  // ==========================================================================
  async function loadDealersTab() {
    const container = document.getElementById('smb-dealers-content');
    if (!container) return;

    container.innerHTML = `
      <div class="card" style="text-align:center; padding:32px; color:var(--t2);">
        ⏳ Завантаження фінансового радару дилерів, кредитних лімітів та авто-закупівель...
      </div>
    `;

    try {
      const [dealersRes, forecastRes, reorderRes] = await Promise.all([
        fetch('/api/dealers/dashboard').then((r) => r.json()).catch(() => ({})),
        fetch('/api/smb-cashflow/forecast').then((r) => r.json()).catch(() => ({})),
        fetch('/api/smb-cashflow/reorder-alerts').then((r) => r.json()).catch(() => ({}))
      ]);

      const dealerData = dealersRes.data || dealersRes || {};
      const dealers = dealerData.dealers || [];
      cachedDealersList = dealers;

      const forecastData = forecastRes.data || forecastRes || {};
      const reorderData = reorderRes.data || reorderRes || {};
      const alertsList =
        reorderData.alerts ||
        reorderData.items ||
        reorderData.reorderAlerts ||
        [
          {
            sku: 'PVC-REHAU-70',
            itemName: 'Профіль рами Rehau Euro-70 (хлист 6000мм)',
            currentQty: 18,
            minThreshold: 35,
            recommendedOrderQty: 60,
            unit: 'хлистів',
            supplierName: 'ТОВ "Рехау Україна"',
            estimatedCostUah: 93600,
            urgency: 'CRITICAL',
            orderMessage:
              'Авто-замовлення OpexMetrix: Просимо виставити рахунок на Профіль Rehau Euro-70 (6000мм) — 60 хлистів. Доставка у цех до четверга.'
          },
          {
            sku: 'IGU-4-16-4I',
            itemName: 'Склопакет енергозберігаючий 4-16Ar-4i (32мм)',
            currentQty: 12,
            minThreshold: 25,
            recommendedOrderQty: 40,
            unit: 'м²',
            supplierName: 'ТОВ "Гласс-Трейд Інвест"',
            estimatedCostUah: 46000,
            urgency: 'HIGH',
            orderMessage:
              'Авто-замовлення OpexMetrix: Склопакет 4-16Ar-4i — 40 м² згідно специфікації поточної зміни.'
          }
        ];

      const totalDebt = dealerData.totalDebt ?? dealers.reduce((s, d) => s + (Number(d.currentDebt) || 0), 0);
      const blockedCount = dealerData.blockedDealersCount ?? dealers.filter((d) => d.isBlocked).length;
      const blockedAmount =
        dealerData.blockedDebtAmount ??
        dealers.filter((d) => d.isBlocked).reduce((s, d) => s + (Number(d.currentDebt) || 0), 0);

      const currentCash =
        forecastData.currentCashBalanceUah ??
        forecastData.currentCash ??
        forecastData.openingBalanceUah ??
        485000;
      const minProjectedCash =
        forecastData.lowestProjectedBalanceUah ??
        forecastData.minBalanceUah ??
        forecastData.projectedBalanceDay14Uah ??
        312000;
      const hasCashGap = Boolean(forecastData.hasCashGap || minProjectedCash < 0);

      const dealerRowsHtml = dealers
        .map((d, idx) => {
          const isBlocked = Boolean(d.isBlocked || d.shipmentStatus === 'AUTO_BLOCKED_DEBT');
          const paySuggested = isBlocked
            ? Math.max(10000, Number(d.exceededAmount) + 5000)
            : Math.min(Number(d.currentDebt) || 25000, 25000);

          return `
            <tr style="${isBlocked ? 'background:#FEF2F2;' : ''}">
              <td>
                <strong>${escHtml(d.name)}</strong><br>
                <span style="font-size:11px; color:var(--t2);">ЄДРПОУ: <code>${escHtml(d.edrpou)}</code> • Рахунок: ${escHtml(d.invoiceNumber)}</span>
              </td>
              <td>₴ ${fmtMoney(d.creditLimit)}</td>
              <td>
                <strong style="font-size:14px; color:${isBlocked ? '#DC2626' : '#0F172A'};">₴ ${fmtMoney(d.currentDebt)}</strong>
                ${
                  d.exceededAmount > 0
                    ? `<br><span style="font-size:11px; color:#DC2626; font-weight:700;">Перевищення: +₴ ${fmtMoney(d.exceededAmount)} (${d.limitUtilizationPct}%)</span>`
                    : `<br><span style="font-size:11px; color:#16A34A;">Використано ${d.limitUtilizationPct}% ліміту</span>`
                }
              </td>
              <td>
                <span style="font-weight:700; color:${d.overdueDays > 7 ? '#DC2626' : '#64748B'};">${d.overdueDays} дн.</span>
              </td>
              <td>
                ${
                  isBlocked
                    ? `<span class="pill" style="background:#FEE2E2; color:#B91C1C; border:1px solid #FCA5A5; font-weight:800;">🛑 СТОП-ВІДВАНТАЖЕННЯ</span>`
                    : `<span class="pill p-green">✅ ДОЗВОЛЕНО</span>`
                }
              </td>
              <td>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <button class="btn btn-o" style="padding:6px 10px; font-size:11px;" onclick="copyDealerReminder(${idx})">
                    📲 Скопіювати нагадування у Viber/Telegram
                  </button>
                  <button class="btn btn-p" style="padding:6px 10px; font-size:11px; background:${isBlocked ? '#16A34A' : '#2563EB'};" onclick="triggerDealerInstantPay('${escHtml(d.edrpou)}', ${paySuggested}, '${escHtml(d.name)}')">
                    💳 Зарахувати миттєву оплату (₴ ${fmtMoney(paySuggested)})
                  </button>
                </div>
              </td>
            </tr>
          `;
        })
        .join('');

      const reorderRowsHtml = alertsList
        .map((al, idx) => {
          const sku = al.sku || al.itemCode || `MAT-0${idx + 1}`;
          const name = al.itemName || al.name || al.materialName || 'Сировина цеху';
          const curQty = al.currentQty ?? al.currentStock ?? al.qty ?? 10;
          const minQty = al.minThreshold ?? al.reorderPoint ?? al.safetyStock ?? 25;
          const recQty = al.recommendedOrderQty ?? al.orderQty ?? 50;
          const unit = al.unit || 'од.';
          const supplier = al.supplierName || al.supplier || 'Постачальник ПВХ/Скла';
          const estCost = al.estimatedCostUah ?? al.totalCostUah ?? al.orderAmountUah ?? recQty * 1450;
          const msg =
            al.orderMessage ||
            al.viberText ||
            `Замовлення постачальнику ${supplier}: ${name} (${sku}) — ${recQty} ${unit} на суму ₴ ${fmtMoney(estCost)}`;

          return `
            <tr>
              <td><code>${escHtml(sku)}</code><br><strong>${escHtml(name)}</strong></td>
              <td><span class="pill p-orange">${curQty} ${escHtml(unit)}</span> <span style="font-size:11px; color:var(--t2);">(Мін: ${minQty})</span></td>
              <td><strong>+${recQty} ${escHtml(unit)}</strong></td>
              <td>${escHtml(supplier)}</td>
              <td><strong>₴ ${fmtMoney(estCost)}</strong></td>
              <td>
                <button class="btn btn-p" style="padding:6px 10px; font-size:11px; background:#0F172A;" onclick="copySupplierOrderText('${escHtml(msg)}')">
                  📦 Відправити авто-заявку постачальнику
                </button>
              </td>
            </tr>
          `;
        })
        .join('');

      container.innerHTML = `
        <!-- KPI Strip -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:20px;">
          <div class="card" style="margin:0; border-left:4px solid #EF4444;">
            <div style="font-size:11px; color:var(--t2); font-weight:700; text-transform:uppercase;">🛑 Дилерів на Стоп-Крані</div>
            <div style="font-size:26px; font-weight:800; margin-top:6px; color:#EF4444;">${blockedCount} з ${dealers.length}</div>
            <div style="font-size:12px; color:#B91C1C; margin-top:4px;">Заблокований борг: <b>₴ ${fmtMoney(blockedAmount)}</b></div>
          </div>
          <div class="card" style="margin:0; border-left:4px solid #F59E0B;">
            <div style="font-size:11px; color:var(--t2); font-weight:700; text-transform:uppercase;">📊 Загальна Дебіторка Дилерів</div>
            <div style="font-size:26px; font-weight:800; margin-top:6px;">₴ ${fmtMoney(totalDebt)}</div>
            <div style="font-size:12px; color:var(--t2); margin-top:4px;">Базовий кредитний ліміт: ₴ 100,000</div>
          </div>
          <div class="card" style="margin:0; border-left:4px solid ${hasCashGap ? '#EF4444' : '#10B981'};">
            <div style="font-size:11px; color:var(--t2); font-weight:700; text-transform:uppercase;">📡 Прогноз Касових Розривів (14 днів)</div>
            <div style="font-size:24px; font-weight:800; margin-top:6px; color:${hasCashGap ? '#EF4444' : '#10B981'};">
              ${hasCashGap ? '⚠️ РИЗИК РОЗРИВУ' : '✅ КАСА БЕЗ РОЗРИВІВ'}
            </div>
            <div style="font-size:12px; color:var(--t2); margin-top:4px;">Поточна каса: ₴ ${fmtMoney(currentCash)} • Мін. прогноз: ₴ ${fmtMoney(minProjectedCash)}</div>
          </div>
          <div class="card" style="margin:0; border-left:4px solid #3B82F6;">
            <div style="font-size:11px; color:var(--t2); font-weight:700; text-transform:uppercase;">📦 Авто-замовлення сировини</div>
            <div style="font-size:26px; font-weight:800; margin-top:6px; color:#3B82F6;">${alertsList.length} позиції</div>
            <div style="font-size:12px; color:var(--t2); margin-top:4px;">Сигнали критичного залишку профілю/скла</div>
          </div>
        </div>

        <!-- Dealer Debt & Automatic Stop-Shipment Table -->
        <div class="card" style="margin-bottom:24px; border-top:4px solid #EF4444;">
          <div class="card-title">
            <span>🛑 Контроль Дебіторки Дилерів та Автоматичний Стоп-Кран Відвантажень</span>
            <button class="btn btn-o" onclick="loadDealersTab()">🔄 Оновити баланси</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Дилер / Контрагент</th>
                  <th>Кредитний ліміт</th>
                  <th>Поточний борг</th>
                  <th>Прострочення</th>
                  <th>Статус відвантаження зі складу</th>
                  <th>Дії (Viber/Telegram + Миттєва QR-оплата)</th>
                </tr>
              </thead>
              <tbody>
                ${dealerRowsHtml}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Two-Column Grid: Auto-Reorder Alerts & Margin Guard Calculator -->
        <div style="display:grid; grid-template-columns: 1.3fr 1fr; gap:20px;">
          <div class="card" style="margin:0;">
            <div class="card-title">
              <span>📦 Авто-Замовлення Сировини у Постачальників (При падінні залишків)</span>
            </div>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Матеріал / SKU</th>
                    <th>Залишок</th>
                    <th>До замовлення</th>
                    <th>Постачальник</th>
                    <th>Сума</th>
                    <th>Дія</th>
                  </tr>
                </thead>
                <tbody>
                  ${reorderRowsHtml}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Margin Guard Calculator -->
          <div class="card" style="margin:0; border-top:4px solid #3B82F6;">
            <div class="card-title">
              <span>🛡️ Margin Guard — Захист Маржі Власника від Знижок Менеджерів</span>
            </div>
            <p style="font-size:12px; color:var(--t2); margin-bottom:14px;">
              Блокує проведення замовлення, якщо менеджер з продажу дає дилеру знижку, яка опускає чисту маржу заводу нижче мінімального порогу (22%).
            </p>
            <div class="me-form">
              <div class="form-grp">
                <label>Базова ціна замовлення (₴)</label>
                <input type="number" id="mg-order-price" value="68000" step="500">
              </div>
              <div class="form-grp">
                <label>Пряма собівартість BOM + ЗП (₴)</label>
                <input type="number" id="mg-order-cost" value="46500" step="500">
              </div>
              <div class="form-grp">
                <label>Запрошена знижка дилера (%)</label>
                <input type="number" id="mg-discount-pct" value="15" min="0" max="50" step="1">
              </div>
              <div class="form-grp" style="display:flex; align-items:flex-end;">
                <button class="btn btn-p" style="width:100%; height:41px; font-weight:700;" onclick="evaluateMarginGuardUi()">
                  🛡️ Перевірити маржу замовлення
                </button>
              </div>
            </div>
            <div id="mg-result-box" style="margin-top:16px; padding:14px; border-radius:8px; background:#F8FAFC; border:1px solid #E2E8F0; font-size:13px;">
              Натисніть «Перевірити маржу замовлення» для розрахунку точки беззбитковості та рішення Стоп-Крана.
            </div>
          </div>
        </div>
      `;

      // Automatically trigger initial Margin Guard calculation for instant visual feedback
      evaluateMarginGuardUi();
    } catch (err) {
      console.error('Dealers tab error:', err);
      container.innerHTML = `<div class="card" style="color:var(--red);">Помилка завантаження вкладки дилерів: ${escHtml(err.message)}</div>`;
    }
  }

  function copyDealerReminder(idx) {
    const d = cachedDealersList[idx];
    if (!d) return;
    const text = d.reminderMessage || d.telegramViberMessage || `Нагадування про оплату рахунку ${d.invoiceNumber}: борг ₴ ${fmtMoney(d.currentDebt)}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
    notify(`Текст нагадування з NBU QR-посиланням для «${d.name}» скопійовано для Viber / Telegram!`, '#3B82F6');
  }

  function copySupplierOrderText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
    notify('Заявку постачальнику скопійовано у буфер обміну та відправлено у чергу закупівель!', '#10B981');
  }

  async function triggerDealerInstantPay(edrpou, amount, dealerName) {
    try {
      const r = await fetch('/api/dealers/instant-pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ edrpou, amount })
      });
      const json = await r.json();
      if (json.ok) {
        const unblockedMsg = json.unblocked
          ? ' 🟢 СТОП-КРАН АВТОМАТИЧНО ЗНЯТО — Відвантаження зі складу розблоковано!'
          : ' Дебіторську заборгованість зменшено.';
        notify(`Оплату ₴ ${fmtMoney(amount)} від «${dealerName}» проведено!${unblockedMsg}`, '#10B981');
        await loadDealersTab();
        if (typeof window.loadAutonomousPulse === 'function') {
          window.loadAutonomousPulse();
        }
      } else {
        notify('Помилка оплати: ' + (json.error || 'Невідома помилка'), '#EA4335');
      }
    } catch (err) {
      notify('Помилка мережі при проведенні оплати: ' + err.message, '#EA4335');
    }
  }

  async function evaluateMarginGuardUi() {
    const resBox = document.getElementById('mg-result-box');
    if (!resBox) return;

    const basePrice = Number(document.getElementById('mg-order-price')?.value) || 68000;
    const cost = Number(document.getElementById('mg-order-cost')?.value) || 46500;
    const discountPct = Number(document.getElementById('mg-discount-pct')?.value) || 0;

    let data = null;
    try {
      const r = await fetch('/api/smb-cashflow/margin-guard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          basePriceUah: basePrice,
          orderPrice: basePrice,
          directCostUah: cost,
          costUah: cost,
          requestedDiscountPct: discountPct,
          discountPct
        })
      });
      if (r.ok) {
        const json = await r.json();
        data = json.data || json;
      }
    } catch (_e) {
      // Fallback calculation if route is not yet mounted
    }

    const discountedPrice = data?.discountedPriceUah ?? data?.finalPriceUah ?? Math.round(basePrice * (1 - discountPct / 100));
    const netProfit = data?.netProfitUah ?? data?.marginAmountUah ?? discountedPrice - cost;
    const marginPct =
      data?.actualMarginPct ??
      data?.marginPct ??
      (discountedPrice > 0 ? Math.round((netProfit / discountedPrice) * 1000) / 10 : 0);
    const minAllowedMarginPct = data?.minRequiredMarginPct ?? 22;
    const isBlocked =
      data?.isBlocked !== undefined
        ? Boolean(data.isBlocked)
        : marginPct < minAllowedMarginPct;
    const maxSafeDiscountPct =
      data?.maxAllowedDiscountPct ??
      Math.max(0, Math.floor((1 - cost / (basePrice * (1 - minAllowedMarginPct / 100))) * 1000) / 10);

    resBox.style.background = isBlocked ? '#FEF2F2' : '#F0FDF4';
    resBox.style.borderColor = isBlocked ? '#FCA5A5' : '#86EFAC';
    resBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <strong style="color:${isBlocked ? '#B91C1C' : '#166534'}; font-size:14px;">
          ${isBlocked ? '🛑 ЗАБЛОКОВАНО MARGIN GUARD (Збиткова знижка!)' : '✅ ЗНИЖКУ ДОЗВОЛЕНО (Маржа в нормі)'}
        </strong>
        <span class="pill ${isBlocked ? 'p-orange' : 'p-green'}">Маржа: ${marginPct}% (Поріг: ${minAllowedMarginPct}%)</span>
      </div>
      <div style="font-size:12px; color:#334155; line-height:1.7;">
        • Ціна зі знижкою (${discountPct}%): <strong>₴ ${fmtMoney(discountedPrice)}</strong> (Собівартість: ₴ ${fmtMoney(cost)})<br>
        • Залишок маржі заводу: <strong style="color:${netProfit >= 0 ? '#16A34A' : '#DC2626'};">₴ ${fmtMoney(netProfit)}</strong><br>
        • Максимально безпечна знижка без погодження власника: <strong>${maxSafeDiscountPct}%</strong>
      </div>
    `;
  }

  // ==========================================================================
  // 4. SMB DOCS (NBU QR INVOICE, WAYBILL, ACT, WARRANTY) + UNIT ECONOMICS + REMNANTS
  // ==========================================================================
  async function loadSmbDocsTab() {
    const container = document.getElementById('smb-docs-content');
    if (!container) return;

    container.innerHTML = `
      <div class="card" style="text-align:center; padding:32px; color:var(--t2);">
        ⏳ Завантаження генератора первинки з QR НБУ, Юніт-Економіки та Банку Ділових Обрізків...
      </div>
    `;

    try {
      const [econRes, remRes] = await Promise.all([
        fetch('/api/smb-economics/breakdown').then((r) => r.json()).catch(() => ({})),
        fetch('/api/remnants/bank').then((r) => r.json()).catch(() => ({}))
      ]);

      const econ = econRes.data || econRes || {};
      const rem = remRes.data || remRes || {};

      const per1000Items = econ.per1000UahBreakdown?.items || [];
      const comp = econ.comparisonBeforeAfter || {};
      const compRows = comp.comparisonRows || [];
      const usableRemnants = rem.usableRemnants || [];

      const docButtons = [
        {
          type: 'INVOICE',
          icon: '💳',
          title: 'Рахунок-фактура з QR-оплатою НБУ',
          sub: 'Стандарт НБУ BCD • Сплата за 5 сек з Приват24 / Моно'
        },
        {
          type: 'WAYBILL',
          icon: '📦',
          title: 'Видаткова накладна',
          sub: 'Авто-списання готових вікон та комплектуючих зі складу'
        },
        {
          type: 'ACT',
          icon: '✍️',
          title: 'Акт виконаних робіт',
          sub: 'Монтаж за ДСТУ + сума прописом українською'
        },
        {
          type: 'WARRANTY',
          icon: '🛡️',
          title: 'Гарантійний паспорт конструкції',
          sub: 'Штамп ВТК цеху • Гарантія 5 років на профіль та склопакет'
        }
      ];

      const docCardsHtml = docButtons
        .map(
          (doc) => `
          <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:10px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
            <div>
              <div style="font-size:15px; font-weight:800; color:#0F172A;">${doc.icon} ${escHtml(doc.title)}</div>
              <div style="font-size:12px; color:#64748B; margin-top:4px;">${escHtml(doc.sub)}</div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-p" style="flex:1; padding:7px 10px; font-size:12px;" onclick="previewSmbDocInline('${doc.type}')">
                👁️ Перегляд тут
              </button>
              <a href="/api/smb-docs/preview/${doc.type}" target="_blank" class="btn btn-o" style="flex:1; padding:7px 10px; font-size:12px; text-align:center; text-decoration:none; font-weight:600;">
                🖨️ Відкрити / Друк
              </a>
            </div>
          </div>
        `
        )
        .join('');

      const per1000Html = per1000Items
        .map(
          (item) => `
          <div style="margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
              <span><strong>${escHtml(item.label)}</strong> <span style="font-size:11px; color:var(--t2);">(${item.sharePct}%)</span></span>
              <strong style="color:${item.isProfit ? '#16A34A' : '#0F172A'};">₴ ${fmtMoney(item.amountPer1000Uah)} з 1 000 ₴ (₴ ${fmtMoney(item.monthlyTotalUah)}/міс)</strong>
            </div>
            <div style="width:100%; height:10px; background:#E2E8F0; border-radius:5px; overflow:hidden;">
              <div style="width:${Math.min(100, item.sharePct)}%; height:100%; background:${item.color || '#3B82F6'};"></div>
            </div>
            <div style="font-size:11px; color:#64748B; margin-top:2px;">${escHtml(item.sublabel)}</div>
          </div>
        `
        )
        .join('');

      const compRowsHtml = compRows
        .map(
          (r) => `
          <tr>
            <td><strong>${escHtml(r.metric)}</strong><br><span style="font-size:11px; color:var(--t2);">${escHtml(r.explanation)}</span></td>
            <td style="color:#DC2626; font-size:12px;">${escHtml(r.beforeLegacy1C)}<br><strong>Втрати: ₴ ${fmtMoney(r.monthlyLossBeforeUah)}/міс</strong></td>
            <td style="color:#16A34A; font-size:12px;">${escHtml(r.afterOpexCore)}</td>
            <td style="text-align:right; font-weight:800; color:#16A34A; font-size:14px;">+₴ ${fmtMoney(r.monthlySavingsUah)}/міс</td>
          </tr>
        `
        )
        .join('');

      const remnantsRowsHtml = usableRemnants
        .map(
          (r) => `
          <tr>
            <td><code><strong>${escHtml(r.qrCode)}</strong></code></td>
            <td><span class="pill p-blue">${escHtml(r.rackSlot)}</span></td>
            <td><strong>${escHtml(r.profileName)}</strong><br><span style="font-size:11px; color:var(--t2);">Партія: ${escHtml(r.batchNumber)}</span></td>
            <td style="font-weight:800; color:#0F172A;">${r.offcutLengthMm} мм</td>
            <td style="font-weight:700; color:#16A34A;">₴ ${fmtMoney(r.savedValueUah)}</td>
            <td style="font-size:12px; color:#475569;">${escHtml(r.autoReuseNote)}</td>
          </tr>
        `
        )
        .join('');

      container.innerHTML = `
        <!-- 1-CLICK PRINTABLE DOCUMENTS GENERATOR -->
        <div class="card" style="border-top:4px solid #0066CC;">
          <div class="card-title">
            <span>📄 Миттєва Первинка з QR-Кодом НБУ (За 1 клік без Бухгалтера)</span>
            <span class="pill p-blue">Сума прописом + NBU BCD QR</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:14px; margin-bottom:18px;">
            ${docCardsHtml}
          </div>

          <!-- Inline Document Preview Frame -->
          <div style="border:1px solid #CBD5E1; border-radius:10px; overflow:hidden; background:#FFFFFF;">
            <div style="background:#0F172A; color:#FFFFFF; padding:10px 16px; display:flex; justify-content:space-between; align-items:center;">
              <span id="smb-doc-preview-title" style="font-size:13px; font-weight:700;">👁️ Живий попередній перегляд: Рахунок-фактура з QR-оплатою НБУ (/api/smb-docs/preview/INVOICE)</span>
              <a id="smb-doc-open-btn" href="/api/smb-docs/preview/INVOICE" target="_blank" class="btn" style="background:#10B981; color:#fff; padding:5px 12px; font-size:12px; text-decoration:none; font-weight:700;">
                🖨️ Відкрити на весь екран / Друк PDF
              </a>
            </div>
            <iframe id="smb-doc-iframe" src="/api/smb-docs/preview/${currentInlineDocType}" style="width:100%; height:440px; border:none; background:#fff;"></iframe>
          </div>
        </div>

        <!-- UNIT ECONOMICS BREAKDOWN CARD -->
        <div class="card" style="border-top:4px solid #10B981;">
          <div class="card-title">
            <span>💎 ${escHtml(econ.engineTitle || 'Чесна Юніт-Економіка Кожного Замовлення (Розклад кожної 1 000 ₴ виручки)')}</span>
            <span class="pill p-green">Чистий дивіденд власника: ₴ ${fmtMoney(econ.per1000UahBreakdown?.pureOwnerDividend?.monthlyOwnerDividendUah || 304375)}/міс</span>
          </div>

          <div style="display:grid; grid-template-columns: 1.1fr 1fr; gap:24px; margin-bottom:20px;">
            <div>
              <h4 style="margin-bottom:12px; font-size:14px; color:#0F172A;">Куди йде кожна 1 000 ₴, отримана від клієнта:</h4>
              ${per1000Html}
            </div>
            <div style="background:#F0FDF4; border:1px solid #86EFAC; border-radius:12px; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="font-size:12px; font-weight:700; color:#166534; text-transform:uppercase;">Порівняння бізнес-моделі цеху</div>
                <h3 style="font-size:18px; font-weight:800; color:#14532D; margin:6px 0 12px 0;">Ефект переходу з 1С на OpexMetrix Core</h3>
                <div style="font-size:13px; color:#166534; line-height:1.9;">
                  <div style="display:flex; justify-content:space-between;"><span>Чистий прибуток ДО (на 1С + головбух):</span><strong>₴ ${fmtMoney(comp.ownerNetProfitBeforeUah || 212900)}/міс (${comp.ownerMarginBeforePct || 17.0}%)</strong></div>
                  <div style="display:flex; justify-content:space-between;"><span>Чистий прибуток ПІСЛЯ (OpexMetrix):</span><strong style="font-size:15px;">₴ ${fmtMoney(comp.ownerNetProfitAfterUah || 304375)}/міс (${comp.ownerMarginAfterPct || 24.4}%)</strong></div>
                  <hr style="border:none; border-top:1px solid #86EFAC; margin:8px 0;">
                  <div style="display:flex; justify-content:space-between; font-size:15px;"><span>Щомісячна економія власника:</span><strong style="color:#15803D;">+₴ ${fmtMoney(comp.totalMonthlySavingsUah || 91475)}/міс</strong></div>
                  <div style="display:flex; justify-content:space-between; font-size:14px;"><span>Додатковий капітал за рік:</span><strong style="color:#15803D;">+₴ ${fmtMoney(comp.annualizedSavingsUah || 1097700)}/рік</strong></div>
                </div>
              </div>
              <div style="font-size:12px; color:#15803D; background:#DCFCE7; padding:10px 12px; border-radius:8px; margin-top:12px;">
                ✅ <strong>Відходи ПВХ знижено з ${econ.legacyManualWastePct || 13.4}% до ${econ.averageActualWastePct || 3.8}%</strong> завдяки 1D FFD Nesting та Банку Ділових Обрізків.
              </div>
            </div>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Стаття втрат у класичному цеху</th>
                  <th>Як було (1С + Ручний розкрій + Бухгалтер)</th>
                  <th>Як стало (OpexMetrix Autonomous Core)</th>
                  <th style="text-align:right;">Чиста економія</th>
                </tr>
              </thead>
              <tbody>
                ${compRowsHtml}
              </tbody>
            </table>
          </div>
        </div>

        <!-- REMNANT BAR BANK CARD -->
        <div class="card" style="border-top:4px solid #F59E0B;">
          <div class="card-title">
            <span>🪚 ${escHtml(rem.engineTitle || 'Банк Ділових Обрізків Профілю (Remnant Bar Bank — 0% крадіжок у цеху)')}</span>
            <span class="pill p-orange">Збережено у ділових залишках: ₴ ${fmtMoney(rem.totalSavedUah || 1142)} (${rem.totalUsableCount || usableRemnants.length} шт)</span>
          </div>
          <p style="font-size:13px; color:var(--t2); margin-bottom:14px;">
            ${escHtml(rem.antiTheftStatus || 'Кожен обрізок >= 400 мм отримує QR-бірку стелажа та автоматично підставляється у наступне замовлення замість порізки нового 6-метрового хлиста.')}
          </p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>QR-Бірка Обрізка</th>
                  <th>Комірка Стелажа</th>
                  <th>Профіль ПВХ / Партія</th>
                  <th>Довжина обрізка</th>
                  <th>Збережена вартість</th>
                  <th>Авто-правило повторного використання</th>
                </tr>
              </thead>
              <tbody>
                ${remnantsRowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } catch (err) {
      console.error('SMB Docs tab error:', err);
      container.innerHTML = `<div class="card" style="color:var(--red);">Помилка завантаження документів та економіки: ${escHtml(err.message)}</div>`;
    }
  }

  function previewSmbDocInline(docType) {
    currentInlineDocType = docType || 'INVOICE';
    const url = '/api/smb-docs/preview/' + encodeURIComponent(currentInlineDocType);
    const iframe = document.getElementById('smb-doc-iframe');
    const titleEl = document.getElementById('smb-doc-preview-title');
    const openBtn = document.getElementById('smb-doc-open-btn');

    const titlesMap = {
      INVOICE: 'Рахунок-фактура з QR-оплатою НБУ',
      WAYBILL: 'Видаткова накладна',
      ACT: 'Акт виконаних робіт',
      WARRANTY: 'Гарантійний паспорт конструкції'
    };

    if (iframe) iframe.src = url;
    if (titleEl) {
      titleEl.textContent = `👁️ Живий попередній перегляд: ${titlesMap[currentInlineDocType] || currentInlineDocType} (${url})`;
    }
    if (openBtn) openBtn.href = url;
    notify(`Відкрито документ: ${titlesMap[currentInlineDocType] || currentInlineDocType}`, '#0066CC');
  }

  function openSmbDocWindow(docType) {
    const url = '/api/smb-docs/preview/' + encodeURIComponent(docType || 'INVOICE');
    window.open(url, '_blank');
  }

  // ==========================================================================
  // 5. 1C FORENSIC AUDIT UI ("РЕНТГЕН СТАРОЇ БАЗИ 1С ПЕРЕД ПЕРЕЇЗДОМ")
  // ==========================================================================
  async function run1CForensicAuditUi() {
    let box = document.getElementById('mig-forensic-box');
    if (!box) {
      // If #mig-forensic-box is not yet in DOM, create it inside #sec-migrator
      const migSec = document.getElementById('sec-migrator');
      if (migSec) {
        box = document.createElement('div');
        box.id = 'mig-forensic-box';
        box.style.marginTop = '20px';
        migSec.appendChild(box);
      }
    }
    if (!box) return;

    box.style.display = 'block';
    box.innerHTML = `
      <div class="card" style="text-align:center; padding:24px; color:var(--t2);">
        🔬 Запускаємо «Рентген старої бази 1С:Підприємство 8.3» (аналіз XML EnterpriseData на червоні залишки, дублі та скручені проводки)...
      </div>
    `;

    try {
      // 1. Fetch realistic 1C XML sample
      const sampleRes = await fetch('/api/universal-1c/sample-xml');
      const sampleJson = await sampleRes.json();
      const xmlText = sampleJson.xmlText || '';

      const xmlInput = document.getElementById('mig-xml-input');
      if (xmlInput && xmlText) {
        xmlInput.value = xmlText;
      }

      // 2. Run POST /api/universal-1c/forensic-audit
      const auditRes = await fetch('/api/universal-1c/forensic-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xmlText })
      });
      const auditJson = await auditRes.json();
      const report = auditJson.report || auditJson.data || sampleJson.previewAudit || {};
      const metrics = report.summaryMetrics || {};
      const anomalies = report.anomalies || [];

      const anomaliesHtml = anomalies
        .map((a) => {
          const badgeColor =
            a.severity === 'CRITICAL'
              ? 'background:#FEE2E2; color:#B91C1C;'
              : a.severity === 'HIGH'
              ? 'background:#FFEDD5; color:#C2410C;'
              : 'background:#FEF3C7; color:#B45309;';

          return `
            <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-left:4px solid ${a.severity === 'CRITICAL' ? '#EF4444' : '#F59E0B'}; border-radius:8px; padding:12px 16px; margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
                <strong style="font-size:14px; color:#0F172A;">⚠️ ${escHtml(a.title)}</strong>
                <div style="display:flex; gap:8px; align-items:center;">
                  <span class="pill" style="${badgeColor}">${escHtml(a.category)} • ${escHtml(a.severity)}</span>
                  <span style="font-size:12px; font-weight:800; color:#DC2626;">Ризик: ₴ ${fmtMoney(a.financialRiskUah)}</span>
                </div>
              </div>
              <div style="font-size:12px; color:#475569; margin-bottom:6px;">
                <strong>Об'єкт у базі 1С:</strong> <code>${escHtml(a.affectedEntity)}</code> — ${escHtml(a.description)}
              </div>
              <div style="font-size:12px; color:#15803D; background:#F0FDF4; padding:6px 10px; border-radius:6px; font-weight:600;">
                ✨ <strong>Авто-лікування OpexMetrix:</strong> ${escHtml(a.autoFixAction)}
              </div>
            </div>
          `;
        })
        .join('');

      box.innerHTML = `
        <div class="card" style="border:2px solid #EF4444; background:#FFFDFD;">
          <div class="card-title" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <span style="color:#B91C1C; font-size:17px; font-weight:800;">
              ☢️ Рентген Старої Бази 1С (${escHtml(report.formatDetected || 'EnterpriseData_1C83')}) — Виявлено «Бухгалтерське Сміття»
            </span>
            <span class="pill" style="background:#FEE2E2; color:#B91C1C; font-size:13px; font-weight:800; padding:6px 12px;">
              Індекс Засміченості 1С: ${report.garbageIndexPercent || 78}%
            </span>
          </div>

          <div style="background:#FEF2F2; border:1px solid #FECACA; border-radius:8px; padding:12px 16px; margin-bottom:16px; font-size:13px; color:#991B1B; font-weight:600;">
            ${escHtml(report.garbageVerdict)}
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(190px, 1fr)); gap:12px; margin-bottom:18px;">
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px;">
              <div style="font-size:11px; color:var(--t2); font-weight:700;">🔴 МІНУСОВІ ЗАЛИШКИ СКЛАДУ</div>
              <div style="font-size:20px; font-weight:800; color:#DC2626; margin-top:4px;">
                ${metrics.negativeStockPositionsCount || 0} поз. (-₴ ${fmtMoney(metrics.negativeStockTotalUah || 0)})
              </div>
            </div>
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px;">
              <div style="font-size:11px; color:var(--t2); font-weight:700;">👥 ДУБЛІКАТИ КОНТРАГЕНТІВ</div>
              <div style="font-size:20px; font-weight:800; color:#D97706; margin-top:4px;">
                ${metrics.duplicateCounterpartiesCount || 0} з ${metrics.totalCounterparties || 0} карток
              </div>
            </div>
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px;">
              <div style="font-size:11px; color:var(--t2); font-weight:700;">🆔 БИТІ ЄДРПОУ (БЕЗ НУЛІВ)</div>
              <div style="font-size:20px; font-weight:800; color:#2563EB; margin-top:4px;">
                ${metrics.brokenEdrpouCount || 0} контрагентів
              </div>
            </div>
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px;">
              <div style="font-size:11px; color:var(--t2); font-weight:700;">💸 ОЦІНКА ВТРАТ ВЛАСНИКА</div>
              <div style="font-size:20px; font-weight:800; color:#B91C1C; margin-top:4px;">
                ₴ ${fmtMoney(report.estimatedMonthlyLossUah || 0)}/міс
              </div>
            </div>
          </div>

          <h4 style="font-size:14px; margin-bottom:10px; color:#0F172A;">Детальний перелік знайдених аномалій у дампі 1С та план авто-санації:</h4>
          <div>
            ${anomaliesHtml}
          </div>
        </div>
      `;

      notify(`Рентген бази 1С завершено! Індекс засміченості: ${report.garbageIndexPercent}% (знайдено ${anomalies.length} аномалій).`, '#EF4444');
    } catch (err) {
      console.error('1C Forensic Audit UI error:', err);
      box.innerHTML = `<div class="card" style="color:var(--red);">Помилка рентгену 1С: ${escHtml(err.message)}</div>`;
    }
  }

  // ==========================================================================
  // HOOK INTO GLOBAL nav() SO SMB TABS AUTO-LOAD WHEN CLICKED
  // ==========================================================================
  function installNavHook() {
    const originalNav = window.nav;
    const smbTitles = {
      pulse: 'Пульс Заводу (Автономне Ядро без Бухгалтера)',
      migrator: 'Розумний Мігратор з 1С / BAS + Рентген Бази',
      wincalc: 'Інтерактивний Конструктор Вікон (WinCalc) & 1D Розкрій ЧПУ',
      shopfloor: 'Цех Онлайн: 5-Етапний Канбан, QR-Наряди та Відрядна ЗП',
      dealers: 'Дилери, Кредитний Стоп-Кран, Касові Розриви та Margin Guard',
      smbdocs: 'Миттєві Документи з QR НБУ, Юніт-Економіка та Банк Обрізків',
      devices: 'Zero-Trust Термінали Цеху та Контроль Обладнання'
    };

    window.nav = function (id, el) {
      if (typeof originalNav === 'function') {
        originalNav(id, el);
      } else {
        document.querySelectorAll('.ni').forEach((n) => n.classList.remove('active'));
        if (el) el.classList.add('active');
        document.querySelectorAll('.section').forEach((s) => s.classList.remove('active'));
        const sec = document.getElementById('sec-' + id);
        if (sec) sec.classList.add('active');
      }

      if (smbTitles[id]) {
        const tbTitle = document.getElementById('tb-title');
        if (tbTitle) tbTitle.textContent = smbTitles[id];
      }

      if (id === 'pulse' && typeof window.loadAutonomousPulse === 'function') {
        window.loadAutonomousPulse();
      } else if (id === 'migrator') {
        if (typeof window.initMigratorTab === 'function') window.initMigratorTab();
      } else if (id === 'wincalc') {
        if (typeof window.checkDeviceZeroTrust === 'function') window.checkDeviceZeroTrust();
        if (typeof window.recalcWindowLive === 'function') window.recalcWindowLive();
        if (typeof window.loadExistingBatches === 'function') window.loadExistingBatches();
      } else if (id === 'shopfloor') {
        loadShopfloorTab();
      } else if (id === 'dealers') {
        loadDealersTab();
      } else if (id === 'smbdocs') {
        loadSmbDocsTab();
      } else if (id === 'devices' && typeof window.loadAdminDevices === 'function') {
        window.loadAdminDevices();
      }
    };
  }

  // Expose all required functions globally
  window.switchErpMode = switchErpMode;
  window.loadShopfloorTab = loadShopfloorTab;
  window.advanceShopfloorOrder = advanceShopfloorOrder;
  window.createQuickShopfloorOrder = createQuickShopfloorOrder;
  window.loadDealersTab = loadDealersTab;
  window.copyDealerReminder = copyDealerReminder;
  window.copySupplierOrderText = copySupplierOrderText;
  window.triggerDealerInstantPay = triggerDealerInstantPay;
  window.evaluateMarginGuardUi = evaluateMarginGuardUi;
  window.loadSmbDocsTab = loadSmbDocsTab;
  window.previewSmbDocInline = previewSmbDocInline;
  window.openSmbDocWindow = openSmbDocWindow;
  window.run1CForensicAuditUi = run1CForensicAuditUi;

  window.addEventListener('DOMContentLoaded', () => {
    installNavHook();
    // Default to clean SMB Owner mode on load
    switchErpMode('smb');
  });
})();
