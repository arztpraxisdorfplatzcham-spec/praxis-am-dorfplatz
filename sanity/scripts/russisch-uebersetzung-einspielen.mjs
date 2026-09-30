/**
 * Setzt die russischen Uebersetzungen (.ru) fuer die Startseite.
 *
 * Betrifft ausschliesslich die Startseite (Dokument "praxis", ohne die
 * Fehlerseiten-Gruppe) und die Team-Dokumente. Impressum und
 * Datenschutzerklaerung bleiben bewusst deutsch (liegen ohnehin im Code, nicht
 * in Sanity).
 *
 * Patcht nur den .ru-Zweig jedes Feldes per Dot-Path — die deutschen Werte
 * bleiben unberuehrt. Gefahrlos erneut ausfuehrbar.
 *
 * Aufruf:  SANITY_AUTH_TOKEN=… node scripts/russisch-uebersetzung-einspielen.mjs
 */
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'pe3xnnex',
  dataset: 'production',
  apiVersion: '2026-08-10',
  token: process.env.SANITY_AUTH_TOKEN || process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// ---------------------------------------------------------------- Startseite
const praxisPatch = {
  'seoTitel.ru': 'Arztpraxis am Dorfplatz — семейный врач в Cham',
  'seoBeschreibung.ru':
    'Семейная врачебная помощь в Cham. Dr. med. Natalia Fiechtner, Dorfplatz 2, 6330 Cham. Телефон 041 780 09 45.',

  'heroTitel.ru': 'Семейная медицинская помощь в Cham',
  'heroText.ru':
    'Спокойное начало знакомства с практикой, которая работает здесь уже много лет. Мы уделяем время вашему здоровью и хорошему самочувствию в спокойной, профессиональной обстановке.',

  'uebernahmeText.ru':
    'С 1 сентября 2026 года практику продолжает вести Dr. med. Natalia Fiechtner. Адрес, команда и номер телефона остаются прежними.',

  'briefTitel.ru': 'Дорогие пациенты — | сердечно рада нашему знакомству',
  'briefEinleitung.ru':
    'Работа семейного врача держится на доверии, и я знаю, что доктор Маттер и его команда создавали здесь годами. Именно на этом я хочу строить дальше: уделять время Вашим вопросам, внимательно относиться к медицине и слышать не только сказанное, но и то, что стоит между строк.',

  'arztTitel.ru': 'Врач-специалист по общей внутренней медицине',
  'arztBio.ru':
    'Двадцать лет клинического и семейно-врачебного опыта. Этапы карьеры: Leipzig, Kantonsspital Winterthur, Universitätsspital Zürich, в последнее время — руководящая должность в семейных врачебных практиках Winterthur.',
  'arztSprachen.ru': 'Немецкий, русский.',

  'teamLabel.ru': 'Команда',
  'teamTitel.ru': 'Команда практики, которую вы знаете, | остаётся с вами.',

  'angebotTitel.ru': 'Услуги',
  'angebotEinleitung.ru':
    'Мы охватываем весь спектр первичной семейной медицинской помощи: от диагностики острых жалоб до сопровождения хронических заболеваний, профилактики и консультаций по вакцинации. У нас на месте есть лаборатория, ЭКГ, исследование функции лёгких и обычный рентген. Если у вас есть вопросы по какой-либо услуге, позвоните нам.',

  'sprechzeitenTitel.ru': 'Часы приёма и | запись на приём',
  'sprechzeitenText.ru':
    'Запись на приём осуществляется по телефону 041 780 09 45. Вы можете дозвониться до нас в течение всех часов приёма. Если вы не можете прийти на назначенный приём, пожалуйста, отмените его минимум за 24 часа — так это время сможет получить другой пациент.',
  'sprechzeitenNeu.ru': 'Новость: теперь практика открыта для вас и по средам в течение всего дня.',
  'zeitenHinweis.ru': 'Работаем без перерыва на обед.',
  'zeitenLabel.ru': 'Часы приёма',

  'ferienTitel.ru': 'Отпуск практики',
  'ferienHinweis.ru':
    'Во время отпуска практики, пожалуйста, обращайтесь в региональную неотложную медицинскую службу.',

  'notfallTitel.ru': 'Неотложные случаи и | дежурная служба',
  'notfallText.ru':
    'В часы приёма вы можете дозвониться до нас по номеру 041 780 09 45. Мы ежедневно резервируем время для срочных случаев.',
  'notfallSofort.ru': 'При угрожающих жизни состояниях | немедленно звоните:',
  'notfallListeLabel.ru': 'Другие важные контакты',

  'ctaTitel.ru': 'Нужна запись на приём? | Позвоните нам.',

  'kontaktTitel.ru': 'Контакты и как добраться',
  'hinHinweis.ru':
    '(Зашифровано через HIN для конфиденциальных медицинских вопросов. Не отправляйте медицинские сведения по обычной электронной почте.)',
  'rollstuhlHinweis.ru': 'Практика доступна для инвалидных колясок.',
  'terminHinweis.ru':
    'Запись на приём по телефону. | Если вы не можете прийти на приём, пожалуйста, отмените его минимум за 24 часа.',
  'mailLabel.ru': 'Защищённая эл. почта:',
  'karteKnopf.ru': 'Открыть маршрут в Google Maps',
  'mehrLabel.ru': 'Читать далее +',
  'wenigerLabel.ru': 'Свернуть −',
  'sprachenLabel.ru': 'Языки:',

  'footerPraxis.ru': 'Практика',
  'footerRechtliches.ru': 'Правовая информация',
  'footerImpressum.ru': 'Выходные данные',
  'footerDatenschutz.ru': 'Политика конфиденциальности',

  // -------------------------------------------------------- Anfahrt (_key)
  'anfahrt[_key=="oev"].titel.ru': 'На общественном транспорте',
  'anfahrt[_key=="oev"].text.ru':
    'Остановка **Gemeindehaus** находится всего в нескольких метрах от практики.',
  'anfahrt[_key=="auto"].titel.ru': 'На автомобиле',
  'anfahrt[_key=="auto"].text.ru':
    'Добраться можно по Zugerstrasse, Luzernerstrasse или Sinserstrasse. Практика расположена на пересечении этих дорог.',
  'anfahrt[_key=="parkieren"].titel.ru': 'Парковка',
  'anfahrt[_key=="parkieren"].text.ru':
    'Прямо под Lorzensaal находится Parkhaus Lorze — в нескольких шагах от практики.',

  // ------------------------------------------------------- Navigation (_key)
  'navigation[_key=="team"].titel.ru': 'Команда',
  'navigation[_key=="angebot"].titel.ru': 'Услуги',
  'navigation[_key=="zeiten"].titel.ru': 'Часы приёма',
  'navigation[_key=="notfall"].titel.ru': 'Неотложная помощь',
  'navigation[_key=="kontakt"].titel.ru': 'Контакты',

  // -------------------------------------------------- Notfallnummern (_key)
  'notfallnummern[_key=="andreasklinik"].zusatz.ru':
    'Приёмное отделение неотложной помощи (круглосуточно)',
  'notfallnummern[_key=="kantonsspital"].zusatz.ru': 'Отделение неотложной помощи',
  'notfallnummern[_key=="notfalldienst"].zusatz.ru': 'CHF 3.23/мин.',

  // ------------------------------------------------- Oeffnungszeiten (_key)
  'oeffnungszeiten[_key=="mo"].tag.ru': 'Понедельник',
  'oeffnungszeiten[_key=="di"].tag.ru': 'Вторник',
  'oeffnungszeiten[_key=="mi"].tag.ru': 'Среда',
  'oeffnungszeiten[_key=="do"].tag.ru': 'Четверг',
  'oeffnungszeiten[_key=="fr"].tag.ru': 'Пятница',
}

// briefAbsaetze hat keine _key-Werte in fester Reihenfolge geplant — wird per
// Index aus dem aktuellen Dokument aufgeloest (siehe unten).
const briefAbsaetzeRu = [
  '**Самое главное сразу: для Вас всё остаётся привычным.** Вся команда практики, которую Вы знаете, остаётся с Вами. Вы можете, как и раньше, звонить нам по номеру 041 780 09 45 по тому же адресу, а уже назначенные приёмы, разумеется, сохраняют силу. Лекарства Вы, как и прежде, получаете прямо у нас в практике — без похода в аптеку, сразу после консультации.',
  'И у нас хорошие новости: с сентября практика открыта для Вас и по средам — значит, записаться на приём станет проще и быстрее. Кроме того, я расширяю наши услуги мануальной медициной и нейральной терапией — двумя проверенными методами лечения боли и заболеваний опорно-двигательного аппарата. Буду рада рассказать об этом подробнее при встрече.',
  'Буду рада познакомиться с Вами лично — на очередном плановом приёме или просто тогда, когда Вам это понадобится. Вместе со слаженной командой практики я буду рядом с Вами с 1 сентября.',
]

// angebotGruppen: _key -> {titel, punkte: [ru, ru, ...]} in Dokumentreihenfolge
const angebotGruppenRu = {
  grundversorgung: {
    titel: 'Первичная помощь',
    punkte: [
      'Общемедицинская диагностика и лечение',
      'Наблюдение семейным врачом',
      'Чек-ап (профилактический осмотр)',
      'Дневная неотложная помощь',
    ],
  },
  chronisch: {
    titel: 'Хронические заболевания',
    punkte: [
      'Наблюдение и консультирование при диабете',
      'Сопровождение при снижении веса',
      'Инфузии железа',
    ],
  },
  vorsorge: {
    titel: 'Профилактика и консультации',
    punkte: [
      'Консультации перед поездками и по вакцинации, включая прививки (в т.ч. Gardasil)',
      'Медицинское заключение о годности к вождению после 75 лет',
      'Медосмотры при работе в ночную смену',
    ],
  },
  diagnostik: {
    titel: 'Диагностика в практике',
    punkte: ['Лаборатория', 'ЭКГ и 48-часовое ЭКГ', 'Исследование функции лёгких', 'Обычный рентген'],
  },
  therapien: {
    titel: 'Терапия и вмешательства',
    punkte: [
      'Малая хирургия',
      'Десенсибилизация при аллергии',
      'Мануальная медицина (новое)',
      'Нейральная терапия (новое)',
    ],
  },
  medikamente: {
    titel: 'Выдача медикаментов',
    punkte: ['Вы получаете лекарства прямо у нас в практике сразу после консультации — без похода в аптеку.'],
  },
}

// ---------------------------------------------------------------------- Team
const teamRu = {
  'team-romy-banz': 'Медицинская ассистентка',
  'team-pascale-gamma': 'Медицинская ассистентка',
  'team-oleksandra-matvieieva': 'Медицинская ассистентка (в процессе обучения)',
  'team-franziska-matter': 'Медицинская ассистентка',
}

async function main() {
  const entwurf = await client.fetch('*[_id == "drafts.praxis"][0]._id')
  if (entwurf) {
    console.error(
      'Es existiert ein unveroeffentlichter Entwurf. Bitte im Studio erst\n' +
        'veroeffentlichen oder verwerfen — sonst ueberschreibt er die Uebersetzung.',
    )
    process.exit(1)
  }

  const praxis = await client.fetch(
    '*[_id=="praxis"][0]{ briefAbsaetze[]{_key}, angebotGruppen[]{_key, punkte[]{_key}} }',
  )
  if (!praxis) throw new Error('Dokument "praxis" nicht gefunden.')

  const patch = {...praxisPatch}

  praxis.briefAbsaetze?.forEach((absatz, i) => {
    if (briefAbsaetzeRu[i]) patch[`briefAbsaetze[_key=="${absatz._key}"].ru`] = briefAbsaetzeRu[i]
  })

  praxis.angebotGruppen?.forEach((gruppe) => {
    const uebersetzung = angebotGruppenRu[gruppe._key]
    if (!uebersetzung) return
    patch[`angebotGruppen[_key=="${gruppe._key}"].titel.ru`] = uebersetzung.titel
    gruppe.punkte?.forEach((punkt, i) => {
      if (uebersetzung.punkte[i]) {
        patch[`angebotGruppen[_key=="${gruppe._key}"].punkte[_key=="${punkt._key}"].ru`] =
          uebersetzung.punkte[i]
      }
    })
  })

  await client.patch('praxis').set(patch).commit()
  console.log(`praxis: ${Object.keys(patch).length} Felder gesetzt.`)

  for (const [id, ru] of Object.entries(teamRu)) {
    await client.patch(id).set({'funktion.ru': ru}).commit()
    console.log(`${id}: funktion.ru gesetzt.`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
