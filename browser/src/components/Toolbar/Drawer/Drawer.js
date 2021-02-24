import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";

const Drawer = (props) => {
  let attachedClasses = ["drawer"];
  if (props.open) {
    attachedClasses = ["drawer", "open"];
  } else {
    attachedClasses = ["drawer", "closed"];
  }

  return (
    <>
      <div
        className={attachedClasses.join(" ")}
        onClick={() => props.closeMenu()}
      >
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default Drawer;
