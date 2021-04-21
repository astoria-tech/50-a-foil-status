import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import FoiaStatus from '../../../utils/FoiaStatus';


const FoiaStatusSankeyGraph = (props) => {
  // Because sankey doesn't support cyclical orders, gotta enforce the order
  const sankeyOrderedStatuses = [
    FoiaStatus.Ack,
    FoiaStatus.Processed,
    FoiaStatus.Fix,
    FoiaStatus.Payment,
    FoiaStatus.Partial,
    FoiaStatus.Appealing,
    FoiaStatus.Lawsuit,
    FoiaStatus.NoDocs,
    FoiaStatus.Rejected,
    FoiaStatus.Abandoned,
    FoiaStatus.Done,
  ];

  const communicationHistory = new Map();

  props.data.foiaList.forEach((item) => {
    // Though statuses often repeat in the data, Sankey can't support cyclical references, so we have to stick with unique changes
    const itemStatusSet = new Set();
    itemStatusSet.add(FoiaStatus.Ack);

    // Add status from each communication
    item.foiaReq.communications.forEach((communication) => {
      if (communication.status) {
        const foiaStatus = FoiaStatus.parse(communication.status);
        if (sankeyOrderedStatuses.includes(foiaStatus)) {
          itemStatusSet.add(foiaStatus);
        }
      }
    });

    // Add current status
    // todo filter on sankey
    itemStatusSet.add(FoiaStatus.parse(item.foiaReq.status));
    const itemStatusList = Array.from(itemStatusSet);
    
    let prevIndex = 0;
    let nextIndex = 1;
    while (nextIndex < itemStatusSet.size) {
      // No backwards references allowed
      if (sankeyOrderedStatuses.indexOf(itemStatusList[prevIndex]) < sankeyOrderedStatuses.indexOf(itemStatusList[nextIndex])) {
        const statusLink = `${itemStatusList[prevIndex].value}|${itemStatusList[nextIndex].value}`;

        communicationHistory.has(statusLink) ? communicationHistory.set(statusLink, communicationHistory.get(statusLink) + 1) : communicationHistory.set(statusLink, 1);
      }
      prevIndex++;
      nextIndex++;
    }
  });

  const extractLinks = (history) => {
    return Array.from(history).map((statusLink) => {
      const statuses = statusLink[0].split('|');
      return {
        source: statuses[0],
        target: statuses[1],
        value: statusLink[1],
      };
    });
  };

  // TODO: Figure out labels
  const statusHistory = {
    nodes: sankeyOrderedStatuses.map(status => { return { id: status.value } }),
    links: extractLinks(communicationHistory),
  };

  return (
    <div className="sankey">
      <div className="graph">
        <ResponsiveSankey
          data={statusHistory}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          align="justify"
          layout="vertical"
          sort="input"
          colors={{ scheme: 'nivo' }}
          nodeOpacity={1}
          nodeThickness={18}
          nodeInnerPadding={3}
          nodeSpacing={24}
          nodeBorderWidth={0}
          nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
          linkOpacity={0.5}
          linkHoverOthersOpacity={0.1}
          enableLinkGradient={true}
          labelPosition="outside"
          labelOrientation="vertical"
          labelPadding={16}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        />
      </div>
    </div>
  );
};

export default FoiaStatusSankeyGraph;