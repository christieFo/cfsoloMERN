import React from 'react';

import '../styles/main.css';

// import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
// import CardUI from '../components/CardUI';
// import EnemyHealth from '../components/EnemyHealth'
import Health from '../components/Health';
import TextBox from '../components/TextBox';

const TextPage = () =>
{
    // var health = 100;
    // var enemyHealth = 200;
    // myHandler={()=> setHealth(100)}
    var maxHealth = 100;
    const [health, setHealth] = React.useState(100);
    const [maxEnemyHealth, setMaxEnemy] = React.useState(200);
    const [enemyHealth, setEnemyHealth] = React.useState(maxEnemyHealth);
    
    return(
        <div>
             <LoggedInName />
            <Health health={health} maxHealth={maxHealth} enemyHealth={enemyHealth} maxEnemyHealth={maxEnemyHealth}/>
            <TextBox health={health} setHealth={setHealth} maxHealth={maxHealth} enemyHealth={enemyHealth} setEnemyHealth={setEnemyHealth} maxEnemyHealth={maxEnemyHealth} setMaxEnemy={setMaxEnemy}/>
        </div>
    );
}

export default TextPage;
