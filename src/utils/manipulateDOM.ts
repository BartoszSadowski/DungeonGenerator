import DungeonEvent from '../app/events/dungeonEvent';
import { eventEl } from '../data/configData';
import { EventTypes } from './dictionary';

const generateGenericEvent = (event: DungeonEvent) => `
    <h3>${event.variant + 1}. ${event.name}</h3>
    <div>
        Description: ...
    </div>
`;

const generateEnemyEvent = (event: DungeonEvent) => `
<h3>${event.variant + 1}. ${event.name}</h3>
<div>
    Strength: ${event.strength}, 
    HP: ${event.health}
    Description: ...
</div>
`;

const generateArticle = (event: DungeonEvent) => `
<article class="event-list__event">
    ${event.type === EventTypes.Enemy
        ? generateEnemyEvent(event)
        : generateGenericEvent(event)}
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
