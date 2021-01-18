/// <reference path='../main.d.ts'/>

import DungeonEvent from '../app/events/dungeonEvent';
import EnemyEvent from '../app/events/enemyEvent';
import ItemEvent from '../app/events/itemEvent';
import GenericEvent from '../app/events/genericEvent';
import { eventEl } from '../data/configData';
import { EventTypes } from './dictionary';

import chest from '../imgs/chest.png';
import sword from '../imgs/sword.png';
import dice from '../imgs/dice.png';

/* eslint-disable */
const generateGenericEvent = (event: GenericEvent) => `
<h3 class="event__title">
    <img src=${dice} alt="random"> ${event.variant + 1}. ${event.name}
</h3>
<div class="event__description">
    <span class="bold">Description:</span> ${event.description}
</div>
`;

const generateEnemyEvent = (event: EnemyEvent) => `
<h3 class="event__title">
    <img src=${sword} alt="enemy"> ${event.variant + 1}. ${event.name}
</h3>
<div class="event__description">
    <div class="event__stats">
        <span class="bold">Strength:</span> ${event.strength}, 
        <span class="bold">HP:</span> ${event.health}
    </div>
    Description: ${event.description}
</div>
`;

const generateItemEvent = (event: ItemEvent) => `
<h3 class="event__title">
    <img src=${chest} alt="item"> ${event.variant + 1}. ${event.name} +${event.modifier}
</h3>
<div class="event__description">
    <div class="event__stats">
        <span class="bold">Value:</span> ${event.value}
    </div>
    Description: ${event.description}
</div>
`;

/* eslint-enable */

const generateArticle = (event: DungeonEvent) => `
<article class="event-list__event">
    ${
    // eslint-disable-next-line no-nested-ternary
    event.type === EventTypes.Enemy
        ? generateEnemyEvent(event as EnemyEvent)
        : event.type === EventTypes.Item
            ? generateItemEvent(event as ItemEvent)
            : generateGenericEvent(event as GenericEvent)}
</article>
`;

export function generateEvents(events: DungeonEvent[]) {
    eventEl.innerHTML = events
        .reduce((HTML: string, event: DungeonEvent) => `
        ${HTML}
        ${generateArticle(event)}
        `, '');
}

export function clearEvens() {
    eventEl.innerHTML = '';
}
