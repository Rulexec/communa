var nunjucks = require('nunjucks'),
    awsUrl = require('../aws').url,

    CONFIG = require('../config');

if (CONFIG.LOCAL) awsUrl = function(url) {
    return '/static/' + url;
};

function r(str) {
    return new nunjucks.Template(str).render({
        awsUrl: awsUrl
    });
}

// for index.html
var list = exports.list = [
  {id: 'tags', name: 'Теги'},
  {id: 'photon.js', name: 'photon.js'},
  {id: 'codechat', name: 'chat++'},
  {id: 'code_hardcorius', name: 'Code Hardcorius'},
  {id: 'wiki.js', name: 'wiki.js'},
  {id: 'codex_hardcorius', name: 'Codex Hardcorius'}
];

// for projects.html
var status = exports.status = {
  success: [{ // communa
    id: 'communa', name: 'Коммуна',
    description: 'Вымышленная организация',
    updates: [
      "<i>2013.04.29</i> — сочинил текст в раздел <a href='/#info' class='communa-color'>«О Коммуне»</a>. И ещё парочку текстов.",
      '<i>2013.04.28</i> — обновление <b>/projects/</b>. Теперь данные хранятся в JSON-виде и не нужно менять руками сам шаблон. Ну и снизу появились «умершие» проекты.',
      '<i>2013.04.23</i> — создание раздела <b>/projects/</b> с «карточками» проектов и их последними изменениями.',
      '<i>2013.04.17</i> — создание первой версии сайта.'
    ],
    todo: [
      'Переверстать так, чтобы оно было более работающим в мобильных браузерах (в Android Browser и Opera Mini работает отвратно).'
    ]
  }, { // photon.js
    id: 'photon.js', name: 'photon.js',
    description: 'app.extend(photon.routing())',
    updates: [
      "<i>2013.04.28</i> — опубликовал библиотеку на <a href='https://npmjs.org/package/photon'>npmjs.org</a> и выложил на <a href='https://github.com/Rulexec/photon'>гитхаб</a>."
    ]
  }],

  working: [{ // tags
    id: 'tags', name: '<Теги>*',
    description: 'Найти то, знаю что',
    updates: [
      r("<i>2013.05.01</i> — <a href='{{ awsUrl('images/tags/2013-05-01-join.png') }}'>перевёрстана страница регистрации</a>. Она мне не нравится, но как есть, так есть. Регистрация будет в асинхронном ultra-fast режиме. Если мы делаем никому не нужный сервис — нужно дать возможность хотя бы зарегистрироваться на нём в один шаг."),
      r("<i>2013.04.30</i> — <a href='{{ awsUrl('images/tags/2013-04-30-root.png') }}'>перевёрстана главная страница</a>. Авторизация доработана. Так же реализована «подсказка», которая гарантированно кого-нибудь находит и каждый раз новая."),
      '<i>2013.04.28</i> — переведено на photon.js, добавление и удаление тегов пользователем. Теперь нужно работать над юзабельностью этого для людей.',
      "<p><i>2013.04.27</i> — создание пользователя<span class='muted'>*</span>, авторизация<span class='muted'>*</span>. Пока что показывается только тот список тегов, которые указал пользователь при регистрации. Осталось редактирование тегов, а потом много работы над интерфейсом.</p>" +
      "<p class='muted'>* — devmode, просто ввод нужного идентификатора/списка тегов.</p>",

      '<i>2013.04.26</i> — реализован поиск (пересечение множеств). Осталось создание пользователей/редактирование их тегов.',
      '<i>2013.04.23</i> — старт проекта. Успешное ковыряние Redis.'
    ],
    todo: [
      "Выяснилось, что Redis оттого такой дорогой (имеется в виду обслуживание, например, в качестве <a href='https://addons.heroku.com/redistogo'>аддона</a> на Heroku), что хранит ВСЮ базу данных в памяти. А у меня нет столько денег. Поэтому нужно искать альтернативы. Или собирать замену на какой-нибудь другой БД, или написать свою. Но всё это после готового прототипа."
    ]
  }, { // codechat
    id: 'codechat', name: 'chat++',
    description: "say 'Hello, World!'",
    updates: [
      '<i>2013.04.25</i> — появление идеи в голове.'
    ]
  }],

  dead: [{ // code_hardcorius
    id: 'code_hardcorius', name: 'Code Hardcorius',
    description: "print 'Hello, World!'",
    updates: [
      '<i>2013.04.28</i> — находится в состоянии стазиса. Будет возобновлён в каком-нибудь другом виде, либо же продолжен после того, как я разберусь с тем, как можно кого-нибудь научить. Мы работаем над этим.'
    ]
  }, { // wiki.js
    id: 'wiki.js', name: 'wiki.js',
    updates: [
      '<i>2013.04.28</i> — умер гораздо раньше, однако добавил лишь сейчас. Этот проект не нужен и мне самому, нет причин его развивать в текущий момент.'
    ]
  }]
};
