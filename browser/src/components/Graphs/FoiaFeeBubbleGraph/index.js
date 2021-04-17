import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';
import FoiaStatus from '../../../utils/FoiaStatus';
import DonatelloColors from '../../../utils/DonatelloColors';

const FoiaFeeBubbleGraph = (props) => {
  const paidStatuses = [
    FoiaStatus.Partial,
    FoiaStatus.Lawsuit,
    FoiaStatus.NoDocs,
    FoiaStatus.Done,
    FoiaStatus.Fix,
    FoiaStatus.Rejected,
  ];

  /* const unpaidStatuses = [
    FoiaStatus.Ack,
    FoiaStatus.Processed,
    FoiaStatus.Appealing,
    FoiaStatus.Abandoned,
    FoiaStatus.Payment,
  ]; */

  const feeStatuses = props.data.foiaList.filter((item) => item.foiaReq.price > 0).map((item) => {
    const status = FoiaStatus.parse(item.foiaReq.status);
    return {
      id: item.foiaReq.id,
      label: item.jurisdiction.jurisdictionName,
      paid: paidStatuses.find((foiaStatus) => status.value === foiaStatus.value) ? 'paid': 'unpaid',
      value: item.foiaReq.price,
    };
  }).sort((a, b) => { 
    return a.value < b.value
  });

  const fees = {
    id: 'total',
    children: feeStatuses,
  }

  return(
    <div className="feeGraph">
      <h2 className="headline">Fees Charged by Agency</h2>
      <p>
        Agencies are allowed to charge "reasonable" fees for any requests
        that take more than 2 hours to complete. However, different departments
        have different perspectives on what fee is reasonable.
      </p>
      <div className="graph graph--circular">
        <ResponsiveBubble
          root={fees}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          padding={6}
          identity='id'
          colorBy='id'
          label={node => node.data.label}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.0 ] ] }}
          animate={false}
          isZoomable={false} 
          motionStiffness={50}
          motionDamping={30}
          leavesOnly={true}
          enableLabel={true}
          colors={DonatelloColors.colorTints.reverse().map(color => color.hsl().string())}
          tooltip={node => (
            <span>
                {node.data.label}: {new Intl.NumberFormat(navigator.language, {style: "currency", currency: "USD"}).format(node.data.value)}
            </span>
          )}
          labelSkipRadius={44}
        />
      </div>
      <p>
        Some agencies charge only nominal fees to cover cost of printing and mailing documentation.
      </p>
      <p>
        Other agencies require the entire process to be overseen by a police captain
        and demand compensation for the cost of a captain's wages. 
      </p>
    </div>
  );
};

export default FoiaFeeBubbleGraph;