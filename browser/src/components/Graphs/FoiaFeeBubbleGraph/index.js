import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';
import { FoiaStatus } from '../../../utils/FoiaStatus';

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

  /* const feeColors = [
    `hsla(29, 100%, 50%, 1)`, //orange
    `hsla(212, 71%, 46%, 1)`, //blu
    `hsla(51, 100%, 50%, 1)`, //yelo
    `hsla(309, 45%, 50%, 1)`, //purp
    `hsla(285, 35%, 36%, 1)`, //deep purple
    `hsla(339, 74%, 57%, 1)`, //pinko
    `hsla(7, 100%, 50%, 1)`, //soviet
    `hsla(144, 43%, 50%, 1)`, //gren
  ]; */

  /* const feeColors = [
    `hsla(212, 71%, 46%, 1)`, //blu
    `hsla(144, 43%, 50%, 1)`, //gren
    `hsla(51, 100%, 50%, 1)`, //yelo
    `hsla(29, 100%, 50%, 1)`, //orange
    `hsla(7, 100%, 50%, 1)`, //soviet
    `hsla(339, 74%, 57%, 1)`, //pinko
    `hsla(309, 45%, 50%, 1)`, //purp
    `hsla(285, 35%, 36%, 1)`, //deep purple
  ]; */

  const feeColors = [
    `hsla(144, 43%, 50%, 1)`, //gren
    `hsla(51, 100%, 50%, 1)`, //yelo
    `hsla(309, 45%, 50%, 1)`, //purp
    `hsla(309, 45%, 50%, 0.5)`, //light purp
    `hsla(285, 39%, 49%, 1)`, //deep purple
    `hsla(285, 39%, 49%, 0.5)`, //light deep purple
    `hsla(76, 56%, 47%, 1)`, // header green
    `hsla(76, 56%, 47%, 0.5)`, // light header green
  ];

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
      <h3>Fees Charged by agency</h3>
      <p>
        Most agencies have not charged fees for their requests and it is not
        clear how the fees are calculated when there is a required payment.
      </p>
      <div className="graph">
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
          colors={feeColors.reverse()}
          tooltip={node => (
            <span>
                {node.data.label}: {new Intl.NumberFormat(navigator.language, {style: "currency", currency: "USD"}).format(node.data.value)}
            </span>
          )}
          labelSkipRadius={44}
        />
      </div>
    </div>
  );
};

export default FoiaFeeBubbleGraph;