/**
 * @packageDocumentation
 * @module @hydrofoil/shaperone-wc/templates
 */
import { html } from 'lit';
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
        console.log("what actions do I have defined? ", actions); // yes
        console.log("what does property contain? ", properties);
        console.log("renderer? ", renderer);
        // console.log(" renderer.Property.canRemove? ",  renderer.Property.canRemove); 
        let canREmove = renderer.property && actions.remove && renderer.property.canRemove;
        const removeRow = canREmove ? html`
        <div>
            <button 
               
                @click="${(e) => {
                e.preventDefault();
                actions.remove()
            }}" 
                title="Remove value">
                Remove
            </button>
        </div>`
            : html``

        return html`
        ${repeat(properties, property => renderer.renderProperty({ property }))}
        ${removeRow}
        `;
    },
    property(renderer, { property }) {
        let rendererProperty = renderer.property;
        // the second property contains children
        // render property is like "this property"
        const { actions } = renderer
        console.log("what actions do I have defined? ", actions); // yes
        console.log("what does property contain? ", property);
        console.log("renderer? ", renderer);

        // TODO the add button should not be repeated for each element added 
        const addRow = !property.selectedEditor && property.canAdd
            ? html`<div>
                    <button @click="${(e) => {
                    e.preventDefault();
                    actions.addObject()
                }}" title="Add value">Add</button>
                </div>`
            : html``

        return html`${repeat(property.objects, object => html`
        <style>
           select {
            display: inline !important;
            width: 15rem;
            height: 1.35rem;
           }
        </style>
        <div class="field">
            <label for="${property.shape.id.value}">${taggedLiteral(property.shape, { property: sh.name })}</label>
            ${addRow}
            ${renderer.renderObject({ object })}
            
        </div>`)}`;
    },
    object(renderer) {
        return html`${renderer.renderEditor()}`
        return html`
        <div>
            ${renderer.renderEditor()}
        </div>
        `;
    },
    initialising: () => html`Initialising form`,
};
//# sourceMappingURL=templates.js.map