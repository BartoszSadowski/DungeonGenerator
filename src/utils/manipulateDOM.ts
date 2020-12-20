import DungeonEvent from '../app/events/dungeonEvent';
import EnemyEvent from '../app/events/enemyEvent';
import ItemEvent from '../app/events/itemEvent';
import GenericEvent from '../app/events/genericEvent';
import { eventEl } from '../data/configData';
import { EventTypes } from './dictionary';

const generateGenericEvent = (event: GenericEvent) => `
<h3>${event.variant + 1}. ${event.name}</h3>
<div>
    Description: ${event.description}
</div>
`;

const generateEnemyEvent = (event: EnemyEvent) => `
<h3>${event.variant + 1}. ${event.name}</h3>
Strength: ${event.strength}, 
HP: ${event.health}
<div>
    Description: ${event.description}
</div>
`;

const generateItemEvent = (event: ItemEvent) => `
<h3>${event.variant + 1}. ${event.name} +${event.modifier}</h3>
Value: ${event.value}
<div>
    Description: ${event.description}
</div>
`;

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
