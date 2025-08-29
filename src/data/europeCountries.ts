export interface EuropeCountry {
  code: string
  country_en: string
  country_sv: string
  country_ru: string
  capital_en: string
  capital_sv: string
  capital_ru: string
  region: string
  hint_en: string
  hint_sv: string
  emoji?: string
  image?: string
}

export const EUROPE_COUNTRIES: EuropeCountry[] = [
  {code:'AL', country_en:'Albania', country_sv:'Albanien', country_ru:'Албания', capital_en:'Tirana', capital_sv:'Tirana', capital_ru:'Тирана', region:'Balkans', hint_en:'Albania → Tirana', hint_sv:'Albanien → Tirana', emoji:'🦅'},
  {code:'AD', country_en:'Andorra', country_sv:'Andorra', country_ru:'Андорра', capital_en:'Andorra la Vella', capital_sv:'Andorra la Vella', capital_ru:'Андорра-ла-Велья', region:'Western', hint_en:'Andorra → Andorra la Vella', hint_sv:'Andorra → Andorra la Vella'},
  {code:'AM', country_en:'Armenia', country_sv:'Armenien', country_ru:'Армения', capital_en:'Yerevan', capital_sv:'Jerevan', capital_ru:'Ереван', region:'Caucasus', hint_en:'Armenia → Yerevan', hint_sv:'Armenien → Jerevan'},
  {code:'AT', country_en:'Austria', country_sv:'Österrike', country_ru:'Австрия', capital_en:'Vienna', capital_sv:'Wien', capital_ru:'Вена', region:'Central', hint_en:'Austria → Vienna', hint_sv:'Österrike → Wien'},
  {code:'AZ', country_en:'Azerbaijan', country_sv:'Azerbajdzjan', country_ru:'Азербайджан', capital_en:'Baku', capital_sv:'Baku', capital_ru:'Баку', region:'Caucasus', hint_en:'Azerbaijan → Baku', hint_sv:'Azerbajdzjan → Baku'},
  {code:'BY', country_en:'Belarus', country_sv:'Belarus', country_ru:'Беларусь', capital_en:'Minsk', capital_sv:'Minsk', capital_ru:'Минск', region:'Eastern', hint_en:'Belarus → Minsk', hint_sv:'Belarus → Minsk'},
  {code:'BE', country_en:'Belgium', country_sv:'Belgien', country_ru:'Бельгия', capital_en:'Brussels', capital_sv:'Bryssel', capital_ru:'Брюссель', region:'Western', hint_en:'Belgium → Brussels', hint_sv:'Belgien → Bryssel'},
  {code:'BA', country_en:'Bosnia and Herzegovina', country_sv:'Bosnien och Hercegovina', country_ru:'Босния и Герцеговина', capital_en:'Sarajevo', capital_sv:'Sarajevo', capital_ru:'Сараево', region:'Balkans', hint_en:'Bosnia and Herzegovina → Sarajevo', hint_sv:'Bosnien och Hercegovina → Sarajevo'},
  {code:'BG', country_en:'Bulgaria', country_sv:'Bulgarien', country_ru:'Болгария', capital_en:'Sofia', capital_sv:'Sofia', capital_ru:'София', region:'Balkans', hint_en:'Bulgaria → Sofia', hint_sv:'Bulgarien → Sofia'},
  {code:'HR', country_en:'Croatia', country_sv:'Kroatien', country_ru:'Хорватия', capital_en:'Zagreb', capital_sv:'Zagreb', capital_ru:'Загреб', region:'Balkans', hint_en:'Croatia → Zagreb', hint_sv:'Kroatien → Zagreb'},
  {code:'CY', country_en:'Cyprus', country_sv:'Cypern', country_ru:'Кипр', capital_en:'Nicosia', capital_sv:'Nicosia', capital_ru:'Никосия', region:'Southern', hint_en:'Cyprus → Nicosia', hint_sv:'Cypern → Nicosia'},
  {code:'CZ', country_en:'Czechia', country_sv:'Tjeckien', country_ru:'Чехия', capital_en:'Prague', capital_sv:'Prag', capital_ru:'Прага', region:'Central', hint_en:'Czechia → Prague', hint_sv:'Tjeckien → Prag'},
  {code:'DK', country_en:'Denmark', country_sv:'Danmark', country_ru:'Дания', capital_en:'Copenhagen', capital_sv:'Köpenhamn', capital_ru:'Копенгаген', region:'Nordic', hint_en:'Denmark → Copenhagen', hint_sv:'Danmark → Köpenhamn'},
  {code:'EE', country_en:'Estonia', country_sv:'Estland', country_ru:'Эстония', capital_en:'Tallinn', capital_sv:'Tallinn', capital_ru:'Таллин', region:'Baltic', hint_en:'Estonia → Tallinn', hint_sv:'Estland → Tallinn'},
  {code:'FI', country_en:'Finland', country_sv:'Finland', country_ru:'Финляндия', capital_en:'Helsinki', capital_sv:'Helsingfors', capital_ru:'Хельсинки', region:'Nordic', hint_en:'Finland → Helsinki', hint_sv:'Finland → Helsingfors'},
  {code:'FR', country_en:'France', country_sv:'Frankrike', country_ru:'Франция', capital_en:'Paris', capital_sv:'Paris', capital_ru:'Париж', region:'Western', hint_en:'France → <strong>Paris</strong>', hint_sv:'Frankrike → <strong>Paris</strong>', emoji:'🥖', image:'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg'},
  {code:'GE', country_en:'Georgia', country_sv:'Georgien', country_ru:'Грузия', capital_en:'Tbilisi', capital_sv:'Tbilisi', capital_ru:'Тбилиси', region:'Caucasus', hint_en:'Georgia → Tbilisi', hint_sv:'Georgien → Tbilisi'},
  {code:'DE', country_en:'Germany', country_sv:'Tyskland', country_ru:'Германия', capital_en:'Berlin', capital_sv:'Berlin', capital_ru:'Берлин', region:'Central', hint_en:'Germany → Berlin', hint_sv:'Tyskland → Berlin'},
  {code:'GR', country_en:'Greece', country_sv:'Grekland', country_ru:'Греция', capital_en:'Athens', capital_sv:'Aten', capital_ru:'Афины', region:'Balkans', hint_en:'Greece → Athens', hint_sv:'Grekland → Aten'},
  {code:'HU', country_en:'Hungary', country_sv:'Ungern', country_ru:'Венгрия', capital_en:'Budapest', capital_sv:'Budapest', capital_ru:'Будапешт', region:'Central', hint_en:'Hungary → Budapest', hint_sv:'Ungern → Budapest'},
  {code:'IS', country_en:'Iceland', country_sv:'Island', country_ru:'Исландия', capital_en:'Reykjavik', capital_sv:'Reykjavik', capital_ru:'Рейкьявик', region:'Nordic', hint_en:'Iceland → Reykjavik', hint_sv:'Island → Reykjavik'},
  {code:'IE', country_en:'Ireland', country_sv:'Irland', country_ru:'Ирландия', capital_en:'Dublin', capital_sv:'Dublin', capital_ru:'Дублин', region:'Western', hint_en:'Ireland → Dublin', hint_sv:'Irland → Dublin'},
  {code:'IT', country_en:'Italy', country_sv:'Italien', country_ru:'Италия', capital_en:'Rome', capital_sv:'Rom', capital_ru:'Рим', region:'Southern', hint_en:'Italy → Rome', hint_sv:'Italien → Rom', emoji:'🍕'},
  {code:'KZ', country_en:'Kazakhstan', country_sv:'Kazakstan', country_ru:'Казахстан', capital_en:'Astana', capital_sv:'Astana', capital_ru:'Астана', region:'Transcontinental', hint_en:'Kazakhstan → Astana', hint_sv:'Kazakstan → Astana'},
  {code:'XK', country_en:'Kosovo', country_sv:'Kosovo', country_ru:'Косово', capital_en:'Pristina', capital_sv:'Pristina', capital_ru:'Приштина', region:'Balkans', hint_en:'Kosovo → Pristina', hint_sv:'Kosovo → Pristina'},
  {code:'LV', country_en:'Latvia', country_sv:'Lettland', country_ru:'Латвия', capital_en:'Riga', capital_sv:'Riga', capital_ru:'Рига', region:'Baltic', hint_en:'Latvia → Riga', hint_sv:'Lettland → Riga'},
  {code:'LI', country_en:'Liechtenstein', country_sv:'Liechtenstein', country_ru:'Лихтенштейн', capital_en:'Vaduz', capital_sv:'Vaduz', capital_ru:'Вадуц', region:'Central', hint_en:'Liechtenstein → Vaduz', hint_sv:'Liechtenstein → Vaduz'},
  {code:'LT', country_en:'Lithuania', country_sv:'Litauen', country_ru:'Литва', capital_en:'Vilnius', capital_sv:'Vilnius', capital_ru:'Вильнюс', region:'Baltic', hint_en:'Lithuania → Vilnius', hint_sv:'Litauen → Vilnius'},
  {code:'LU', country_en:'Luxembourg', country_sv:'Luxemburg', country_ru:'Люксембург', capital_en:'Luxembourg', capital_sv:'Luxemburg', capital_ru:'Люксембург', region:'Western', hint_en:'Luxembourg → Luxembourg', hint_sv:'Luxemburg → Luxemburg'},
  {code:'MT', country_en:'Malta', country_sv:'Malta', country_ru:'Мальта', capital_en:'Valletta', capital_sv:'Valletta', capital_ru:'Валлетта', region:'Southern', hint_en:'Malta → Valletta', hint_sv:'Malta → Valletta'},
  {code:'MD', country_en:'Moldova', country_sv:'Moldavien', country_ru:'Молдова', capital_en:'Chișinău', capital_sv:'Chisinau', capital_ru:'Кишинёв', region:'Eastern', hint_en:'Moldova → Chișinău', hint_sv:'Moldavien → Chisinau'},
  {code:'MC', country_en:'Monaco', country_sv:'Monaco', country_ru:'Монако', capital_en:'Monaco', capital_sv:'Monaco', capital_ru:'Монако', region:'Western', hint_en:'Monaco → Monaco', hint_sv:'Monaco → Monaco'},
  {code:'ME', country_en:'Montenegro', country_sv:'Montenegro', country_ru:'Черногория', capital_en:'Podgorica', capital_sv:'Podgorica', capital_ru:'Подгорица', region:'Balkans', hint_en:'Montenegro → Podgorica', hint_sv:'Montenegro → Podgorica'},
  {code:'NL', country_en:'Netherlands', country_sv:'Nederländerna', country_ru:'Нидерланды', capital_en:'Amsterdam', capital_sv:'Amsterdam', capital_ru:'Амстердам', region:'Western', hint_en:'Netherlands → Amsterdam', hint_sv:'Nederländerna → Amsterdam'},
  {code:'MK', country_en:'North Macedonia', country_sv:'Nordmakedonien', country_ru:'Северная Македония', capital_en:'Skopje', capital_sv:'Skopje', capital_ru:'Скопье', region:'Balkans', hint_en:'North Macedonia → Skopje', hint_sv:'Nordmakedonien → Skopje'},
  {code:'NO', country_en:'Norway', country_sv:'Norge', country_ru:'Норвегия', capital_en:'Oslo', capital_sv:'Oslo', capital_ru:'Осло', region:'Nordic', hint_en:'Norway → Oslo', hint_sv:'Norge → Oslo'},
  {code:'PL', country_en:'Poland', country_sv:'Polen', country_ru:'Польша', capital_en:'Warsaw', capital_sv:'Warszawa', capital_ru:'Варшава', region:'Central', hint_en:'Poland → Warsaw', hint_sv:'Polen → Warszawa'},
  {code:'PT', country_en:'Portugal', country_sv:'Portugal', country_ru:'Португалия', capital_en:'Lisbon', capital_sv:'Lissabon', capital_ru:'Лиссабон', region:'Western', hint_en:'Portugal → Lisbon', hint_sv:'Portugal → Lissabon'},
  {code:'RO', country_en:'Romania', country_sv:'Rumänien', country_ru:'Румыния', capital_en:'Bucharest', capital_sv:'Bukarest', capital_ru:'Бухарест', region:'Balkans', hint_en:'Romania → Bucharest', hint_sv:'Rumänien → Bukarest'},
  {code:'RU', country_en:'Russia', country_sv:'Ryssland', country_ru:'Россия', capital_en:'Moscow', capital_sv:'Moskva', capital_ru:'Москва', region:'Transcontinental', hint_en:'Russia → Moscow', hint_sv:'Ryssland → Moskva'},
  {code:'SM', country_en:'San Marino', country_sv:'San Marino', country_ru:'Сан-Марино', capital_en:'San Marino', capital_sv:'San Marino', capital_ru:'Сан-Марино', region:'Southern', hint_en:'San Marino → San Marino', hint_sv:'San Marino → San Marino'},
  {code:'RS', country_en:'Serbia', country_sv:'Serbien', country_ru:'Сербия', capital_en:'Belgrade', capital_sv:'Belgrad', capital_ru:'Белград', region:'Balkans', hint_en:'Serbia → Belgrade', hint_sv:'Serbien → Belgrad'},
  {code:'SK', country_en:'Slovakia', country_sv:'Slovakien', country_ru:'Словакия', capital_en:'Bratislava', capital_sv:'Bratislava', capital_ru:'Братислава', region:'Central', hint_en:'Slovakia → Bratislava', hint_sv:'Slovakien → Bratislava'},
  {code:'SI', country_en:'Slovenia', country_sv:'Slovenien', country_ru:'Словения', capital_en:'Ljubljana', capital_sv:'Ljubljana', capital_ru:'Любляна', region:'Balkans', hint_en:'Slovenia → Ljubljana', hint_sv:'Slovenien → Ljubljana'},
  {code:'ES', country_en:'Spain', country_sv:'Spanien', country_ru:'Испания', capital_en:'Madrid', capital_sv:'Madrid', capital_ru:'Мадрид', region:'Southern', hint_en:'Spain → Madrid', hint_sv:'Spanien → Madrid'},
  {code:'SE', country_en:'Sweden', country_sv:'Sverige', country_ru:'Швеция', capital_en:'Stockholm', capital_sv:'Stockholm', capital_ru:'Стокгольм', region:'Nordic', hint_en:'Sweden → Stockholm', hint_sv:'Sverige → Stockholm'},
  {code:'CH', country_en:'Switzerland', country_sv:'Schweiz', country_ru:'Швейцария', capital_en:'Bern', capital_sv:'Bern', capital_ru:'Берн', region:'Central', hint_en:'Switzerland → Bern', hint_sv:'Schweiz → Bern'},
  {code:'TR', country_en:'Turkey', country_sv:'Turkiet', country_ru:'Турция', capital_en:'Ankara', capital_sv:'Ankara', capital_ru:'Анкара', region:'Transcontinental', hint_en:'Turkey → Ankara', hint_sv:'Turkiet → Ankara'},
  {code:'UA', country_en:'Ukraine', country_sv:'Ukraina', country_ru:'Украина', capital_en:'Kyiv', capital_sv:'Kyiv', capital_ru:'Киев', region:'Eastern', hint_en:'Ukraine → Kyiv', hint_sv:'Ukraina → Kyiv'},
  {code:'GB', country_en:'United Kingdom', country_sv:'Storbritannien', country_ru:'Великобритания', capital_en:'London', capital_sv:'London', capital_ru:'Лондон', region:'Western', hint_en:'United Kingdom → London', hint_sv:'Storbritannien → London'},
  {code:'VA', country_en:'Vatican City', country_sv:'Vatikanstaten', country_ru:'Ватикан', capital_en:'Vatican City', capital_sv:'Vatikanstaten', capital_ru:'Ватикан', region:'Southern', hint_en:'Vatican City → Vatican City', hint_sv:'Vatikanstaten → Vatikanstaten'}
];

export const REGIONS = ['All','Nordic','Baltic','Western','Central','Eastern','Southern','Balkans','Caucasus','Transcontinental'];
