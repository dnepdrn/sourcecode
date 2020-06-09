window.addEventListener('load', () => {
  let myLong;
  let myLat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      myLong = position.coords.longitude
      myLat = position.coords.latitude
      // 마스크 & 약국정보 api 호출
      const api = `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${myLat}&lng=${myLong}&m=1000`

      fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          const storeData = data.stores
          storeData.forEach((data) => displayData(data, myLong, myLat))
        })

      // 카카오지도 표시
      const mapContainer = document.getElementById('map') // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(myLat, myLong), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };
      mapContainer.style.width = '100vw';
      mapContainer.style.height = '100vh';
      const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 지도에 노출된 정보 가공
      const displayData = (data) => {
        const {addr, code, created_at, lat, lng, name, remain_stat, stock_at, type} = data
        let remains
        if (remain_stat === 'plenty') {
          remains = '재고: 100개 이상'
        } else if (remain_stat === 'some') {
          remains = '재고: 30~100'
        } else if (remain_stat === 'few') {
          remains = '재고: 2~30'
        } else if (remain_stat === 'empty') {
          remains = '품절'
        } else if (remain_stat === 'break') {
          remains = '판매중지'
        }
        const stocks = stock_at.replace(/\//gi, '.').substring(2, 16)
        const address = addr.split('(')[0]

        class Infos {
          constructor(name, addr, remains, stock_at, lng, lat) {
            Object.assign(this, {name, addr, remains, stock_at, lng, lat})
          };
        }

        class Layout {
          static objects(arg) {
            const shows = {
              content: `
                        <div class="bubbles ${arg.remains}">
                            <li class="fs-10">
                                <span>${arg.name}</span>
                                <span>(${arg.remains})</span>
                            </li>
                            <li class="fs-10">입고: ${arg.stock_at}</li>
                            <li class="fs-10">주소: ${arg.addr}</li>
                        </div>`,
              latlng: new kakao.maps.LatLng(lat, lng)
            }

            const marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: shows.latlng // 마커의 위치
            });

            // 마커에 표시할 인포윈도우를 생성
            const infowindow = new kakao.maps.InfoWindow({
              content: shows.content // 인포윈도우에 표시할 내용
            });
            infowindow.open(map, marker);
          }
        }

        const init = new Infos(name, address, remains, stocks, lng, lat);
        Layout.objects(init)
      }
    })
  }
})

//주소호출

document.body.addEventListener('click', e => {
  if (e.target.id === 'searchAddress') {
    const address = document.getElementById('address')
    if (address.value === '') {
      alert('주소검색을 입력해주세요.')
      address.focus()
    } else {
      // 주소검색 객체 생성
      const geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표 검색
      geocoder.addressSearch(address.value, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          console.log(result)
          const mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
              center: new kakao.maps.LatLng(result[0].y, result[0].x), // 지도의 중심좌표
              level: 3 // 지도의 확대 레벨
            };

          // 지도를 생성합니다
          const map = new kakao.maps.Map(mapContainer, mapOption);

          // 주소-좌표 변환 객체를 생성합니다
          const geocoder = new kakao.maps.services.Geocoder();

          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div>${result[0].address.address_name}</div>`
          });

          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);

          //약국 api 호출
          const api = `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${result[0].y}&lng=${result[0].x}&m=1000`
          fetch(api)
            .then(response => {
              return response.json()
            })
            .then(data => {
              const storeData = data.stores
              storeData.forEach((data) => displayData(data))
            })

          // 지도에 노출된 정보 가공
          const displayData = (data) => {
            const {addr, code, created_at, lat, lng, name, remain_stat, stock_at, type} = data
            let remains
            if (remain_stat === 'plenty') {
              remains = '재고: 100개 이상'
            } else if (remain_stat === 'some') {
              remains = '재고: 30~100'
            } else if (remain_stat === 'few') {
              remains = '재고: 2~30'
            } else if (remain_stat === 'empty') {
              remains = '품절'
            } else if (remain_stat === 'break') {
              remains = '판매중지'
            }
            const stocks = stock_at.replace(/\//gi, '.').substring(2, 16)
            const address = addr.split('(')[0]

            class Infos {
              constructor(name, addr, remains, stock_at, lng, lat) {
                Object.assign(this, {name, addr, remains, stock_at, lng, lat})
              };
            }

            class Layout {
              static objects(arg) {
                const shows = {
                  content: `
                            <div class="bubbles ${arg.remains}">
                                <li class="fs-10">
                                    <span>${arg.name}</span>
                                    <span>(${arg.remains})</span>
                                </li>
                                <li class="fs-10">입고: ${arg.stock_at}</li>
                                <li class="fs-10">주소: ${arg.addr}</li>
                            </div>`,
                  latlng: new kakao.maps.LatLng(lat, lng)
                }

                const marker = new kakao.maps.Marker({
                  map: map, // 마커를 표시할 지도
                  position: shows.latlng // 마커의 위치
                });

                // 마커에 표시할 인포윈도우를 생성
                const infowindow = new kakao.maps.InfoWindow({
                  content: shows.content // 인포윈도우에 표시할 내용
                });
                infowindow.open(map, marker);
              }
            }

            const init = new Infos(name, address, remains, stocks, lng, lat);
            Layout.objects(init)
          }
        }
      })
    }
  }
})
