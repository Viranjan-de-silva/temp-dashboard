import React from 'react';
import { GaugeComponent } from 'react-gauge-component';

function GaugeDisplay({ value }) {
  return (
    <div style={{ display: 'inline-block', marginTop: '20px' }}>
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          subArcs: [
            {
              limit: 15,
              color: '#EA4228',
              showTick: true,
              tooltip: {
                text: 'Too low temperature!',
              },
              onClick: () => console.log("Low temperature warning!"),
              onMouseMove: () => console.log("Mouse moving over low temperature!"),
              onMouseLeave: () => console.log("Mouse left low temperature area!"),
            },
            {
              limit: 17,
              color: '#F5CD19',
              showTick: true,
              tooltip: {
                text: 'Low temperature!',
              },
            },
            {
              limit: 33,
              color: '#5BE12C',
              showTick: true,
              tooltip: {
                text: 'OK temperature!',
              },
            },
            {
              limit: 35,
              color: '#F5CD19',
              showTick: true,
              tooltip: {
                text: 'High temperature!',
              },
            },
            {
              color: '#EA4228',
              tooltip: {
                text: 'Too high temperature!',
              },
            },
          ],
        }}
        pointer={{
          color: '#345243',
          length: 0.80,
          width: 15,
        }}
        labels={{
          valueLabel: {
            formatTextValue: (value) => `${value}ºC`,
          },
          tickLabels: {
            type: 'outer',
            defaultTickValueConfig: { 
              formatTextValue: (value) => `${value}ºC`,
              style: { fontSize: 10 },
            },
            ticks: [
              { value: 10 },
              { value: 25 },
              { value: 40 },
            ],
          },
        }}
        value={value}
        minValue={10}
        maxValue={40}
      />
    </div>
  );
}

export default GaugeDisplay;
