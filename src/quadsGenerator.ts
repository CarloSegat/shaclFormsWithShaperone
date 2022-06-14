import type Quad from 'rdf-ext/lib/Quad'
import stringToStream from 'string-to-stream'
const { parsers } = await import('@rdfjs-elements/formats-pretty')
import rdfFetch from '@rdfjs/fetch'
import clownface, { AnyPointer, GraphPointer } from 'clownface'
import type { RdfFetchResponse, DatasetResponse } from '@rdfjs/fetch-lite';
import type { DatasetCore } from 'rdf-js';
import { dataset } from '@rdf-esm/dataset'

export async function fetchShape(shapeName: string) {
    const res: DatasetResponse<DatasetCore> = await rdfFetch('http://localhost:3001/shape/' + shapeName)
    const dd = await res.dataset()
    console.log("fetched shape: ", dd)
    return clownface({ dataset: dd })
}

export async function fetchRDFWithURL(url: string) {
    const res: DatasetResponse<DatasetCore> = await rdfFetch(url)
    const dd = await res.dataset()
    console.log("fetched RDF: ", dd)
    return clownface({ dataset: dd })
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