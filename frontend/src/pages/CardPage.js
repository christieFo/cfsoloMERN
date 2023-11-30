import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';
import EnemyHealth from '../components/EnemyHealth'
import Health from '../components/Health';
import TextBox from '../components/TextBox';

const CardPage = () =>
{
    return(
        <div>
            {/* <PageTitle /> */}
            <EnemyHealth /><br />
            <Health />
            <LoggedInName />
            {/* <CardUI /> */}
            <TextBox />
        </div>
    );
}

export default CardPage;
