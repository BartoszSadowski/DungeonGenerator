import DungeonEvent from '../app/events/dungeonEvent';
import { eventEl } from '../data/configData';

const generateArticle = (event: DungeonEvent) => `
<article class="event-list__event">
    Event nr: ${event.variant + 1}
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
