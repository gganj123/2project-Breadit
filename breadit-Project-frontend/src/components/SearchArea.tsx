import { PaginationProps, Marker } from '../components/KakaoMap';

export const searchBakeryNearby = (
  map: kakao.maps.Map,
  setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>,
  setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>,
  searchKeyword: string // 검색 키워드 추가
) => {
  const itemsPerPage = 6;
  // 현재 위치 가져오기
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // 내 위치 기반으로 검색하기
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(
        searchKeyword,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();
            const newMarkers: Marker[] = [];
            for (let i = 0; i < data.length; i++) {
              const lat = parseFloat(data[i].y);
              const lng = parseFloat(data[i].x);
              newMarkers.push({
                position: { lat, lng },
                id: data[i].id,
                content: data[i].place_name,
                address: data[i].road_address_name,
                phone: data[i].phone,
              });
              bounds.extend(new kakao.maps.LatLng(lat, lng));
            }
            const totalPages = Math.ceil(newMarkers.length / itemsPerPage);
            setPagination((prevPagination) => ({
              ...prevPagination,
              last: 2,
              current: 1,
            }));
            setMarkers(newMarkers);
            map?.setBounds(bounds);
          } else {
            let errorMessage = '';
            if (status === kakao.maps.services.Status.ZERO_RESULT) {
              errorMessage = '주변에 해당하는 결과가 없습니다.';
            } else {
              errorMessage = '빵집 검색 중 오류가 발생했습니다.';
            }
            alert(errorMessage);
          }
        },
        {
          location: new kakao.maps.LatLng(lat, lng),
          radius: 10000, // 10km 반경 내에서 검색
        }
      );
    },
    () => alert('위치 정보를 가져오는데 실패했습니다.'),
    {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    }
  );
};

// export const searchBakeryNearby = (
//   map: kakao.maps.Map,
//   setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>,
//   setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>,
//   searchKeyword: string // 검색 키워드 추가
// ) => {
//   const itemsPerPage = 6;

//   // 엘리스 성수점의 위도와 경도
//   const elliesSungsuLocation = {
//     lat: 37.546857668813, // 엘리스 성수점의 위도
//     lng: 127.0662920343, // 엘리스 성수점의 경도
//   };

//   // 엘리스 성수점 위치로 검색하기
//   const ps = new kakao.maps.services.Places();
//   ps.keywordSearch(
//     searchKeyword,
//     (data, status) => {
//       if (status === kakao.maps.services.Status.OK) {
//         const bounds = new kakao.maps.LatLngBounds();
//         const newMarkers: Marker[] = [];
//         for (let i = 0; i < data.length; i++) {
//           const lat = parseFloat(data[i].y);
//           const lng = parseFloat(data[i].x);
//           newMarkers.push({
//             position: { lat, lng },
//             id: data[i].id,
//             content: data[i].place_name,
//             address: data[i].road_address_name,
//             phone: data[i].phone,
//           });
//           bounds.extend(new kakao.maps.LatLng(lat, lng));
//         }
//         const totalPages = Math.ceil(newMarkers.length / itemsPerPage);
//         setPagination((prevPagination) => ({
//           ...prevPagination,
//           last: 2,
//           current: 1,
//         }));
//         setMarkers(newMarkers);
//         map?.setBounds(bounds);
//       } else {
//         let errorMessage = '';
//         if (status === kakao.maps.services.Status.ZERO_RESULT) {
//           errorMessage = '주변에 해당하는 결과가 없습니다.';
//         } else {
//           errorMessage = '빵집 검색 중 오류가 발생했습니다.';
//         }
//         alert(errorMessage);
//       }
//     },
//     {
//       location: new kakao.maps.LatLng(
//         elliesSungsuLocation.lat,
//         elliesSungsuLocation.lng
//       ),
//       radius: 10000, // 10km 반경 내에서 검색
//     }
//   );
// };
