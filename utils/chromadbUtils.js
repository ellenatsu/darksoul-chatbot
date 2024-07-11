import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { CSVLoader } from '@langchain/community/document_loaders/fs/csv';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { ChromaClient } from 'chromadb'
import { ChatGroq } from "@langchain/groq";
import * as hub from "langchain/hub";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { cat } from "@xenova/transformers";


//chain instance
let vectorStore = null;

const client = new ChromaClient();
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
})
const collectionName = "test02";

//llm model
const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_MODEL_ID,
  temperature: 0
});

//RAG process to create db stored in chromadb
//1. load csv data
const loadAllCsvFiles = async (directory) => {
  const loader = new DirectoryLoader(
    directory,
    {
      ".csv": (path) => new CSVLoader(path),
    }
  );
  const docs = await loader.load();
  //console.log({docs});
  return docs;
}

//2. split documents into chunks
const splitDocuments = async (docs) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  return await textSplitter.splitDocuments(docs);
};

const createVectorStore = async () => {
  const csvDirectory = 'data/darksoul3/csv_data';
  try {
    const docs = await loadAllCsvFiles(csvDirectory);
    const splits = await splitDocuments(docs);
    vectorStore = await Chroma.fromDocuments(splits, embeddings, {
      collectionName: collectionName,
    });

    return vectorStore;

  } catch (e) {
    console.log(e);
    return false;
  }
};

const getVectorStore = async () => {
  if (!vectorStore) {
    try{
      return await createVectorStore();
    }catch(e){
      console.log(e);
    }

  }
  return vectorStore;
};



const queryCollection = async (query) => {
  // const collection = await client.getCollection({
  //   name: collectionName,
  //   embeddingFunction: embeddings
  // });
  // try {
  //   const results = await collection.query({
  //     queryTexts: query,
  //     nResults: 3,
  //     include: ["documents"]
  //   });

  //   return results;
  // } catch (e) {
  //   console.log(e);
  //   return false;
  // }

   //get vector store
  //  const vectorStore = getVectorStore();
   //query collection
   const vectorStore = await getVectorStore();
   const retriever = vectorStore.asRetriever();
   try{
      const retrievedDocs = await retriever.invoke(query);
      return retrievedDocs;
   }
    catch(e){
      console.log(e);
      return false;
    }
}

export { createVectorStore, getVectorStore, queryCollection };








//here we have one query
//1. take parse the query
//2. search query in databse for relevant data
//give the relevant data chunks to AI model and generate response
//3. create a prompt
//4. sent it and get response


//give source? not right now