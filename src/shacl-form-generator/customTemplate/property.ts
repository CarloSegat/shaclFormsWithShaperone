import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { sh } from '@tpluscode/rdf-ns-builders/strict';
import { taggedLiteral } from '@rdfjs-elements/lit-helpers/taggedLiteral.js';
export * from '@hydrofoil/shaperone-wc/renderer/decorator';
import { ns } from '../namespaces';
import { plusIcon } from '../assets/icons/icons'
import { alignItemsVerticalCenter, noBorders } from '../assets/style';

export function property(renderer, { property }) {
        
    const { actions } = renderer
    const shapeNode = getThisShape();

    let asterisk = generateHTMLAsteriskForMandatoryProp();
    
    let validationMessageHTML = generateHTMLValidationMessage();


    const addRow = !property.selectedEditor && property.canAdd
        ? html`<div>
                <button 
                    class='alignItemsVerticalCenter noBorders'
                    style='margin-bottom: -1.5rem;'
                    @click="${(e) => {
                        e.preventDefault();
                        actions.addObject()
                    }}" title="Add value">
                    <div>
                        ${plusIcon} 
                    </div>
                    <div>
                     <span'>Add ${property.name}</span>
                    </div>
                </button>
            </div>`
        : html``

    return html`
    ${alignItemsVerticalCenter}
    ${noBorders}
    ${addRow}
    ${repeat(property.objects, object => html`
        <style>
            select {
                display: inline !important;
                width: 15rem;
                height: 1.35rem;
            }

            .field {
                margin: 1.5rem 0rem;
            }
        </style>
        <div class="field">
       
        <div>
            <div style='margin-bottom: 0.33rem;'>
                <label for="${property.shape.id.value}">
                    ${taggedLiteral(property.shape, { property: sh.name })}
                </label>
                ${asterisk}
                ${validationMessageHTML}
            </div>
            ${renderer.renderObject({ object })}
            
        </div>
    </div>`)}`;

    function generateHTMLValidationMessage() {
        let validationMessageHTML = html``;
        if (property.validationResults.length > 0) {
            const valRes = property.validationResults[0].result.pointer;
            const validationMessage = valRes.has(ns.sh.sourceShape, shapeNode.term).out(ns.sh.resultMessage).value;
            validationMessageHTML = html`<span style='color:var(--error-red);
        ;'>${validationMessage}</span>`;
        }
        return validationMessageHTML;
    }

    function generateHTMLAsteriskForMandatoryProp() {
        const minCount = shapeNode.out(ns.sh.minCount).value;

        let asterisk = minCount === '1' ? html`<span>*&nbsp</span>` : html``;
        return asterisk;
    }

    function getThisShape() {
        const cf = property.shape.pointer;
        const shapeNode = cf.has(ns.sh.name, property.name);
        return shapeNode;
    }
}