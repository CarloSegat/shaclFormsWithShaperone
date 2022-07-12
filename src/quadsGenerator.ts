import type Quad from 'rdf-ext/lib/Quad'
import stringToStream from 'string-to-stream'
const { parsers } = await import('@rdfjs-elements/formats-pretty')
import rdfFetch from '@rdfjs/fetch'
import clownface, { AnyPointer, GraphPointer } from 'clownface'
import type { RdfFetchResponse, DatasetResponse } from '@rdfjs/fetch-lite';
import { dataset, DatasetCore } from '@rdfjs/dataset'
import { ns } from './shacl-form-generator/namespaces'

export async function fetchShape(shapeName: string) {
    const res: DatasetResponse<DatasetCore> = await rdfFetch('http://localhost:3001/shape/' + shapeName)
    const dd = await res.dataset()
    console.log("fetched shape: ", dd)
    return clownface({ dataset: dd })
}

// export async function fetchRDFWithURL(url: string) {
//     const res: DatasetResponse<DatasetCore> = await rdfFetch(url)
//     const dd = await res.dataset()
//     console.log("fetched RDF: ", dd)
//     return clownface({ dataset: dd })
// }

async function exampleHowToUseMatch(){
    const res: DatasetResponse<DatasetCore> = await rdfFetch(url)
    const dd = await res.dataset()
    let mmm = dd.match(null, null, ns.sh.NodeShape)
    console.log("444", mmm)
    console.log("555", Array.from(mmm))
    
    
    mmm[Symbol.iterator]()
}

export async function generateQuads(strShapes: string) : Promise<Quad[]> {
    // let strShapes = triples.toString();

    const inputStream = stringToStream(strShapes)
    const quads = []
    const prefixes = {}

    const quadStream = parsers.import("text/turtle", inputStream)
    if (!quadStream) {
        console.log("quadStream was null, something bad happened");
    }
    if(quadStream !== null){
        for await (const quad of quadStream) {
        quads.push(quad)
        }
    }
    return quads
}