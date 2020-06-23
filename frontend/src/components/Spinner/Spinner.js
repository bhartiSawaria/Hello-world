
import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const spinner = (props) => {
    return (
        <Dimmer active>
            <Loader size='huge' content="Loading"/>
        </Dimmer>
    );
}

export default spinner;