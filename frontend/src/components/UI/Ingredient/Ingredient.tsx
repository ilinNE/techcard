import { FC } from "react";
import "./Ingredient.scss";

const Ingredient: FC = () => {
  return (
    <li className="ingredient">
      <p className="ingredient__info ingredient__info_title">Барбарис фыфываывап</p>
      <p className="ingredient__info ingredient__info_type">Ягода</p>
      <p className="ingredient__info ingredient__info_measure">кг</p>
      <p className="ingredient__info">0.001</p>
      <p className="ingredient__info">0.5 &#x20BD;</p>
      <div className="ingredient__btn-box">
        <button className="ingredient__btn ingredient__btn_edit"></button>
        <button className="ingredient__btn">
          <svg
            className="ingredient__btn_delete"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.5 4C11.5 3.60218 11.342 3.22064 11.0607 2.93934C10.7794 2.65804 10.3978 2.5 10 2.5C9.60218 2.5 9.22064 2.65804 8.93934 2.93934C8.65804 3.22064 8.5 3.60218 8.5 4H11.5ZM7.5 4C7.5 3.33696 7.76339 2.70107 8.23223 2.23223C8.70107 1.76339 9.33696 1.5 10 1.5C10.663 1.5 11.2989 1.76339 11.7678 2.23223C12.2366 2.70107 12.5 3.33696 12.5 4H17.5C17.6326 4 17.7598 4.05268 17.8536 4.14645C17.9473 4.24021 18 4.36739 18 4.5C18 4.63261 17.9473 4.75979 17.8536 4.85355C17.7598 4.94732 17.6326 5 17.5 5H16.446L15.961 9.196C15.6384 9.10736 15.3084 9.04845 14.975 9.02L15.44 5H4.561L5.741 15.23C5.79743 15.7174 6.03105 16.167 6.39742 16.4934C6.76379 16.8198 7.23735 17.0001 7.728 17H9.6C9.783 17.358 10.004 17.693 10.257 18H7.728C6.99195 17.9999 6.28161 17.7293 5.73214 17.2396C5.18266 16.7498 4.8324 16.0752 4.748 15.344L3.554 5H2.5C2.36739 5 2.24021 4.94732 2.14645 4.85355C2.05268 4.75979 2 4.63261 2 4.5C2 4.36739 2.05268 4.24021 2.14645 4.14645C2.24021 4.05268 2.36739 4 2.5 4H7.5ZM19 14.5C19 15.6935 18.5259 16.8381 17.682 17.682C16.8381 18.5259 15.6935 19 14.5 19C13.3065 19 12.1619 18.5259 11.318 17.682C10.4741 16.8381 10 15.6935 10 14.5C10 13.3065 10.4741 12.1619 11.318 11.318C12.1619 10.4741 13.3065 10 14.5 10C15.6935 10 16.8381 10.4741 17.682 11.318C18.5259 12.1619 19 13.3065 19 14.5ZM16.354 13.354C16.4479 13.2601 16.5006 13.1328 16.5006 13C16.5006 12.8672 16.4479 12.7399 16.354 12.646C16.2601 12.5521 16.1328 12.4994 16 12.4994C15.8672 12.4994 15.7399 12.5521 15.646 12.646L14.5 13.793L13.354 12.646C13.2601 12.5521 13.1328 12.4994 13 12.4994C12.8672 12.4994 12.7399 12.5521 12.646 12.646C12.5521 12.7399 12.4994 12.8672 12.4994 13C12.4994 13.1328 12.5521 13.2601 12.646 13.354L13.793 14.5L12.646 15.646C12.5995 15.6925 12.5626 15.7477 12.5375 15.8084C12.5123 15.8692 12.4994 15.9343 12.4994 16C12.4994 16.0657 12.5123 16.1308 12.5375 16.1916C12.5626 16.2523 12.5995 16.3075 12.646 16.354C12.6925 16.4005 12.7477 16.4374 12.8084 16.4625C12.8692 16.4877 12.9343 16.5006 13 16.5006C13.0657 16.5006 13.1308 16.4877 13.1916 16.4625C13.2523 16.4374 13.3075 16.4005 13.354 16.354L14.5 15.207L15.646 16.354C15.6925 16.4005 15.7477 16.4374 15.8084 16.4625C15.8692 16.4877 15.9343 16.5006 16 16.5006C16.0657 16.5006 16.1308 16.4877 16.1916 16.4625C16.2523 16.4374 16.3075 16.4005 16.354 16.354C16.4005 16.3075 16.4374 16.2523 16.4625 16.1916C16.4877 16.1308 16.5006 16.0657 16.5006 16C16.5006 15.9343 16.4877 15.8692 16.4625 15.8084C16.4374 15.7477 16.4005 15.6925 16.354 15.646L15.207 14.5L16.354 13.354Z" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export { Ingredient };