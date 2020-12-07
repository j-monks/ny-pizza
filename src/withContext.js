import React from "react";
import Context from "./Context";

// making a high order component that is wrapping components that use the context data & methods
const withContext = WrappedComponent => {
    const WithHOC = props => {
        return (
            <Context.Consumer>
                {context => <WrappedComponent {...props} context={context} />}
            </Context.Consumer>
        );
    };

    return WithHOC;
};

export default withContext;
