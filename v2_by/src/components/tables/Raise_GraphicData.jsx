import React from 'react'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AreaChart, Area } from 'recharts';


const Raise_GraphicData = ({ raiseData }) => {


    const [chartdata, setChartdata] = useState([])


    useEffect(() => {
        // raiseData'nın bir dizi olduğundan ve doğru verilere sahip olduğundan emin olun
        if (Array.isArray(raiseData)) {
            const result = raiseData.map(item => ({
                "year": item?.raiseYear,
                "standart_raise": item?.standartRaise,
                "performance_raise": item?.performanceRaise,
                "manager_raise": item?.managerRaise,
            }));

            setChartdata(result);
        }
    }, [raiseData]);




    return (

        <div>


            <AreaChart
                width={500}
                height={400}
                data={chartdata || ""}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="manager_raise" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="performance_raise" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="standart_raise" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>


        </div >
    )
}

export default Raise_GraphicData