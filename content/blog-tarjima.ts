// =============================================================================
// BLOG MAQOLALARINING RUSCHA VA INGLIZCHA TARJIMASI
// =============================================================================
// Maqolalar bazada o'zbekcha (admin panel -> Blog). /ru va /en sahifalarida shu yerdagi
// tarjima ko'rsatiladi: kalit = maqola slug'i. "manba" -- tarjima qilingan o'zbekcha
// sarlavha va qisqa tavsif: admin panelda ularni o'zgartirsangiz, eski tarjima
// ko'rsatilmaydi (maqola o'zbekcha chiqadi va "faqat o'zbek tilida" deb yoziladi) --
// shu yerdagi tarjimani yangilang. Yangi maqola uchun ham shu yerga tarjima qo'shing.
// Qoida: tarjimada faqat o'zbekcha matndagi faktlar, manbalar o'zgarmaydi.
// =============================================================================

type Matn = { title: string; excerpt: string; content: string };
type Tarjima = { manba: { title: string; excerpt: string }; ru: Matn; en: Matn };

export const BLOG_TARJIMA: Record<string, Tarjima> = {
  "solidworks-uchun-qancha-ram-kerak": {
    manba: {
      title: "SOLIDWORKS uchun qancha RAM va SSD kerak?",
      excerpt: "Rasmiy talab — 16 GB, tavsiya — 32 GB.",
    },
    ru: {
      title: "Сколько RAM и SSD нужно для SOLIDWORKS?",
      excerpt: "Официальное требование — 16 ГБ, рекомендуется — 32 ГБ.",
      content: `В официальных требованиях SOLIDWORKS и CATIA указано: RAM — 16 ГБ (рекомендуется 32 ГБ). SSD — 512 ГБ; если вы работаете с большими файлами, рекомендуется накопитель на 1 ТБ.

Источник: [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)`,
    },
    en: {
      title: "How much RAM and SSD does SOLIDWORKS need?",
      excerpt: "The official requirement is 16 GB; 32 GB is recommended.",
      content: `The official SOLIDWORKS and CATIA requirements list RAM: 16 GB (32 GB recommended). SSD: 512 GB; if you work with large files, 1 TB of storage is recommended.

Source: [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)`,
    },
  },

  "catia-v5-nomi-nimani-anglatadi": {
    manba: {
      title: "CATIA V5 nomi nimani anglatadi?",
      excerpt: "CATIA nomi qisqartma. Dassault Systèmes uni CAD, CAM va CAE uchun keng ishlatiladigan dasturlar to'plami deb ta'riflaydi.",
    },
    ru: {
      title: "Что означает название CATIA V5?",
      excerpt: "CATIA — это аббревиатура. Dassault Systèmes описывает её как широко используемый набор программ для CAD, CAM и CAE.",
      content: `**CATIA V5** — сокращение от *Computer-Aided Three-dimensional Interactive Application V5*. Dassault Systèmes описывает её как широко используемый набор программ для CAD (проектирование), CAM (производство) и CAE (инженерный анализ).

На официальной странице упоминаются такие отрасли, как автомобилестроение, авиация и промышленное оборудование.

Источник: [CATIA V5, Dassault Systèmes](https://www.3ds.com/products/catia/catia-v5)`,
    },
    en: {
      title: "What does the name CATIA V5 stand for?",
      excerpt: "CATIA is an abbreviation. Dassault Systèmes describes it as a widely used software suite for CAD, CAM and CAE.",
      content: `**CATIA V5** stands for *Computer-Aided Three-dimensional Interactive Application V5*. Dassault Systèmes describes it as a widely used software suite for CAD (design), CAM (manufacturing) and CAE (engineering analysis).

The official page mentions industries such as automotive, aerospace and industrial equipment.

Source: [CATIA V5, Dassault Systèmes](https://www.3ds.com/products/catia/catia-v5)`,
    },
  },

  "solidworks-windows-home-qollab-quvvatlanmaydi": {
    manba: {
      title: "SOLIDWORKS Windows Home'ni qo'llab-quvvatlamaydi",
      excerpt: "Kompyuter olishdan oldin Windows nashrini tekshiring: SOLIDWORKS rasmiy talablarida Home nashrlari qo'llab-quvvatlanmaydi.",
    },
    ru: {
      title: "SOLIDWORKS не поддерживает Windows Home",
      excerpt: "Перед покупкой компьютера проверьте редакцию Windows: по официальным требованиям SOLIDWORKS редакции Home не поддерживаются.",
      content: `В официальных требованиях SOLIDWORKS это указано отдельно: **редакции Windows Home не поддерживаются**. Перед покупкой компьютера или ноутбука проверьте редакцию Windows.

Ещё одно замечание: Windows через Boot Camp на компьютере Mac тоже не поддерживается.

Источник: [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)`,
    },
    en: {
      title: "SOLIDWORKS does not support Windows Home",
      excerpt: "Check the Windows edition before buying a computer: the official SOLIDWORKS requirements do not support Home editions.",
      content: `The official SOLIDWORKS requirements state it explicitly: **Windows Home editions are not supported**. Check the Windows edition before you buy a computer or laptop.

One more note: running Windows on a Mac through Boot Camp is not supported either.

Source: [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)`,
    },
  },

  "solidworks-catia-3dexperience-imkoniyatlar-va-talablar": {
    manba: {
      title: "SOLIDWORKS, CATIA va 3DEXPERIENCE: nimalar qila olasiz va qanday kompyuter kerak",
      excerpt:
        "Uchta Dassault Systèmes yechimi nima uchun ishlatiladi, ularga qanday talablar qo'yiladi va tanlashda nimaga e'tibor berish kerak. Faqat rasmiy manbalardagi ma'lumotlar, 2026-yil sentabr holatiga.",
    },
    ru: {
      title: "SOLIDWORKS, CATIA и 3DEXPERIENCE: что они умеют и какой нужен компьютер",
      excerpt:
        "Для чего используются три решения Dassault Systèmes, какие у них требования и на что обратить внимание при выборе. Только данные из официальных источников, по состоянию на сентябрь 2026 года.",
      content: `В этой статье — краткая и точная информация о трёх известных инженерных решениях: **SOLIDWORKS**, **CATIA** и **3DEXPERIENCE**. Все три разрабатывает Dassault Systèmes. Данные взяты с официальных страниц и актуальны на сентябрь 2026 года. Требования меняются каждый год, поэтому в конце статьи даны официальные ссылки.

## SOLIDWORKS: что можно делать

SOLIDWORKS — программа 3D CAD (компьютерного проектирования). Согласно официальной странице, в ней создают детали, сборки и готовую к производству документацию (чертежи). При параметрическом моделировании изменение размера распространяется на всю модель.

- **SOLIDWORKS Design** устанавливается на компьютер и при желании подключается к облачным возможностям: обмен файлами, комментарии и хранение истории изменений.
- **SOLIDWORKS xDesign** работает в браузере. Согласно официальному описанию, его не нужно устанавливать и обновлять, и специальное оборудование не требуется.
- Лицензии бывают двух видов: именная (на пользователя, работает на нескольких устройствах) или привязанная к одному устройству.
- В семействе SOLIDWORKS есть и другие продукты: PDM, Electrical, Visualize, Composer и eDrawings.
- Из новинок версии 2026: AI-инструменты, автоматизирующие повторяющиеся задачи (например, создание чертежей), и загрузка только нужных частей больших сборок (Selective Loading).

## CATIA: что можно делать

Название CATIA V5 происходит от слов *Computer-Aided Three-dimensional Interactive Application V5*. Dassault Systèmes описывает её как широко используемый набор программ для CAD, CAM и CAE и упоминает такие отрасли, как автомобилестроение, авиация и промышленное оборудование.

- Модули: Part Design, Assembly Design, Drafting, Surfacing и другие.
- CAM: создание траекторий (toolpath) для станков с ЧПУ.
- Симуляция и анализ: оценка поведения и прочности изделия.
- Официальная страница CATIA выделяет такие направления: здания и инфраструктура, дизайн и стайлинг, электрические и гидравлические системы, машиностроение, системная инженерия.
- В линейке продуктов вместе с CATIA V5 есть также 3DEXPERIENCE CATIA и CATIA Magic.

## 3DEXPERIENCE: что это

3DEXPERIENCE — платформа Dassault Systèmes. Согласно официальной документации, настольные и браузерные клиенты CATIA, SOLIDWORKS, ENOVIA, SIMULIA и других приложений сертифицируются в рамках этой платформы. Упоминаются облачный (SaaS) вариант платформы и вариант для установки на собственный сервер (on-premise). А SOLIDWORKS Design, подключённый к платформе 3DEXPERIENCE, позволяет получать обратную связь в реальном времени, управлять данными и работать в команде. Сегодня официальная страница описывает платформу через знания предприятия, искусственный интеллект и виртуальных двойников (Virtual Twin).

## Требования

**SOLIDWORKS (официальные требования):**

- Операционная система: Windows 11 (64-bit). Последняя версия с поддержкой Windows 10 — SOLIDWORKS 2025 SP5. Редакции Windows Home не поддерживаются.
- Процессор: x86_64 (Intel 64 или AMD64).
- RAM: 16 ГБ (рекомендуется 32 ГБ).
- Видеокарта: сертифицированные карты и драйверы.
- Диск: рекомендуется SSD.
- Windows через Boot Camp на компьютере Mac не поддерживается.

**CATIA и 3DEXPERIENCE:** Dassault Systèmes публикует список сертифицированных рабочих станций. Для апреля, мая, июня и июля 2026 года есть отдельные новые списки. Сертификация относится к 64-битным настольным и браузерным клиентам. Перед переходом в облако рекомендуется проверить, сертифицирован ли ваш компьютер, с помощью официального инструмента «Cloud Eligibility». А перед установкой на собственный сервер нужно изучить документацию «On-Premise Program Directories».

## Советы

- Перед покупкой компьютера откройте страницу официальных требований именно той версии, которую собираетесь установить: требования меняются из года в год.
- Официальная рекомендация — 32 ГБ RAM. Если покупаете новый компьютер, ориентируйтесь на это.
- При покупке ноутбука проверьте, что на нём не Windows Home.
- Видеокарту выбирайте из [списка сертифицированных для SOLIDWORKS](https://www.solidworks.com/support/hardware-certification/).
- Если ваш компьютер не соответствует требованиям, присмотритесь к SOLIDWORKS xDesign, который работает в браузере.
- Если вы студент или преподаватель: на странице CATIA отдельно указаны программы академических и студенческих лицензий. Условия читайте на официальной странице.

## Источники

Все — официальные страницы, по состоянию на сентябрь 2026 года:

- [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)
- [SOLIDWORKS 3D CAD](https://www.solidworks.com/product/solidworks-3d-cad)
- [SOLIDWORKS Hardware Certification](https://www.solidworks.com/support/hardware-certification/)
- [CATIA, Dassault Systèmes](https://www.3ds.com/products/catia/)
- [CATIA V5, Dassault Systèmes](https://www.3ds.com/products/catia/catia-v5)
- [3DEXPERIENCE, Dassault Systèmes](https://www.3ds.com/products/3dexperience)
- [Certified Hardware and Software, Dassault Systèmes](https://www.3ds.com/support/hardware-and-software)`,
    },
    en: {
      title: "SOLIDWORKS, CATIA and 3DEXPERIENCE: what they can do and what computer you need",
      excerpt:
        "What the three Dassault Systèmes solutions are used for, what their requirements are and what to look for when choosing. Official sources only, as of September 2026.",
      content: `This article gives short, accurate information about three well-known engineering solutions: **SOLIDWORKS**, **CATIA** and **3DEXPERIENCE**. All three are developed by Dassault Systèmes. The data comes from official pages and is current as of September 2026. Requirements change every year, so official links are given at the end of the article.

## SOLIDWORKS: what you can do

SOLIDWORKS is a 3D CAD (computer-aided design) program. According to the official page, it is used to create parts, assemblies and manufacturing-ready documentation (drawings). In parametric modeling, changing a dimension propagates through the whole model.

- **SOLIDWORKS Design** is installed on your computer and can optionally connect to cloud capabilities: file sharing, comments and change history.
- **SOLIDWORKS xDesign** runs in the browser. According to the official description, it needs no installation, no updates and no special hardware.
- There are two license types: named user (works on several devices) or tied to a single device.
- The SOLIDWORKS family also includes products such as PDM, Electrical, Visualize, Composer and eDrawings.
- New in the 2026 release: AI tools that automate repetitive work (for example, creating drawings) and loading only the needed parts of large assemblies (Selective Loading).

## CATIA: what you can do

The name CATIA V5 comes from *Computer-Aided Three-dimensional Interactive Application V5*. Dassault Systèmes describes it as a widely used software suite for CAD, CAM and CAE and mentions industries such as automotive, aerospace and industrial equipment.

- Modules: Part Design, Assembly Design, Drafting, Surfacing and others.
- CAM: generating toolpaths for CNC machines.
- Simulation and analysis: evaluating product behavior and strength.
- The official CATIA page groups its areas as: buildings and infrastructure, design and styling, electrical and fluid engineering, mechanical engineering, systems engineering.
- Alongside CATIA V5, the product line also includes 3DEXPERIENCE CATIA and CATIA Magic.

## 3DEXPERIENCE: what it is

3DEXPERIENCE is the Dassault Systèmes platform. According to official documentation, the desktop and browser clients of CATIA, SOLIDWORKS, ENOVIA, SIMULIA and other applications are certified within this platform. Both a cloud (SaaS) option and an option installed on your own server (on-premise) are mentioned. SOLIDWORKS Design connected to the 3DEXPERIENCE platform enables real-time feedback, data management and teamwork. Today the official page describes the platform in terms of enterprise knowledge, artificial intelligence and virtual twins (Virtual Twin).

## Requirements

**SOLIDWORKS (official requirements):**

- Operating system: Windows 11 (64-bit). The last version that supports Windows 10 is SOLIDWORKS 2025 SP5. Windows Home editions are not supported.
- Processor: x86_64 (Intel 64 or AMD64).
- RAM: 16 GB (32 GB recommended).
- Graphics card: certified cards and drivers.
- Disk: SSD recommended.
- Running Windows on a Mac through Boot Camp is not supported.

**CATIA and 3DEXPERIENCE:** Dassault Systèmes publishes a list of certified workstations. There are separate new lists for April, May, June and July 2026. Certification applies to 64-bit desktop and browser clients. Before moving to the cloud, it is recommended to check that your computer is certified with the official "Cloud Eligibility" tool. Before installing on your own server, see the "On-Premise Program Directories" documentation.

## Tips

- Before buying a computer, open the official requirements page for the exact version you plan to install: requirements change from year to year.
- The official recommendation is 32 GB of RAM. If you are buying a new computer, aim for that.
- When buying a laptop, check that it does not run Windows Home.
- Choose the graphics card from the [SOLIDWORKS certified list](https://www.solidworks.com/support/hardware-certification/).
- If your computer does not meet the requirements, consider SOLIDWORKS xDesign, which runs in the browser.
- If you are a student or a teacher: the CATIA page lists separate Academic and Student license programs. Read the terms on the official page.

## Sources

All are official pages, as of September 2026:

- [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)
- [SOLIDWORKS 3D CAD](https://www.solidworks.com/product/solidworks-3d-cad)
- [SOLIDWORKS Hardware Certification](https://www.solidworks.com/support/hardware-certification/)
- [CATIA, Dassault Systèmes](https://www.3ds.com/products/catia/)
- [CATIA V5, Dassault Systèmes](https://www.3ds.com/products/catia/catia-v5)
- [3DEXPERIENCE, Dassault Systèmes](https://www.3ds.com/products/3dexperience)
- [Certified Hardware and Software, Dassault Systèmes](https://www.3ds.com/support/hardware-and-software)`,
    },
  },

  // --- Qoralamalar (hali e'lon qilinmagan) -- e'lon qilinganda tarjimasi tayyor turadi ---
  "catia-uchun-kompyuter-sertifikatlangan-royxat": {
    manba: {
      title: "CATIA uchun kompyuter tanlashda sertifikatlangan ro'yxatga qarang",
      excerpt: "Dassault Systèmes sertifikatlangan ish stansiyalari ro'yxatini muntazam e'lon qiladi.",
    },
    ru: {
      title: "Выбирая компьютер для CATIA, смотрите сертифицированный список",
      excerpt: "Dassault Systèmes регулярно публикует список сертифицированных рабочих станций.",
      content: `На официальной странице Dassault Systèmes публикуется список сертифицированных рабочих станций: для апреля, мая, июня и июля 2026 года есть отдельные новые списки. Сертификация относится к 64-битным настольным и браузерным клиентам платформы 3DEXPERIENCE, CATIA, SOLIDWORKS, ENOVIA, SIMULIA и других приложений, а для V5 — к 64-битным продуктам «rich client».

Перед переходом в облако (3DEXPERIENCE SaaS) рекомендуется проверить, сертифицирован ли ваш компьютер, с помощью инструмента «Cloud Eligibility».

Источник: [Certified Hardware and Software, Dassault Systèmes](https://www.3ds.com/support/hardware-and-software)`,
    },
    en: {
      title: "Choosing a computer for CATIA? Check the certified list",
      excerpt: "Dassault Systèmes regularly publishes a list of certified workstations.",
      content: `The official Dassault Systèmes page publishes a list of certified workstations, with separate new lists for April, May, June and July 2026. Certification applies to the 64-bit desktop and browser clients of the 3DEXPERIENCE platform, CATIA, SOLIDWORKS, ENOVIA, SIMULIA and other applications; for V5, to 64-bit "rich client" products.

Before moving to the cloud (3DEXPERIENCE SaaS), it is recommended to check that your computer is certified with the "Cloud Eligibility" tool.

Source: [Certified Hardware and Software, Dassault Systèmes](https://www.3ds.com/support/hardware-and-software)`,
    },
  },

  "solidworks-2026-selective-loading": {
    manba: {
      title: "SOLIDWORKS 2026: katta yig'mada faqat kerakli qismlarni yuklash",
      excerpt: "Selective Loading katta yig'malar bilan ishlashni yengillashtiradi (rasmiy ta'rif).",
    },
    ru: {
      title: "SOLIDWORKS 2026: загрузка только нужных частей большой сборки",
      excerpt: "Selective Loading упрощает работу с большими сборками (официальное описание).",
      content: `Среди новинок SOLIDWORKS Design 2026 официальная страница называет **Selective Loading**: возможность загружать в большой сборке только нужные компоненты и работать эффективнее.

Кроме того, официальная страница упоминает AI-инструменты, автоматизирующие повторяющиеся задачи (например, создание чертежей и перестроение сборки).

Источник: [SOLIDWORKS 3D CAD](https://www.solidworks.com/product/solidworks-3d-cad)`,
    },
    en: {
      title: "SOLIDWORKS 2026: load only the parts you need in a large assembly",
      excerpt: "Selective Loading makes working with large assemblies easier (official description).",
      content: `Among the new features of SOLIDWORKS Design 2026, the official page lists **Selective Loading**: the ability to load only the components you need in a large assembly and work more efficiently.

The official page also mentions AI tools that automate repetitive tasks (for example, creating drawings and rebuilding assemblies).

Source: [SOLIDWORKS 3D CAD](https://www.solidworks.com/product/solidworks-3d-cad)`,
    },
  },

  "windows-10-va-solidworks-oxirgi-versiya": {
    manba: {
      title: "Windows 10 va SOLIDWORKS: oxirgi versiya qaysi?",
      excerpt: "Windows 10 ni qo'llab-quvvatlaydigan oxirgi SOLIDWORKS versiyasi — 2025 SP5.",
    },
    ru: {
      title: "Windows 10 и SOLIDWORKS: какая версия последняя?",
      excerpt: "Последняя версия SOLIDWORKS с поддержкой Windows 10 — 2025 SP5.",
      content: `Согласно таблице поддержки SOLIDWORKS, **последняя версия с поддержкой Windows 10 (64-bit) — SOLIDWORKS 2025 SP5**. Поддержка Windows 11 (64-bit) сейчас действует.

Как сказано в примечании к таблице, «End of Support» — это последняя версия SOLIDWORKS, в которой поддерживается данный продукт Microsoft.

Источник: [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)`,
    },
    en: {
      title: "Windows 10 and SOLIDWORKS: which is the last version?",
      excerpt: "The last SOLIDWORKS version that supports Windows 10 is 2025 SP5.",
      content: `According to the SOLIDWORKS support table, **the last version that supports Windows 10 (64-bit) is SOLIDWORKS 2025 SP5**. Support for Windows 11 (64-bit) is currently active.

As the table note explains, "End of Support" is the last SOLIDWORKS version in which the Microsoft product is supported.

Source: [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)`,
    },
  },
};
