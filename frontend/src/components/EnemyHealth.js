import React from 'react';
// import React, { useState } from 'react';

function EnemyHealth(){

    var health = 20;
    var maxHealth = 200;
    // health.value =- 5;

    return (
        //default value 100
        <progress id="Ehealth" value= {health} max = {maxHealth} >{health}/{maxHealth}</progress>
    );
}

export default EnemyHealth;