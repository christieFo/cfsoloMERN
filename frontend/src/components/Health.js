// import React from 'react';
import React, { useState } from 'react';

function Health(){

    var health = 100;
    var maxHealth = 100;
    // health.value =- 5;

    return (
        //default value 100
        <progress id="health" value= {health} max ={maxHealth} >{health}/{maxHealth}</progress>
    );
}

export default Health;