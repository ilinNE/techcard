import addIcon from "../images/button-add.svg"
import doneIcon from "../images/button-done.svg"
import saveIcon from "../images/button-save.svg"
import plusIcon from "../images/add-plus.svg"
import editIcon from "../images/button-edit.svg"
import excelIcon from "../images/excel.svg"

export const register = {
  Welcome: "Мы рады вам",
  Signup: "Зарегистрироваться",
  AlreadyRegistered: "Если вы зарегистрированы, то самое время ",
  Login: "войти.",
};

export const login = {
  ToBegin: "Пора творить!",
  Signin: "Войти",
  NotRegistred: "Если вы не зарегистрированы, то самое время ",
  Registration: "зарегистрироваться.",
};

export const header = {
  Aboute: "О проекте",
  Tariffs: "Тарифы",
  MyTechCards: "Мои техкарты",
  Help: "Помощь",
  AuthLogin: "Войти",
  AuthRegistration: "Регистрация",
  Profile: "Профиль",
};

export const greeting = {
  Title: "Организуй свои рецепты",
  SubTitle: `ТехКарта это простой способ создавать, хранить, изменять технические карты для своих блюд.`,
  LetStart: "Начать бесплатно",
};

export const about = {
  Title: "О проекте",
  ParagraphOne: `Этот сайт разрабатывается как учебный проект, но я стараюсь сделать его по-настоящему функциональным. 
  Сейчас реализована возможность считать какльуляционных карт для блюд и полуфабрикатов, а так-же выгрузка их в файлы на Ваш компьютер. 
  Эти карты не соответствуют ГОСТ или каким-то официальным стандартам и быть использованы как документация предприятия. 
  Этот сервис может помочь автоматизировать расчет себестоимости на этапе до запуска предприятия, когда специальный софт еще не приобретен, 
  либо для личных целей, либо если вопрос официальной документации вас не интересует.`,
  ParagraphTwo: `Разработка проекта не закончена, и если у Вас есть предложения по функционалу который стоит добавить, 
  или Вы обнаружили ошибку в работе сайта - воспользуйтесь формой обратной связи.`,
  SendButton: "Отправить",
  Paragraph: "Если у вас остались вопросы или вы хотите предложить улучшение, то вы можете воспользоваться нашей",
  Link: " формой обратной связи."
};

export const questions = {
  Title: "Основные вопросы",
  QuestionList: [
    {
      header: "Как добавить новое блюдо или полуфабрикат?",
      details: [
        {
          text: ["Нажмите на кнопку ", ", которая находится вверху страницы рядом с заголовком. Откроется карточка блюда/полуфабриката. Заполните все поля."],
          icons: [{
            src: addIcon,
            className: "addIcon",
            alt: "Плюсик в кружке."
          }]
        },
        {
          text: ["С помощью  кнопки ", " добавляйте ингредиент, которые вы предварительно занесли в список продуктов. После заполнения всех полей ингредиента, нажмите кнопку", "и  ингредиент сохраниться в техкарте. Похожим образом вы можете заполнить технический процесс."],
          icons: [
            {
              src: plusIcon,
              className: "plusIcon",
              alt: "Плюс."
            },
            {
              src: doneIcon,
              className: "doneIcon",
              alt: "Галочка."
            }]
        },
        {
          text: ["Если решите удалить ингредиент, просто нажмите “-” и он удалится из списка."],
          icons: []
        },
        {
          text: ["После того, как вы заполните все поля, нажмите кнопку ", ", и блюдо/полуфабрикат появится в вашем списке."],
          icons: [{
            src: saveIcon,
            className: "saveIcon",
            alt: "Зеленая кнопка сохранить."
          }]
        }
      ]
    },
    {
      header: "Как добавить новый продукт?",
      details: [
        {
          text: ["Нажмите на кнопку ", ", которая находится вверху страницы рядом слева от слова \“Наименование\”. Появится строка с полями заполните их все и нажмите ", ". Таким образом ваш продукт добавиться в список и вы сможете его использовать при составлении новых техкарт."],
          icons: [{
            src: addIcon,
            className: "addIcon",
            alt: "Плюсик в кружке."
          },
          {
            src: doneIcon,
            className: "doneIcon",
            alt: "Галочка."
          }]
        },
        {
          text: ["Если решите удалить продукт, просто нажмите “-” и он удалится из списка."],
          icons: []
        }
      ]
    },
    {
      header: "Можно ли сохранить техкарту?",
      details: [
        {
          text: ["Да. Вы можете сохранить техкарту в формате excel. Нажмите на кнопку ", " и  файл сохранится к вам на компьютер."],
          icons: [{
            src: excelIcon,
            className: "excelIcon",
            alt: "Лого эксель."
          }]
        }
      ]
    },
    {
      header: "Хочу кое-что изменить в техкарте/продукте. Что делать?",
      details: [
        {
          text: ["Выберите нужную техкарту и в открывшемся окне нажмите ", ". Откроется новое окно, в котором вы сможете сделать изменения."],
          icons: [{
            src: editIcon,
            className: "editIcon",
            alt: "Карандаш."
          }]
        },
        {
          text: ["Если же вы хотите изменить продукт, то просто нажмите рядом с нужным продуктом ", ". Откроется новое окно, в котором вы сможете сделать изменения."],
          icons: [{
            src: editIcon,
            className: "editIcon",
            alt: "Карандаш."
          }]
        }
      ]
    },
  ]
};