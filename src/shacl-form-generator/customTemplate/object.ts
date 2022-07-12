import { html, css } from 'lit';
export * from '@hydrofoil/shaperone-wc/renderer/decorator';
import { trash } from '../assets/icons/icons'

export function object(renderer, param) {
    const { object } = param
    const { actions, property } = renderer
     
    let canRemove = renderer.property && actions.remove && renderer.property.canRemove;

    const removeButton = canRemove ? html`
        <button 
            style='
                margin-left: 0.5rem;
                background-color: transparent;
                border: none;
                height: 2rem;
                width: 2rem;'
            @click="${(e) => {
            e.preventDefault();
            actions.remove()
        }}" 
            title="Remove value">
           ${trash}
        </button>
    `
        : html``

    return html`
        <div style='display: flex; align-items: start;'>
            ${renderer.renderEditor()}
            ${removeButton}
        </div>
    `;
}