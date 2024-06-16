import { Link } from 'react-router-dom';
import Mapicon from '/icons/map_icon.svg';
import Clockicon from '/icons/clock_icon.svg';
import Subwayicon from '/icons/subway_icon.svg';
import Webicon from '/icons/web_icon.svg';
import Telicon from '/icons/tel_icon.svg';
import Noimg from '/no_img.svg';
import { MapDetailStyled, DetailInfoStyled } from './MapDetailContent.styles';

type DetailProps = {
  data?: DetailData;
};

type DetailData = {
  basicInfo?: {
    placenamefull?: string;
    mainphotourl?: string;
    phonenum?: string;
    address?: {
      newaddr?: {
        newaddrfull?: string;
        bsizonno?: string;
      };
      region?: {
        newaddrfullname?: string;
      };
    };
    homepage?: string;
    category?: {
      catename?: string;
    };
    openHour?: {
      periodList?: {
        periodName?: string;
        timeList?: {
          timeName?: string;
          timeSE?: string;
          dayOfWeek?: string;
        }[];
      }[];
      offdayList?: {
        holidayName?: string;
        weekAndDay?: string;
      }[];
    };
  };
  findway?: {
    subway?: {
      stationSimpleName?: string;
      exitNum?: string;
      toExitMinute?: string;
      subwayList?: {
        subwayName?: string;
      }[];
    }[];
  };
};

const MapDetailContent = ({ data }: DetailProps) => {
  const {
    placenamefull,
    mainphotourl,
    phonenum,
    address,
    homepage,
    category,
    openHour,
  } = data?.basicInfo ?? {};
  const { subway } = data?.findway ?? {};

  const newaddrfull = address?.newaddr?.newaddrfull ?? '';
  const bsizonno = address?.newaddr?.bsizonno ?? '';
  const newaddrfullname = address?.region?.newaddrfullname ?? '';

  const stationList = subway ?? [];
  const timeList = openHour?.periodList?.[0]?.timeList ?? [];
  const offDay = openHour?.offdayList ?? [];

  return (
    <>
      <MapDetailStyled>
        <div className="store_top">
          {mainphotourl ? (
            <div
              className="thumbnail_box"
              style={{ background: `url(${mainphotourl}) 50% 50%` }}
            />
          ) : (
            <div
              className="thumbnail_box"
              style={{ background: `url(${Noimg}) 50% 50%` }}
            />
          )}
          <div className="store_name">
            {category?.catename && <span>{category.catename}</span>}
            {placenamefull && <h4>{placenamefull}</h4>}
          </div>
        </div>
        <div className="store_info">
          <DetailInfoStyled>
            <img src={Mapicon} />
            <p>{`${newaddrfullname} ${newaddrfull} ${bsizonno && `(우)${bsizonno}`}`}</p>
          </DetailInfoStyled>
          {phonenum && (
            <DetailInfoStyled>
              <img src={Telicon} />
              <p>{phonenum}</p>
            </DetailInfoStyled>
          )}
          {homepage && (
            <DetailInfoStyled>
              <img src={Webicon} />
              <Link to={homepage} target="_blank" className="web_link">
                {homepage}
              </Link>
            </DetailInfoStyled>
          )}

          <div className="time_area">
            {timeList.length > 0 && timeList[0].timeName && (
              <h5>
                <img src={Clockicon} />
                {timeList[0].timeName && <span>{timeList[0].timeName}</span>}
              </h5>
            )}
            {timeList.map((time, index) => (
              <div className="inner_text" key={index}>
                {time.dayOfWeek && <span>{time.dayOfWeek}</span>}
                {time.timeSE && <span>{time.timeSE}</span>}
              </div>
            ))}
          </div>
          {offDay.map((day, index) => (
            <div className="inner_text" key={index}>
              {day.holidayName && <span>{day.holidayName}</span>}
              {day.weekAndDay && <span>{day.weekAndDay}</span>}
            </div>
          ))}

          {stationList.length > 0 && stationList && (
            <div className="subway_area">
              <h5>
                <img src={Subwayicon} />
                <span>지하철 역</span>
              </h5>
              {stationList.map((station, index) => (
                <div className="inner_text" key={index}>
                  {station.stationSimpleName && (
                    <span>{station.stationSimpleName}</span>
                  )}
                  {station.exitNum && (
                    <span className="exit_num">{station.exitNum}번 출구</span>
                  )}
                  {station.toExitMinute && (
                    <span className="exit_minute">
                      도보 {station.toExitMinute}분
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </MapDetailStyled>
    </>
  );
};

export default MapDetailContent;
