# Описание логики работы сервиса

## Содержание
 - [Основные страницы  сервиса](#основные-страницы-сервиса)
 - [Регистрация](#регистрация)
 - [Авторизация и аутентификация](#авторизация-и-аутентификация)
    - Аутентификация
    - Авторизация
  - [Основной функционал сервиса](#основной-фунционал-сервиса)
    - Терминология
    - Создание и редактирование продуктов
    - Создание и редактирование полуфабрикатов и блюд
    - Навигация по рабочей зоне
    - Предоставление в виде файлов

## Основные страницы сервиса
### Главная страница
Содержит приветствие пользователя, краткое описание сервиса, и приглашение на регистрацию.
### Инструкция позьзователя
Страница или набор связанных страниц с подробным описанием работы приложения.
### Страница регистрации
Содержит форму для регистрации нового пользователя
### Страница сброса пароля
### Страница редактирования
Страница на которой происходит основное взамиодействие пользователя с сервисом. Состоит из боковой навигационной панели и основного рабочего пространства.
### Зона администратора
Все старницы связанные с админинстрированием сервиса.

## Регистрация

Для регистрации, новый пользователь должен предоставить необходимые данные:

- Уникальный **Логин** (Только буквы, цифры и символы @/./+/-/_.)
- Уникальный **Адрес электронной почты**
- **Пароль**

Дополнительно пользователь может указать **Имя** и **Фамилию**

Зарегестрированый пользователь может войти в свою учетную запись предоставив **Логин** и **Пароль**, и выйти из нее. Также пользователь может восстановить забытый пароль, через отправку письма на указанную при регистрации почту.  

## Авторизация и аутентификация
### Аутентификация
Аутентификация на сервисе должна быть реализована по JWT - токену, для этого должны быть доступны соответствующие эндпоинты для предоставления токена клиенту по учетным данным, и для обновления токена.
### Авторизация
У пользователей на сервисе существует три уровня доступа:

 - Неавторизованый пользователь (Гость)
 - Авторизованый пользователь
 - Администратор

Неавторизованному пользователю доступны: главная страница, страница регистрации, страница сброса пароля и инстркуция пользователя. Неавторизованный пользователь может зарегестрироваться или авторизоваться если имеет зарегестрированную учетную запись

Авторизованному пользователю доступны все страницы, доступные неавторизованному пользователю, а так же страница редактирования. Авторизованный пользователь получает возможность создавать и редактировать свою базу ингредиентов,  и создавать на их основе карты блюд и полуфабрикатов. Доступ к созданым им картам и базе ингредиентов имеет только он.

Администратору доступны все страницы и возможности доступные авторизованному пользователю, а так же зона администратора. Он может просматривать информацию о всех зарегестрированных пользователях, и обьектах которые им принадлежат. Аминистратор может удалить учетную запись пользователя. Администратор может редактировать и удалять обьекты созданные другими пользователями только если сервис запущен в тестовом режиме.

## Основной фунционал сервиса
### Создание и редактирование продуктов

Продукт является базовым элементом блюд и полуфабрикатов, и имеет следующие характеристики указываемые при создании:

- Название (уникальное для каждого пользователя)
- Еденицу измерения (выбор из предустановленных значений)
- Вес одной еденицы измерения
- Себестоимость за еденицу измерения
- Группа или тег 

В случае если еденица измерения предоставляет из себя меру веса (грамм, килограмм), поле "Вес одой еденицы измерения" становится недоступным для заполнения и расчитывается автоматически. Все созданные продукты становятся доступны их владельцу. Он может получить список созданных им продуктов, осуществить поиск по нему, отфильтровать по группе или тегу. Он может редактировать продукт используя ту же логику как и при создании. Также может выделить несколько продуктов для множественного редактирования (удаление, перемещение в группу). При попытке удаления пользователь получает запрос на подтверждение операции в виде всплывающего окна.
 
### Создание и редактирование полуфабрикатов и блюд
Полуфабрикаты и блюда являются сходными обьектами по способу создания и редактирования, разделение между ними лишь логическое. Блюда и полуфабрикаты -  обьекты которые состоят из набора ингредиентов, ингредиентами могут являтся продукты или другие полуфабрикаты. 
Полуфабрикат и блюдо имеют следующие параметры для создания:
 
 - Название (уникальное для каждого пользователя)
 - Набор ингредиентов
 - Описание ( технология приготовления)
 - Еденица измерения ( порция или килограмм)
 - Группа

Ингредиенты указываются в формате Продукт - Количество - Отход.
После создания происходит расчет, и в характеристики этих обьектов добавляются вес, и себестоимость. Блюда и полуфабрикаты стаовятся доступны пользователю аналогично продуктам, так же присутствует возможность поиска, фильтрации и множественного редактирования.

###  Навигация по рабочей зоне
Вся основная информация о состоянии базы пользователя выводится в боковой панеле, разделенная на логические блоки: продукты, полуфабрикаты, блюда, с возможностью перехода к списку обьектов определенной категории или группы внутри категории. Выведены ссылки для быстрого перехода к созданию нового обьекта из любой категории.

### Предоставление в виде файлов

Пользватель может получить данные о полуфабрикатах и блюдах в виде файлов в формате xlsx. Он может выбрать как отдельный бьект так и группу обьектов.
