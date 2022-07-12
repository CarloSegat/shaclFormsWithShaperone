import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { sh } from '@tpluscode/rdf-ns-builders/strict';
import { taggedLiteral } from '@rdfjs-elements/lit-helpers/taggedLiteral.js';
export * from '@hydrofoil/shaperone-wc/renderer/decorator';
import { ns } from '../namespaces';
import { plusIcon } from '../assets/icons/icons'

export function property(renderer, { property }) {
        
    let rendererProperty = renderer.property;
    const cf = property.shape.pointer;
    const shapeNode = cf.has(ns.sh.name, property.name);
    
    
    // console.log(turtle`${cf.dataset}`.toString());
    const minCount = shapeNode.out(ns.sh.minCount).value; 
   
    let asterisk = minCount === '1' ? html`<span>*&nbsp</span>` : html``
    
    let validationMessageHTML = html``
    if (property.validationResults.length > 0) {
        const valRes = property.validationResults[0].result.pointer;
        const validationMessage = valRes.has(ns.sh.sourceShape, shapeNode.term).out(ns.sh.resultMessage).value;
        validationMessageHTML = html`<span style='color:var(--error-red);
        ;'>${validationMessage}</span>`
    }
    
    
    // the second property contains children
    // render property is like "this property"
    const { actions } = renderer

    let propnameOnButton = html`<span style='position: relative; top: -0.8rem; margin-left: 0.5rem;'>Add ${property.name}</span>` 

    const addRow = !property.selectedEditor && property.canAdd
        ? html`<div>
                <button 
                style=' 
                    background-color: transparent;
                    border: none;
                    border-radius: 100%;
                    '
                    @click="${(e) => {
                        e.preventDefault();
                        actions.addObject()
                    }}" title="Add value">
                    <div>
                        ${plusIcon} ${propnameOnButton}
                    </div>
                </button>
            </div>`
        : html``

    return html`
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
}