import { ResponsiveBar } from '@nivo/bar';
import { useState } from 'react';
import './graphic.css';

const data = [
    { resolver: 'Resolver 1', profit: 0.0033,  time: '2024-02-29 08:00:00.000 UTC' },
    { resolver: 'Resolver 2', profit: 0.0053,  time: '2024-02-28 07:00:00.000 UTC' },
    { resolver: 'Resolver 3', profit: 0.0023,  time: '2024-02-28 06:00:00.000 UTC' },
    { resolver: 'Resolver 4', profit: -0.0031, time: '2024-02-27 08:00:00.000 UTC' },
    { resolver: 'Resolver 1', profit: 0.0087,  time: '2024-02-27 07:00:00.000 UTC' },
    { resolver: 'Resolver 2', profit: 0.0032,  time: '2024-02-27 12:28:34.477 UTC' },
    { resolver: 'Resolver 3', profit: 0.0012,  time: '2024-02-26 08:00:00.000 UTC' },
    { resolver: 'Resolver 4', profit: -0.0001, time: '2024-02-26 17:20:00.000 UTC' },
    { resolver: 'Resolver 1', profit: 0.0031,  time: '2024-02-26 16:00:00.000 UTC' },
    { resolver: 'Resolver 2', profit: 0.0021,  time: '2024-02-25 18:00:00.000 UTC' },
    { resolver: 'Resolver 3', profit: 0.0037,  time: '2024-02-25 17:00:00.000 UTC' },
    { resolver: 'Resolver 4', profit: 0.0024,  time: '2024-02-25 21:40:00.000 UTC' },
    { resolver: 'Resolver 1', profit: 0.0033,  time: '2024-02-29 08:00:00.000 UTC' },
    { resolver: 'Resolver 1', profit: 0.0033,  time: '2024-02-29 08:00:00.000 UTC' },
    { resolver: 'Resolver 2', profit: 0.0033,  time: '2024-02-29 08:00:00.000 UTC' },
    { resolver: 'Resolver 2', profit: 0.0033,  time: '2024-02-29 08:00:00.000 UTC' },
];

const BarChart = () => {
    const [lapseTime, setLapseTime] = useState('4h');

    const timeIntervals = {
        '1h': 3600000,
        '4h': 14400000,
        '8h': 28800000,
        '24h': 86400000,
        '3d': 259200000,
        '7d': 604800000,
        '14d': 1209600000,
        '30d': 2592000000
    };

    const filteredData = data.filter(item => {
        const timeDiff = new Date().getTime() - new Date(item.time).getTime();
        return timeDiff <= timeIntervals[lapseTime];
    });

    const resolverCounts = filteredData.reduce((counts, { resolver }) => {
        counts[resolver] = (counts[resolver] || 0) + 1;
        return counts;
    }, {});

    const chartData = Object.keys(resolverCounts).map(resolver => ({
        resolver,
        count: resolverCounts[resolver]
    }));
    
    return (
        <div className='graphic'>
            <ResponsiveBar
                data={chartData}
                keys={['count']}
                indexBy="resolver"
                margin={{ top: 100, right: 250, bottom: 100, left: 100 }}
                padding={0.6}
                colors={{ scheme: 'set2' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisBottom={{
                    tickSize: 23,
                    tickPadding: 5,
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 4,
                    tickPadding: 5,
                }}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [["darker", 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
            <div className='graphic-buttons'>
                <button className='button-lapse-time' onClick={() => setLapseTime('1h') }>1 hour</button>
                <button className='button-lapse-time' onClick={() => setLapseTime('4h') }>4 hours</button>
                <button className='button-lapse-time' onClick={() => setLapseTime('8h') }>8 hours</button>
                <button className='button-lapse-time' onClick={() => setLapseTime('24h')}>24 hours</button>
                <button className='button-lapse-time' onClick={() => setLapseTime('3d') }>3 days</button>
                <button className='button-lapse-time' onClick={() => setLapseTime('7d') }>7 days</button>
                <button className='button-lapse-time' onClick={() => setLapseTime('14d')}>14 days</button>
                <button className='button-lapse-time' onClick={() => setLapseTime('30d')}>30 days</button>
            </div>
        </div>
    );
};
export default BarChart;