import React from 'react'
import { useEffect, useState } from 'react'
import { Box, Typography, Container, Grid, Button } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Rectangle } from 'recharts';


const AllReults_GraphicData = ({ myCalculatedData, byCalculatedData }) => {

    const [genelData, setGenelData] = useState([])
    const [lokasyonData, setLokasyonData] = useState([])
    const [unvanData, setUnvanData] = useState([])

    const [formatlanmisChartGenelData, setFormatlanmisChartGenelData] = useState([])
    const [formatlanmisChartUnvanData, setFormatlanmisChartUnvanData] = useState([])
    const [formatlanmisChartLokasyonData, setFormatlanmisChartLokasyonData] = useState([])

    const [genelDataBY, setGenelDataBy] = useState([])
    const [birimDataBY, setBirimDataBy] = useState([])
    const [formatlanmisChartGenelDataBY, setFormatlanmisChartGenelDataBY] = useState([])
    const [formatlanmisChartGenelDataBY_birim, setFormatlanmisChartGenelDataBY_birim] = useState([])


    useEffect(() => {

        const ustBirimMap = {};
        const unvanMap = {};
        let lokasyonSkalaMap = {};


        // üst birim bilgilerini foreach ile kontrol et ve skala değerini al
        myCalculatedData.forEach(item => {
            const ustBirim = item.ustBirim;
            const skala = parseFloat(item.scale);

            if (!ustBirimMap[ustBirim]) {
                ustBirimMap[ustBirim] = { total: 0, count: 0 };
            }

            ustBirimMap[ustBirim].total += skala;
            ustBirimMap[ustBirim].count += 1;
        });

        // üst birim skala değerlerinin ortalamasını al
        const ustBirimResult = Object.keys(ustBirimMap).map(key => {
            const average = ustBirimMap[key].total / ustBirimMap[key].count;
            return { [key]: average };
        });


        // ünvan bilgilerini foreach ile kontrol et ve skala değerini al
        myCalculatedData.forEach(item => {
            const unvan = item.gorev
            const skala = parseFloat(item.scale)

            if (!unvanMap[unvan]) {
                unvanMap[unvan] = { total: 0, count: 0 }
            }

            unvanMap[unvan].total += skala
            unvanMap[unvan].count += 1

        })

        // üst birim skala değerlerinin ortalamasını al
        const unvanResult = Object.keys(unvanMap).map(key => {
            const average = unvanMap[key].total / unvanMap[key].count;
            return { [key]: average };
        });


        // lokasyon bazlı üst birim skala datası
        myCalculatedData.forEach(item => {
            const ustBirim = item.ustBirim;
            const lokasyon = item.lokasyon;
            const skala = parseFloat(item.scale);
            const key = `${ustBirim}-${lokasyon}`;

            if (!lokasyonSkalaMap[key]) {
                lokasyonSkalaMap[key] = { total: 0, count: 0, ustBirim, lokasyon };
            }

            lokasyonSkalaMap[key].total += skala;
            lokasyonSkalaMap[key].count += 1;
        });

        const lokasyonResult = Object.values(lokasyonSkalaMap).map(entry => ({
            lokasyon: entry.lokasyon,
            ortalamaSkala: entry.total / entry.count,
            ustBirim: entry.ustBirim
        }));



        setFormatlanmisChartGenelData(ustBirimResult);
        setFormatlanmisChartUnvanData(unvanResult)
        setFormatlanmisChartLokasyonData(lokasyonResult)

    }, [myCalculatedData])


    useEffect(() => {

        //* Grafikte gösterilecek verileri formatlama
        const genelChartData = formatlanmisChartGenelData.map(item => {
            const ustBirim = Object.keys(item)[0];
            return {
                name: ustBirim,
                Skala: item[ustBirim].toFixed(2)
            };
        });

        const unvanChartData = formatlanmisChartUnvanData.map(item => {
            const unvan = Object.keys(item)[0];
            return {
                name: unvan,
                Skala: item[unvan].toFixed(2)
            };
        });

        const lokasyonChartData = formatlanmisChartLokasyonData.map(item => {
            return {
                name: item['ustBirim'],
                Skala: item['ortalamaSkala'].toFixed(2),
                lokasyon: item['lokasyon']
            }
        })

        function sortArray(data) {
            return data.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                if (a.lokasyon < b.lokasyon) return -1;
                if (a.lokasyon > b.lokasyon) return 1;
                return 0;
            });
        }

        const lokasyonSortingData = sortArray(lokasyonChartData)

        setGenelData(genelChartData)
        setUnvanData(unvanChartData)
        setLokasyonData(lokasyonSortingData)

    }, [formatlanmisChartGenelData, formatlanmisChartUnvanData, formatlanmisChartLokasyonData])


    useEffect(() => {

        const ustBirimMap = {};
        const birimMap = {};
        const unvanMap = {};
        let lokasyonSkalaMap = {};


        // üst birim bilgilerini foreach ile kontrol et ve skala değerini al
        byCalculatedData.forEach(item => {
            const ustBirim = item.ustBirim;
            const skala = parseFloat(item.scale);

            if (!ustBirimMap[ustBirim]) {
                ustBirimMap[ustBirim] = { total: 0, count: 0 };
            }

            ustBirimMap[ustBirim].total += skala;
            ustBirimMap[ustBirim].count += 1;
        });

        // üst birim skala değerlerinin ortalamasını al
        const ustBirimResult = Object.keys(ustBirimMap).map(key => {
            const average = ustBirimMap[key].total / ustBirimMap[key].count;
            return { [key]: average };
        });


        byCalculatedData.forEach(item => {
            const ustBirim = item.birim;
            const skala = parseFloat(item.scale);

            if (!birimMap[ustBirim]) {
                birimMap[ustBirim] = { total: 0, count: 0 };
            }

            birimMap[ustBirim].total += skala;
            birimMap[ustBirim].count += 1;
        });

        // üst birim skala değerlerinin ortalamasını al
        const birimResult = Object.keys(birimMap).map(key => {
            const average = birimMap[key].total / birimMap[key].count;
            return { [key]: average };
        });


        setFormatlanmisChartGenelDataBY(ustBirimResult)
        setFormatlanmisChartGenelDataBY_birim(birimResult)

    }, [byCalculatedData])


    useEffect(() => {

        const genelChartDataBY = formatlanmisChartGenelDataBY.map(item => {
            const ustBirim = Object.keys(item)[0];
            return {
                name: ustBirim,
                Skala: item[ustBirim].toFixed(2)
            };
        });

        const genelChartDataBY_birim = formatlanmisChartGenelDataBY_birim.map(item => {
            const birim = Object.keys(item)[0];
            return {
                name: birim,
                Skala: item[birim].toFixed(2)
            };
        });

        setGenelDataBy(genelChartDataBY)
        setBirimDataBy(genelChartDataBY_birim)

    }, [formatlanmisChartGenelDataBY,formatlanmisChartGenelDataBY_birim])


    

    return (
        <div>
            
            <Box display={'flex'} flexDirection={'column'} flexWrap={'wrap'} gap={2} p={3}>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>


                    <Box display={'flex'} flexDirection={'column'} gap={1} width={"100%"} height={300}>
                        <Typography variant='subtitle2' fontWeight={700} align='center'>(Genel) Mavi Yaka Performans Puanı</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={genelData}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Skala" fill="#80BCBD">
                                    <LabelList dataKey={'Skala'} position={'top'} fill='#000000' />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} gap={1} width={"100%"} height={300}>
                        <Typography variant='subtitle2' fontWeight={700} align='center'>(Unvan Bazlı) Mavi Yaka Performans Puanı</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={unvanData}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Skala" fill="#B19470">
                                    <LabelList dataKey={'Skala'} position={'top'} fill='#000000' />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>

                </Box>


                <Box display={'flex'} flexDirection={'column'} gap={1} width={"100%"} height={300}>
                    <Typography variant='subtitle2' fontWeight={700} align='center'>(Lokasyon Bazlı) Mavi Yaka Performans Puanı</Typography>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={lokasyonData}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="lokasyon" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Skala" fill="#0766AD">
                                <LabelList dataKey="name" position="insideTop" fill='#ffffff' />
                                <LabelList dataKey="Skala" position="top" offset={10} fill='#000000' />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Box>

            </Box>


            <Box display={'flex'} flexDirection={'column'} flexWrap={'wrap'} gap={2} p={3}>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Box display={'flex'} flexDirection={'column'} gap={1} width={"100%"} height={300}>
                        <Typography variant='subtitle2' fontWeight={700} align='center'>(Genel) Beyaz Yaka Performans Puanı</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={genelDataBY}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Skala" fill="#A3B763">
                                    <LabelList dataKey={'Skala'} position={'top'} fill='#000000' />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Box display={'flex'} flexDirection={'column'} gap={1} width={"100%"} height={300}>
                        <Typography variant='subtitle2' fontWeight={700} align='center'>(Birim Bazlı) Beyaz Yaka Performans Puanı</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={birimDataBY}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Skala" fill="#D0A2F7">
                                    <LabelList dataKey={'Skala'} position={'top'} fill='#000000' />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>

            </Box>
        </div>
    )
}

export default AllReults_GraphicData