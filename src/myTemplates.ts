/**
 * @packageDocumentation
 * @module @hydrofoil/shaperone-wc/templates
 */
import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { sh } from '@tpluscode/rdf-ns-builders/strict';
import { taggedLiteral } from '@rdfjs-elements/lit-helpers/taggedLiteral.js';
export * from '@hydrofoil/shaperone-wc/renderer/decorator';
/**
 * Default implementation of {@link RenderTemplates} which outputs native HTML elements
 */
export const myTemplate = {
   
    editor: {
        notFound: () => html`No editor found for property :(`,
    },
    component: {
        notFound(editor) {
            var _a;
            const { editors } = this.context;
            return html`No component found for ${taggedLiteral((_a = editors.allEditors[editor.value]) === null || _a === void 0 ? void 0 : _a.meta, { fallback: editor.value })}`;
        },
        loading() {
            return html`Loading editor . . .`;
        },
        loadingFailed() {
            return html`Failed to load editor . . .`;
        },
        initializing() {
            return html`Initialising component . . .`;
        },
    },
    form(renderer) {
        const { focusStack } = renderer.context.state;
        const focusNode = focusStack[focusStack.length - 1];
        if (!focusNode) {
            return html``;
        }
        return renderer.renderFocusNode({ focusNode });
    },
    focusNode(renderer, { focusNode }) {
        return html`
        <form>
            <div class="fieldset" part="focus-node">
                ${repeat(focusNode.groups, group => renderer.renderGroup({ group }))}
            </div>
        </form>`;
    },
    group(renderer, { properties }) {
        const { actions } = renderer
        return html`
        <div>
            ${repeat(properties, property => renderer.renderProperty({ property }))}
        </div>
        `;
    },
    property(renderer, { property }) {
        let rendererProperty = renderer.property;
        // the second property contains children
        // render property is like "this property"
        const { actions } = renderer

        const addRow = !property.selectedEditor && property.canAdd
            ? html`<div>
                    <button 
                    style='margin-top: 1rem'
                        @click="${(e) => {
                            e.preventDefault();
                            actions.addObject()
                        }}" title="Add value">
                        Add ${property.name}
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
                margin-top: 0.5rem;
                display: flex;
            }
        </style>
        <div 
            class="field"
            part="${property.hasErrors ? 'invalid' : ''}"
        >
            <label for="${property.shape.id.value}" style='margin-right: 1rem'>
                ${taggedLiteral(property.shape, { property: sh.name })}
            </label>
            ${renderer.renderObject({ object })}
            
        </div>`)}`;
    },
    object(renderer, param) {
        const { object } = param
        const { actions, property } = renderer
         
        let canREmove = renderer.property && actions.remove && renderer.property.canRemove;
        const removeRow = canREmove ? html`
            <button 
                @click="${(e) => {
                e.preventDefault();
                actions.remove()
            }}" 
                title="Remove value">
                Remove (obj)
            </button>
        `
            : html``
        return html`
        <div>
            ${renderer.renderEditor()}
            ${removeRow}
        </div>
        `;
    },
    initialising: () => html`Initialising form`,
};
//# sourceMappingURL=templates.js.map