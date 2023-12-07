// import React from 'react';
import React, { useState, useEffect } from 'react';
//import EnemyHealth from './EnemyHealth';

function Health({health, maxHealth, enemyHealth, maxEnemyHealth}){//

    // var health = 100;
    var maxHealth = 100;
    
    // const [health, setHealth] = React.useState(100);
    
    // function handleHealth({setHealth}, event){
    //     event.preventDefault();
        // const health = event.target.elements.health.value;
        
        
    // }
    const shake = (e) => {
        // shake element when hit
    }

    return (
        <div>
            {enemyHealth}/{maxEnemyHealth}<br />
            <progress id="Ehealth" value= {enemyHealth} max = {maxEnemyHealth} 
            onChange={shake}></progress> <br />
            {/* default max 100 */}
            <progress id="health" value= {health} max ={maxHealth} ></progress><br />
            {health}/{maxHealth}
        </div>
        
    );
}

export default Health;