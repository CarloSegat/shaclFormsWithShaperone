import type { SingleEditorComponent } from '@hydrofoil/shaperone-wc'
import { html } from '@hydrofoil/shaperone-wc'
import { dash } from '@tpluscode/rdf-ns-builders'
import type { GraphPointer } from 'clownface'
import type { FocusNode } from '@hydrofoil/shaperone-core'

function isFocusNode(value?: GraphPointer): value is FocusNode {
  return value?.term.termType === 'NamedNode' || value?.term.termType === 'BlankNode'
}

export const nestedForm: SingleEditorComponent = {
  editor: dash.DetailsEditor,

  render({ value, renderer, property: { shape: { node } } }) {
    const focusNode = value.object

    if (isFocusNode(focusNode)) {
      return html`<div class="nestedContainer">
      <style>
        .nestedContainer {
          border: darkgray;
          border-style: inset;
          padding: 1rem;
        }
      </style>
        ${renderer.renderFocusNode({ focusNode, shape: node })}
      </div>`
    }

    return html`Something went wrong with custom nested shape component`
  },
}   

