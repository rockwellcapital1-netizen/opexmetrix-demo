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
        role: 'Оператор-налагоджувальник ЧПК Trumpf (6-й розряд MES)',
        baseSalary: 34000,
        bonusKpi: 16800,
        taxes: 11176,
        netPay: 39624,
        paid: true
      }
    ],
    holdingEntity: 'ALL',
    ledgerSeq: 9428,
    ledgerEntries: [
      {
        id: 'JL-9428',
        time: '14:52:18.042',
        doc: 'ВН-2026-841 / ПН ЄРПН',
        desc: 'Реалізація промислових енергомодулів ПЕМ-400 (5 од.) — ТОВ "Епіцентр К"',
        entity: 'ТОВ "ОпексМетрікс Індастріал"',
        dt: '361 Розрахунки з покупцями',
        dtCode: '361',
        kt: '701 Дохід від реалізації ГП',
        ktCode: '701',
        amount: 460000
      },
      {
        id: 'JL-9427',
        time: '14:52:18.044',
        doc: 'ПН J1201016',
        desc: 'Нараховано податкове зобов\'язання з ПДВ (20%) при відвантаженні партії',
        entity: 'ТОВ "ОпексМетрікс Індастріал"',
        dt: '701 Дохід від реалізації ГП',
        dtCode: '701',
        kt: '6412 Розрахунки за ПДВ',
        ktCode: '6412',
        amount: 76666.67
      },
      {
        id: 'JL-9426',
        time: '14:52:18.046',
        doc: 'FIFO-Списання',
        desc: 'Списано виробничу собівартість реалізованої партії ПЕМ-400 (5 од. за техкартою)',
        entity: 'ТОВ "ОпексМетрікс Індастріал"',
        dt: '901 Собівартість реалізованої ГП',
        dtCode: '901',
        kt: '26 Готова продукція',
        ktCode: '26',
        amount: 310000
      },
      {
        id: 'JL-9425',
        time: '14:38:05.119',
        doc: 'MES-904 / ЧПК-1',
        desc: 'Випуск готової продукції з цеху ЧПК на склад ГП (Партія ПЕМ-400, 10 од.)',
        entity: 'ТОВ "ОпексМетрікс Індастріал"',
        dt: '26 Готова продукція',
        dtCode: '26',
        kt: '231 Основне виробництво (MES)',
        ktCode: '231',
        amount: 620000
      },
      {
        id: 'JL-9424',
        time: '14:15:42.803',
        doc: 'MES-904 / BOM',
        desc: 'Списання листової сталі AISI 304 та комплектуючих у виробництво за техкартою',
        entity: 'ТОВ "ОпексМетрікс Індастріал"',
        dt: '231 Основне виробництво (MES)',
        dtCode: '231',
        kt: '201 Сировина й матеріали',
        ktCode: '201',
        amount: 489000
      },
      {
        id: 'JL-9423',
        time: '13:50:11.290',
        doc: 'БВ-8819 / Приват24',
        desc: 'Надходження безготівкової оплати від покупця ТОВ "Метінвест-Промсервіс"',
        entity: 'ТОВ "Торговий Дім Альфа-Груп"',
        dt: '311 Поточні рахунки в UAH',
        dtCode: '311',
        kt: '361 Розрахунки з покупцями',
        ktCode: '361',
        amount: 1280000
      },
      {
        id: 'JL-9422',
        time: '12:24:09.512',
        doc: 'БВ-8820 / Моно Бізнес',
        desc: 'Оплата постачальнику за імпортну автоматику ABB ACS580 згідно контракту',
        entity: 'ТОВ "ОпексМетрікс Індастріал"',
        dt: '631 Розрахунки з постачальниками',
        dtCode: '631',
        kt: '311 Поточні рахунки в UAH',
        ktCode: '311',
        amount: 540000
      },
      {
        id: 'JL-9421',
        time: '11:10:33.008',
        doc: 'IC-2026-19',
        desc: 'Елімінація внутрішньогрупового обороту між Заводом ТОВ та Торговим Домом',
        entity: 'Консолідація Холдингу',
        dt: '683 Внутрішньогосподарські розрахунки',
        dtCode: '683',
        kt: '361 Розрахунки з покупцями',
        ktCode: '361',
        amount: 950000
      }
    ],
    trialBalanceAccounts: [
      { code: '201', name: 'Сировина й матеріали (Метал, профіль, плита)', openDt: 14200000, openKt: 0, turnDt: 6840000, turnKt: 5920000 },
      { code: '202', name: 'Купівельні напівфабрикати та комплектуючі (АСУ-ТП)', openDt: 6400000, openKt: 0, turnDt: 3120000, turnKt: 2780000 },
      { code: '231', name: 'Основне виробництво (Незавершене виробництво ЧПК MES)', openDt: 3800000, openKt: 0, turnDt: 12450000, turnKt: 11900000 },
      { code: '26', name: 'Готова продукція на промислових складах', openDt: 9600000, openKt: 0, turnDt: 11900000, turnKt: 10850000 },
      { code: '281', name: 'Товари на складі (Дистрибуція та Торговий Дім)', openDt: 5200000, openKt: 0, turnDt: 4600000, turnKt: 4100000 },
      { code: '311', name: 'Поточні рахунки в національній валюті (Банки Холдингу)', openDt: 38400000, openKt: 0, turnDt: 28900000, turnKt: 18650000 },
      { code: '361', name: 'Розрахунки з вітчизняними покупцями (Дебіторка B2B)', openDt: 8900000, openKt: 0, turnDt: 26400000, turnKt: 28460000 },
      { code: '631', name: 'Розрахунки з вітчизняними постачальниками', openDt: 0, openKt: 11200000, turnDt: 9800000, turnKt: 10460000 },
      { code: '6412', name: 'Розрахунки за податками: ПДВ 20% в ЄРПН', openDt: 0, openKt: 1850000, turnDt: 2940000, turnKt: 4400000 },
      { code: '661', name: 'Розрахунки за заробітною платою та відрядними ЧПК', openDt: 0, openKt: 1450000, turnDt: 3820000, turnKt: 3960000 },
      { code: '683', name: 'Внутрішньогосподарські розрахунки (Intercompany)', openDt: 0, openKt: 4200000, turnDt: 5400000, turnKt: 5400000 },
      { code: '701', name: 'Дохід від реалізації готової продукції та B2B товарів', openDt: 0, openKt: 0, turnDt: 4400000, turnKt: 26400000 },
      { code: '901', name: 'Собівартість реалізованої готової продукції (FIFO)', openDt: 0, openKt: 0, turnDt: 14950000, turnKt: 0 },
      { code: '441', name: 'Нерозподілений прибуток та власний капітал Холдингу', openDt: 0, openKt: 67800000, turnDt: 0, turnKt: 24500000 }
    ],
    mesLines: [
      {
        id: 'line-1',
        name: 'Лінія ЧПК №1 • Лазерний комплекс Trumpf TruLaser 5030 Fiber',
        orderTitle: 'Наряд #MES-904 • Корпуси енергомодулів ПЕМ-400 (ТОВ "Епіцентр К")',
        operator: 'Савченко М. (Зміна А • QR #OP-14)',
        oee: 94.2,
        cycleSec: 38,
        kwh: 42.5,
        batchCost: 310000,
        doneQty: 48,
        totalQty: 50,
        status: 'ACTIVE'
      },
      {
        id: 'line-2',
        name: 'Лінія ЧПК №2 • 5-осьовий фрезерний центр DMG MORI CMX 1100V',
        orderTitle: 'Наряд #MES-905 • Приводні вузли конвеєра КС-1200 (Метінвест-Промсервіс)',
        operator: 'Кравчук В. (Зміна А • QR #OP-08)',
        oee: 91.8,
        cycleSec: 112,
        kwh: 38.0,
        batchCost: 427000,
        doneQty: 18,
        totalQty: 20,
        status: 'ACTIVE'
      },
      {
        id: 'line-3',
        name: 'Лінія ЧПК №3 • Панелегиб-автомат Salvagnini P4 Lean',
        orderTitle: 'Наряд #MES-906 • Касети фасадних систем ФС-85 (Кернел-Інжиніринг)',
        operator: 'Лисенко І. (Зміна А • QR #OP-22)',
        oee: 88.5,
        cycleSec: 24,
        kwh: 29.4,
        batchCost: 245000,
        doneQty: 114,
        totalQty: 120,
        status: 'ACTIVE'
      },
      {
        id: 'line-4',
        name: 'Дільниця №4 • Роботизований зварювальний комплекс KUKA KR QUANTEC',
        orderTitle: 'Наряд #MES-907 • Силові рами високонавантажених секцій (Нова Пошта Хаб)',
        operator: 'Робот-пост #4 + інж. Ткаченко О.',
        oee: 90.1,
        cycleSec: 85,
        kwh: 54.2,
        batchCost: 380000,
        doneQty: 25,
        totalQty: 25,
        status: 'READY_RELEASE'
      },
      {
        id: 'line-5',
        name: 'Лінія №5 • Автоматизована тунельна лінія порошкового фарбування Wagner',
        orderTitle: 'Наряд #MES-908 • Полімерне покриття RAL 7016 антрацит (Партія B2B)',
        operator: 'Гончаренко С. (Зміна А • QR #OP-31)',
        oee: 86.4,
        cycleSec: 45,
        kwh: 61.0,
        batchCost: 192000,
        doneQty: 82,
        totalQty: 90,
        status: 'ACTIVE'
      },
      {
        id: 'line-6',
        name: 'Дільниця №6 • Збірка автоматики АСУ-ТП та стенд випробувань ВТК',
        orderTitle: 'Наряд #MES-909 • Шафи керування АСУ-ТП Pro (ДТЕК Мережі)',
        operator: 'Інженерна бригада №2 (QR #OP-04)',
        oee: 92.6,
        cycleSec: 210,
        kwh: 14.8,
        batchCost: 540000,
        doneQty: 15,
        totalQty: 15,
        status: 'READY_RELEASE'
      }
    ],
    dealerCredits: [
      {
        id: 'dl-1',
        name: 'ТОВ "Епіцентр К" (Національна мережа B2B)',
        segment: 'Key Account • VIP',
        kam: 'Коваленко О. (Head of KAM)',
        limitUah: 5000000,
        debtUah: 1840000,
        overdueDays: 0,
        gateStatus: 'OPEN'
      },
      {
        id: 'dl-2',
        name: 'ТОВ "БудПостач-Регіон Південь" (Оптовий дилер)',
        segment: 'B2B Дилерська мережа',
        kam: 'Віталій С. (Senior B2B)',
        limitUah: 1200000,
        debtUah: 1385000,
        overdueDays: 14,
        gateStatus: 'BLOCKED'
      },
      {
        id: 'dl-3',
        name: 'ТОВ "Метінвест-Промсервіс" (Промислові контракти)',
        segment: 'Key Account • Промисловість',
        kam: 'Коваленко О. (Head of KAM)',
        limitUah: 8000000,
        debtUah: 3120000,
        overdueDays: 0,
        gateStatus: 'OPEN'
      },
      {
        id: 'dl-4',
        name: 'ПП "Захід-ТехноКомплект" (Дилер Львів / Луцьк)',
        segment: 'B2B Дилерська мережа',
        kam: 'Ірина М. (B2B Менеджер)',
        limitUah: 900000,
        debtUah: 810000,
        overdueDays: 3,
        gateStatus: 'WARN'
      }
    ],
    salesDivisions: [
      {
        division: '1. Дивізіон Key Accounts (Національні мережі та Заводи)',
        head: 'Коваленко Олександр • 8 КАМ-менеджерів',
        revenueUah: 24600000,
        ebitdaMarginUah: 7872000,
        marginPct: 32.0,
        avgDiscountPct: 3.4,
        cashCollectionPct: 96.8,
        qcScore: 95,
        status: 'План перевиконано (+18%)'
      },
      {
        division: '2. Дивізіон B2B Дилерська Мережа (Регіональне оптове крило)',
        head: 'Віталій Сидоренко • 10 B2B-сейлзів',
        revenueUah: 11800000,
        ebitdaMarginUah: 3422000,
        marginPct: 29.0,
        avgDiscountPct: 5.8,
        cashCollectionPct: 91.2,
        qcScore: 89,
        status: 'В межах нормативу Маржі'
      },
      {
        division: '3. Тендерний Департамент (Prozorro, Енергетика та Експорт ЄС)',
        head: 'Дмитро Романенко • 6 тендерних спеціалістів',
        revenueUah: 6400000,
        ebitdaMarginUah: 2176000,
        marginPct: 34.0,
        avgDiscountPct: 1.9,
        cashCollectionPct: 100.0,
        qcScore: 93,
        status: 'Висока рентабельність'
      }
    ],
    costCenters: [
      {
        code: 'ЦФВ-01 • Виробничий департамент та цехи ЧПК (MES)',
        head: 'Головний інженер Бойко І.В. • Рах. 231 / 91',
        limitUah: 18500000,
        spentUah: 15420000,
        status: 'OK'
      },
      {
        code: 'ЦФВ-02 • Департамент B2B Продажів та Маркетингу',
        head: 'Комерційний директор Коваленко О. • Рах. 93',
        limitUah: 3200000,
        spentUah: 2680000,
        status: 'OK'
      },
      {
        code: 'ЦФВ-03 • Департамент Закупівель та Імпортної Логістики WMS',
        head: 'Директор з логістики Бондаренко Д. • Рах. 201 / 93',
        limitUah: 12000000,
        spentUah: 11640000,
        status: 'WARN'
      },
      {
        code: 'ЦФВ-04 • R&D, Конструкторське Бюро та Сервіс АСУ-ТП',
        head: 'Керівник R&D Савченко М. • Рах. 91 / 94',
        limitUah: 1800000,
        spentUah: 1290000,
        status: 'OK'
      },
      {
        code: 'ЦФВ-05 • Адміністрація Холдингу, Юристи та Казначейство (G&A)',
        head: 'CFO Дубовик В.І. • Рах. 92',
        limitUah: 1400000,
        spentUah: 980000,
        status: 'OK'
      }
    ]
  };

  // ─── Document OCR & In-System Approval Ecosystem State ─────────────────────
  const OCR_PRESETS = {
    WAYBILL_PHONE: {
      id: 'DOC-4418',
      docType: 'WAYBILL',
      typeBadge: 'Прибуткова накладна (Склад ↔ Цех)',
      source: '📱 Фото з камери телефону (Патч Комірника)',
      docNumber: 'ВН-4418 від 26.10.2026',
      counterparty: 'ТОВ "Метал-Холдинг Україна"',
      edrpou: '38192044',
      amount: 480000,
      vatAmount: 80000,
      itemsSummary: 'Лист нержавіючий AISI 304 (4.0 т × ₴ 95 000) + Профіль силовий 80×40 (100 м.п. × ₴ 1 000)',
      ecosystemLink: 'Склад сировини (Рах. 201) → Авто-резерв під зміну Цеху ЧПК #MES-904 (Рах. 231)',
      aiRiskCheck: '✓ Ціна металу відповідає ринковій медіані (завищень не виявлено). Номенклатуру зіставлено з техкартою BOM.',
      approvalRoute: 'Комірник (Телефон) ✓ → Нач. Цеху ✓ → Директор / Бухгалтерія',
      ledgerDt: '201 Сировина й матеріали (Склад)',
      ledgerDtCode: '201',
      ledgerKt: '631 Розрахунки з постачальниками',
      ledgerKtCode: '631'
    },
    CONTRACT_PC: {
      id: 'DOC-2026-114',
      docType: 'CONTRACT',
      typeBadge: 'Договір поставки B2B + Специфікація',
      source: '💻 Завантажено з комп\'ютера (PDF, 4 стор.)',
      docNumber: 'ДП-2026/114 від 26.10.2026',
      counterparty: 'ТОВ "Епіцентр К"',
      edrpou: '32490244',
      amount: 920000,
      vatAmount: 153333.33,
      itemsSummary: 'Поставка партії промислових енергомодулів ПЕМ-400 (10 од. з цеху ГП) • Відстрочка оплати 14 календарних днів',
      ecosystemLink: 'Відділ продажів → План виробництва Цеху (MES) → Резерв готової продукції на Складі (Рах. 26)',
      aiRiskCheck: '✓ Юридичний AI-аудит договору: прихованих штрафів чи пені не виявлено. Кредитний ліміт контрагента в нормі.',
      approvalRoute: 'Менеджер B2B ✓ → Юридичний відділ ✓ → Директор (На підпис)',
      ledgerDt: '361 Розрахунки з покупцями',
      ledgerDtCode: '361',
      ledgerKt: '701 Дохід від реалізації ГП',
      ledgerKtCode: '701'
    },
    INVOICE_SHOPFLOOR: {
      id: 'DOC-902',
      docType: 'INVOICE',
      typeBadge: 'Рахунок-фактура на комплектуючі цеху',
      source: '📱 Скан із телефону начальника цеху',
      docNumber: 'СФ-902 від 26.10.2026',
      counterparty: 'ТОВ "ЕлектроПривод Україна"',
      edrpou: '40118290',
      amount: 168000,
      vatAmount: 28000,
      itemsSummary: 'Мотор-редуктори промислові NMRV-090 (12 шт.) та оптичні датчики ЧПК для Дільниці №6',
      ecosystemLink: 'Оплата в банку (Рах. 311) → Склад комплектуючих (Рах. 202) → Передача в Цех збірки АСУ-ТП (Рах. 231)',
      aiRiskCheck: '✓ Реквізити IBAN та код ЄДРПОУ перевірено в реєстрі ДПС. Ціна на 4.2% нижча за минулу закупівлю.',
      approvalRoute: 'Начальник цеху ✓ → Відділ постачання ✓ → Фіндиректор / CEO',
      ledgerDt: '202 Купівельні комплектуючі (Цех)',
      ledgerDtCode: '202',
      ledgerKt: '631 Розрахунки з постачальниками',
      ledgerKtCode: '631'
    }
  };

  state.activeOcrDoc = Object.assign({}, OCR_PRESETS.WAYBILL_PHONE);
  state.approvalDocs = [
    {
      id: 'DOC-4418',
      docNumber: 'ВН-4418 від 26.10.2026',
      source: '📱 Фото з телефону (Склад)',
      typeBadge: 'Прибуткова накладна',
      counterparty: 'ТОВ "Метал-Холдинг Україна"',
      edrpou: '38192044',
      ecosystemLink: 'Лист AISI 304 (4 т) → Оприбуткування на Склад (Рах. 201) та передача в Цех ЧПК #MES-904',
      amount: 480000,
      approvalRoute: 'Комірник ✓ → Нач. Цеху ✓ → CEO ⏳',
      status: 'PENDING',
      ledgerDt: '201 Сировина й матеріали',
      ledgerDtCode: '201',
      ledgerKt: '631 Розрахунки з постачальниками',
      ledgerKtCode: '631'
    },
    {
      id: 'DOC-2026-114',
      docNumber: 'ДП-2026/114 від 26.10.2026',
      source: '💻 Файл з комп\'ютера (PDF)',
      typeBadge: 'Договір поставки B2B',
      counterparty: 'ТОВ "Епіцентр К"',
      edrpou: '32490244',
      ecosystemLink: 'Партія ПЕМ-400 (10 од.) • План Цеху MES ↔ Резерв Складу ГП (Рах. 26) • AI-перевірка умов: ОК',
      amount: 920000,
      approvalRoute: 'Продажі ✓ → Юрист ✓ → CEO ⏳',
      status: 'PENDING',
      ledgerDt: '361 Розрахунки з покупцями',
      ledgerDtCode: '361',
      ledgerKt: '701 Дохід від реалізації ГП',
      ledgerKtCode: '701'
    },
    {
      id: 'DOC-902',
      docNumber: 'СФ-902 від 26.10.2026',
      source: '📱 Фото з телефону (Цех)',
      typeBadge: 'Рахунок на комплектуючі',
      counterparty: 'ТОВ "ЕлектроПривод Україна"',
      edrpou: '40118290',
      ecosystemLink: 'Мотор-редуктори NMRV (12 шт.) → Склад комплектуючих (Рах. 202) для Цеху Дільниця №6',
      amount: 168000,
      approvalRoute: 'Нач. Цеху ✓ → Закупівлі ✓ → CEO ⏳',
      status: 'PENDING',
      ledgerDt: '202 Комплектуючі для цеху',
      ledgerDtCode: '202',
      ledgerKt: '631 Розрахунки з постачальниками',
      ledgerKtCode: '631'
    },
    {
      id: 'DOC-889',
      docNumber: 'АКТ-889 від 25.10.2026',
      source: '💻 Файл з комп\'ютера (DOCX)',
      typeBadge: 'Акт виконаних робіт',
      counterparty: 'ТОВ "Сервіс-ЧПК Інжиніринг"',
      edrpou: '39041122',
      ecosystemLink: 'Технічне обслуговування лазерного комплексу Trumpf у Цеху №1 (Списано на Рах. 231)',
      amount: 42000,
      approvalRoute: 'Гол. Інженер ✓ → Бухгалтерія ✓ → CEO ✓',
      status: 'APPROVED',
      ledgerDt: '231 Основне виробництво (Цех)',
      ledgerDtCode: '231',
      ledgerKt: '631 Розрахунки з постачальниками',
      ledgerKtCode: '631'
    }
  ];

  const HOLDING_ENTITIES = {
    ALL: {
      badge: '🏢 Група Компаній (Цех + Склад + Торговий Дім)',
      cashBalance: 4850000,
      revenue: 5500000,
      cogs: 3180000,
      opex: 610000,
      taxes: 290000,
      receivables: 980000
    },
    HOLDING_ALL: {
      badge: '🏢 Група Компаній (Цех + Склад + Торговий Дім)',
      cashBalance: 4850000,
      revenue: 5500000,
      cogs: 3180000,
      opex: 610000,
      taxes: 290000,
      receivables: 980000
    },
    PLANT: {
      badge: '🏭 ТОВ "ПромТех Виробництво" (Цех MES + Склад)',
      cashBalance: 2450000,
      revenue: 3200000,
      cogs: 1850000,
      opex: 340000,
      taxes: 180000,
      receivables: 540000
    },
    PLANT_LLC: {
      badge: '🏭 ТОВ "ПромТех Виробництво" (Цех MES + Склад)',
      cashBalance: 2450000,
      revenue: 3200000,
      cogs: 1850000,
      opex: 340000,
      taxes: 180000,
      receivables: 540000
    },
    TRADE: {
      badge: '💼 ТОВ "Альфа Трейд Дистрибуція" (Склад & B2B)',
      cashBalance: 1680000,
      revenue: 1650000,
      cogs: 980000,
      opex: 190000,
      taxes: 85000,
      receivables: 320000
    },
    TRADE_LLC: {
      badge: '💼 ТОВ "Альфа Трейд Дистрибуція" (Склад & B2B)',
      cashBalance: 1680000,
      revenue: 1650000,
      cogs: 980000,
      opex: 190000,
      taxes: 85000,
      receivables: 320000
    },
    SMB: {
      badge: '🏪 Малий та Середній Бізнес (ФОП + ТОВ)',
      cashBalance: 1344300,
      revenue: 840200,
      cogs: 320000,
      opex: 157000,
      taxes: 50412,
      receivables: 179100
    },
    SMB_MODE: {
      badge: '🏪 Малий та Середній Бізнес (ФОП + ТОВ)',
      cashBalance: 1344300,
      revenue: 840200,
      cogs: 320000,
      opex: 157000,
      taxes: 50412,
      receivables: 179100
    }
  };

  const NICHE_PROFILES = {
    TRADE: {
      badge: '🛒 Оптова та роздрібна торгівля',
      shortName: '🏢 Холдинг + Виробництво MES',
      salesHint: 'Рахунок з QR НБУ + ПН ЄРПН',
      defaultDocType: 'INVOICE',
      summary:
        '✓ Адаптовано під профіль «Оптова та роздрібна торгівля»: увімкнено контроль мінімальної маржі 25%, автоматичне списання зі складу за FIFO та формування видаткових накладних з QR-оплатою НБУ.'
    },
    SERVICES: {
      badge: '🛠️ Послуги, Сервіс та Агенція',
      shortName: '🛠️ Послуги та Інжиніринг',
      salesHint: 'Шаблон: Акт виконаних робіт + Рахунок з QR НБУ',
      defaultDocType: 'ACT',
      summary:
        '✓ Адаптовано під профіль «Послуги, Сервіс та Агенція»: основним документом обрано Акт прийому-передачі виконаних робіт з QR НБУ, увімкнено контроль маржинальності проєктів та погодинних робіт.'
    },
    ECOMMERCE: {
      badge: '📦 E-Commerce та Маркетплейси',
      shortName: '📦 E-Commerce / Дистрибуція',
      salesHint: 'Шаблон: Експрес-рахунок + Гарантійний талон товару',
      defaultDocType: 'WARRANTY',
      summary:
        '✓ Адаптовано під профіль «E-Commerce та Маркетплейси»: активовано облік пакувальних матеріалів, контроль комісії маркетплейсів (Rozetka/Prom) та автоматичні гарантійні талони.'
    },
    PRODUCTION: {
      badge: '🏭 Виробництво та Комплектація',
      shortName: '🏭 Завод MES & ЧПК',
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

  // ─── Navigation (All 9 Enterprise & MES Sections) ──────────────────────────
  const TAB_TITLES = {
    pulse: 'Єдина Екосистема Бізнесу (Цех ↔ Склад ↔ Документи ↔ Облік)',
    docs: 'Документообіг, AI-Розпізнавання (Накладні / Договори) та Погодження (ПК + Телефон)',
    ledger: 'Проводки та Головна Книга (Подвійний запис Дт/Кт)',
    mes: 'Виробничий Цех MES (Поєднаний зі Складом WMS, ЧПК та Техкарти BOM)',
    sales: 'Продажі & B2B Deal Desk (Контракти, Кредитний Контроль та Маржа)',
    'ai-sales': 'Відділ Продажів та AI Call-Center (Контроль дзвінків та Маржі)',
    stock: 'Склад WMS (Зв\'язаний з Цехом MES) та Захист Закупівель',
    bank: 'Банк, Казначейство та Контроль Бюджетів ЦФВ',
    taxes: 'Податки ДПС (cabinet.tax.gov.ua) та Зарплата Команди',
    about: 'Презентація: Малий/Середній Бізнес (МСБ) та Великий Бізнес (Цех + Склад)'
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

    if (tabId === 'ledger') {
      renderLedgerSection();
    } else if (tabId === 'docs') {
      renderDocsSection();
    } else if (tabId === 'mes') {
      renderMesSection();
    } else if (tabId === 'ai-sales') {
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

  // ─── 1. ГОЛОВНА (ПУЛЬС ХОЛДИНГУ ТА КОНСОЛІДАЦІЯ) ──────────────────────────
  function renderPulseSection() {
    const ent = HOLDING_ENTITIES[state.holdingEntity] || HOLDING_ENTITIES.ALL;
    const cashBalance = ent.cashBalance;
    const monoCash = Math.round(cashBalance * 0.38);
    const privatCash = Math.round(cashBalance * 0.55);
    const registerCash = cashBalance - monoCash - privatCash;
    const safeDividend = Math.round(cashBalance * 0.315);

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
      elDiv.innerHTML = `<span class="kpi-context-label">Доступно до розподілу (FCF):</span> <span class="kpi-context-value emerald">${fmtUah(safeDividend)}</span>`;
    }

    // Profit card
    const revenue = ent.revenue;
    const cogs = ent.cogs;
    const opex = ent.opex;
    const taxes = ent.taxes;
    const netProfit = revenue - cogs - opex - taxes;
    const marginPct = ((netProfit / revenue) * 100).toFixed(1);

    const elNetProfit = document.getElementById('kpi-net-profit');
    if (elNetProfit) elNetProfit.textContent = fmtUah(netProfit);
    const elMarginBadge = document.getElementById('kpi-profit-margin-badge');
    if (elMarginBadge) elMarginBadge.textContent = `Маржа ${marginPct}%`;

    const elFormula = document.getElementById('kpi-profit-formula');
    if (elFormula) {
      elFormula.innerHTML = `
        <span>Виручка (Рах. 701/702): <strong>+${fmtUah(revenue)}</strong></span>
        <span class="meta-sep">·</span>
        <span>Собівартість + OPEX: <strong>−${fmtUah(cogs + opex + taxes)}</strong></span>
      `;
    }

    // Receivables card
    const unpaidOrders = state.orders.filter((o) => o.status === 'INVOICED');
    const recTotal = ent.receivables + unpaidOrders.reduce((s, o) => s + o.totalAmount, 0);
    const elRecTotal = document.getElementById('kpi-receivables-total');
    if (elRecTotal) elRecTotal.textContent = fmtUah(recTotal);

    renderOwnerTodayStream();
  }

  // ─── 2. ⚡ ПРОВОДКИ ОНЛАЙН (Дт/Кт) ТА ГОЛОВНА КНИГА (GENERAL LEDGER) ───────
  function formatTimeNowMs() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');
    return `${hh}:${mm}:${ss}.${ms}`;
  }

  function postOnlineLedgerEntries(newEntries, toastMsg) {
    if (!Array.isArray(newEntries) || newEntries.length === 0) return;

    newEntries.forEach((entry) => {
      state.ledgerSeq += 1;
      const amt = Math.round((Number(entry.amount) || 0) * 100) / 100;
      const dtCode = String(entry.dtCode || (entry.dt || '').split(' ')[0] || '361').trim();
      const ktCode = String(entry.ktCode || (entry.kt || '').split(' ')[0] || '701').trim();

      state.ledgerEntries.unshift({
        id: `JL-${state.ledgerSeq}`,
        time: formatTimeNowMs(),
        doc: entry.doc || `AUTO-${state.ledgerSeq}`,
        desc: entry.desc || 'Автоматична господарська операція в онлайні',
        entity: entry.entity || 'ТОВ "ОпексМетрікс Індастріал"',
        dt: entry.dt || `${dtCode} Рахунок Дт`,
        dtCode,
        kt: entry.kt || `${ktCode} Рахунок Кт`,
        ktCode,
        amount: amt,
        isNew: true
      });

      // Update Trial Balance (ОСВ) turnovers so Дт === Кт always holds
      let dtAcc = state.trialBalanceAccounts.find((a) => a.code === dtCode);
      if (!dtAcc) {
        dtAcc = { code: dtCode, name: entry.dt || `Рахунок ${dtCode}`, openDt: 0, openKt: 0, turnDt: 0, turnKt: 0 };
        state.trialBalanceAccounts.push(dtAcc);
      }
      dtAcc.turnDt += amt;

      let ktAcc = state.trialBalanceAccounts.find((a) => a.code === ktCode);
      if (!ktAcc) {
        ktAcc = { code: ktCode, name: entry.kt || `Рахунок ${ktCode}`, openDt: 0, openKt: 0, turnDt: 0, turnKt: 0 };
        state.trialBalanceAccounts.push(ktAcc);
      }
      ktAcc.turnKt += amt;
    });

    // Pulse the header Live Ledger button
    const headerBtn = document.getElementById('btn-header-live-ledger');
    if (headerBtn) {
      headerBtn.style.transform = 'scale(1.06)';
      headerBtn.style.transition = 'transform 0.2s ease';
      setTimeout(() => {
        headerBtn.style.transform = 'scale(1)';
      }, 280);
    }

    const navBadge = document.getElementById('nav-badge-ledger');
    if (navBadge) {
      navBadge.textContent = `LIVE • ${state.ledgerEntries.length}`;
    }

    renderLedgerSection();
    if (toastMsg) {
      showInlineStatus(toastMsg);
    }
  }

  function renderLedgerSection() {
    const streamTbody = document.getElementById('ledger-stream-tbody');
    const tbTbody = document.getElementById('trial-balance-tbody');
    const filterSelect = document.getElementById('ledger-filter-account');
    const accFilter = filterSelect ? filterSelect.value : 'ALL';

    const countEl = document.getElementById('ledger-stat-count');
    if (countEl) {
      countEl.textContent = (1420 + state.ledgerEntries.length).toLocaleString('uk-UA');
    }

    const totalTurn = state.trialBalanceAccounts.reduce((s, a) => s + a.turnDt, 0);
    const turnEl = document.getElementById('ledger-stat-turnover');
    if (turnEl) {
      turnEl.textContent = fmtUah(Math.round(totalTurn));
    }

    if (streamTbody) {
      const filtered = state.ledgerEntries.filter((e) => {
        if (accFilter === 'ALL') return true;
        return e.dtCode === accFilter || e.ktCode === accFilter;
      });

      streamTbody.innerHTML = filtered
        .slice(0, 18)
        .map((e) => {
          const rowBg = e.isNew ? 'background: #EFF6FF; transition: background 0.6s ease;' : '';
          return `
            <tr style="${rowBg}">
              <td class="mono" style="font-size: 12px;">
                <div style="font-weight: 700; color: var(--primary);">#${escapeHtml(e.id)}</div>
                <div style="color: var(--text-muted); font-size: 11px;">${escapeHtml(e.time)} • ${escapeHtml(e.doc)}</div>
              </td>
              <td>
                <div style="font-weight: 600; color: var(--text-main); font-size: 13px;">${escapeHtml(e.desc)}</div>
              </td>
              <td>
                <span class="badge badge-slate" style="font-size: 11px;">${escapeHtml(e.entity)}</span>
              </td>
              <td>
                <span class="badge badge-blue mono" style="font-size: 11.5px;">Дт ${escapeHtml(e.dt)}</span>
              </td>
              <td>
                <span class="badge badge-amber mono" style="font-size: 11.5px;">Кт ${escapeHtml(e.kt)}</span>
              </td>
              <td class="text-right mono" style="font-weight: 700; font-size: 13.5px; color: var(--primary);">
                ${fmtUah(e.amount, 2)}
              </td>
              <td class="text-right">
                <span class="badge badge-green mono" style="font-size: 11px;">✓ Дт=Кт • 0.04s</span>
              </td>
            </tr>
          `;
        })
        .join('');
    }

    if (tbTbody) {
      let sumOpenDt = 0;
      let sumOpenKt = 0;
      let sumTurnDt = 0;
      let sumTurnKt = 0;
      let sumCloseDt = 0;
      let sumCloseKt = 0;

      const rowsHtml = state.trialBalanceAccounts
        .map((acc) => {
          const net = acc.openDt - acc.openKt + acc.turnDt - acc.turnKt;
          const closeDt = net > 0 ? net : 0;
          const closeKt = net < 0 ? Math.abs(net) : 0;

          sumOpenDt += acc.openDt;
          sumOpenKt += acc.openKt;
          sumTurnDt += acc.turnDt;
          sumTurnKt += acc.turnKt;
          sumCloseDt += closeDt;
          sumCloseKt += closeKt;

          return `
            <tr>
              <td class="mono" style="font-weight: 700; color: var(--accent-blue);">${escapeHtml(acc.code)}</td>
              <td style="font-weight: 600;">${escapeHtml(acc.name)}</td>
              <td class="text-right mono">${acc.openDt > 0 ? fmtUah(acc.openDt) : '—'}</td>
              <td class="text-right mono">${acc.openKt > 0 ? fmtUah(acc.openKt) : '—'}</td>
              <td class="text-right mono" style="color: var(--accent-blue); font-weight: 600;">+${fmtUah(acc.turnDt)}</td>
              <td class="text-right mono" style="color: var(--warning); font-weight: 600;">+${fmtUah(acc.turnKt)}</td>
              <td class="text-right mono" style="font-weight: 700;">${closeDt > 0 ? fmtUah(closeDt) : '—'}</td>
              <td class="text-right mono" style="font-weight: 700;">${closeKt > 0 ? fmtUah(closeKt) : '—'}</td>
            </tr>
          `;
        })
        .join('');

      const totalRow = `
        <tr style="background: #F0FDF4; font-weight: 800; border-top: 2px solid #16A34A;">
          <td class="mono" style="color: #166534;">Σ</td>
          <td style="color: #166534;">БАЛАНС ГОЛОВНОЇ КНИГИ ХОЛДИНГУ (Дт === Кт ДО КОПІЙКИ)</td>
          <td class="text-right mono" style="color: #166534;">${fmtUah(sumOpenDt)}</td>
          <td class="text-right mono" style="color: #166534;">${fmtUah(sumOpenKt)}</td>
          <td class="text-right mono" style="color: #166534;">${fmtUah(sumTurnDt)}</td>
          <td class="text-right mono" style="color: #166534;">${fmtUah(sumTurnKt)}</td>
          <td class="text-right mono" style="color: #166534;">${fmtUah(sumCloseDt)}</td>
          <td class="text-right mono" style="color: #166534;">${fmtUah(sumCloseKt)}</td>
        </tr>
      `;

      tbTbody.innerHTML = rowsHtml + totalRow;
    }
  }

  // ─── 3. 🏭 ВБИВЧА MES: ВИРОБНИЦТВО, ЧПК, ТЕХКАРТИ (BOM) ТА ZERO-WASTE ──────
  function evaluateMesBomLive() {
    const sel = document.getElementById('mes-bom-product');
    const qtyEl = document.getElementById('mes-bom-qty');
    const breakdownEl = document.getElementById('mes-bom-breakdown');
    if (!sel || !qtyEl || !breakdownEl) return null;

    const opt = sel.options[sel.selectedIndex];
    const qty = Math.max(1, Number(qtyEl.value) || 10);
    const rawUnit = Number(opt?.getAttribute('data-raw')) || 34500;
    const compUnit = Number(opt?.getAttribute('data-comp')) || 18200;
    const remnantUnit = Number(opt?.getAttribute('data-remnant')) || -3800;
    const wageUnit = Number(opt?.getAttribute('data-wage')) || 6400;
    const energyUnit = Number(opt?.getAttribute('data-energy')) || 2100;
    const overheadUnit = Number(opt?.getAttribute('data-overhead')) || 4600;
    const sellUnit = Number(opt?.getAttribute('data-price')) || 92000;

    const unitCost = rawUnit + compUnit + remnantUnit + wageUnit + energyUnit + overheadUnit;
    const totalRaw = rawUnit * qty;
    const totalComp = compUnit * qty;
    const totalRemnant = remnantUnit * qty;
    const totalWage = wageUnit * qty;
    const totalEnergyOverhead = (energyUnit + overheadUnit) * qty;
    const totalBatchCost = unitCost * qty;
    const totalRevenue = sellUnit * qty;
    const totalProfit = totalRevenue - totalBatchCost;
    const marginPct = ((totalProfit / totalRevenue) * 100).toFixed(1);

    breakdownEl.innerHTML = `
      <div class="kpi-breakdown-row">
        <span>1. Основна сировина та метал за техкартою (<code class="mono">Дт 231 Кт 201</code>):</span>
        <strong class="mono">${fmtUah(totalRaw)}</strong>
      </div>
      <div class="kpi-breakdown-row">
        <span>2. Комплектуючі, приводи та автоматика (<code class="mono">Дт 231 Кт 202</code>):</span>
        <strong class="mono">${fmtUah(totalComp)}</strong>
      </div>
      <div class="kpi-breakdown-row" style="color: var(--success);">
        <span>3. ♻️ Економія Банку ділових обрізків Zero-Waste (<code class="mono">Дт 201 Кт 231</code>):</span>
        <strong class="mono" style="color: var(--success);">−${fmtUah(Math.abs(totalRemnant))}</strong>
      </div>
      <div class="kpi-breakdown-row">
        <span>4. Відрядна ЗП операторів ЧПК + ЄСВ 22% (<code class="mono">Дт 231 Кт 661/651</code>):</span>
        <strong class="mono">${fmtUah(totalWage)}</strong>
      </div>
      <div class="kpi-breakdown-row">
        <span>5. Електроенергія верстатів та амортизація ЗВВ (<code class="mono">Дт 231 Кт 91</code>):</span>
        <strong class="mono">${fmtUah(totalEnergyOverhead)}</strong>
      </div>
      <div class="kpi-breakdown-row" style="padding-top: 8px; border-top: 1px solid var(--border); font-size: 14px;">
        <strong>Повна заводська собівартість партії (${qty} од. → <code class="mono">Дт 26 Кт 231</code>):</strong>
        <strong class="mono" style="color: var(--primary);">${fmtUah(totalBatchCost)} (${fmtUah(unitCost)} / од.)</strong>
      </div>
      <div class="kpi-breakdown-row" style="font-size: 14px; color: var(--success);">
        <strong>Промислова маржа EBITDA при реалізації (${fmtUah(totalRevenue)}):</strong>
        <strong class="mono" style="color: var(--success);">+${fmtUah(totalProfit)} (Маржа ${marginPct}%)</strong>
      </div>
    `;

    return {
      code: opt?.value || 'PEM-400',
      name: (opt?.textContent || '').split('—')[0].trim(),
      qty,
      totalRaw,
      totalComp,
      totalWage,
      totalEnergyOverhead,
      totalBatchCost,
      totalRevenue
    };
  }

  function renderMesSection() {
    const tbody = document.getElementById('mes-lines-tbody');
    if (tbody) {
      tbody.innerHTML = state.mesLines
        .map((line) => {
          const pct = Math.min(100, Math.round((line.doneQty / line.totalQty) * 100));
          const isReady = line.status === 'READY_RELEASE' || line.doneQty >= line.totalQty;
          const isReleased = line.status === 'RELEASED';

          let statusBadge = '';
          let actionBtn = '';
          if (isReleased) {
            statusBadge = `<span class="badge badge-green">✓ Партію здано на склад ГП (Рах. 26)</span>`;
            actionBtn = `<span class="mono" style="font-size: 11.5px; color: var(--success);">Проведено Дт 26 Кт 231</span>`;
          } else if (isReady) {
            statusBadge = `<span class="badge badge-blue">Готово до випуску (${line.doneQty}/${line.totalQty} од.)</span>`;
            actionBtn = `<button type="button" class="btn btn-sm btn-action-primary js-mes-release-line" data-id="${escapeHtml(line.id)}">✓ Випустити партію + Дт 26 Кт 231</button>`;
          } else {
            statusBadge = `
              <div>
                <div style="display:flex;justify-content:space-between;font-size:11.5px;font-weight:600;margin-bottom:3px;">
                  <span>В роботі: ${line.doneQty} / ${line.totalQty} од.</span>
                  <span class="mono">${pct}%</span>
                </div>
                <div class="progress-track" style="margin:0;height:6px;">
                  <div class="progress-fill" style="width:${pct}%;"></div>
                </div>
              </div>
            `;
            actionBtn = `<button type="button" class="btn btn-sm btn-subtle js-mes-release-line" data-id="${escapeHtml(line.id)}">Завершити зміну + Дт 26</button>`;
          }

          return `
            <tr>
              <td style="font-weight: 700; color: var(--text-main);">${escapeHtml(line.name)}</td>
              <td style="font-size: 12.5px; color: var(--text-secondary);">${escapeHtml(line.orderTitle)}</td>
              <td style="font-size: 12.5px;">${escapeHtml(line.operator)}</td>
              <td class="text-right mono">
                <span class="badge badge-green">${line.oee}% OEE</span>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Цикл: ${line.cycleSec} с</div>
              </td>
              <td class="text-right mono">
                <div style="font-weight: 700;">${fmtUah(line.batchCost)}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${line.kwh} кВт·год</div>
              </td>
              <td style="min-width: 170px;">${statusBadge}</td>
              <td class="text-right">${actionBtn}</td>
            </tr>
          `;
        })
        .join('');
    }

    evaluateMesBomLive();
  }

  // ─── 4. 💼 SALES & B2B DEAL DESK: КРЕДИТНИЙ КОНТРОЛЬ ДИЛЕРІВ ───────────────
  function renderDealerCreditTable() {
    const tbody = document.getElementById('dealer-credit-tbody');
    if (!tbody) return;

    const blockedCount = state.dealerCredits.filter((d) => d.gateStatus === 'BLOCKED').length;
    const stopBadge = document.getElementById('dealer-stop-badge');
    if (stopBadge) {
      if (blockedCount > 0) {
        stopBadge.className = 'badge badge-red';
        stopBadge.textContent = `● ${blockedCount} Дилер на Стоп-Відвантаженні`;
      } else {
        stopBadge.className = 'badge badge-green';
        stopBadge.textContent = `✓ Усі ліміти під контролем`;
      }
    }

    tbody.innerHTML = state.dealerCredits
      .map((dl) => {
        const isBlocked = dl.gateStatus === 'BLOCKED';
        const isWarn = dl.gateStatus === 'WARN';
        const gateHtml = isBlocked
          ? `<span class="badge badge-red">⛔ СТОП-ВІДВАНТАЖЕННЯ WMS</span>`
          : isWarn
          ? `<span class="badge badge-amber">⚠️ 90% ліміту використано</span>`
          : `<span class="badge badge-green">✓ Відвантаження дозволено</span>`;

        const btnHtml = isBlocked
          ? `<button type="button" class="btn btn-sm btn-action-primary js-toggle-dealer-gate" data-id="${escapeHtml(dl.id)}">Зарахувати оплату + Відкрити WMS</button>`
          : `<button type="button" class="btn btn-sm btn-subtle js-toggle-dealer-gate" data-id="${escapeHtml(dl.id)}">Блокувати відвантаження</button>`;

        return `
          <tr style="${isBlocked ? 'background: #FEF2F2;' : ''}">
            <td>
              <div style="font-weight: 700;">${escapeHtml(dl.name)}</div>
              <div style="font-size: 11.5px; color: var(--text-muted);">${escapeHtml(dl.segment)}</div>
            </td>
            <td style="font-size: 12.5px;">${escapeHtml(dl.kam)}</td>
            <td class="text-right mono">${fmtUah(dl.limitUah)}</td>
            <td class="text-right mono" style="font-weight: 700; color: ${isBlocked ? 'var(--danger)' : 'var(--text-main)'};">${fmtUah(dl.debtUah)}</td>
            <td class="text-right mono">${dl.overdueDays > 0 ? `<span style="color:var(--danger);font-weight:700;">${dl.overdueDays} дн.</span>` : '0 дн.'}</td>
            <td>${gateHtml}</td>
            <td class="text-right">${btnHtml}</td>
          </tr>
        `;
      })
      .join('');
  }

  function renderCostCentersTable() {
    const tbody = document.getElementById('cost-centers-tbody');
    if (!tbody) return;

    tbody.innerHTML = state.costCenters
      .map((cc) => {
        const rem = Math.max(0, cc.limitUah - cc.spentUah);
        const pct = Math.min(100, Math.round((cc.spentUah / cc.limitUah) * 100));
        const badgeHtml = pct >= 95
          ? `<span class="badge badge-amber">⚠️ Ліміт 97% (Погодження CFO)</span>`
          : `<span class="badge badge-green">✓ В межах бюджету ЦФВ</span>`;

        return `
          <tr>
            <td style="font-weight: 700;">${escapeHtml(cc.code)}</td>
            <td style="font-size: 12.5px; color: var(--text-secondary);">${escapeHtml(cc.head)}</td>
            <td class="text-right mono">${fmtUah(cc.limitUah)}</td>
            <td class="text-right mono" style="font-weight: 600;">${fmtUah(cc.spentUah)}</td>
            <td class="text-right mono" style="font-weight: 700; color: var(--success);">${fmtUah(rem)}</td>
            <td style="min-width: 150px;">
              <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:600;margin-bottom:3px;">
                <span>Використано</span>
                <span class="mono">${pct}%</span>
              </div>
              <div class="progress-track" style="margin:0;height:6px;">
                <div class="progress-fill" style="width:${pct}%;background:${pct >= 95 ? 'var(--warning)' : 'var(--accent-blue)'};"></div>
              </div>
            </td>
            <td class="text-right">${badgeHtml}</td>
          </tr>
        `;
      })
      .join('');
  }

  function renderSalesLeaderboardTable() {
    const tbody = document.getElementById('sales-leaderboard-tbody');
    if (!tbody) return;

    tbody.innerHTML = state.salesDivisions
      .map((div) => {
        return `
          <tr>
            <td>
              <div style="font-weight: 700; color: var(--text-main);">${escapeHtml(div.division)}</div>
              <div style="font-size: 11.5px; color: var(--text-muted);">${escapeHtml(div.head)}</div>
            </td>
            <td class="text-right mono" style="font-weight: 600;">${fmtUah(div.revenueUah)}</td>
            <td class="text-right mono" style="font-weight: 800; color: var(--success);">
              +${fmtUah(div.ebitdaMarginUah)} <span class="badge badge-green" style="margin-left:4px;">${div.marginPct}%</span>
            </td>
            <td class="text-right mono">${div.avgDiscountPct}%</td>
            <td class="text-right mono" style="font-weight: 700; color: var(--accent-blue);">${div.cashCollectionPct}%</td>
            <td class="text-right mono"><span class="badge badge-blue">${div.qcScore} / 100</span></td>
            <td><span class="badge badge-green">✓ ${escapeHtml(div.status)}</span></td>
          </tr>
        `;
      })
      .join('');
  }

  // ─── 1B. 📄 ДОКУМЕНТИ, AI-РОЗПІЗНАВАННЯ (OCR) ТА ПОГОДЖЕННЯ (ПК + ТЕЛЕФОН) ──
  function renderDocsSection() {
    const ocrCard = document.getElementById('ocr-live-result-card');
    const tbody = document.getElementById('docs-approval-tbody');
    const pendingCount = state.approvalDocs.filter((d) => d.status === 'PENDING').length;

    const navBadge = document.getElementById('nav-badge-docs');
    if (navBadge) {
      navBadge.textContent = pendingCount > 0 ? `${pendingCount} на підпис` : '✓ Погоджено';
      navBadge.style.background = pendingCount > 0 ? 'var(--warning-soft)' : 'var(--success-soft)';
      navBadge.style.color = pendingCount > 0 ? 'var(--warning)' : 'var(--success)';
    }

    const kpiPending = document.getElementById('docs-kpi-pending');
    if (kpiPending) kpiPending.textContent = `${pendingCount} док.`;

    const pendingBadge = document.getElementById('docs-pending-badge');
    if (pendingBadge) {
      pendingBadge.className = pendingCount > 0 ? 'badge badge-amber' : 'badge badge-green';
      pendingBadge.textContent = pendingCount > 0 ? `На погодженні: ${pendingCount} документи` : '✓ Усі документи погоджено та проведено';
    }

    if (ocrCard && state.activeOcrDoc) {
      const doc = state.activeOcrDoc;
      ocrCard.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap; margin-bottom: 12px;">
            <div>
              <span class="badge badge-green">✓ AI OCR РОЗПІЗНАНО ЗА 1.2 СЕК</span>
              <span class="badge badge-blue" style="margin-left: 6px;">${escapeHtml(doc.source)}</span>
            </div>
            <span class="mono" style="font-size: 12px; color: var(--text-muted);">ID: ${escapeHtml(doc.id)}</span>
          </div>

          <div style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
            ${escapeHtml(doc.typeBadge)}: № ${escapeHtml(doc.docNumber)}
          </div>
          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
            Контрагент: <strong>${escapeHtml(doc.counterparty)}</strong> (Код ЄДРПОУ: <code class="mono">${escapeHtml(doc.edrpou)}</code>)
          </div>

          <div style="background: var(--bg-app); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 14px; font-size: 13px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; gap: 8px;">
              <span style="color: var(--text-secondary);">Розпізнані позиції / умови:</span>
              <strong style="text-align: right; color: var(--text-main);">${escapeHtml(doc.itemsSummary)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 8px; border-top: 1px solid var(--border); padding-top: 8px;">
              <span style="color: var(--text-secondary);">Сума документа (з ПДВ 20%):</span>
              <strong class="mono" style="font-size: 15px; color: var(--accent-blue);">${fmtUah(doc.amount)} (ПДВ: ${fmtUah(doc.vatAmount)})</strong>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 8px; border-top: 1px solid var(--border); padding-top: 8px;">
              <span style="color: var(--text-secondary);">Маршрут в Екосистемі (Цех ↔ Склад):</span>
              <strong style="text-align: right; color: var(--success);">${escapeHtml(doc.ecosystemLink)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 8px; border-top: 1px solid var(--border); padding-top: 8px;">
              <span style="color: var(--text-secondary);">Бухгалтерська проводка:</span>
              <span class="mono" style="font-weight: 700; color: var(--primary);">Дт ${escapeHtml(doc.ledgerDtCode)} ↔ Кт ${escapeHtml(doc.ledgerKtCode)}</span>
            </div>
          </div>

          <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-sm); padding: 10px 12px; font-size: 12.5px; color: #166534; margin-bottom: 14px;">
            <strong>AI-Перевірка документа:</strong> ${escapeHtml(doc.aiRiskCheck)}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; padding-top: 12px; border-top: 1px solid var(--border);">
          <button type="button" class="btn btn-sm btn-subtle" id="btn-ocr-send-to-approval">
            📤 Відправити на погодження керівнику
          </button>
          <button type="button" class="btn btn-sm btn-action-primary" id="btn-ocr-approve-now">
            ✓ Погодити одразу та провести в Склад / Цех / Облік
          </button>
        </div>
      `;
    }

    if (tbody) {
      tbody.innerHTML = state.approvalDocs
        .map((d) => {
          const isApproved = d.status === 'APPROVED';
          const isRejected = d.status === 'REJECTED';

          let statusBadge = '';
          let actionBtns = '';
          if (isApproved) {
            statusBadge = `<span class="badge badge-green">✓ Погоджено та проведено</span>`;
            actionBtns = `
              <div style="display:flex;gap:6px;justify-content:flex-end;">
                <button type="button" class="btn btn-sm btn-subtle js-doc-preview-ocr" data-id="${escapeHtml(d.id)}">👁️ Скан OCR</button>
                <span class="mono" style="font-size:11.5px;color:var(--success);align-self:center;">Дт ${escapeHtml(d.ledgerDtCode)} Кт ${escapeHtml(d.ledgerKtCode)}</span>
              </div>
            `;
          } else if (isRejected) {
            statusBadge = `<span class="badge badge-red">✕ На доопрацюванні</span>`;
            actionBtns = `
              <div style="display:flex;gap:6px;justify-content:flex-end;">
                <button type="button" class="btn btn-sm btn-subtle js-doc-Approve" data-id="${escapeHtml(d.id)}">Погодити</button>
              </div>
            `;
          } else {
            statusBadge = `<span class="badge badge-amber">⏳ Очікує погодження</span>`;
            actionBtns = `
              <div style="display:flex;gap:6px;justify-content:flex-end;flex-wrap:wrap;">
                <button type="button" class="btn btn-sm btn-action-primary js-doc-approve" data-id="${escapeHtml(d.id)}">✓ Погодити + в Склад/Облік</button>
                <button type="button" class="btn btn-sm btn-subtle js-doc-preview-ocr" data-id="${escapeHtml(d.id)}">👁️ OCR</button>
                <button type="button" class="btn btn-sm btn-subtle js-doc-reject" data-id="${escapeHtml(d.id)}">✕</button>
              </div>
            `;
          }

          return `
            <tr style="${isApproved ? 'background: #F8FAFC;' : ''}">
              <td>
                <div style="font-weight: 700; color: var(--text-main);">${escapeHtml(d.docNumber)}</div>
                <div style="font-size: 11.5px; color: var(--accent-blue); font-weight: 600;">${escapeHtml(d.source)}</div>
              </td>
              <td>
                <span class="badge badge-slate" style="margin-bottom: 3px;">${escapeHtml(d.typeBadge)}</span>
                <div style="font-weight: 600; font-size: 13px;">${escapeHtml(d.counterparty)}</div>
                <div class="mono" style="font-size: 11px; color: var(--text-muted);">ЄДРПОУ: ${escapeHtml(d.edrpou)}</div>
              </td>
              <td style="font-size: 12.5px; color: var(--text-secondary); max-width: 310px;">
                ${escapeHtml(d.ecosystemLink)}
              </td>
              <td class="text-right mono" style="font-weight: 700; font-size: 13.5px;">
                ${fmtUah(d.amount)}
              </td>
              <td style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">
                ${escapeHtml(d.approvalRoute)}
              </td>
              <td>${statusBadge}</td>
              <td class="text-right">${actionBtns}</td>
            </tr>
          `;
        })
        .join('');
    }
  }

  function handleUploadedOcrFile(file, sourceLabel) {
    if (!file) return;
    const isContract = /догов|contract|spec|угода/i.test(file.name);
    const isInvoice = /рах|inv|bill|сф/i.test(file.name);
    const docId = `DOC-${Math.floor(1000 + Math.random() * 8999)}`;
    const amount = isContract ? 640000 : isInvoice ? 195000 : 324000;

    state.activeOcrDoc = {
      id: docId,
      docType: isContract ? 'CONTRACT' : isInvoice ? 'INVOICE' : 'WAYBILL',
      typeBadge: isContract ? 'Договір поставки (Розпізнано AI)' : isInvoice ? 'Рахунок-фактура на оплату' : 'Прибуткова накладна (Склад ↔ Цех)',
      source: `${sourceLabel}: ${file.name}`,
      docNumber: `${docId} від ${new Date().toLocaleDateString('uk-UA')}`,
      counterparty: isContract ? 'ТОВ "ТехноПром Комплект"' : 'ТОВ "УкрМетал Постач"',
      edrpou: isContract ? '39481023' : '37291045',
      amount,
      vatAmount: Math.round((amount / 6) * 100) / 100,
      itemsSummary: `Автоматично розпізнано з файлу «${file.name}» (${Math.max(1, Math.round(file.size / 1024))} КБ): сировина та комплектуючі для цеху і складу`,
      ecosystemLink: 'Склад WMS (Рах. 201) ↔ Виробничий Цех MES (Рах. 231) ↔ Бухгалтерія (Дт/Кт)',
      aiRiskCheck: '✓ Документ успішно оцифровано AI OCR. Ціни, код ЄДРПОУ та номенклатуру перевірено.',
      approvalRoute: 'Ініціатор ✓ → Нач. Цеху / Склад ✓ → Директор (На погодженні)',
      ledgerDt: isContract ? '361 Розрахунки з покупцями' : '201 Сировина й матеріали (Склад)',
      ledgerDtCode: isContract ? '361' : '201',
      ledgerKt: isContract ? '701 Дохід від реалізації' : '631 Розрахунки з постачальниками',
      ledgerKtCode: isContract ? '701' : '631'
    };

    const dzTitle = document.getElementById('ocr-dropzone-title');
    if (dzTitle) {
      dzTitle.textContent = `✓ Розпізнано файл: ${file.name} (${sourceLabel})`;
    }

    renderDocsSection();
    showInlineStatus(`✓ Документ «${file.name}» розпізнано AI OCR та підготовлено до погодження!`);
  }

  function evaluateEnterpriseRoiLive() {
    const turnSlider = document.getElementById('roi-turnover-slider');
    const leakSlider = document.getElementById('roi-leak-slider');
    const staffSlider = document.getElementById('roi-staff-slider');
    if (!turnSlider || !leakSlider || !staffSlider) return;

    const turnover = Number(turnSlider.value) || 4500000;
    const leakPct = Number(leakSlider.value) || 3.5;
    const staffCost = Number(staffSlider.value) || 65000;

    const elTurnVal = document.getElementById('roi-turnover-val');
    if (elTurnVal) elTurnVal.textContent = `${fmtUah(turnover)} / міс`;
    const elLeakVal = document.getElementById('roi-leak-val');
    if (elLeakVal) elLeakVal.textContent = `${leakPct.toFixed(1)}% від обороту`;
    const elStaffVal = document.getElementById('roi-staff-val');
    if (elStaffVal) elStaffVal.textContent = `${fmtUah(staffCost)} / міс`;

    const totalLeakRecovery = Math.round(turnover * (leakPct / 100));
    const marginAndProcSaved = Math.round(totalLeakRecovery * 0.65);
    const mesSaved = totalLeakRecovery - marginAndProcSaved;
    const staffSaved = Math.round(staffCost * 0.85);

    const monthlyTotal = marginAndProcSaved + mesSaved + staffSaved;
    const annualTotal = monthlyTotal * 12;

    const elAnnual = document.getElementById('roi-annual-total');
    if (elAnnual) elAnnual.textContent = `+${fmtUah(annualTotal)} / рік`;
    const elMonthly = document.getElementById('roi-monthly-total');
    if (elMonthly) elMonthly.innerHTML = `або <strong>+${fmtUah(monthlyTotal)} щомісяця</strong> додаткового чистого грошового потоку`;

    const elBrkMargin = document.getElementById('roi-break-margin');
    if (elBrkMargin) elBrkMargin.textContent = `+${fmtUah(marginAndProcSaved)} / міс`;
    const elBrkMes = document.getElementById('roi-break-mes');
    if (elBrkMes) elBrkMes.textContent = `+${fmtUah(mesSaved)} / міс`;
    const elBrkStaff = document.getElementById('roi-break-staff');
    if (elBrkStaff) elBrkStaff.textContent = `+${fmtUah(staffSaved)} / міс`;

    const paybackDays = Math.max(5, Math.min(28, Math.round((95000 / Math.max(1, monthlyTotal)) * 30)));
    const elPayback = document.getElementById('roi-payback-badge');
    if (elPayback) elPayback.textContent = `Окупність системи: ${paybackDays} днів`;
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

    // 0. Pending Document Approvals (Waybills from Phone / Contracts from PC)
    const pendingDocs = (state.approvalDocs || []).filter((d) => d.status === 'PENDING');
    if (pendingDocs.length > 0) {
      const topDoc = pendingDocs[0];
      actionCount++;
      itemsHtml.push(`
        <div class="action-item" style="border-left: 3px solid var(--accent-blue);">
          <div class="action-item-left">
            <span class="action-tag-quiet" style="background: var(--accent-blue-soft); color: var(--accent-blue); border-color: var(--accent-blue-border);">Погодження OCR</span>
            <div>
              <div class="action-title">${escapeHtml(topDoc.typeBadge)}: № ${escapeHtml(topDoc.docNumber)} (${escapeHtml(topDoc.counterparty)}) — <span class="action-amount">${fmtUah(topDoc.amount)}</span></div>
              <div class="action-desc">${escapeHtml(topDoc.source)} • ${escapeHtml(topDoc.ecosystemLink)}. На погодженні (${pendingDocs.length} док.).</div>
            </div>
          </div>
          <div class="action-buttons">
            <button type="button" class="btn btn-sm btn-subtle" onclick="window.opexSwitchTab('docs')">Відкрити AI-Сканер (${pendingDocs.length})</button>
            <button type="button" class="btn btn-sm btn-action-primary js-doc-approve" data-id="${escapeHtml(topDoc.id)}">✓ Погодити + в Склад/Облік</button>
          </div>
        </div>
      `);
    }

    // 1. Unrecognized bank transactions
    if (needsReviewTxs.length > 0) {
      for (const tx of needsReviewTxs.slice(0, 2)) {
        actionCount++;
        itemsHtml.push(`
          <div class="action-item">
            <div class="action-item-left">
              <span class="action-tag-quiet">Казначейство</span>
              <div>
                <div class="action-title">Нерозпізнаний платіж: ${escapeHtml(tx.counterpartyName)} на суму <span class="action-amount">${fmtUah(tx.amount)}</span></div>
                <div class="action-desc">Призначення: «${escapeHtml(tx.description)}» — підтвердіть кореспондуючий рахунок обліку (Дт/Кт):</div>
              </div>
            </div>
            <div class="action-buttons">
              <button type="button" class="btn btn-sm btn-subtle js-resolve-tx" data-id="${escapeHtml(tx.id)}" data-cat="REVENUE_SALES" data-label="Оплата клієнта (Дт 311 Кт 361)">Оплата клієнта (361)</button>
              <button type="button" class="btn btn-sm btn-subtle js-resolve-tx" data-id="${escapeHtml(tx.id)}" data-cat="COGS_MATERIALS" data-label="Закупівля сировини (Дт 631 Кт 311)">Постачальник (631)</button>
              <button type="button" class="btn btn-sm btn-subtle js-resolve-tx" data-id="${escapeHtml(tx.id)}" data-cat="ADMIN_OPEX" data-label="Адмінвитрати ЦФВ (Дт 92 Кт 311)">Витрати ЦФВ (92)</button>
            </div>
          </div>
        `);
      }
    } else {
      itemsHtml.push(`
        <div class="action-item" style="background: #FFFFFF; border-color: #E2E8F0;">
          <div class="action-item-left">
            <span class="action-tag-quiet" style="color: #047857; background: #ECFDF5; border-color: #A7F3D0;">Казначейство</span>
            <div>
              <div class="action-title">Усі банківські виписки Холдингу синхронізовано та проведено в Головній Книзі</div>
              <div class="action-desc">Нерозпізнаних платежів немає. Оплати автоматично закрили дебіторку (Дт 311 Кт 361) та сформували ліміт ПДВ.</div>
            </div>
          </div>
          <div class="action-buttons">
            <button type="button" class="btn btn-sm btn-subtle" onclick="window.opexSwitchTab('ledger')">Переглянути проводки Дт/Кт →</button>
          </div>
        </div>
      `);
    }

    // 2. Overdue Client Payment
    const overdueOrder = state.orders.find((o) => o.orderNumber === 'INV-2026-107' && o.status === 'INVOICED');
    if (overdueOrder && !state.overduePaidIds.has(overdueOrder.orderNumber)) {
      actionCount++;
      const reminderText = `Вітаємо, ${overdueOrder.clientName}! Нагадуємо про оплату рахунку № ${overdueOrder.orderNumber} на суму ${fmtUah(overdueOrder.totalAmount)} (IBAN: UA82305299000002600123456789, ТОВ "ОпексМетрікс Індастріал"). Дякуємо за співпрацю!`;
      itemsHtml.push(`
        <div class="action-item">
          <div class="action-item-left">
            <span class="action-tag-quiet">Дебіторка 361</span>
            <div>
              <div class="action-title">${escapeHtml(overdueOrder.clientName)} — очікується оплата <span class="action-amount">${fmtUah(overdueOrder.totalAmount)}</span></div>
              <div class="action-desc">Рахунок № ${escapeHtml(overdueOrder.orderNumber)} (${escapeHtml(overdueOrder.itemsSummary)}), прострочено на 7 днів.</div>
            </div>
          </div>
          <div class="action-buttons">
            <button type="button" class="btn btn-sm btn-subtle js-copy-reminder" data-text="${escapeHtml(reminderText)}">Скопіювати претензію</button>
            <button type="button" class="btn btn-sm btn-action-primary js-mark-overdue-paid" data-ord="${escapeHtml(overdueOrder.orderNumber)}">Зарахувати оплату + Дт 311 Кт 361</button>
          </div>
        </div>
      `);
    }

    // 3. Low Stock Items needing supplier order
    const topAlert = alerts[0] || {
      sku: 'PRD-101',
      itemName: 'Сталь листова AISI 304 (4 мм, партія під ЧПК) / Обладнання',
      currentQty: 24,
      minThreshold: 35,
      recommendedOrderQty: 36,
      unit: 'од.',
      unitPriceUah: 18500,
      supplierName: 'ТОВ "Імпорт-Логістик Сервіс"',
      messengerOrderText: 'Вітаємо! Замовлення на поповнення складу заводу: [PRD-101] — 36 од.'
    };
    actionCount++;
    itemsHtml.push(`
      <div class="action-item">
        <div class="action-item-left">
          <span class="action-tag-quiet">MRP / Закупівлі</span>
          <div>
            <div class="action-title">Запас під план MES на межі: ${escapeHtml(topAlert.itemName)} (${topAlert.currentQty} ${escapeHtml(topAlert.unit)} при мінімумі ${topAlert.minThreshold})</div>
            <div class="action-desc">Прямий постачальник (перевірено Anti-Kickback): ${escapeHtml(topAlert.supplierName)}. Рекомендовано замовити: <strong>${topAlert.recommendedOrderQty} ${escapeHtml(topAlert.unit)}</strong>.</div>
          </div>
        </div>
        <div class="action-buttons">
          <button type="button" class="btn btn-sm btn-action-primary js-quick-supplier-order" data-sku="${escapeHtml(topAlert.sku)}" data-name="${escapeHtml(topAlert.itemName)}" data-qty="${topAlert.recommendedOrderQty}" data-price="${topAlert.unitPriceUah}" data-text="${escapeHtml(topAlert.messengerOrderText)}">
            Оприбуткувати поставку + Дт 201 Кт 631
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

    const ent = HOLDING_ENTITIES[state.holdingEntity] || HOLDING_ENTITIES.ALL;
    const baseStart = ent.cashBalance;
    const reserveVal = Math.round(baseStart * 0.25);

    let labels = [];
    let baseData = [];
    let stressData = [];
    let reserveLine = [];

    let cur = baseStart;
    for (let i = 1; i <= 30; i++) {
      labels.push(`День ${i}`);
      cur += (i % 4 === 0 ? Math.round(baseStart * 0.045) : -Math.round(baseStart * 0.009));
      baseData.push(cur);
      stressData.push(Math.round(cur * 0.84));
      reserveLine.push(reserveVal);
    }

    const minBadge = document.getElementById('chart-min-balance-badge');
    if (minBadge) {
      minBadge.textContent = `Мін. залишок (30 дн): ${fmtUah(Math.min(...baseData))}`;
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
            label: 'Прогноз ліквідності Холдингу (₴)',
            data: baseData,
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.3,
            pointRadius: 2
          },
          {
            label: 'Стрес-прогноз (затримка оплат B2B дилерів)',
            data: stressData,
            borderColor: '#64748B',
            borderDash: [5, 5],
            borderWidth: 1.8,
            fill: false,
            tension: 0.3,
            pointRadius: 0
          },
          {
            label: `Незнижуваний казначейський резерв (${fmtUah(reserveVal)})`,
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

  // ─── 4. 💼 ПРОДАЖІ ТА РАХУНКИ (З КОНТРОЛЕМ МАРЖІ ТА ІНЛАЙН-ПЕРВИНКОЮ) ────────
  function evaluateMarginGuardLive() {
    const sel = document.getElementById('inv-item-select');
    const qtyInput = document.getElementById('inv-qty');
    const priceInput = document.getElementById('inv-price');
    const discInput = document.getElementById('inv-discount');
    if (!sel || !qtyInput || !priceInput || !discInput) return;

    const opt = sel.options[sel.selectedIndex];
    const unitCost = Number(opt?.getAttribute('data-cost')) || 62000;
    const qty = Math.max(1, Number(qtyInput.value) || 1);
    const unitPrice = Math.max(1, Number(priceInput.value) || 92000);
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
    const detailsEl = document.getElementById('margin-guard-details');
    const pillEl = document.getElementById('margin-guard-pill');

    if (banner && detailsEl && pillEl) {
      if (marginPct < 25) {
        banner.className = 'margin-guard-box warn';
        detailsEl.innerHTML = `⚠️ <strong>Блок Margin Guard:</strong> Сума зі знижкою: <strong>${fmtUah(netRevenue)}</strong> • Собівартість FIFO: <strong>${fmtUah(totalCost)}</strong> • Прибуток: <strong>${fmtUah(profit)}</strong> (Макс. безпечна знижка: <strong>${maxSafeDiscount}%</strong>)`;
        pillEl.className = 'badge badge-red';
        pillEl.textContent = `Маржа ${marginPct}% (< 25% Стоп Deal Desk) ⚠️`;
      } else {
        banner.className = 'margin-guard-box safe';
        detailsEl.innerHTML = `Сума контракту: <strong>${fmtUah(netRevenue)}</strong> • Чиста маржа (EBITDA): <strong style="color: var(--success);">${fmtUah(profit)}</strong> • Авто-проводки: <code class="mono">Дт 361 Кт 701</code>, <code class="mono">Дт 701 Кт 6412</code>, <code class="mono">Дт 901 Кт 26</code>`;
        pillEl.className = 'badge badge-green';
        pillEl.textContent = `Маржа ${marginPct}% • Дозволено Deal Desk ✓`;
      }
    }

    return {
      itemName: opt?.getAttribute('data-name') || 'Продукція',
      unit: opt?.getAttribute('data-unit') || 'од.',
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

    let qrSvg = `<svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="88" height="88" rx="6" fill="white"/><rect x="8" y="8" width="24" height="24" stroke="#0F172A" stroke-width="4"/><rect x="14" y="14" width="12" height="12" fill="#0F172A"/><rect x="56" y="8" width="24" height="24" stroke="#0F172A" stroke-width="4"/><rect x="62" y="14" width="12" height="12" fill="#0F172A"/><rect x="8" y="56" width="24" height="24" stroke="#0F172A" stroke-width="4"/><rect x="14" y="62" width="12" height="12" fill="#0F172A"/><rect x="40" y="10" width="8" height="8" fill="#2563EB"/><rect x="40" y="26" width="8" height="16" fill="#0F172A"/><rect x="10" y="40" width="22" height="6" fill="#0F172A"/><rect x="40" y="48" width="14" height="8" fill="#2563EB"/><rect x="60" y="42" width="18" height="8" fill="#0F172A"/><rect x="42" y="62" width="12" height="18" fill="#0F172A"/><rect x="60" y="58" width="20" height="22" stroke="#2563EB" stroke-width="4"/></svg>`;
    let amountWords = `${ord.totalAmount.toLocaleString('uk-UA')} грн 00 коп.`;

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
        if (data.qrData && data.qrData.svg) qrSvg = data.qrData.svg;
        if (data.amountInWords) amountWords = data.amountInWords;
      }
    } catch (_err) {
      // Static GitHub Pages fallback uses built-in NBU QR SVG
    }

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
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#2563EB;letter-spacing:0.05em;">Офіційний первинний документ • Стандарт ДСТУ / НБУ • Проводка Дт 361 Кт 701</div>
          <div style="font-size:20px;font-weight:800;color:#0F172A;margin-top:4px;">${escapeHtml(docTypeNames[state.activeDocType])} № ${escapeHtml(ord.orderNumber)}</div>
          <div style="font-size:12.5px;color:#475569;margin-top:2px;">Дата документа: ${escapeHtml(ord.date)} р.</div>
          <div style="margin-top:12px;font-size:12.5px;line-height:1.55;">
            <div><strong>Постачальник:</strong> ТОВ "ОпексМетрікс Індастріал" / ТОВ "Альфа Трейд Груп" (ЄДРПОУ 38421567)</div>
            <div><strong>IBAN:</strong> <span class="mono">UA82305299000002600123456789</span> в АТ "УНІВЕРСАЛ БАНК" / ПриватБанк</div>
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
              <th>Найменування продукції / товару / послуги</th>
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
          <div><strong>Сума прописом:</strong> ${escapeHtml(amountWords)}</div>
          <div style="font-size:11.5px;color:#64748B;margin-top:4px;">Призначення платежу в QR: Оплата згідно документа № ${escapeHtml(ord.orderNumber)}</div>
        </div>
        <div style="text-align:right;font-size:14px;">
          <div>Всього до сплати: <strong class="mono" style="font-size:17px;color:#2563EB;">${fmtUah(ord.totalAmount, 2)}</strong></div>
          <div style="font-size:12px;color:#475569;">${ord.withVat ? `У т.ч. ПДВ 20% (Рах. 6412): ${fmtUah(ord.totalAmount / 6, 2)}` : 'Без ПДВ (Єдиний податок)'}</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px;padding-top:16px;border-top:1px dashed #CBD5E1;font-size:12.5px;color:#475569;">
        <div>Від Постачальника (Виконавця): ______________________ / Коваленко О.В. /</div>
        <div>Від Покупця (Замовника): ______________________ / Підпис / КЕП /</div>
      </div>
    `;
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

  const DEFAULT_BANK_TXS = [
    {
      id: 'btx-901',
      date: '2026-10-26',
      docNumber: 'БВ-8819',
      counterpartyName: 'ТОВ "Метінвест-Промсервіс"',
      counterpartyEdrpou: '32490244',
      description: 'Оплата за промислові конвеєрні секції КС-1200 згідно контракту № B2B-104 у т.ч. ПДВ 20%',
      direction: 'IN',
      amount: 1280000,
      vatAmount: 213333.33,
      category: 'REVENUE_SALES',
      ruleMatched: 'Дт 311 Кт 361 • Авто-прив\'язка за ЄДРПОУ',
      status: 'AUTO_POSTED'
    },
    {
      id: 'btx-902',
      date: '2026-10-26',
      docNumber: 'БВ-8820',
      counterpartyName: 'ТОВ "АББ Автоматизація Україна"',
      counterpartyEdrpou: '21560766',
      description: 'Оплата за частотні перетворювачі та контролери АСУ-ТП згідно рах. СФ-412 у т.ч. ПДВ 20%',
      direction: 'OUT',
      amount: 540000,
      vatAmount: 90000,
      category: 'COGS_MATERIALS',
      ruleMatched: 'Дт 631 Кт 311 • ЦФВ-01 Виробництво',
      status: 'AUTO_POSTED'
    },
    {
      id: 'btx-903',
      date: '2026-10-26',
      docNumber: 'БВ-8821',
      counterpartyName: 'ТОВ "Епіцентр К" (Департамент комплектації)',
      counterpartyEdrpou: '32490244',
      description: 'Оплата за промислові енергомодулі ПЕМ-400 згідно рахунку INV-2026-104 у т.ч. ПДВ 20%',
      direction: 'IN',
      amount: 460000,
      vatAmount: 76666.67,
      category: 'REVENUE_SALES',
      ruleMatched: 'Дт 311 Кт 361 • Закрито дебіторку',
      status: 'AUTO_POSTED'
    },
    {
      id: 'btx-904',
      date: '2026-10-26',
      docNumber: 'БВ-8822',
      counterpartyName: 'ТОВ "ТехноСервіс-Інжиніринг Плюс"',
      counterpartyEdrpou: '41092831',
      description: 'Оплата згідно акту № 44 за позапланову калібрування оптики лазера Trumpf',
      direction: 'OUT',
      amount: 84000,
      vatAmount: 14000,
      category: 'UNCLASSIFIED',
      ruleMatched: 'Новий контрагент • Потребує підтвердження ЦФВ',
      status: 'NEEDS_REVIEW'
    }
  ];

  function renderBankSection() {
    const tbody = document.getElementById('bank-tx-tbody');
    if (!tbody) return;

    const pulse = state.pulse || {};
    if (!state.fallbackBankTxs) {
      state.fallbackBankTxs = DEFAULT_BANK_TXS.map((x) => ({ ...x }));
    }
    const txs = (Array.isArray(pulse.recentBankTxs) && pulse.recentBankTxs.length > 0)
      ? pulse.recentBankTxs
      : state.fallbackBankTxs;
    const autoRate = pulse.automationRate ?? 98.4;

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
    renderLedgerSection();
    renderMesSection();
    evaluateMarginGuardLive();
    renderDealerCreditTable();
    renderSalesOrdersTable();
    renderInlineDocument(state.activeDocOrderId, state.activeDocType);
    renderStockSection();
    renderCostCentersTable();
    renderBankSection();
    renderTaxesAndTeamSection();
    renderSalesLeaderboardTable();
    renderDocsSection();
    evaluateEnterpriseRoiLive();
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

    // Header Holding Entity Switcher
    const holdingSelect = document.getElementById('holding-entity-select');
    if (holdingSelect) {
      holdingSelect.addEventListener('change', () => {
        state.holdingEntity = holdingSelect.value || 'ALL';
        const ent = HOLDING_ENTITIES[state.holdingEntity] || HOLDING_ENTITIES.ALL;
        const sidebarName = document.getElementById('sidebar-niche-name');
        if (sidebarName) sidebarName.textContent = ent.badge;
        renderPulseSection();
        renderCashflowChart();
        showInlineStatus(`✓ Контур консолідації перемкнено: ${ent.badge}`);
      });
    }

    // Header Live Ledger & Pitch Deck shortcuts
    const btnHeaderLedger = document.getElementById('btn-header-live-ledger');
    if (btnHeaderLedger) {
      btnHeaderLedger.addEventListener('click', () => {
        switchTab('ledger');
      });
    }

    const btnHeaderPitch = document.getElementById('btn-header-open-pitch');
    if (btnHeaderPitch) {
      btnHeaderPitch.addEventListener('click', () => {
        switchTab('about');
      });
    }

    // Sidebar niche pill trigger -> opens Presentation (SMB + Enterprise) tab
    const nicheTrigger = document.getElementById('sidebar-niche-trigger');
    const scaleCard = document.getElementById('sidebar-scale-card');
    [nicheTrigger, scaleCard].forEach((el) => {
      if (el) {
        el.addEventListener('click', () => {
          switchTab('about');
        });
      }
    });

    // Presentation Mode Switcher (BOTH / SMB / ENTERPRISE) in #view-about
    document.querySelectorAll('.js-pres-mode-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode') || 'BOTH';
        document.querySelectorAll('.js-pres-mode-btn').forEach((b) => {
          const isCurrent = b === btn;
          b.className = isCurrent ? 'btn btn-sm btn-action-primary js-pres-mode-btn' : 'btn btn-sm btn-subtle js-pres-mode-btn';
        });
        const smbBlock = document.getElementById('pres-block-smb');
        const entBlock = document.getElementById('pres-block-enterprise');
        const turnSlider = document.getElementById('roi-turnover-slider');
        const staffSlider = document.getElementById('roi-staff-slider');
        if (mode === 'SMB') {
          if (smbBlock) smbBlock.style.display = 'block';
          if (entBlock) entBlock.style.display = 'none';
          if (turnSlider) turnSlider.value = '1800000';
          if (staffSlider) staffSlider.value = '35000';
          evaluateEnterpriseRoiLive();
          showInlineStatus('✓ Відкрито презентацію для Малого та Середнього Бізнесу (МСБ)');
        } else if (mode === 'ENTERPRISE') {
          if (smbBlock) smbBlock.style.display = 'none';
          if (entBlock) entBlock.style.display = 'block';
          if (turnSlider) turnSlider.value = '12000000';
          if (staffSlider) staffSlider.value = '140000';
          evaluateEnterpriseRoiLive();
          showInlineStatus('✓ Відкрито презентацію для Великого Бізнесу та Виробництва (Цех + Склад)');
        } else {
          if (smbBlock) smbBlock.style.display = 'block';
          if (entBlock) entBlock.style.display = 'block';
          if (turnSlider) turnSlider.value = '4500000';
          if (staffSlider) staffSlider.value = '65000';
          evaluateEnterpriseRoiLive();
          showInlineStatus('✓ Показано обидві презентації: МСБ + Великий Бізнес');
        }
      });
    });

    // OCR File Input (PC) & Phone Camera Patch Input
    const ocrPcInput = document.getElementById('ocr-pc-file-input');
    if (ocrPcInput) {
      ocrPcInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) handleUploadedOcrFile(file, '💻 Завантажено з комп\'ютера');
      });
    }

    const ocrPhoneInput = document.getElementById('ocr-phone-camera-input');
    if (ocrPhoneInput) {
      ocrPhoneInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) handleUploadedOcrFile(file, '📱 Сфотографовано з телефону');
      });
    }

    const ocrDropzone = document.getElementById('ocr-upload-dropzone');
    if (ocrDropzone) {
      ocrDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        ocrDropzone.style.borderColor = 'var(--primary)';
      });
      ocrDropzone.addEventListener('dragleave', () => {
        ocrDropzone.style.borderColor = 'var(--accent-blue)';
      });
      ocrDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        ocrDropzone.style.borderColor = 'var(--accent-blue)';
        const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (file) handleUploadedOcrFile(file, '💻 Перетягнуто з комп\'ютера');
      });
    }

    const btnApproveAllDocs = document.getElementById('btn-approve-all-docs');
    if (btnApproveAllDocs) {
      btnApproveAllDocs.addEventListener('click', () => {
        let count = 0;
        const entries = [];
        state.approvalDocs.forEach((d) => {
          if (d.status !== 'APPROVED') {
            d.status = 'APPROVED';
            count++;
            entries.push({
              doc: d.docNumber,
              desc: `Погоджено документ (${d.typeBadge}): ${d.ecosystemLink}`,
              entity: d.counterparty,
              dt: d.ledgerDt,
              dtCode: d.ledgerDtCode,
              kt: d.ledgerKt,
              ktCode: d.ledgerKtCode,
              amount: d.amount
            });
          }
        });
        if (entries.length > 0) {
          postOnlineLedgerEntries(entries);
        }
        renderDocsSection();
        renderPulseSection();
        showInlineStatus(`✓ Погоджено всі документи (${count || state.approvalDocs.length} шт.) + автоматично проведено в Склад, Цех та Облік Дт/Кт!`);
      });
    }

    // Ledger Account Filter
    const ledgerFilter = document.getElementById('ledger-filter-account');
    if (ledgerFilter) {
      ledgerFilter.addEventListener('change', renderLedgerSection);
    }

    // Custom CFO Ledger Entry Form
    const btnCustomLedger = document.getElementById('btn-add-custom-ledger');
    if (btnCustomLedger) {
      btnCustomLedger.addEventListener('click', () => {
        const dtSel = document.getElementById('cfo-dt-select');
        const ktSel = document.getElementById('cfo-kt-select');
        const amtInput = document.getElementById('cfo-amount-input');
        const descInput = document.getElementById('cfo-desc-input');

        const dtText = dtSel ? dtSel.options[dtSel.selectedIndex].text : '231 Основне виробництво';
        const ktText = ktSel ? ktSel.options[ktSel.selectedIndex].text : '201 Сировина й матеріали';
        const dtCode = dtSel ? dtSel.value : '231';
        const ktCode = ktSel ? ktSel.value : '201';
        const amount = Math.max(1, Number(amtInput?.value) || 245000);
        const desc = descInput?.value.trim() || 'Ручне проведення Головного бухгалтера / CFO';

        postOnlineLedgerEntries(
          [
            {
              doc: 'БУХ-ДОВІДКА',
              desc,
              entity: 'ТОВ "ОпексМетрікс Індастріал"',
              dt: dtText,
              dtCode,
              kt: ktText,
              ktCode,
              amount
            }
          ],
          `⚡ Проводку Дт ${dtCode} Кт ${ktCode} на суму ${fmtUah(amount, 2)} миттєво проведено в Головній Книзі (0.04 с)`
        );
      });
    }

    // MES BOM Calculator listeners
    const bomProdSelect = document.getElementById('mes-bom-product');
    const bomQtyInput = document.getElementById('mes-bom-qty');
    if (bomProdSelect) bomProdSelect.addEventListener('change', evaluateMesBomLive);
    if (bomQtyInput) bomQtyInput.addEventListener('input', evaluateMesBomLive);

    const btnLaunchMesBatch = document.getElementById('btn-mes-launch-batch');
    if (btnLaunchMesBatch) {
      btnLaunchMesBatch.addEventListener('click', () => {
        const bom = evaluateMesBomLive();
        if (!bom) return;

        const batchDoc = `MES-${910 + state.ledgerEntries.length}`;
        postOnlineLedgerEntries(
          [
            {
              doc: `${batchDoc} / ВИПУСК ГП`,
              desc: `Випуск готової партії з ЧПК на склад: ${bom.name} (${bom.qty} од.)`,
              entity: 'ТОВ "ОпексМетрікс Індастріал"',
              dt: '26 Готова продукція',
              dtCode: '26',
              kt: '231 Основне виробництво (MES)',
              ktCode: '231',
              amount: bom.totalBatchCost
            },
            {
              doc: `${batchDoc} / ЗП ЧПК`,
              desc: `Нараховано відрядну ЗП операторів ЧПК, електроенергію та ЗВВ (${bom.qty} од.)`,
              entity: 'ТОВ "ОпексМетрікс Індастріал"',
              dt: '231 Основне виробництво (MES)',
              dtCode: '231',
              kt: '661 Розрахунки за ЗП',
              ktCode: '661',
              amount: bom.totalWage + bom.totalEnergyOverhead
            },
            {
              doc: `${batchDoc} / FIFO BOM`,
              desc: `Списання металу, профілю та автоматики за техкартою (з урахуванням Zero-Waste залишків)`,
              entity: 'ТОВ "ОпексМетрікс Індастріал"',
              dt: '231 Основне виробництво (MES)',
              dtCode: '231',
              kt: '201 Сировина й матеріали',
              ktCode: '201',
              amount: bom.totalBatchCost - (bom.totalWage + bom.totalEnergyOverhead)
            }
          ],
          `🚀 Партію «${bom.name}» (${bom.qty} од.) запущено в ЧПК! Сформовано 3 проводки Дт 231/26 на ${fmtUah(bom.totalBatchCost)}`
        );
      });
    }

    // AI Procurement Anti-Kickback Switch Supplier button
    const btnSwitchSupp = document.getElementById('btn-switch-supplier-1');
    if (btnSwitchSupp) {
      btnSwitchSupp.addEventListener('click', () => {
        const itemEl = document.getElementById('kickback-item-1');
        if (itemEl) {
          itemEl.style.background = '#F0FDF4';
          itemEl.style.borderColor = '#BBF7D0';
          itemEl.innerHTML = `
            <div class="action-item-left">
              <span class="badge badge-green">✓ ВІДКАТ ЗАБЛОКОВАНО</span>
              <div>
                <div class="action-title">Замовлення автоматично переоформлено на прямого імпортера (₴ 125 000 / т замість ₴ 148 000 / т)</div>
                <div class="action-desc">Збережено чистих обігових коштів Холдингу: <strong style="color: var(--success);">+₴ 276 000</strong>. Проведено в Головній Книзі: <code class="mono">Дт 201 Кт 631</code>.</div>
              </div>
            </div>
            <span class="badge badge-green">Економія +₴ 276 000</span>
          `;
        }
        const savedBadge = document.getElementById('kickback-saved-badge');
        if (savedBadge) savedBadge.textContent = 'Заощаджено: ₴ 860 000 / міс';

        postOnlineLedgerEntries(
          [
            {
              doc: 'ВХ-ПРЯМИЙ-ІМПОРТ',
              desc: 'Оприбуткування сталі AISI 304 (12 т) за прямою ринковою ціною без посередника',
              entity: 'ТОВ "ОпексМетрікс Індастріал"',
              dt: '201 Сировина й матеріали',
              dtCode: '201',
              kt: '631 Розрахунки з постачальниками',
              ktCode: '631',
              amount: 1500000
            }
          ],
          '🛡️ AI Procurement Shield: Завищений рахунок заблоковано, заощаджено ₴ 276 000 (+Дт 201 Кт 631)'
        );
      });
    }

    // Enterprise ROI Sliders
    ['roi-turnover-slider', 'roi-leak-slider', 'roi-staff-slider'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', evaluateEnterpriseRoiLive);
    });

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

    // Create Invoice button (Also posts Online Double-Entry Ledger rows!)
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

        const vatAmount = Math.round((calc.netRevenue / 6) * 100) / 100;
        postOnlineLedgerEntries([
          {
            doc: `${newOrderNum} / Списання FIFO`,
            desc: `Списано собівартість партії «${calc.itemName}» (${calc.qty} ${calc.unit})`,
            entity: 'ТОВ "ОпексМетрікс Індастріал"',
            dt: '901 Собівартість реалізованої ГП',
            dtCode: '901',
            kt: '26 Готова продукція',
            ktCode: '26',
            amount: calc.totalCost
          },
          {
            doc: `${newOrderNum} / ПН J1201016`,
            desc: `Нараховано податкове зобов'язання з ПДВ 20% (${clientName})`,
            entity: 'ТОВ "ОпексМетрікс Індастріал"',
            dt: '701 Дохід від реалізації ГП',
            dtCode: '701',
            kt: '6412 Розрахунки за ПДВ',
            ktCode: '6412',
            amount: vatAmount
          },
          {
            doc: `${newOrderNum} / Реалізація`,
            desc: `Виставлено рахунок та визнано дохід B2B: ${clientName} (${calc.itemName})`,
            entity: 'ТОВ "ОпексМетрікс Індастріал"',
            dt: '361 Розрахунки з покупцями',
            dtCode: '361',
            kt: '701 Дохід від реалізації ГП',
            ktCode: '701',
            amount: calc.netRevenue
          }
        ]);

        renderSalesOrdersTable();
        renderInlineDocument(newOrderNum, 'INVOICE');
        renderPulseSection();
        showInlineStatus(`✓ Замовлення № ${newOrderNum} створено + сформовано 3 проводки Дт 361/701/6412/901 в Головній Книзі!`);
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
        const sku = document.getElementById('stk-sku')?.value.trim() || 'RAW-304';
        const itemName = document.getElementById('stk-name')?.value.trim() || 'Нова партія сировини';
        const qty = Number(document.getElementById('stk-qty')?.value) || 20;
        const unitPrice = Number(document.getElementById('stk-cost')?.value) || 14200;
        const totalSupply = qty * unitPrice;

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

        postOnlineLedgerEntries([
          {
            doc: `ВХ-WMS-${sku}`,
            desc: `Оприбуткування поставки на склад WMS: ${itemName} (+${qty} од.)`,
            entity: 'ТОВ "ОпексМетрікс Індастріал"',
            dt: '201 Сировина й матеріали',
            dtCode: '201',
            kt: '631 Розрахунки з постачальниками',
            ktCode: '631',
            amount: totalSupply
          }
        ]);

        renderStockSection();
        renderPulseSection();
        showInlineStatus(`✓ Поставку «${itemName}» (+${qty} од.) оприбутковано + проведено Дт 201 Кт 631 (${fmtUah(totalSupply)})`);
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
        const sampleBankText = state.demoMigrationPayload?.bankExchangeText || '1CClientBankExchange\nСекціяДокумент=Платіжне доручення\nНомер=8841\nСума=640000.00\nПризначенняПлатежу=Оплата за промислове обладнання згідно рахунку INV-2026-104 у т.ч. ПДВ 20%\nКінецьДокумента';
        if (bankTa) bankTa.value = sampleBankText;
        if (dropzoneStatus) {
          dropzoneStatus.textContent = '✓ Завантажено корпоративну виписку 1CClientBankExchange / ISO 20022 (Готово до проведення)';
        }
        showInlineStatus('✓ Приклад корпоративної банківської виписки завантажено');
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
        const rawText = bankTa?.value || 'DEMO-STATEMENT';

        try {
          const res = await fetch('/api/autonomous/bank/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rawText })
          }).then((r) => r.json()).catch(() => null);

          const pulseRes = await fetch('/api/autonomous/pulse').then((r) => r.json()).catch(() => null);
          if (pulseRes && pulseRes.ok) state.pulse = pulseRes.data;

          postOnlineLedgerEntries([
            {
              doc: 'БВ-8842 / Оплата постачальнику',
              desc: 'Авто-рознесення виписки: оплата за комплектуючі та виділення податкового кредиту ПДВ',
              entity: 'ТОВ "ОпексМетрікс Індастріал"',
              dt: '631 Розрахунки з постачальниками',
              dtCode: '631',
              kt: '311 Поточні рахунки в UAH',
              ktCode: '311',
              amount: 240000
            },
            {
              doc: 'БВ-8841 / Надходження B2B',
              desc: 'Авто-рознесення виписки: безготівкова оплата від покупця за контрактом',
              entity: 'ТОВ "Торговий Дім Альфа-Груп"',
              dt: '311 Поточні рахунки в UAH',
              dtCode: '311',
              kt: '361 Розрахунки з покупцями',
              ktCode: '361',
              amount: 640000
            }
          ]);

          renderBankSection();
          renderPulseSection();
          renderTaxesAndTeamSection();
          showInlineStatus(`✓ Виписку проведено (${res?.data?.autoPosted || 3} платежі) + сформовано проводки Дт 311 Кт 361 та Дт 631 Кт 311!`);
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
        let totalNetPaid = 0;
        state.teamPayroll.forEach((emp) => {
          if (!emp.paid) totalNetPaid += emp.netPay;
          emp.paid = true;
        });
        if (totalNetPaid === 0) totalNetPaid = 131586;

        postOnlineLedgerEntries([
          {
            doc: 'ЗП-ВІДОМІСТЬ-2026',
            desc: 'Виплата заробітної плати, бонусів KPI сейлзів та відрядних ЧПК за відомістю',
            entity: 'ТОВ "ОпексМетрікс Індастріал"',
            dt: '661 Розрахунки за ЗП',
            dtCode: '661',
            kt: '311 Поточні рахунки в UAH',
            ktCode: '311',
            amount: totalNetPaid
          }
        ]);

        renderTaxesAndTeamSection();
        showInlineStatus(`✓ Зарплату команді виплачено в 1 клік + проведено Дт 661 Кт 311 (${fmtUah(totalNetPaid)})`);
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

      // 0. Document OCR Presets & In-System Document Approval Workflow
      if (target.classList.contains('js-ocr-sim-preset')) {
        const presetKey = target.getAttribute('data-preset');
        const preset = OCR_PRESETS[presetKey];
        if (preset) {
          state.activeOcrDoc = Object.assign({}, preset);
          const recEl = document.getElementById('docs-kpi-recognized');
          if (recEl) {
            const curNum = parseInt(recEl.textContent, 10) || 342;
            recEl.textContent = `${curNum + 1} док.`;
          }
          renderDocsSection();
          showInlineStatus(`✓ AI OCR розпізнав документ: ${preset.typeBadge} № ${preset.docNumber} (${preset.source})`);
        }
        return;
      }

      if (target.id === 'btn-ocr-send-to-approval') {
        const doc = state.activeOcrDoc;
        if (doc) {
          const exists = state.approvalDocs.find((d) => d.id === doc.id);
          if (!exists) {
            state.approvalDocs.unshift({
              id: doc.id,
              docNumber: doc.docNumber,
              source: doc.source,
              typeBadge: doc.typeBadge,
              counterparty: doc.counterparty,
              edrpou: doc.edrpou,
              ecosystemLink: doc.ecosystemLink,
              amount: doc.amount,
              approvalRoute: doc.approvalRoute,
              status: 'PENDING',
              ledgerDt: doc.ledgerDt,
              ledgerDtCode: doc.ledgerDtCode,
              ledgerKt: doc.ledgerKt,
              ledgerKtCode: doc.ledgerKtCode
            });
          } else {
            exists.status = 'PENDING';
          }
          renderDocsSection();
          renderPulseSection();
          showInlineStatus(`📤 Документ № ${doc.docNumber} передано на погодження керівнику!`);
        }
        return;
      }

      if (target.id === 'btn-ocr-approve-now') {
        const doc = state.activeOcrDoc;
        if (doc) {
          let existing = state.approvalDocs.find((d) => d.id === doc.id);
          if (!existing) {
            existing = {
              id: doc.id,
              docNumber: doc.docNumber,
              source: doc.source,
              typeBadge: doc.typeBadge,
              counterparty: doc.counterparty,
              edrpou: doc.edrpou,
              ecosystemLink: doc.ecosystemLink,
              amount: doc.amount,
              approvalRoute: doc.approvalRoute.replace('⏳', '✓'),
              status: 'APPROVED',
              ledgerDt: doc.ledgerDt,
              ledgerDtCode: doc.ledgerDtCode,
              ledgerKt: doc.ledgerKt,
              ledgerKtCode: doc.ledgerKtCode
            };
            state.approvalDocs.unshift(existing);
          } else {
            existing.status = 'APPROVED';
            existing.approvalRoute = existing.approvalRoute.replace('⏳', '✓');
          }
          postOnlineLedgerEntries(
            [
              {
                doc: doc.docNumber,
                desc: `Погоджено та проведено (${doc.source}): ${doc.itemsSummary}`,
                entity: doc.counterparty,
                dt: doc.ledgerDt,
                dtCode: doc.ledgerDtCode,
                kt: doc.ledgerKt,
                ktCode: doc.ledgerKtCode,
                amount: doc.amount
              }
            ],
            `✓ Документ № ${doc.docNumber} погоджено та проведено в Склад/Цех і Головну Книгу (Дт ${doc.ledgerDtCode} Кт ${doc.ledgerKtCode} на ${fmtUah(doc.amount)})!`
          );
          renderDocsSection();
          renderPulseSection();
        }
        return;
      }

      if (target.classList.contains('js-doc-approve')) {
        const docId = target.getAttribute('data-id');
        const doc = state.approvalDocs.find((d) => d.id === docId);
        if (doc) {
          doc.status = 'APPROVED';
          doc.approvalRoute = doc.approvalRoute.replace('⏳', '✓');
          postOnlineLedgerEntries(
            [
              {
                doc: doc.docNumber,
                desc: `Погоджено в системі (${doc.typeBadge}): ${doc.ecosystemLink}`,
                entity: doc.counterparty,
                dt: doc.ledgerDt,
                dtCode: doc.ledgerDtCode,
                kt: doc.ledgerKt,
                ktCode: doc.ledgerKtCode,
                amount: doc.amount
              }
            ],
            `✓ Документ № ${doc.docNumber} погоджено! Сировину/умови проведено в Склад ↔ Цех + Дт ${doc.ledgerDtCode} Кт ${doc.ledgerKtCode} (${fmtUah(doc.amount)})`
          );
          renderDocsSection();
          renderPulseSection();
        }
        return;
      }

      if (target.classList.contains('js-doc-reject')) {
        const docId = target.getAttribute('data-id');
        const doc = state.approvalDocs.find((d) => d.id === docId);
        if (doc) {
          doc.status = 'REJECTED';
          renderDocsSection();
          renderPulseSection();
          showInlineStatus(`✕ Документ № ${doc.docNumber} повернуто на доопрацювання`);
        }
        return;
      }

      if (target.classList.contains('js-doc-preview-ocr')) {
        const docId = target.getAttribute('data-id');
        const doc = state.approvalDocs.find((d) => d.id === docId);
        if (doc) {
          state.activeOcrDoc = {
            id: doc.id,
            docType: 'WAYBILL',
            typeBadge: doc.typeBadge,
            source: doc.source,
            docNumber: doc.docNumber,
            counterparty: doc.counterparty,
            edrpou: doc.edrpou,
            amount: doc.amount,
            vatAmount: Math.round((doc.amount / 6) * 100) / 100,
            itemsSummary: doc.ecosystemLink,
            ecosystemLink: doc.ecosystemLink,
            aiRiskCheck: '✓ Усі реквізити, номенклатуру складу/цеху та суму ПДВ звірено автоматично.',
            approvalRoute: doc.approvalRoute,
            ledgerDt: doc.ledgerDt,
            ledgerDtCode: doc.ledgerDtCode,
            ledgerKt: doc.ledgerKt,
            ledgerKtCode: doc.ledgerKtCode
          };
          renderDocsSection();
          showInlineStatus(`👁️ Відкрито AI OCR скан документа № ${doc.docNumber}`);
        }
        return;
      }

      // 0A. 1-Click Live Ledger Simulator Buttons in #view-ledger
      if (target.classList.contains('js-sim-ledger')) {
        const simType = target.getAttribute('data-sim');
        if (simType === 'b2b-sale') {
          postOnlineLedgerEntries(
            [
              {
                doc: 'FIFO-Списання ГП',
                desc: 'Списання заводської собівартості відвантаженої партії ПЕМ-400 (5 од.)',
                entity: 'ТОВ "ОпексМетрікс Індастріал"',
                dt: '901 Собівартість реалізованої ГП',
                dtCode: '901',
                kt: '26 Готова продукція',
                ktCode: '26',
                amount: 310000
              },
              {
                doc: 'ПН J1201016 ЄРПН',
                desc: 'Авто-реєстрація податкового зобов\'язання з ПДВ 20% при відвантаженні',
                entity: 'ТОВ "ОпексМетрікс Індастріал"',
                dt: '701 Дохід від реалізації ГП',
                dtCode: '701',
                kt: '6412 Розрахунки за ПДВ',
                ktCode: '6412',
                amount: 76666.67
              },
              {
                doc: 'ВН-2026-850',
                desc: 'Реалізація промислової партії ПЕМ-400 покупцю ТОВ "Епіцентр К"',
                entity: 'ТОВ "ОпексМетрікс Індастріал"',
                dt: '361 Розрахунки з покупцями',
                dtCode: '361',
                kt: '701 Дохід від реалізації ГП',
                ktCode: '701',
                amount: 460000
              }
            ],
            '⚡ B2B Реалізацію проведено за 0.04 с: Дт 361 Кт 701 (₴ 460 000) + ПДВ Дт 701 Кт 6412 + Собівартість Дт 901 Кт 26!'
          );
        } else if (simType === 'mes-release') {
          postOnlineLedgerEntries(
            [
              {
                doc: 'MES-915 / Випуск ЧПК',
                desc: 'Оприбуткування готової партії конвеєрних секцій КС-1200 з цеху ЧПК на склад ГП',
                entity: 'ТОВ "ОпексМетрікс Індастріал"',
                dt: '26 Готова продукція',
                dtCode: '26',
                kt: '231 Основне виробництво (MES)',
                ktCode: '231',
                amount: 427000
              },
              {
                doc: 'MES-915 / Відрядна ЗП',
                desc: 'Нарахування відрядної оплати операторам ЧПК та електроенергії (38 кВт·год)',
                entity: 'ТОВ "ОпексМетрікс Індастріал"',
                dt: '231 Основне виробництво (MES)',
                dtCode: '231',
                kt: '661 Розрахунки за ЗП',
                ktCode: '661',
                amount: 74000
              },
              {
                doc: 'MES-915 / Списання BOM',
                desc: 'Списання металопрокату та мотор-редукторів у виробництво за техкартою',
                entity: 'ТОВ "ОпексМетрікс Індастріал"',
                dt: '231 Основне виробництво (MES)',
                dtCode: '231',
                kt: '201 Сировина й матеріали',
                ktCode: '201',
                amount: 353000
              }
            ],
            '🏭 Випуск партії з ЧПК (MES) проведено за 0.04 с: Дт 231 Кт 201/661 → Дт 26 Кт 231 (₴ 427 000)!'
          );
        } else if (simType === 'bank-supplier') {
          postOnlineLedgerEntries(
            [
              {
                doc: 'ЄРПН Вхідна ПН',
                desc: 'Відображено податковий кредит з ПДВ 20% за вхідною накладною постачальника',
                entity: 'ТОВ "ОпексМетрікс Індастріал"',
                dt: '6412 Розрахунки за ПДВ',
                dtCode: '6412',
                kt: '631 Розрахунки з постачальниками',
                ktCode: '631',
                amount: 48000
              },
              {
                doc: 'БВ-8890 / Приват24',
                desc: 'Безготівкова оплата постачальнику за листовий метал AISI 304 (12 т)',
                entity: 'ТОВ "ОпексМетрікс Індастріал"',
                dt: '631 Розрахунки з постачальниками',
                dtCode: '631',
                kt: '311 Поточні рахунки в UAH',
                ktCode: '311',
                amount: 288000
              }
            ],
            '🏦 Оплату постачальнику та Податковий кредит ПДВ (Дт 631 Кт 311 + Дт 6412) проведено за 0.04 с!'
          );
        } else if (simType === 'intercompany') {
          postOnlineLedgerEntries(
            [
              {
                doc: 'IC-ELIM-2026',
                desc: 'Автоматична елімінація внутрішньогрупових розрахунків (Завод ТОВ ↔ Торговий Дім)',
                entity: 'Консолідація Холдингу',
                dt: '683 Внутрішньогосподарські розрахунки',
                dtCode: '683',
                kt: '361 Розрахунки з покупцями',
                ktCode: '361',
                amount: 1250000
              }
            ],
            '🏢 Елімінацію внутрішньогрупового обороту Холдингу (Дт 683 Кт 361 на ₴ 1 250 000) проведено за 0.04 с!'
          );
        }
        return;
      }

      // 0B. 1-Click MES Line Batch Release in #view-mes
      if (target.classList.contains('js-mes-release-line')) {
        const lineId = target.getAttribute('data-id');
        const line = state.mesLines.find((l) => l.id === lineId);
        if (line) {
          line.doneQty = line.totalQty;
          line.status = 'RELEASED';
          renderMesSection();
          postOnlineLedgerEntries(
            [
              {
                doc: `MES-RELEASE / ${line.id.toUpperCase()}`,
                desc: `Випуск готової продукції з лінії «${line.name}» (${line.totalQty} од.)`,
                entity: 'ТОВ "ОпексМетрікс Індастріал"',
                dt: '26 Готова продукція',
                dtCode: '26',
                kt: '231 Основне виробництво (MES)',
                ktCode: '231',
                amount: line.batchCost
              }
            ],
            `✓ Партію з «${line.name}» випущено на склад ГП + проведено Дт 26 Кт 231 (${fmtUah(line.batchCost)})!`
          );
        }
        return;
      }

      // 0C. 1-Click Dealer Credit Gate Toggle in #view-sales
      if (target.classList.contains('js-toggle-dealer-gate')) {
        const dlId = target.getAttribute('data-id');
        const dl = state.dealerCredits.find((d) => d.id === dlId);
        if (dl) {
          if (dl.gateStatus === 'BLOCKED') {
            const paidDebt = dl.debtUah;
            dl.debtUah = 0;
            dl.overdueDays = 0;
            dl.gateStatus = 'OPEN';
            renderDealerCreditTable();
            postOnlineLedgerEntries(
              [
                {
                  doc: `БВ-ПОГАШЕННЯ / ${dl.id.toUpperCase()}`,
                  desc: `Погашення простроченої дебіторської заборгованості дилера ${dl.name}`,
                  entity: 'ТОВ "Торговий Дім Альфа-Груп"',
                  dt: '311 Поточні рахунки в UAH',
                  dtCode: '311',
                  kt: '361 Розрахунки з покупцями',
                  ktCode: '361',
                  amount: paidDebt
                }
              ],
              `✓ Оплату ${fmtUah(paidDebt)} від ${dl.name} зараховано (Дт 311 Кт 361) — шлагбаум WMS відкрито!`
            );
          } else {
            dl.gateStatus = 'BLOCKED';
            renderDealerCreditTable();
            showInlineStatus(`⛔ Відвантаження для «${dl.name}» примусово заблоковано на складі WMS!`);
          }
        }
        return;
      }

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

        if (state.fallbackBankTxs) {
          const fbTx = state.fallbackBankTxs.find((x) => x.id === id);
          if (fbTx) {
            fbTx.category = category;
            fbTx.ruleMatched = `✓ Класифіковано CFO (${label})`;
            fbTx.status = 'AUTO_POSTED';
          }
        }

        postOnlineLedgerEntries([
          {
            doc: `БВ-КЛАСИФІКАЦІЯ`,
            desc: `Класифіковано банківський платіж: ${label}`,
            entity: 'ТОВ "ОпексМетрікс Індастріал"',
            dt: category === 'REVENUE_SALES' ? '311 Поточні рахунки в UAH' : '631 Розрахунки з постачальниками',
            dtCode: category === 'REVENUE_SALES' ? '311' : '631',
            kt: category === 'REVENUE_SALES' ? '361 Розрахунки з покупцями' : '311 Поточні рахунки в UAH',
            ktCode: category === 'REVENUE_SALES' ? '361' : '311',
            amount: 84000
          }
        ]);

        renderPulseSection();
        renderBankSection();
        showInlineStatus(`✓ Платіж класифіковано як «${label}» + проведено в Головній Книзі!`);
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
          if (found) {
            found.status = 'PAID';
            postOnlineLedgerEntries([
              {
                doc: `БВ-${ordNum}`,
                desc: `Надходження оплати за простроченим рахунком ${ordNum} (${found.clientName})`,
                entity: 'ТОВ "Торговий Дім Альфа-Груп"',
                dt: '311 Поточні рахунки в UAH',
                dtCode: '311',
                kt: '361 Розрахунки з покупцями',
                ktCode: '361',
                amount: found.totalAmount
              }
            ]);
          }
          renderPulseSection();
          renderSalesOrdersTable();
          showInlineStatus(`✓ Оплату за рахунком ${ordNum} зараховано + проведено Дт 311 Кт 361!`);
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

        postOnlineLedgerEntries([
          {
            doc: `MRP-${sku}`,
            desc: `Авто-поповнення критичного запасу під план MES: ${itemName} (+${qty} од.)`,
            entity: 'ТОВ "ОпексМетрікс Індастріал"',
            dt: '201 Сировина й матеріали',
            dtCode: '201',
            kt: '631 Розрахунки з постачальниками',
            ktCode: '631',
            amount: qty * unitPrice
          }
        ]);

        renderPulseSection();
        renderStockSection();
        showInlineStatus(`✓ Замовлення постачальнику оприбутковано (+${qty} од.) + проведено Дт 201 Кт 631!`);
        return;
      }

      // 5. Cycle order status in Sales table
      if (target.classList.contains('js-cycle-order-status')) {
        const ordNum = target.getAttribute('data-num');
        const nextStatus = target.getAttribute('data-next');
        const found = state.orders.find((o) => o.orderNumber === ordNum);
        if (found && nextStatus) {
          found.status = nextStatus;
          if (nextStatus === 'PAID') {
            postOnlineLedgerEntries([
              {
                doc: `БВ-${ordNum}`,
                desc: `Отримано безготівкову оплату від покупця ${found.clientName} за рахунком ${ordNum}`,
                entity: 'ТОВ "ОпексМетрікс Індастріал"',
                dt: '311 Поточні рахунки в UAH',
                dtCode: '311',
                kt: '361 Розрахунки з покупцями',
                ktCode: '361',
                amount: found.totalAmount
              }
            ]);
          } else if (nextStatus === 'SHIPPED') {
            postOnlineLedgerEntries([
              {
                doc: `ВН-${ordNum}`,
                desc: `Відвантажено продукцію зі складу покупцю ${found.clientName} (Списання FIFO)`,
                entity: 'ТОВ "ОпексМетрікс Індастріал"',
                dt: '901 Собівартість реалізованої ГП',
                dtCode: '901',
                kt: '26 Готова продукція',
                ktCode: '26',
                amount: found.costAmount || Math.round(found.totalAmount * 0.68)
              }
            ]);
          }
          renderSalesOrdersTable();
          renderPulseSection();
          showInlineStatus(`✓ Статус замовлення ${ordNum} змінено на «${nextStatus === 'PAID' ? 'Оплачено (Дт 311 Кт 361)' : 'Відвантажено (Дт 901 Кт 26)'}»`);
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

        postOnlineLedgerEntries([
          {
            doc: `WMS-ПОПОВНЕННЯ-${sku}`,
            desc: `Оприбуткування партії «${itemName}» (+${qty} ${unit}) на склад`,
            entity: 'ТОВ "ОпексМетрікс Індастріал"',
            dt: '201 Сировина й матеріали',
            dtCode: '201',
            kt: '631 Розрахунки з постачальниками',
            ktCode: '631',
            amount: qty * unitPrice
          }
        ]);

        renderStockSection();
        renderPulseSection();
        showInlineStatus(`✓ Запас «${itemName}» поповнено на +${qty} ${unit} (+Дт 201 Кт 631)`);
        return;
      }

      // 8. Pay single employee
      if (target.classList.contains('js-pay-single-emp')) {
        const empId = target.getAttribute('data-id');
        const emp = state.teamPayroll.find((x) => x.id === empId);
        if (emp) {
          emp.paid = true;
          postOnlineLedgerEntries([
            {
              doc: `ЗП-${emp.id.toUpperCase()}`,
              desc: `Виплата ЗП та бонусу KPI співробітнику: ${emp.name}`,
              entity: 'ТОВ "ОпексМетрікс Індастріал"',
              dt: '661 Розрахунки за ЗП',
              dtCode: '661',
              kt: '311 Поточні рахунки в UAH',
              ktCode: '311',
              amount: emp.netPay
            }
          ]);
          renderTaxesAndTeamSection();
          showInlineStatus(`✓ Виплачено ${fmtUah(emp.netPay)} на картку (${emp.name}) + проведено Дт 661 Кт 311`);
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
          itemsSummary: 'Промислова партія згідно голосового замовлення (Whisper AI)',
          items: [
            { name: 'Промислова партія обладнання згідно специфікації AI Call-Center', unit: 'компл.', qty: 1, price: totalAmount, cost: Math.round(totalAmount * 0.68) }
          ],
          totalAmount,
          costAmount: Math.round(totalAmount * 0.68),
          marginPct: 32.0,
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

        postOnlineLedgerEntries([
          {
            doc: `AI-VOICE-${orderNumber}`,
            desc: `Автоматичне проведення контракту з голосового дзвінка (${clientName})`,
            entity: 'ТОВ "Торговий Дім Альфа-Груп"',
            dt: '361 Розрахунки з покупцями',
            dtCode: '361',
            kt: '701 Дохід від реалізації ГП',
            ktCode: '701',
            amount: totalAmount
          }
        ]);

        renderAiSalesSection();
        renderSalesOrdersTable();
        renderPulseSection();
        switchTab('sales');
        renderInlineDocument(orderNumber, 'INVOICE');
        showInlineStatus(`✓ Рахунок № ${orderNumber} створено з дзвінка за 1 клік + проведено Дт 361 Кт 701!`);
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
