import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGuide from './AdminGuide';
import ButtonDeafult from '../../components/atoms/buttons/ButtonDefault';

export type AdminTableProps = {
  pageTitle: string;
  theadTitle: string[];
  data: { _id: string; nickname: string; email?: string; title?: string }[];
  deleteEvent: (id: string) => void;
  deleteList: (id: string[]) => void;
  go: string;
};

const AdminTable = ({
  pageTitle,
  theadTitle,
  data,
  deleteEvent,
  deleteList,
  go,
}: AdminTableProps) => {
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleDeleteEventClick = (id: string) => {
    if (confirm('삭제하시겠습니까?')) {
      deleteEvent(id);
      setCheckList([]);
    }
  };

  const handleCheckedList = (id: string, checked: boolean) => {
    if (checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((checkedId) => checkedId !== id));
    }
  };

  const handleDeleteCheckList = (checkList: string[]) => {
    if (checkList.length > 0) {
      if (confirm('삭제하시겠습니까?')) {
        deleteList(checkList);
        setCheckList([]);
      }
    } else {
      alert('선택된 항목이 없습니다.');
    }
  };

  const handleCheckAll = () => {
    if (isAllChecked) {
      setCheckList([]);
    } else {
      setCheckList(data.map((item) => item._id));
    }
    setIsAllChecked(!isAllChecked);
  };

  return (
    <section className="admin_cont">
      <AdminGuide />
      <div className="main_title flex_default">
        <h4>{pageTitle}</h4>
        <ButtonDeafult
          text={'선택 삭제'}
          clickevent={() => handleDeleteCheckList(checkList)}
        />
      </div>
      <div className="admin_table">
        <table>
          <thead>
            <tr>
              <th className="check_area">
                <input
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={handleCheckAll}
                  className="checkbox"
                />
              </th>
              {theadTitle.map((title, index) => {
                return (
                  <th
                    key={index}
                    className={
                      index === 2 ? 'nickname' : index === 3 ? 'setting' : ''
                    }
                    style={index === 3 ? { width: 100 } : {}}
                  >
                    {title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((content) => {
              return (
                <tr key={content._id}>
                  <td className="check_area">
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={content._id}
                      checked={checkList.includes(content._id)}
                      onChange={(e) => {
                        handleCheckedList(content._id, e.target.checked);
                      }}
                    />
                  </td>
                  <td className="nickname">{content.nickname}</td>

                  {go !== undefined ? (
                    <td>
                      <Link to={`${go}/${content._id}`}>
                        {content.email} {content.title}
                      </Link>
                    </td>
                  ) : (
                    <td>
                      {content.email} {content.title}
                    </td>
                  )}

                  <td className="setting">
                    <ButtonDeafult
                      text={'삭제'}
                      clickevent={() => handleDeleteEventClick(content._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminTable;
