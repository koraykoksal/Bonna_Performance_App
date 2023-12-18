import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


const MyTable = ({ personelPerformanceData }) => {

  const [personelData, setPersonelData] = useState([])

  const currentDate = new Date();


  const evulationInfo = () => {

    let performanceResult = ""
    const thisYear = new Date().getFullYear()
    const nextYear = new Date().getFullYear() + 1

    const currentDate = new Date();
    const startLimit = new Date(thisYear, 11); // 2023 yılının Ekim ayı için (aylar 0'dan başlar)
    const endLimit = new Date(nextYear, 1); // 2024 yılının Şubat ayı için

    if (currentDate > startLimit && currentDate < endLimit) {
      performanceResult = 'Yıl Sonu Performans Değerlendirme'
    }
    else {
      performanceResult = '6 Aylık Performans Değerlendirme'
    }

    return performanceResult

  }


  function formatDate(date) {
    let day = date.getDate(); // Günü alır
    let month = date.getMonth() + 1; // Ayı alır (0'dan başladığı için 1 eklenir)
    let year = date.getFullYear(); // Yılı alır
    let hours = date.getHours(); // Saati alır
    let minutes = date.getMinutes(); // Dakikayı alır

    // Gün, ay, saat veya dakika tek basamaklıysa, başına '0' ekler
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }


  // const [info, setInfo] = useState({
  //   personel: personelData?.personel,
  //   sicilNo: personelData?.sicilNo,
  //   tcNo: personelData?.tcNo,
  //   iseGirisTarih: personelData?.iseGirisTarih,
  //   dogumTarih: personelData?.dogumTarih,
  //   birim: personelData?.birim,
  //   bolum: personelData?.bolum,
  //   ustBirim: personelData?.ustBirim,
  //   yonetici: personelData?.yonetici,
  //   gorev: personelData?.gorev,
  //   currentSallary: personelData?.currentSallary,
  //   degerlendirmeYili: personelData?.degerlendirmeYili,
  //   degerlendirmeDonemiAciklama: personelData?.degerlendirmeDonemiAciklama,
  //   q1Calisan: personelData?.q1Calisan,
  //   q2Calisan: personelData?.q2Calisan,
  //   q3Calisan: personelData?.q3Calisan,
  //   q4Calisan: personelData?.q4Calisan,
  //   q5Calisan: personelData?.q5Calisan,
  //   q6Calisan: personelData?.q6Calisan,
  //   q7Calisan: personelData?.q7Calisan,
  //   q8Calisan: personelData?.q8Calisan,
  //   q9Calisan: personelData?.q9Calisan,
  //   q10Calisan: personelData?.q10Calisan,
  //   oypCalisan: personelData?.oypCalisan,
  //   dypCalisan: personelData?.dypCalisan,
  //   // yypCalisan: "",
  //   tppCalisan: personelData?.tppCalisan,
  //   calisanAciklama: personelData?.calisanAciklama,
  //   degerlendirmeSonucu: personelData?.degerlendirmeSonucu,
  //   calisanDegerlendirmeYuzdesi: personelData?.calisanDegerlendirmeYuzdesi,
  //   createdDate: personelData?.createdDate,
  //   okudumAnladım: personelData?.okudumAnladım,
  //   personelSonuc: personelData?.personelSonuc
  // })

  // const my1_Topics = [
  //   {
  //     id: 1,
  //     konu: 'Bölüm talimatlarını ve çalışma parametrelerini uygulayabilir.',
  //     yetkinlik: 'Operasyonel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q1Calisan} name='q1Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 2,
  //     konu: 'Operasyon için İşgüvenliği  kurallarını uygular.',
  //     yetkinlik: 'Operasyonel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q2Calisan} name='q2Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 3,
  //     konu: 'İş takibi ve Raporlama yapabilir.',
  //     yetkinlik: 'Operasyonel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q3Calisan} name='q3Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 4,
  //     konu: 'Makine, Alet ve aparatları tanıyor ve kullanabiliyor.',
  //     yetkinlik: 'Operasyonel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q4Calisan} name='q4Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 5,
  //     konu: 'Kalite standartlarını uygulayabilir. Hatalı parçaları tanıyabilir ve seçebilir. ',
  //     yetkinlik: 'Operasyonel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q5Calisan} name='q5Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 6,
  //     konu: 'İstenilen standart ve sürede tüm operasyonu tamamen bağımsız olarak yapabilir.',
  //     yetkinlik: 'Operasyonel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q6Calisan} name='q6Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 7,
  //     konu: 'İşe devamlılığı iyidir.',
  //     yetkinlik: 'Davranışsal Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q7Calisan} name='q7Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 8,
  //     konu: 'İş yeri disiplin kurallarına uygun davranır.',
  //     yetkinlik: 'Davranışsal Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q8Calisan} name='q8Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 9,
  //     konu: 'Ekip çalışmasına uygun davranır, iletişimi iyidir. ',
  //     yetkinlik: 'Davranışsal Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q9Calisan} name='q9Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 10,
  //     konu: 'Farkındalığı yüksektir ve katma değer sağlayacak önerilerde bulanabilir. ',
  //     yetkinlik: 'Davranışsal Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q10Calisan} name='q10Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  // ];


  // const my1_Results = [
  //   {
  //     konu: "Operasyonel Yetkinlik Puanı",
  //     referans: '60',
  //     yetkinlik: "",
  //     calisan: <Typography>{info?.oypCalisan}</Typography>,
  //   },
  //   {
  //     konu: "Davranışsal Yetkinlik Puanı",
  //     referans: '40',
  //     yetkinlik: "",
  //     calisan: <Typography>{info?.dypCalisan}</Typography>,
  //   },
  //   {
  //     konu: "Toplam Performans Puanı",
  //     referans: '40',
  //     yetkinlik: "",
  //     calisan: <Typography>{info?.tppCalisan}</Typography>,
  //   }
  // ]


  // const my2_Topics = [
  //   {
  //     id: 1,
  //     konu: 'Bölüm talimatlarını ve çalışma parametrelerini uygulayabilir.',
  //     yetkinlik: 'Operasyonel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q1Calisan} required name='q1Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 2,
  //     konu: 'Operasyon için İşgüvenliği  kurallarını uygular.',
  //     yetkinlik: 'Operasyonel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q2Calisan} required name='q2Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 3,
  //     konu: 'İş takibi ve Raporlama yapabilir.',
  //     yetkinlik: 'Operasyonel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q3Calisan} required name='q3Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 4,
  //     konu: 'Kalite standartlarını uygulayabilir. Hatalı parçaları tanıyabilir ve seçebilir. ',
  //     yetkinlik: 'Operasyonel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q4Calisan} required name='q4Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 5,
  //     konu: 'İşe devamlılığı iyidir.',
  //     yetkinlik: 'Davranışsal Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q5Calisan} required name='q5Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 6,
  //     konu: 'İş yeri disiplin kurallarına uygun davranır.',
  //     yetkinlik: 'Davranışsal Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q6Calisan} required name='q6Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 7,
  //     konu: 'Ekip çalışmasına uygun davranır, iletişimi iyidir. ',
  //     yetkinlik: 'Davranışsal Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q7Calisan} required name='q7Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 8,
  //     konu: 'Farkındalığı yüksektir ve katma değer sağlayacak önerilerde bulanabilir. ',
  //     yetkinlik: 'Davranışsal Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q8Calisan} required name='q8Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 9,
  //     konu: 'Ekip yönetebilir ve ekibini yönlendirebilir.',
  //     yetkinlik: 'Yönetsel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q9Calisan} required name='q9Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  //   {
  //     id: 10,
  //     konu: 'Operasyon ile ilgili diğer çalışanlara teorik ve uygulamalı olarak eğitim verebilir.',
  //     yetkinlik: 'Yönetsel Yetkinlik',
  //     referans: '10',

  //     calisan: <input value={info.q10Calisan} required name='q10Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
  //     ,
  //   },
  // ];

  // const my2_Results = [
  //   {
  //     konu: "Operasyonel Yetkinlik Puanı",
  //     referans: '40',
  //     yetkinlik: "",
  //     calisan: <Typography>{info?.oypCalisan}</Typography>,
  //   },
  //   {
  //     konu: "Davranışsal Yetkinlik Puanı",
  //     referans: '20',
  //     yetkinlik: "",
  //     calisan: <Typography>{info?.dypCalisan}</Typography>,
  //   },
  //   {
  //     konu: "Yönetsel Yetkinlik Puanı",
  //     referans: '20',
  //     yetkinlik: "",
  //     calisan: <Typography>{info?.yypCalisan}</Typography>,
  //   },
  //   {
  //     konu: "Toplam Performans Puanı",
  //     referans: '100',
  //     yetkinlik: "",
  //     calisan: <Typography>{info?.tppCalisan}</Typography>,
  //   }
  // ]



  useEffect(() => {
    
    //personelin birden fazla performans kaydı olduğunu düşünürsek yönetici değerlendirmesi öncesinde personelin son yapılan performans kaydını getirmek gerekir

    const dizi = Object.keys(personelPerformanceData).map(key => { return { id: key, ...personelPerformanceData[key] } })
    const lastKey = dizi.sort()[dizi.length -1]
    setPersonelData(lastKey)

  }, [personelPerformanceData])
  

 

  return (
    <div>



    </div>
  )
}

export default MyTable