import { LitElement, css, html, type PropertyValueMap } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import '@hydrofoil/shaperone-wc/shaperone-form'
import { dataset, blankNode } from '@rdf-esm/dataset'
import { ns } from './namespaces'
import { turtle } from '@tpluscode/rdf-string'
import type { ShaperoneForm } from '@hydrofoil/shaperone-wc';
import type { NamespaceBuilder } from '@rdfjs/namespace';
import clownface, { AnyPointer, GraphPointer, AnyContext } from 'clownface'
import type DatasetExt from 'rdf-ext/lib/Dataset';
import type NamedNode from 'rdf-js';
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
export class SemanticForm extends LitElement {

  static styles = css`
    :host {
      color: black;
    }
    shaperone-form::part(invalid) {
      border-style: groove;
      border-block-width: 0.1rem;
      border-color: #ff7575;
    }
  `;

  @property()
  headerShape!: AnyPointer;

  @property()
  bodyShape?: any;
  
  // DEFAULTED CONFIGS 
  @property({reflect: true})
  readonly: boolean = false;
  @property()
  instancesURL: string[] = [];
  @property()
  propConflictStrategy: string = "keep-header"; // ignore
  @property()
  resourceURI: NamedNode.NamedNode<string> = ns.cfrl.newResource;
  @property({ type: Object })
  resource?: AnyPointer;
  // END DEFAULTED CONFIGS 

  @query('#header-form')
  headerForm!: ShaperoneForm

  @query('#body-form')
  bodyForm!: ShaperoneForm

  protected shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
    // avoid rendering the component if props are not available
    return this.headerShape !== null
  }

  protected async willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {

    if(!this.resource){
      this.resource = this.defaultResource();
    }
    
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


    // console.log("components: ", components);
    if(this.readonly) {
      this.makeAllPropertiesReadonly();
    }
    this.fetchExtraResources();
    this.detectPropConflict();
    // this.headerShape
    //   .out(ns.sh.property)
    //   .has(ns.sh.path, ns.rdf.type)
  }

  private fetchExtraResources() {
    this.instancesURL.forEach(async (url) => {
      const res = await rdfFetch(url);
      const dd = await res.dataset();
      for (const quad of dd) {
        // the fetched resources are added to:
        // - header and body to make instanceSelector work
        // - resource so that it passs the SHACL validation
        // TODO adding all the fetched RDF to the resource is not
        // efficient, instead a triple should be added only when the used
        // picks an item from the dropdown
        this.headerShape.dataset.add(quad);
        this.bodyShape?.dataset.add(quad);
        this.resource?.dataset.add(quad);
      }
    });
  }

  private makeAllPropertiesReadonly() {
    // console.log("makeAllPropertiesReadonly");
    
    this.headerShape
      .out(ns.sh.property)
      .addOut(ns.dash.readOnly, true)

   this.bodyShape?.out(ns.sh.property)
      .addOut(ns.dash.readOnly, true)
  }
  // Render the UI as a function of component state
  render() {
    
    let body = this.bodyShape !== null ? 
    html`<shaperone-form
      .id=${'body-form'}
      .shapes=${this.bodyShape}
      .resource=${this.resource}>
    </shaperone-form>` 
    : html``

    return html`
    <style></style>
       
      <shaperone-form
        .id=${'header-form'}
        .shapes=${this.headerShape}
        .resource=${this.resource}
        @changed=${this.changeCallback}
      ></shaperone-form>

      ${body}
      <br>
      <button
        @click="${this.submitCallback}">Submit
      </button>
    
    `;
  }

  submitCallback() {
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

    if(this.propConflictStrategy == 'ignore') return;
    if(!this.bodyShape) return ;
    console.log("🚀 . SemanticForm . detectPropConflict . this.bodyShape", this.bodyShape)

    if(this.propConflictStrategy == 'keep-header') {
      // simply remove all the properties present in the header from the body
      this.bodyShape = this.bodyShape
        .deleteOut(ns.sh.property, this.headerShape.out(ns.sh.property))
    } else {
      console.error("Invalid propConflictStrategy")
    }
  }

  private changeCallback(){
    let quadsWhereObjectIsEmptyString = this.resource?.dataset.match(null, null, literal(''))
    let resourceWithoutEmptyStrings = this.resource?.dataset;
    quadsWhereObjectIsEmptyString.quads.forEach(q => {
      resourceWithoutEmptyStrings.delete(q)
    });
  }
      
  private defaultResource() : AnyPointer {
    // notice that the resource needs to be of both types expected by the
    // header and body sape for validation to target it correctly
    const typeExpectedByHeader = this.headerShape.out(ns.sh.targetClass)
    const typeExpectedByBody = this.bodyShape?.out(ns.sh.targetClass)
    
    let result = clownface({dataset: dataset()})
      .namedNode(this.resourceURI.value.toString() + "/" + Math.floor(Math.random() * 999999))
      .addOut(ns.rdf.type, typeExpectedByHeader)

    if(typeExpectedByBody){
      result.addOut(ns.rdf.type, typeExpectedByBody);
    }
    return result
  }

}