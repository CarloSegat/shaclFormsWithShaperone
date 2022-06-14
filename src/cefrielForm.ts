import { LitElement, css, html, type PropertyValueMap } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import '@hydrofoil/shaperone-wc/shaperone-form'
import $rdf from 'rdf-ext'
import { dataset, blankNode } from '@rdf-esm/dataset'
import { sh, rdf } from '@tpluscode/rdf-ns-builders'
import { fetchRDFWithURL, generateQuads } from './quadsGenerator'
import { ns } from './namespaces'
import { turtle } from '@tpluscode/rdf-string'
import type { ShaperoneForm } from '@hydrofoil/shaperone-wc';
import clownface, { AnyPointer, GraphPointer, AnyContext } from 'clownface'
import type DatasetExt from 'rdf-ext/lib/Dataset';
import NamedNode from 'rdf-ext/lib/NamedNode';
import { xsd, schema }from '@tpluscode/rdf-ns-builders';
import rdfFetch from '@rdfjs/fetch'


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
  headerShape!: AnyPointer;

  @property()
  bodyShape!: any;
  
  // DEFAULTED CONFIGS 
  @property()
  readonly: boolean = false;
  @property()
  instancesURL: string[] = [];
  @property()
  propConflictStrategy: string = "keep-header"; // ignore
  // END DEFAULTED CONFIGS 

  @property() // TODO: JUST CREATE A NAMEDnODE WHEN INITIALISING
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

  protected shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
    // avoid rendering the component if props are not available
    return this.bodyShape !== null && this.headerShape !== null
    // return true
  }

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.instancesURL.forEach(async url => {
      const res = await rdfFetch(url)
      // const streamm = res.quadStream().
      const dd = await res.dataset()
      console.log("fetched rdf response: ", res);

      for (const quad of dd) {
        console.log("adding quad: ", quad);
        
        this.headerShape.dataset.add(quad)
      } 
      console.log("this.headerShape: ", this.headerShape);
      
    });
    if(! this.resource) { // TODO better default for resource
      // create empty resource
      this.resource = clownface({dataset: dataset(), })
      .namedNode(ns.cfrl.test121346789)
      this.resource
        .addOut(ns.cfrl.body, this.resource.blankNode())
        .addOut(ns.cfrl.header,  this.resource.blankNode())
    }

    this.b = this.resource?.out(ns.cfrl.body)
    this.h = this.resource?.out(ns.cfrl.header)

    this.detectPropConflict()

  }
  // Render the UI as a function of component state
  render() {
    
    // console.log("> body ", this.bodyShape);
    // console.log("> header ", this.headerShape);
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

  private detectPropConflict() {

    let headerPropNames = new Set(this.headerShape
      .out(ns.sh.property)
      .out(ns.sh.name)
      .values)

    let bodyPropNames = new Set(this.bodyShape
      .out(ns.sh.property)
      .out(ns.sh.name)
      .values)

    let duplicateProps = new Set([...headerPropNames].filter(i => bodyPropNames.has(i)));

    if(duplicateProps.size == 0 || this.propConflictStrategy == 'ignore') return;

    if(this.propConflictStrategy == 'keep-header') {
      duplicateProps.forEach(p => {
        let what = this.headerShape
        .out(ns.sh.property)
        .has(ns.sh.name, p)
        console.log("what", what);
        this.bodyShape = this.bodyShape.deleteOut(ns.sh.property, what)
      });
    } else {
      console.error("Invalid propConflictStrategy")
    }
  }

}
// customElements.define('simple-greeting', SimpleGreeting);