import type Quad from 'rdf-ext/lib/Quad'
import stringToStream from 'string-to-stream'
const { parsers } = await import('@rdfjs-elements/formats-pretty')

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