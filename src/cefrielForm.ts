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
import NamedNode from 'rdf-ext/lib/NamedNode';

@customElement('custom-f')
export class SimpleGreeting extends LitElement {

  static styles = css`
    :host {
      color: black;
    }
  `;

  @property({ type: Object })
  resource?: AnyPointer

  @property()
  headerShape!: any;

  @property()
  bodyShape!: any;

  @property()
  readonly: boolean = false;

  @property()
  iriNewResource: any = new NamedNode(ns.cfrl.newResource.value.toString() + "/" + Math.floor(Math.random() * 999999));

  @state()
  renderMode?: string

  @state()
  h?: AnyPointer

  @state()
  b?: AnyPointer

  @query('#header-form')
  headerForm!: ShaperoneForm

  @query('#body-form')
  bodyForm!: ShaperoneForm

  private determineRenderMode(){
  
    if(this.resource === null) {
      this.renderMode = "create"
    } else {
      if(this.readonly){
        this.renderMode = "view"
      } else {
        this.renderMode = "edit"
      }
    }
  }

  protected shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
    // avoid rendering the component if props are not available
    return this.bodyShape !== null && this.headerShape !== null
    // return true
  }

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if(! this.resource) {
      // create empty resource
      this.resource = clownface({dataset: dataset(), })
      .namedNode(ns.cfrl.test121346789)
      this.resource
        .addOut(ns.cfrl.body, this.resource.blankNode())
        .addOut(ns.cfrl.header,  this.resource.blankNode())
    }
    this.b = this.resource?.out(ns.cfrl.body)
    this.h = this.resource?.out(ns.cfrl.header)
    // let headerResource = clownface({ dataset: $rdf.dataset() })
    // let bodyResource = clownface({ dataset: $rdf.dataset() })
  }
  // Render the UI as a function of component state
  render() {
    
    console.log("> body ", this.bodyShape);
    console.log("> header ", this.headerShape);
    //this.printRDF(this.bodyShape, "bodyy shapee:")
    
    return html`

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
      @click="${this.produceOutput}">Submit
    </button>
    `;
  }

  produceOutput() {
    this.printRDF(this.resource, "resource")
    const event = new CustomEvent('cefriel-form-submitted', {
      detail: {
        data: turtle`${this.resource?.dataset}`.toString()
      }
    });
    this.dispatchEvent(event);
  }

  private printRDF(temp, ...args: String[]) {
    console.log(args[0], turtle`${temp?.dataset}`.toString());
  }
}
// customElements.define('simple-greeting', SimpleGreeting);