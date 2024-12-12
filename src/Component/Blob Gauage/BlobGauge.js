import React from 'react';
import { GaugeComponent } from 'react-gauge-component';

function BlobGaugeDisplay({ value }) {
  return (
    <div style={{ display: 'inline-block', marginTop: '20px' }}>
      <GaugeComponent
        type="semicircle"
        arc={{
            colorArray: ['#00FF15', '#FF2121'],
            padding: 0.02,
            subArcs:
            [
                { limit: 40 },
                { limit: 60 },
                { limit: 70 },
                {},
                {},
                {},
                {}
            ]
        }}
        pointer={{type: "blob", animationDelay: 0 }}
        value={value}
        />
    </div>
  );
}

export default BlobGaugeDisplay;
