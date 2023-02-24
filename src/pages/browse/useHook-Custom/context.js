import React from "react";

// Biến định dạng và chứa giá trị ban đầu của context hook
const Authcontext = React.createContext({
  MovieCTX: {},
  onShow: (item) => {},
  onHide: () => {},
  onReceive: (data) => {},
});

export default Authcontext;

/* <Authcontext.Provider
    value = {
        isLogout: false;
    }
    > 
Code Data
 </Authcontext.Provider>
 */
