import React from 'react';
import ReactDom from 'react-dom';

const logStuffOnLoad = () => {
ReactDom.render(<div>Project - C !!</div>,document.getElementById('app'));
};

logStuffOnLoad();

module.hot.accept(() => {
    logStuffOnLoad();
});	