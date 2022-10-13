import { FC } from "react";
import { Link } from "react-router-dom";
import { ITechCardContent } from "./ITechCardContent";
import "./TechCardContent.scss";

const TechCardContent: FC<ITechCardContent> = (props) => {
  return (
    <section className={`content ${props.isOpenSideMenu && "content_full"}`}>
      <Link className="content__btn-back" to="/dishes">
        <div className="content__btn-back-img"></div>
        <p className="content__btn-back-text">Назад</p>
      </Link>
      <div className="content__header">
        <div className="content__extra-info">
          <p className="content__text-info">
            <span className="content__text-bold">Создано:</span>
            {new Date().toLocaleDateString()}
          </p>
          <p className="content__text-info">
            <span className="content__text-bold">Карта №</span>1
          </p>
        </div>
        <div className="content__title-box">
          <h2 className="content__title">Конина по-бешкекски</h2>
          <p className="content__subtitle">вторые блюда</p>
        </div>
        <div className="content__btn-box">
          <button className="content__btn content__btn_edit"></button>
          <button className="content__btn content__btn_save"></button>
        </div>
      </div>
      <div className="content__extra-box">
        <div className="content__table-box">
          <table className="content__table">
            <thead className="content__thead">
              <tr className="content__tr">
                <th className="content__th">№</th>
                <th className="content__th content__th_start">Ингредиенты</th>
                <th className="content__th">Ед. изм.</th>
                <th className="content__th">Вес брутто</th>
                <th className="content__th">Вес нетто</th>
                <th className="content__th">Вес готового продукта</th>
                <th className="content__th">Цена</th>
                <th className="content__th">Себестоимость</th>
              </tr>
            </thead>
            <tbody className="content__tbody">
              <tr className="content__tr">
                <td className="content__td">1</td>
                <td className="content__td content__td_start">Конина голяшка</td>
                <td className="content__td">кг</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">300 &#x20BD;</td>
                <td className="content__td">25 &#x20BD;</td>
              </tr>
              <tr className="content__tr">
                <td className="content__td">2</td>
                <td className="content__td content__td_start">Конина голяшка</td>
                <td className="content__td">кг</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">300 &#x20BD;</td>
                <td className="content__td">25 &#x20BD;</td>
              </tr>
              <tr className="content__tr">
                <td className="content__td">3</td>
                <td className="content__td content__td_start">Конина голяшка</td>
                <td className="content__td">кг</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">300 &#x20BD;</td>
                <td className="content__td">25 &#x20BD;</td>
              </tr>
              <tr className="content__tr">
                <td className="content__td">4</td>
                <td className="content__td content__td_start">Конина голяшка</td>
                <td className="content__td">кг</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">300 &#x20BD;</td>
                <td className="content__td">25 &#x20BD;</td>
              </tr>
              <tr className="content__tr">
                <td className="content__td">5</td>
                <td className="content__td content__td_start">Конина голяшка</td>
                <td className="content__td">кг</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">300 &#x20BD;</td>
                <td className="content__td">25 &#x20BD;</td>
              </tr>
              <tr className="content__tr">
                <td className="content__td">6</td>
                <td className="content__td content__td_start">Конина голяшка</td>
                <td className="content__td">кг</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">1,800</td>
                <td className="content__td">300 &#x20BD;</td>
                <td className="content__td">25 &#x20BD;</td>
              </tr>
              
            </tbody>
            <tfoot className="content__tfoot">
              <tr className="content__tr">
                <td className="content__td content__td_end content__td_bold" colSpan={5}>
                  Итого
                </td>
                <td className="content__td border content__td_bold">2,000 кг</td>
                <td className="content__td"></td>
                <td className="content__td border content__td_bold">195 &#x20BD;</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="content__text-block">
        <h2 className="content__title">Технологический процесс</h2>
        <p className="content__text content__text_start">
          Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде.Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде.Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде.Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде.Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде.Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде.Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде.Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде. Порезать кубиками конину, сварить, пожарить, съесть, а лучше подать гостю в теплом
          виде.
        </p>
      </div>
    </section>
  );
};

export { TechCardContent };
