import { ResponsiveBar } from '@nivo/bar';
import { useState } from 'react';
import './graphics.css';
import { ResponsivePie } from '@nivo/pie';

const data = [
  { resolver: 'Resolver1', profit: 0.0083, time: '2024-03-03 11:51:11.000 UTC' },
  { resolver: 'Resolver2', profit: 0.0053, time: '2024-03-03 10:51:11.000 UTC' },
  { resolver: 'Resolver3', profit: 0.0023, time: '2024-03-02 13:51:11.000 UTC' },
  { resolver: 'Resolver4', profit: -0.0031, time: '2024-02-28 16:51:11.000 UTC' },
  { resolver: 'Resolver1', profit: 0.0087, time: '2024-02-25 10:51:11.000 UTC' },
  { resolver: 'Resolver2', profit: 0.0032, time: '2024-03-03 11:51:11.000 UTC' },
  { resolver: 'Resolver3', profit: 0.0012, time: '2024-02-29 10:51:11.000 UTC' },
  { resolver: 'Resolver4', profit: -0.0001, time: '2024-02-25 10:51:11.000 UTC' },
  { resolver: 'Resolver1', profit: 0.0031, time: '2024-02-21 09:51:11.000 UTC' },
  { resolver: 'Resolver2', profit: 0.0021, time: '2024-02-23 09:51:11.000 UTC' },
  { resolver: 'Resolver3', profit: 0.0037, time: '2024-02-25 09:51:11.000 UTC' },
  { resolver: 'Resolver4', profit: 0.0024, time: '2024-02-20 09:51:11.000 UTC' },
  { resolver: 'Resolver4', profit: 0.0024, time: '2024-02-20 09:51:11.000 UTC' }
];

const BarChartAndPie = () => {
    const [selectedTime, setSelectedTime] = useState('24h');

    const timeGraph = {
        '1h': 1,
        '4h': 4,
        '8h': 8,
        '24h': 24,
        '3d': 24 * 3,
        '7d': 24 * 7,
        '14d': 24 * 14,
        '30d': 24 * 30
    };
    
    const maxHours = timeGraph[selectedTime] || null;
    
    const filteredData = data.filter(item => {
        const currentTime = new Date(item.time);
        const diffMs = new Date() - currentTime;
        const diffHours = diffMs / (1000 * 60 * 60);
        return diffHours <= maxHours;
    });

    const resolverCounts = {};

    filteredData.forEach(item => {
        const time = new Date(item.time);
        let timeKey;
        if (selectedTime === '1h' || selectedTime === '4h' || selectedTime === '8h' || selectedTime === '24h') {
            const hour = `${time.getHours()}:${time.getMinutes()}`;
            timeKey = `${hour} ${item.resolver}`;
        } else {
            timeKey = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()} ${item.resolver}`;
        }
        resolverCounts[timeKey] = (resolverCounts[timeKey] || 0) + 1;
    });

    const barChartData = Object.entries(resolverCounts).map((
        [time, count]) => ({ time, count }
    ));

    const pieChartData = Object.entries(resolverCounts)
    .filter(([time, count]) => count > 0)
    .map(([time, count]) => ({ id: time, label: time, value: count }
    ));

  return (
      <div className='graphics-panel'>
          <div className='graphic-buttons'>
              <button className='button-lapse-time' onClick={() => setSelectedTime('1h')}>1 Hour</button>
              <button className='button-lapse-time' onClick={() => setSelectedTime('4h')}>4 Hours</button>
              <button className='button-lapse-time' onClick={() => setSelectedTime('8h')}>8 Hours</button>
              <button className='button-lapse-time' onClick={() => setSelectedTime('24h')}>24 Hours</button>
              <button className='button-lapse-time' onClick={() => setSelectedTime('3d')}>3 Days</button>
              <button className='button-lapse-time' onClick={() => setSelectedTime('7d')}>7 Days</button>
              <button className='button-lapse-time' onClick={() => setSelectedTime('14d')}>14 Days</button>
              <button className='button-lapse-time' onClick={() => setSelectedTime('30d')}>30 Days</button>
          </div>
          <div className='bar-and-pie-graph'>
              <div className='bar-chart'>
                <h2>Bar Chart</h2>
                  <div className='bar-chart-inner'>
                    <ResponsiveBar
                        data={barChartData}
                        keys={['count']}
                        indexBy="time"
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.19} 
                        layout="horizontal"
                        groupMode="stacked"
                        colors={{ scheme: 'set2' }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        axisRight={{
                            tickSize: 6,
                            tickPadding: 45,
                            tickRotation: 0,
                            legendPosition: 'middle',
                            legendOffset: 45
                        }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Time',
                            legendPosition: 'middle',
                            legendOffset: 36
                        }}
                        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                </div>
              </div>
              
              <div className='pie-chart'>
                  <h2>Pie Chart</h2>
                  {pieChartData.length > 0 && (
                      <div className='pie-chart-inner'>
                          <ResponsivePie
                              data={pieChartData}
                              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                              innerRadius={0.5}
                              padAngle={0.7}
                              cornerRadius={3}
                              colors={{ scheme: 'nivo' }}
                              borderWidth={1}
                              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                              radialLabelsSkipAngle={10}
                              radialLabelsTextXOffset={6}
                              radialLabelsTextColor="#333333"
                              radialLabelsLinkOffset={0}
                              radialLabelsLinkDiagonalLength={16}
                              radialLabelsLinkHorizontalLength={24}
                              radialLabelsLinkStrokeWidth={1}
                              radialLabelsLinkColor={{ from: 'color' }}
                              slicesLabelsSkipAngle={10}
                              slicesLabelsTextColor="#333333"
                              animate={true}
                              motionStiffness={90}
                              motionDamping={15}
                              defs={[
                                  {
                                      id: 'dots',
                                      type: 'patternDots',
                                      background: 'inherit',
                                      color: 'rgba(255, 255, 255, 0.3)',
                                      size: 4,
                                      padding: 1,
                                      stagger: true
                                  },
                                  {
                                      id: 'lines',
                                      type: 'patternLines',
                                      background: 'inherit',
                                      color: 'rgba(255, 255, 255, 0.3)',
                                      rotation: -45,
                                      lineWidth: 6,
                                      spacing: 10
                                  }
                              ]}
                          />
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
};

export default BarChartAndPie;