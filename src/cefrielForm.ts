import { LitElement, css, html, type PropertyValueMap } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import '@hydrofoil/shaperone-wc/shaperone-form'
import { dataset, blankNode } from '@rdf-esm/dataset'
import { ns } from './namespaces'
import { turtle } from '@tpluscode/rdf-string'
import type { ShaperoneForm } from '@hydrofoil/shaperone-wc';
import clownface, { AnyPointer, GraphPointer, AnyContext } from 'clownface'
import type DatasetExt from 'rdf-ext/lib/Dataset';
import NamedNode from 'rdf-ext/lib/NamedNode';
import rdfFetch from '@rdfjs/fetch'
// import type { component, editor, rendere } from '@hydrofoil/shaperone-wc/configure' 
import { components, editors, renderer, validation } from '@hydrofoil/shaperone-wc/configure' 
import { nestedForm } from './InlineNestedShapes'
import { myTemplate } from './myTemplates'
import { literal, namedNode } from '@rdf-esm/data-model';
import { repeat } from 'lit/directives/repeat.js';
import { xsd } from '@tpluscode/rdf-ns-builders';
import { getType } from '@hydrofoil/shaperone-wc/components/lib/textFieldType';
import { validity } from '@hydrofoil/shaperone-wc/components/validity';
import { readOnly } from '@hydrofoil/shaperone-wc/components/readonly';
import { validate } from '@hydrofoil/shaperone-rdf-validate-shacl'

@customElement('custom-f')
export class SimpleGreeting extends LitElement {

  static styles = css`
    :host {
      color: black;
    }
    shaperone-form::part(invalid) {
      border-color: red;
    }
  `;

  @property({ type: Object })
  resource?: AnyPointer = this.defaultResource();

  @property()
  headerShape!: AnyPointer;

  @property()
  bodyShape!: any;
  
  // DEFAULTED CONFIGS 
  @property({reflect: true})
  readonly: boolean = false;
  @property()
  instancesURL: string[] = [];
  @property()
  propConflictStrategy: string = "keep-header"; // ignore
  // END DEFAULTED CONFIGS 

  @query('#header-form')
  headerForm!: ShaperoneForm

  @query('#body-form')
  bodyForm!: ShaperoneForm

  protected shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
    // avoid rendering the component if props are not available
    return this.bodyShape !== null && this.headerShape !== null
    // return true
  }

  protected async willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
    // const nestingComponents = await import('./InlineNestedShapes')
    // editors.decorate(instancesSelector.matcher)
    // components.decorate(instancesSelector.decorator({ client: Hydra }))
    console.log("resource", this.resource);
    
    components.pushComponents({nestedForm})
    renderer.setTemplates(myTemplate)
    validation.setValidator(validate)


  // TODO IMPLEMENT SOMETHING THAT RENDERS A TEXT FIELD
  // LOOK AT TODO_STYLE IN DOCUMENT TESI

  // OLD CODE BELOW
//   textField: function ({ property, value }, { update }) {
//     var _a;
//     console.log("THIS IS WORKING 9999999999999999999999999%");
//     return html `
//         <style>
//             input {
//                 background-color: orange;
//             }
//         </style>
//         <input 
//             .value="${((_a = value.object) === null || _a === void 0 ? void 0 : _a.value) || ''}"
//                 type="${getType(property.datatype)}"
//                 ${validity(value)}
//                 ${readOnly(property)}
//                 @blur="${(e) => update(e.target.value)}">`;
// }


    console.log("components: ", components);
    
    if(this.readonly) {
      this.makeAllPropertiesReadonly();
    }
    this.instancesURL.forEach(async url => {
      const res = await rdfFetch(url)
      // const streamm = res.quadStream().
      const dd = await res.dataset()
      console.log("fetched rdf response: ", res);

      for (const quad of dd) {
        //console.log("adding quad: ", quad);
        this.headerShape.dataset.add(quad)
        // TODO add ody
        // this.headerShape.dataset.add(quad)
      } 
      console.log("this.headerShape: ", this.headerShape);
      
    });

    this.detectPropConflict()
    

  }

  private makeAllPropertiesReadonly() {
    console.log("makeAllPropertiesReadonly");
    
    this.headerShape
      .out(ns.sh.property)
      .addOut(ns.dash.readOnly, true)

   this.bodyShape
      .out(ns.sh.property)
      .addOut(ns.dash.readOnly, true)
  }
  // Render the UI as a function of component state
  render() {
    
    return html`
    <style></style>
       
      <shaperone-form
        .id=${'header-form'}
        .shapes=${this.headerShape}
        .resource=${this.resource}
      ></shaperone-form>

      <shaperone-form
        .id=${'body-form'}
        .shapes=${this.bodyShape}
        .resource=${this.resource}
      ></shaperone-form>
    
      <button
        @click="${this.produceOutput}">Submit
      </button>
    
    `;
  }

  produceOutput() {
    // this.headerForm.validate()
    console.log("this.headerForm.isValid", this.headerForm.isValid)
    console.log("this.headerForm.validationResults", this.headerForm.validationResults)
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
      .out(ns.sh.path)
      .values)

    let bodyPropNames = new Set(this.bodyShape
      .out(ns.sh.property)
      .out(ns.sh.path)
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

  private defaultResource() : AnyPointer {
    let result = clownface({dataset: dataset()})
    .namedNode(ns.cfrl.newResource.value.toString() + "/" + Math.floor(Math.random() * 999999))

    return result
  }

}
// customElements.define('simple-greeting', SimpleGreeting);