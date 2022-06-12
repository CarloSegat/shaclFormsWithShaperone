import { LitElement, css, html, type PropertyValueMap } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import '@hydrofoil/shaperone-wc/shaperone-form'
import $rdf from 'rdf-ext'
import { dataset, blankNode } from '@rdf-esm/dataset'
import { sh, rdf } from '@tpluscode/rdf-ns-builders'
import { generateQuads } from './quadsGenerator'
import { ns } from './namespaces'
import { turtle } from '@tpluscode/rdf-string'
import type { ShaperoneForm } from '@hydrofoil/shaperone-wc';
import clownface, { AnyPointer, GraphPointer, AnyContext } from 'clownface'
import type DatasetExt from 'rdf-ext/lib/Dataset';

@customElement('custom-f')
export class SimpleGreeting extends LitElement {

  static styles = css`
    :host {
      color: blue;
    }
  `;

  @property({ type: Object })
  resource!: AnyPointer<AnyContext, DatasetExt>

  @property()
  headerShape?: any;

  @property()
  bodyShape?: any;

  @query('#header-form')
  headerForm!: ShaperoneForm

  @query('#body-form')
  bodyForm!: ShaperoneForm

  @state()
  h?: AnyPointer<AnyContext, DatasetExt>

  @state()
  b?: AnyPointer<AnyContext, DatasetExt>

  protected shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
    // avoid rendering the component if props are not available
    return this.resource !== null && this.bodyShape !== null && this.headerShape !== null
    // return true
  }

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.b = this.resource?.out(ns.cfrl.body)
    this.h = this.resource?.out(ns.cfrl.header)
    // let headerResource = clownface({ dataset: $rdf.dataset() })
    // let bodyResource = clownface({ dataset: $rdf.dataset() })

    // this.printRDF(h, "header: ")
    // this.printRDF(b, "body: ")
  }
  // Render the UI as a function of component state
  render() {
    
    console.log("<<body ", this.bodyShape);
    console.log("header ", this.headerShape);
    this.printRDF(this.bodyShape, "bodyy shapee:")
    
    return html`
    <p>This is the form, actaully the header is one form and the body is another</p>

    <shaperone-form
      id="header-form"
      .shapes=${this.headerShape}
      .resource=${this.h}
    ></shaperone-form>

    <shaperone-form
      id="body-form"
      .shapes=${this.bodyShape}
      .resource=${this.b}
    ></shaperone-form>
    
    <button
      @click="${this.produceOutput}">Submit</button>
    `;
  }

  produceOutput() {
    // let ptr = clownface({ dataset: $rdf.dataset() })
    // this.resource.namedNode("http://")
    const body = clownface({ dataset: this.bodyForm.resource?.dataset })
    const header = clownface({ dataset: this.headerForm.resource?.dataset })
    // this.resource.addOut(BODY_IRI, body)
    // this.resource.addOut("http://test/header", header)
    this.printRDF(body, "in theory everything: ")
    // this.printRDF(header, "header: ")
  }

  private printRDF(temp, ...args: String[]) {
    console.log(args[0], turtle`${temp?.dataset}`.toString());
  }
}
// customElements.define('simple-greeting', SimpleGreeting);